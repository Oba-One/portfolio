# Portfolio WebMCP Strategy

Status: approved public read-only runtime pilot. Keep the implementation limited to `src/utils/webmcp.ts`.

Related operating guide: `docs/agentic-mcp-tooling-runbook.md`.

## Candidate Visible Tools

- Public pages: summarize visible case studies, project sections, writing, and navigation links.
- Contact surface: explain visible form requirements and submission states without submitting on the user's behalf.
- Media/3D sections: describe visible controls and reduced-motion alternatives.
- Storybook: support visible component review in local development only.

## Implemented Pilot Tools

- `describe_portfolio_page`: read-only summary of the current visible public page, headings, form labels, reduced-motion state, and optional visible links.
- `find_portfolio_project_link`: read-only lookup across project links visible on the current page.

## Forbidden Tools

- Contact-form submission, email actions, private analytics, deployment secrets, unpublished drafts, or hidden admin state.
- Background-only actions, destructive operations, bulk content changes, or cross-origin data extraction.
- Any tool that claims private employment, client, or project details not present on the public site.

## User Confirmation And Public Safety

- Runtime tools must be visible, page-scoped, and public-safe by default.
- Contact submission, email actions, deployment actions, analytics access, or unpublished-draft access are not WebMCP candidates.
- Read-only tools may describe visible DOM/accessibility-tree state and local Storybook state only.

## Chrome DevTools MCP Proof Profile

- Prefer the repo browser lane first: route screenshots/DOM, accessibility summaries, console/page errors, `/llms.txt`, reduced-motion state, WebMCP discovery, and Storybook build proof.
- Use Chrome DevTools MCP only as an additional proof pass for browser-runtime issues, network/performance traces, 3D/media debugging, or WebMCP discovery checks that the repo lane cannot explain.
- Run MCP proof from an isolated or non-default Chrome profile. Do not connect agent tooling to a normal profile when the inspected surface can expose private browser profile data, cookies, private tabs, analytics, unpublished drafts, or contact context.
- The proof bundle for any runtime candidate must include: route/surface, viewport, screenshot, DOM or accessibility snapshot, console/page error summary, network/performance notes when relevant, `/llms.txt` result, reduced-motion result, and `list_webmcp_tools` output.

## Proof Before Runtime

- `bun run agentic:check` is stable and Storybook/browser proof passes for affected surfaces.
- `bun run agentic:browser-proof` records route screenshots, accessibility summaries, console/page error status, `/llms.txt` status, reduced-motion status, and WebMCP discovery status in `output/agentic-browser-proof/`.
- Console health, accessibility names, focus states, and reduced-motion behavior are checked before exposing tools.
- Tool descriptions are read-only by default and page-scoped.
- Chrome DevTools MCP or Puppeteer WebMCP proves expected tool discovery, no forbidden tools, valid schema, graceful errors, and no contact submission side effect.

## Runtime Expansion Spec

Before expanding beyond the current read-only pilot, write an approval-ready spec that lists candidate visible tools, forbidden tools, confirmation rules, the public/privacy boundary, input and output schema tests, wrong-tool and wrong-argument evals, contact/no-private-context evals, and the exact proof commands. Do not add contact submission, email actions, analytics access, unpublished-draft access, or hidden admin behavior as WebMCP tools.
