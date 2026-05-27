# Agentic MCP and Tooling Runbook

Status: operating guide for Portfolio website work and the current public read-only WebMCP pilot.

Use MCP-related tools by role. Repo-native checks and browser proof are the authority; MCP/browser assistants are advisory inspection layers.

## Operating Principles

- Repo-native proof is the source of truth. Do not treat local MCP availability as proof that the website is correct.
- WebMCP is client-side and page-scoped. It exposes tools from the browser tab, not from a backend MCP server.
- The current WebMCP pilot is read-only and public-safe. It must not submit contact forms, read analytics, expose unpublished drafts, infer private client context, perform deployment actions, or run hidden background actions.
- Browser MCP runs must use an isolated or non-default profile. Do not connect agent tooling to a personal browser profile if private tabs, cookies, analytics, or contact context could be exposed.
- No project-scoped `.mcp.json` is currently the contract for this repo. Treat MCP availability as local/session-specific unless a future change explicitly adds project-scoped MCP config.

## Current Tool Map

| Tool surface | Primary use | Do not use it for | Proof surface |
| --- | --- | --- | --- |
| `AGENTS.md` | Always-loaded repo rules, design guardrails, browser proof expectations, and WebMCP safety boundary. | Replacing source inspection. | Read before work starts. |
| `DESIGN.md`, theme tokens, CSS modules, Storybook context | Portfolio identity, component behavior, visual constraints, and design-token usage. | One-off visual systems or raw token drift. | `bun run check:design-tokens`; Storybook build when relevant. |
| `bun run agentic:check` | Fast proof: route guard, design-token guard, and lint. | Final browser/runtime sign-off. | Must pass or have explicit caveats for existing warnings. |
| `bun run agentic:browser-proof` | Full route proof: Next build, screenshots, accessibility summaries, console/page errors, `/llms.txt`, reduced motion, WebMCP discovery, and Storybook build. | Manual taste review. | Inspect `output/agentic-browser-proof/report.json` and screenshots for affected routes. |
| Storybook | Component state discovery and isolated UI review. | Public-route proof by itself. | `bun run storybook` for exploration; `bun run build:storybook` in full proof. |
| WebMCP runtime pilot in `src/utils/webmcp.js` | Read-only public page tools: `describe_portfolio_page`, `find_portfolio_project_link`. | Contact submission, analytics, unpublished drafts, private client details, deployment actions, or hidden behavior. | Browser proof must detect only expected tools; expansion requires a spec and forbidden-state evals. |
| Chrome/Brave DevTools MCP | Advisory browser inspection for DOM, accessibility, console, network, performance, media/3D issues, and WebMCP tool listing. | A replacement for repo checks or a connection to personal browser profile state. | Isolated profile, route URL, viewport, screenshot or snapshot, console/network summary, and tool listing. |
| Playwright/CDP scripts | Repeatable route flows and screenshot/regression proof. | Broad design approval. | Prefer repo scripts before ad hoc automation. |
| Figma/Stitch/design prompts | Design direction and component comparison. | Runtime proof, accessibility proof, or WebMCP privacy proof. | Map decisions back to `DESIGN.md`, tokens, Storybook, and route screenshots. |

## Website Workflow

1. Define the route or surface: homepage, contact, project page, case-study component, Storybook component, or media/3D section.
2. Read the relevant guidance before editing:
   - `AGENTS.md`
   - `DESIGN.md`
   - `docs/agentic-webmcp-strategy.md`
   - `docs/chrome-platform-tracker.md`
3. Use Modern Web Guidance before browser-facing platform changes, accessibility work, animation/motion changes, or WebMCP changes.
4. Make the smallest coherent change and keep Portfolio identity intact.
5. Run source proof:
   ```sh
   bun run agentic:check
   ```
6. Run full browser proof when route layout, interaction, motion, public route coverage, Storybook, or WebMCP behavior changes:
   ```sh
   bun run agentic:browser-proof
   ```
7. Use DevTools MCP only when the repo proof cannot explain a runtime issue. Keep it isolated and capture evidence.
8. Summarize closure with commands, results, screenshots/reports inspected, and any remaining manual risk.

## WebMCP Expansion Rule

Before adding any new WebMCP tool, write an approval-ready spec that includes:

- tool name, description, and input schema;
- the exact visible UI state that makes the tool available;
- public/private data boundary;
- forbidden states and forbidden outputs;
- confirmation requirements for any future write-like behavior;
- wrong-tool, wrong-argument, stale-state, contact/no-private-context evals;
- proof commands and expected `list_webmcp_tools` output.

Do not add WebMCP tools for contact submission, email actions, analytics access, unpublished drafts, deployment actions, credentials, or hidden admin/background behavior without explicit approval and a separate proof plan.
