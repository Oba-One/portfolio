# Chrome Platform Tracker

Last refreshed: 2026-05-24

Guidance sources: `modern-web-guidance@latest`, Chrome same-document View Transitions, Chrome WebMCP, Lighthouse Registered WebMCP tools, Chrome soft-navigation measurement, Chrome DevTools Performance reference, and Chrome DevTools MCP.

| Feature | Current adoption | Candidate surface | Risk | Proof command | Status |
| --- | --- | --- | --- | --- | --- |
| `/llms.txt` and public portfolio context | Public `llms.txt` and agentic browser proof are present. | Homepage, project pages, case studies, writing, and Storybook. | Agent context must not imply private client/employment details. | `bun run agentic:browser-proof` | ship |
| Semantic, native, accessible DOM | AGENTS requires Baseline Widely Available, design-token checks, accessibility summaries, and reduced-motion proof. | Public routes, case studies, contact surface, and Storybook. | Editorial/3D atmosphere can obscure headings, focus, or accessible names. | `bun run agentic:check` | ship |
| View Transitions | No current production use found. | Route and case-study navigation if the existing Next.js flow has a clear user-facing benefit. | Transition work can add motion and routing complexity without improving reading/navigation. | Prototype in a plan first; browser-proof route screenshots and reduced motion before shipping. | prototype |
| WebMCP runtime tools | Strategy and discovery probes only; no runtime tools approved. | Future read-only page/case-study explanation tools only. | Contact submission, analytics, unpublished drafts, or private client context are forbidden. | Chrome DevTools MCP `list_webmcp_tools` must return only expected visible tools. | watch |
| Chrome DevTools MCP proof | Browser proof records screenshots, accessibility summaries, console/page errors, `/llms.txt`, reduced motion, WebMCP discovery, and Storybook build. | Public routes, 3D/media sections, and Storybook review. | Real-profile MCP proof can expose private browsing/profile data. | `bun run agentic:browser-proof`; isolated Chrome DevTools MCP when needed. | ship |
| Core Web Vitals | Next core-web-vitals lint config is present; no explicit SPA soft-navigation measurement plan. | Public routes and media-heavy project/case-study pages. | 3D/media can affect LCP/INP/CLS; soft-navigation measurement remains developing. | Plan first: capture LCP, INP, CLS, route label, `navigationType`, and media/3D state. | watch |
| 3D accessibility, HTML-in-Canvas, Declarative Partial Updates, `streamHTML` | 3D is presentation support; experimental APIs are not production dependencies. | 3D accessibility research only where semantic DOM fallback is insufficient. | Canvas/3D text can disappear from the accessibility tree. | Spike requires DOM/AX fallback proof and reduced-motion proof. | watch |

## Adoption Notes

- Keep Portfolio public-safe and editorial: visible DOM, reduced motion, and Storybook proof come before new platform experiments.
- WebMCP remains frozen at strategy/proof level until the user explicitly approves runtime `navigator.modelContext.registerTool`, `toolname`, or `tooldescription` work.
- View Transitions should start as a narrow route/case-study prototype, not a site-wide motion rewrite.

## Operational Follow-Up

- Repo-native task surface: `.plans/features/modern-css-web-ui-primitives/spec.md` under `Next Proof Task`.
- Next proof task: prototype View Transitions only after a route/case-study proof plan exists, then run `bun run agentic:browser-proof` or isolated Chrome DevTools MCP with route/surface URL, viewport, screenshot/DOM or accessibility snapshot, console/page errors, `/llms.txt`, reduced motion, CWV/media context, and `list_webmcp_tools`.
