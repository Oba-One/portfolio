# AGENTS.md

Working agreements for AI coding agents in `portfolio`.

## Repo invariants

- Use Bun (`bun@1.3.10`), the checked-in `bun.lock`, and the project scripts already present in this repository. Do not reintroduce npm, yarn, or pnpm lockfiles unless the user explicitly asks for that package-manager change.
- Keep changes scoped to the user request and avoid broad dependency, workflow, or agent-config churn.

## Agentic Modern Web Standard

- Baseline target: Baseline Widely Available. Before frontend, UI, CSS, accessibility, browser proof, or web-design changes, run repo-installed Modern Web Guidance with `bun run agentic:guidance`, then apply the existing Next.js, Storybook, and portfolio presentation constraints.
- Prefer semantic HTML, native controls, platform CSS, and browser primitives before custom JavaScript. Keep landmarks, headings, links, buttons, forms, accessible names, focus states, touch targets, loading/error/empty states, and reduced-motion behavior clear in the rendered DOM and accessibility tree.
- Run `bun run agentic:check` for hard guidance-readiness plus the design-token guard and lint lane. Use `bun run agentic:browser-proof` when layout, interaction, motion, 3D, or public routes change; it builds Next, captures route screenshots and accessibility summaries, checks console/page errors, `/llms.txt`, reduced-motion behavior, WebMCP discovery, and then builds Storybook. `dev-surfaces` remains the cross-repo/global doctor for shared Modern Web Guidance cache refresh, Brave, and MCP readiness.
- For local human/agent browser walkthroughs, WebMCP validation, and DevTools MCP proof, prefer Brave with an isolated/non-default profile. Keep the repo proof commands Chrome/Chromium-compatible for contributors and CI unless a task explicitly requires Brave-only WebMCP validation.
- WebMCP has an explicitly approved public read-only runtime pilot. Keep tools in `src/utils/webmcp.ts` visible, page-scoped, and public-safe; do not add contact submission, analytics, private context, hidden admin actions, destructive operations, or background-only actions.
- For MCP/tool selection and WebMCP expansion, use `docs/agentic-mcp-tooling-runbook.md` as the operating map before adding tools or changing proof lanes.

## Design System Guardrails

- Load `DESIGN.md`, `src/components/ThemeProvider/theme.ts`, the nearest CSS Module or SCSS file, and Storybook context before UI/CSS work.
- Run `bun run check:design-tokens` for UI/CSS changes; it blocks new raw colors, gradients, viewport units, raw radii, and raw motion values unless they are intentionally recorded in `scripts/data/design-token-baseline.tsv`.
- Keep existing Portfolio identity intact: editorial case studies, restrained motion, and 3D as supporting atmosphere rather than a new product UI system.
- For new case studies or route changes, update project data in `src/constants.ts`, route data in `src/utils/siteRoutes.json`, and keep public/browser-proof routes aligned with `bun run check:site-routes`. Reuse `layouts/Project` and `src/pages/projects/CaseStudy.module.scss` before adding a new visual grammar.
- For contact or form changes, keep validation shared through `src/utils/contact.ts` so client constraints and API parsing do not drift.

## Supply-chain and agent safety

- Do not install or upgrade npm, Python, or package-manager dependencies unless the user explicitly approves that install in the current task.
- Prefer existing repo tooling, checked-in lockfiles, and standard library options over adding new packages.
- Treat `package.json`, lockfiles, package-manager config, `.github/workflows/**`, `AGENTS.md`, `CLAUDE.md`, `.codex/**`, and `.claude/**` as security-sensitive surfaces. Call out any changes to them in final summaries.
- Keep dependency installs on the checked-in Bun lockfile path and preserve the repo's release-age gate configuration in `bunfig.toml`.

## Validation

Use the lightest honest validation that matches the touched surface. Do not run dependency installs or package upgrades unless the user explicitly approves them for the current task.
