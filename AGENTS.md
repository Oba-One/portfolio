# AGENTS.md

Working agreements for AI coding agents in `portfolio`.

## Repo invariants

- Use Bun (`bun@1.3.10`), the checked-in `bun.lock`, and the project scripts already present in this repository. Do not reintroduce npm, yarn, or pnpm lockfiles unless the user explicitly asks for that package-manager change.
- Keep changes scoped to the user request and avoid broad dependency, workflow, or agent-config churn.

## Agentic Modern Web Standard

- Baseline target: Baseline Widely Available. Before frontend, UI, CSS, accessibility, browser proof, or web-design changes, use Modern Web Guidance search/retrieve and then apply the existing Next.js, Storybook, and portfolio presentation constraints.
- Prefer semantic HTML, native controls, platform CSS, and browser primitives before custom JavaScript. Keep landmarks, headings, links, buttons, forms, accessible names, focus states, touch targets, loading/error/empty states, and reduced-motion behavior clear in the rendered DOM and accessibility tree.
- Run `bun run agentic:check` for the design-token guard plus lint lane. Use `bun run agentic:browser-proof` when layout, interaction, motion, 3D, or public routes change; it builds Next, captures route screenshots and accessibility summaries, checks console/page errors, `/llms.txt`, reduced-motion behavior, WebMCP discovery, and then builds Storybook.
- For local human/agent browser walkthroughs, WebMCP validation, and DevTools MCP proof, prefer Brave with an isolated/non-default profile. Keep the repo proof commands Chrome/Chromium-compatible for contributors and CI unless a task explicitly requires Brave-only WebMCP validation.
- WebMCP is strategy-only in v1. Do not ship runtime WebMCP tools unless explicitly requested; future tools must follow `docs/agentic-webmcp-strategy.md`, stay visible/user-confirmable/public-safe, and must not expose contact-form secrets, private analytics, hidden admin actions, destructive operations, or background-only actions.

## Design System Guardrails

- Load `DESIGN.md`, `src/components/ThemeProvider/theme.js`, the nearest CSS Module or SCSS file, and Storybook context before UI/CSS work.
- Run `bun run check:design-tokens` for UI/CSS changes; it blocks new raw colors, gradients, viewport units, raw radii, and raw motion values unless they are intentionally recorded in `scripts/data/design-token-baseline.tsv`.
- Keep existing Portfolio identity intact: editorial case studies, restrained motion, and 3D as supporting atmosphere rather than a new product UI system.

## Supply-chain and agent safety

- Do not install or upgrade npm, Python, or package-manager dependencies unless the user explicitly approves that install in the current task.
- Prefer existing repo tooling, checked-in lockfiles, and standard library options over adding new packages.
- Treat `package.json`, lockfiles, package-manager config, `.github/workflows/**`, `AGENTS.md`, `CLAUDE.md`, `.codex/**`, and `.claude/**` as security-sensitive surfaces. Call out any changes to them in final summaries.
- Keep dependency installs on the checked-in Bun lockfile path and preserve the repo's release-age gate configuration in `bunfig.toml`.

## Validation

Use the lightest honest validation that matches the touched surface. Do not run dependency installs or package upgrades unless the user explicitly approves them for the current task.
