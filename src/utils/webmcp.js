const MAX_TEXT_LENGTH = 180
const MAX_ITEMS = 12

function cleanText(value = '', maxLength = MAX_TEXT_LENGTH) {
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function visible(element) {
  if (!element) return false
  const rect = element.getBoundingClientRect()
  const style = window.getComputedStyle(element)
  return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden'
}

function visibleText(selector, limit = MAX_ITEMS) {
  return [...document.querySelectorAll(selector)]
    .filter(visible)
    .map(element => cleanText(element.textContent || ''))
    .filter(Boolean)
    .slice(0, limit)
}

function visibleLinks(selector = 'main a[href], nav a[href]', limit = MAX_ITEMS) {
  return [...document.querySelectorAll(selector)]
    .filter(visible)
    .map(link => ({
      label: cleanText(link.textContent || link.getAttribute('aria-label') || ''),
      href: link.href,
    }))
    .filter(link => link.label && link.href)
    .slice(0, limit)
}

function pageKind() {
  const path = window.location.pathname
  if (path === '/' || path === '') return 'home'
  if (path.startsWith('/projects/')) return 'project'
  if (path.startsWith('/contact')) return 'contact'
  return 'public'
}

function describePortfolioPage({ includeLinks = true } = {}) {
  const metaDescription = document
    .querySelector('meta[name="description"]')
    ?.getAttribute('content')

  return {
    url: window.location.href,
    path: window.location.pathname,
    kind: pageKind(),
    title: document.title,
    description: cleanText(metaDescription || ''),
    h1: cleanText(document.querySelector('h1')?.textContent || ''),
    headings: visibleText('main h1, main h2, main h3', 10),
    formFields: visibleText('main label', 10),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    links: includeLinks ? visibleLinks() : [],
  }
}

function findPortfolioProjectLink({ query = '' } = {}) {
  const normalizedQuery = cleanText(String(query)).toLowerCase()
  const projectLinks = visibleLinks('main a[href*="/projects/"], nav a[href*="/projects/"]', 24)
  const matches = normalizedQuery
    ? projectLinks.filter(link => {
        const haystack = `${link.label} ${link.href}`.toLowerCase()
        return haystack.includes(normalizedQuery)
      })
    : projectLinks

  return {
    query: normalizedQuery,
    matches: matches.slice(0, MAX_ITEMS),
    count: matches.length,
  }
}

export function registerPortfolioWebMcpTools() {
  const modelContext = navigator.modelContext
  if (!modelContext || typeof modelContext.registerTool !== 'function') return undefined

  const controller = new AbortController()
  const options = { signal: controller.signal }

  modelContext.registerTool(
    {
      name: 'describe_portfolio_page',
      description:
        'Describe the current visible Portfolio page, including public headings, visible form labels, reduced-motion state, and optionally visible links.',
      inputSchema: {
        type: 'object',
        properties: {
          includeLinks: {
            type: 'boolean',
            description: 'Whether to include visible public links from the current page.',
          },
        },
      },
      execute: describePortfolioPage,
      annotations: {
        readOnlyHint: true,
      },
    },
    options
  )

  modelContext.registerTool(
    {
      name: 'find_portfolio_project_link',
      description:
        'Find public project links that are visible on the current Portfolio page and match a raw user query.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description:
              'Raw user text to match against visible project link labels and URLs on this page.',
          },
        },
      },
      execute: findPortfolioProjectLink,
      annotations: {
        readOnlyHint: true,
      },
    },
    options
  )

  return () => controller.abort()
}
