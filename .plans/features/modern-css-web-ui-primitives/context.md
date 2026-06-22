# Modern CSS/Web UI Primitives Context

## Current State

- Source audit: `/Users/afo/Documents/Codex/2026-05-23/i-m-watching-this-great-video/modern-css-web-ui-audit.md`.
- Portfolio did not have a `.plans` directory before this bootstrap, so this feature uses the same lightweight plan shape as TAS Hub.
- The app is a Next 15, React 18, Bun 1.3.10 portfolio site using CSS Modules, SCSS, Framer Motion, Three.js, and a JavaScript token/theme provider.
- `src/components/ThemeProvider/theme.js` defines viewport-specific rem-based typography and light/dark theme tokens.
- `src/layouts/App/global.scss` sets `body` to `width: 100vw` and `overflow-x: hidden`; several pages and layout modules still use `100vh` or `100vw`.
- Current interaction code includes manual scroll listeners for hash scrolling, parallax, navbar inversion, and scroll restoration, plus Framer Motion route/page transitions.
- The app has `color-scheme` in reset CSS and several reduced-motion-aware hooks, but no explicit `prefers-contrast` or `forced-colors` contract for text, focus, canvas/WebGL, image-backed overlays, or project-page surfaces.

## Constraints

- This plan tracks future work only. Do not change runtime CSS, components, scripts, dependencies, metadata, or generated assets in this pass.
- Preserve the active `portfolio-story-refresh` worktree. Existing dirty story, component, package, docs, public, and asset files are unrelated unless a future task explicitly scopes them in.
- Bootstrap only the lightweight planning surface: README, templates, and this feature pack. Do not add package scripts, validation helpers, lane files, or queue metadata.
- Modern CSS/Web UI adoption should be progressive and compatible with Portfolio's current browser target of `>10%, not dead, not ie 11, not op_mini all`.

## Notes

- Priority primitives from the audit: text-scale readiness, dynamic viewport units, OS preference support, token roles, native browser navigation/motion primitives, and reduced scroll-listener complexity.
- Portfolio-specific candidates: `100vw`/scrollbar policy, `100vh` to dynamic viewport migration, CSS scroll spy for hash navigation, progressive View Transitions as an alternative to some Framer route transitions, and a token contract that bridges JS theme tokens with CSS Modules.
- Safe adoption path: document first, pilot one low-risk route or component, guard newer features with `@supports` or feature detection, provide static/reduced-motion fallbacks, and verify across breakpoint and preference modes.
