# Portfolio WebMCP Strategy

Status: strategy only. Do not ship runtime WebMCP tools in v1.

## Candidate Visible Tools

- Public pages: summarize visible case studies, project sections, writing, and navigation links.
- Contact surface: explain visible form requirements and submission states without submitting on the user's behalf.
- Media/3D sections: describe visible controls and reduced-motion alternatives.
- Storybook: support visible component review in local development only.

## Forbidden Tools

- Contact-form submission, email actions, private analytics, deployment secrets, unpublished drafts, or hidden admin state.
- Background-only actions, destructive operations, bulk content changes, or cross-origin data extraction.
- Any tool that claims private employment, client, or project details not present on the public site.

## User Confirmation And Public Safety

- Runtime tools must be visible, page-scoped, and public-safe by default.
- Contact submission, email actions, deployment actions, analytics access, or unpublished-draft access are not WebMCP candidates.
- Read-only tools may describe visible DOM/accessibility-tree state and local Storybook state only.

## Proof Before Runtime

- `bun run agentic:check` is stable and Storybook/browser proof passes for affected surfaces.
- `bun run agentic:browser-proof` records route screenshots, accessibility summaries, console/page error status, `/llms.txt` status, reduced-motion status, and WebMCP discovery status in `output/agentic-browser-proof/`.
- Console health, accessibility names, focus states, and reduced-motion behavior are checked before exposing tools.
- Tool descriptions are read-only by default and page-scoped.
- Chrome DevTools MCP or Puppeteer WebMCP proves expected tool discovery, no forbidden tools, valid schema, graceful errors, and no contact submission side effect.
