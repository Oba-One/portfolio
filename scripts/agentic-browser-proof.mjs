#!/usr/bin/env node
import { accessSync, constants, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const host = '127.0.0.1';
const port = Number(process.env.PORTFOLIO_BROWSER_PROOF_PORT || 3310);
const origin = `http://${host}:${port}`;
const routeManifest = JSON.parse(readFileSync(path.join(repoRoot, 'src/utils/siteRoutes.json'), 'utf8'));
const defaultBrowserProofRoutes = routeManifest.browserProofRoutes?.length
  ? routeManifest.browserProofRoutes
  : ['/', '/contact'];
const routes = (process.env.PORTFOLIO_BROWSER_PROOF_ROUTES || defaultBrowserProofRoutes.join(','))
  .split(',')
  .map((route) => route.trim())
  .filter(Boolean);
const widths = (process.env.PORTFOLIO_BROWSER_PROOF_WIDTHS || '375,1280')
  .split(',')
  .map((width) => Number(width.trim()))
  .filter((width) => Number.isFinite(width) && width > 0);
const artifactDir = path.join(repoRoot, 'output/agentic-browser-proof');

function existsExecutable(candidate) {
  if (!candidate) return false;
  try {
    accessSync(candidate, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function versionParts(entry) {
  const match = entry.match(/(\d+(?:\.\d+)+)/);
  return match ? match[1].split('.').map((part) => Number(part)) : [];
}

function compareVersionEntriesDesc(a, b) {
  const aParts = versionParts(a);
  const bParts = versionParts(b);
  for (let index = 0; index < Math.max(aParts.length, bParts.length); index += 1) {
    const diff = (bParts[index] || 0) - (aParts[index] || 0);
    if (diff !== 0) return diff;
  }
  return b.localeCompare(a);
}

function discoverCachedChromium() {
  const found = [];
  const tryGlob = (base, leaf) => {
    try {
      for (const entry of readdirSync(base).sort(compareVersionEntriesDesc)) {
        const candidate = leaf(entry);
        if (existsExecutable(candidate)) found.push(candidate);
      }
    } catch {
      // Cache directory may not exist.
    }
  };

  const home = homedir();
  const chromeForTesting = path.join(home, '.cache/chrome-for-testing/chrome');
  tryGlob(chromeForTesting, (entry) => path.join(
    chromeForTesting,
    entry,
    'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  ));
  tryGlob(chromeForTesting, (entry) => path.join(
    chromeForTesting,
    entry,
    'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  ));
  tryGlob(chromeForTesting, (entry) => path.join(chromeForTesting, entry, 'chrome-linux64/chrome'));

  const playwright = path.join(home, 'Library/Caches/ms-playwright');
  tryGlob(playwright, (entry) => path.join(playwright, entry, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'));
  tryGlob(playwright, (entry) => path.join(playwright, entry, 'chrome-headless-shell-mac-x64/chrome-headless-shell'));
  tryGlob(playwright, (entry) => path.join(playwright, entry, 'chrome-mac/Chromium.app/Contents/MacOS/Chromium'));

  const puppeteer = path.join(home, '.cache/puppeteer/chrome');
  tryGlob(puppeteer, (entry) => path.join(
    puppeteer,
    entry,
    'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  ));
  return found;
}

function findChromeBinary() {
  const candidates = [
    process.env.CHROME_BIN,
    process.env.CHROMIUM_BIN,
    ...discoverCachedChromium(),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);
  return candidates.find(existsExecutable) || '';
}

function slugRoute(route, width) {
  const slug = route === '/' ? 'home' : route.replace(/^\/+/, '').replace(/[^a-z0-9]+/gi, '-').replace(/-$/, '');
  return `${slug}-${width}`;
}

async function waitForHttp(url, timeoutMs = 30000) {
  const started = Date.now();
  let lastError = null;
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw lastError || new Error(`Timed out waiting for ${url}`);
}

async function auditLlmsTxt() {
  const url = `${origin}/llms.txt`;
  try {
    const response = await fetch(url);
    const body = await response.text();
    return {
      status: response.ok && body.trim() ? 'ok' : 'missing',
      statusCode: response.status,
      contentType: response.headers.get('content-type') || '',
      bytes: Buffer.byteLength(body),
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

async function startNextServer() {
  const child = spawn('bun', ['run', 'start', '--', '-H', host, '-p', String(port)], {
    cwd: repoRoot,
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', (chunk) => process.stdout.write(`[next] ${chunk}`));
  child.stderr.on('data', (chunk) => process.stderr.write(`[next] ${chunk}`));
  await waitForHttp(origin);
  return child;
}

async function launchChrome() {
  const chromeBinary = findChromeBinary();
  if (!chromeBinary) throw new Error('No Chrome or Chromium binary found for browser proof.');

  const userDataDir = path.join(tmpdir(), `portfolio-agentic-browser-proof-${process.pid}`);
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-background-networking',
    '--disable-extensions',
    '--no-first-run',
    '--no-default-browser-check',
    '--enable-features=WebMCPTesting,DevToolsWebMCPSupport',
    '--remote-debugging-port=0',
    `--user-data-dir=${userDataDir}`,
    'about:blank',
  ];
  const child = spawn(chromeBinary, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timed out waiting for Chrome DevTools endpoint.')), 15000);
    let stderr = '';
    let resolved = false;
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
      const match = chunk.toString().match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) {
        resolved = true;
        clearTimeout(timeout);
        resolve(match[1]);
      }
    });
    child.once('exit', (code, signal) => {
      if (resolved) return;
      clearTimeout(timeout);
      reject(new Error(`Chrome exited before DevTools endpoint was ready: ${code ?? signal}\n${stderr.trim()}`));
    });
  });

  return {
    wsUrl,
    async close() {
      child.kill('SIGTERM');
      rmSync(userDataDir, { recursive: true, force: true });
    },
  };
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
    this.ws.addEventListener('message', (event) => this.handleMessage(event));
  }

  handleMessage(event) {
    const message = JSON.parse(event.data);
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message || JSON.stringify(message.error)));
      else resolve(message.result || {});
      return;
    }
    if (message.method && this.events.has(message.method)) {
      for (const listener of this.events.get(message.method)) listener(message.params || {});
    }
  }

  async send(method, params = {}, sessionId) {
    await this.ready;
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (!this.pending.has(id)) return;
        this.pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }, 15000);
    });
  }

  close() {
    this.ws.close();
  }
}

async function evaluate(client, sessionId, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  }, sessionId);
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Runtime evaluation failed');
  }
  return result.result?.value;
}

async function waitForExpression(client, sessionId, expression, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await evaluate(client, sessionId, expression).catch(() => false)) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for expression: ${expression}`);
}

function summarizeAxTree(nodes) {
  return nodes
    .map((node) => ({
      role: node.role?.value || '',
      name: node.name?.value || '',
    }))
    .filter((node) => node.role || node.name)
    .slice(0, 160);
}

async function verifyRoute(client, route, width) {
  const target = await client.send('Target.createTarget', { url: 'about:blank' });
  const attached = await client.send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const sessionId = attached.sessionId;
  const height = width <= 500 ? 900 : 900;
  const reduceMotion = width <= 500;
  const slug = slugRoute(route, width);
  const screenshotPath = path.join(artifactDir, `${slug}.png`);
  const axPath = path.join(artifactDir, `${slug}.ax.json`);

  try {
    await client.send('Page.enable', {}, sessionId);
    await client.send('Runtime.enable', {}, sessionId);
    await client.send('Accessibility.enable', {}, sessionId);
    await client.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        window.__agenticProof = { consoleErrors: [], pageErrors: [] };
        const originalConsoleError = console.error;
        console.error = (...args) => {
          window.__agenticProof.consoleErrors.push(args.map(String).join(' '));
          originalConsoleError.apply(console, args);
        };
        window.addEventListener('error', (event) => {
          window.__agenticProof.pageErrors.push(event.message || 'unknown error');
        });
        window.addEventListener('unhandledrejection', (event) => {
          window.__agenticProof.pageErrors.push(String(event.reason || 'unhandled rejection'));
        });
      `,
    }, sessionId);
    await client.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width <= 500,
    }, sessionId);
    await client.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: reduceMotion ? 'reduce' : 'no-preference' }],
    }, sessionId);

    const response = await fetch(`${origin}${route}`);
    await client.send('Page.navigate', { url: `${origin}${route}` }, sessionId);
    await waitForExpression(client, sessionId, "document.readyState === 'complete'");
    await new Promise((resolve) => setTimeout(resolve, 300));

    const runtime = await evaluate(client, sessionId, `
      (async () => {
        const proof = window.__agenticProof || { consoleErrors: [], pageErrors: [] };
        const modelContext = 'modelContext' in navigator ? navigator.modelContext : undefined;
        const testing = 'modelContextTesting' in navigator ? navigator.modelContextTesting : undefined;
        const testingTools = typeof testing?.listTools === 'function'
          ? await Promise.resolve(testing.listTools()).then((tools) => tools.map((tool) => ({
              name: tool.name || '',
              description: tool.description || ''
            }))).catch(() => [])
          : [];
        const declarativeTools = [...document.querySelectorAll('form[toolname], form[tooldescription]')].map((form) => ({
          name: form.getAttribute('toolname') || '',
          description: form.getAttribute('tooldescription') || ''
        }));
        const overflowElements = [...document.querySelectorAll('body *')]
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName.toLowerCase(),
              className: typeof element.className === 'string' ? element.className : '',
              text: (element.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 80),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width)
            };
          })
          .filter((element) => element.right > window.innerWidth + 1 || element.left < -1)
          .slice(0, 12);
        return {
          title: document.title,
          mainExists: Boolean(document.querySelector('main')),
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          viewportWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          overflowElements,
          consoleErrors: proof.consoleErrors,
          pageErrors: proof.pageErrors,
          webMcp: {
            status: Boolean(modelContext) || declarativeTools.length > 0 || testingTools.length > 0 ? 'detected' : 'not_configured',
            navigatorModelContext: Boolean(modelContext),
            registerToolType: typeof modelContext?.registerTool,
            declarativeTools,
            testingTools
          }
        };
      })()
    `);

    const axTree = await client.send('Accessibility.getFullAXTree', {}, sessionId);
    const screenshot = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true }, sessionId);
    writeFileSync(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    writeFileSync(axPath, `${JSON.stringify(summarizeAxTree(axTree.nodes || []), null, 2)}\n`);

    const violations = [];
    if (!response.ok) violations.push(`HTTP ${response.status}`);
    if (!runtime.mainExists) violations.push('missing main landmark');
    if (runtime.horizontalOverflow) violations.push('horizontal overflow');
    if (runtime.consoleErrors.length) violations.push(`${runtime.consoleErrors.length} console error(s)`);
    if (runtime.pageErrors.length) violations.push(`${runtime.pageErrors.length} page error(s)`);

    return {
      route,
      width,
      statusCode: response.status,
      title: runtime.title,
      reducedMotion: runtime.reducedMotion,
      mainExists: runtime.mainExists,
      horizontalOverflow: runtime.horizontalOverflow,
      viewportWidth: runtime.viewportWidth,
      scrollWidth: runtime.scrollWidth,
      overflowElements: runtime.overflowElements,
      consoleErrors: runtime.consoleErrors,
      pageErrors: runtime.pageErrors,
      webMcp: runtime.webMcp,
      artifacts: {
        screenshot: path.relative(repoRoot, screenshotPath),
        accessibilitySummary: path.relative(repoRoot, axPath),
      },
      violations,
    };
  } finally {
    await client.send('Target.closeTarget', { targetId: target.targetId }).catch(() => {});
  }
}

async function main() {
  mkdirSync(artifactDir, { recursive: true });
  let server;
  let chrome;
  let client;
  const results = [];
  try {
    server = await startNextServer();
    const llmsTxt = await auditLlmsTxt();
    chrome = await launchChrome();
    client = new CdpClient(chrome.wsUrl);

    for (const route of routes) {
      for (const width of widths) {
        const result = await verifyRoute(client, route, width);
        results.push(result);
        const status = result.violations.length ? `FAIL ${result.violations.join(', ')}` : 'ok';
        console.log(`[agentic-browser-proof] ${route} @${width}: ${status}`);
      }
    }

    const report = {
      generatedAt: new Date().toISOString(),
      origin,
      routes,
      widths,
      llmsTxt,
      results,
    };
    const reportPath = path.join(artifactDir, 'report.json');
    writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

    const hardCount = results.reduce((sum, result) => sum + result.violations.length, 0);
    console.log(`[agentic-browser-proof] wrote ${path.relative(repoRoot, reportPath)} with ${hardCount} violation(s).`);
    if (hardCount > 0) process.exitCode = 1;
  } finally {
    client?.close();
    if (chrome) await chrome.close();
    server?.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
