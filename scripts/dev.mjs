#!/usr/bin/env node

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const nodeBinCandidates = [
  process.env.PORTFOLIO_DEV_NODE_BIN,
  path.join(os.homedir(), ".local/share/mise/installs/node/22.22.1/bin"),
  path.join(os.homedir(), ".local/share/mise/installs/node/22/bin"),
].filter(Boolean);
const nodeBin = nodeBinCandidates.find((candidate) => fs.existsSync(path.join(candidate, "node")));

function targetEnv() {
  if (!nodeBin) return process.env;
  return {
    ...process.env,
    PATH: `${nodeBin}:${process.env.PATH ?? ""}`,
  };
}

const targets = [
  {
    label: "site",
    command: ["bun", "run", "dev:site"],
    url: "http://localhost:3201/",
  },
  {
    label: "storybook",
    command: ["bun", "run", "storybook"],
    url: "http://localhost:3202/",
  },
];

let shuttingDown = false;
const children = [];

function pipe(label, stream, writer) {
  if (!stream) return;
  const rl = readline.createInterface({ input: stream });
  rl.on("line", (line) => writer.write(`[${label}] ${line}\n`));
}

function killChild(child, signal = "SIGTERM") {
  if (!child.pid || child.killed) return;
  try {
    process.kill(-child.pid, signal);
  } catch {
    try {
      child.kill(signal);
    } catch {
      // Already gone.
    }
  }
}

function stopAll(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) killChild(child);
  setTimeout(() => {
    for (const child of children) killChild(child, "SIGKILL");
    process.exit(exitCode);
  }, 1500).unref();
}

for (const target of targets) {
  const child = spawn(target.command[0], target.command.slice(1), {
    cwd: repoRoot,
    env: targetEnv(),
    stdio: ["ignore", "pipe", "pipe"],
  });
  children.push(child);
  pipe(target.label, child.stdout, process.stdout);
  pipe(target.label, child.stderr, process.stderr);
  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    console.error(`[dev] ${target.label} exited${signal ? ` from ${signal}` : ` with ${code ?? 1}`}. Stopping Portfolio dev.`);
    stopAll(code ?? 1);
  });
}

console.log("[dev] Portfolio local environment starting:");
for (const target of targets) console.log(`[dev] ${target.label}: ${target.url}`);
console.log("[dev] Press Ctrl+C to stop.");

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));

await new Promise(() => {});
