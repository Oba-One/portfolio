# Modern CSS/Web UI Primitives

## Goal

Create an execution-ready backlog for adopting modern CSS and Web UI primitives in Portfolio without starting runtime implementation yet. The work should improve accessibility, scrolling behavior, and design-token consistency while preserving the current portfolio story refresh.

## Key Changes

- Text-scale readiness: audit the JS token system, rem conversion, large display type, project pages, nav, contact page, and mobile layouts before considering `meta name="text-scale" content="scale"`.
- CSS architecture: document how global SCSS, CSS Modules, JS theme tokens, custom media, and project case-study styles should share ownership before introducing cascade layers, scoped CSS, or new token conventions.
- Preference and native UI readiness: define `color-scheme`, `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, visible focus, and touch-target expectations; future overlays, menus, and tooltips should prefer native `<dialog>` or `popover` where component-library behavior is unnecessary.
- Viewport cleanup: replace future reliance on `width: 100vw`, `height: 100vh`, and `min-height: 100vh` with scrollbar-aware and dynamic viewport patterns such as `overflow-x: clip`, `100dvh`, `100svh`, or `100lvh` where validated.
- Scroll behavior: inventory `useScrollToHash`, `useParallax`, `ScrollRestore`, navbar scroll listeners, and project-page parallax to identify where CSS scroll spy, scroll-state queries, or awaited programmatic scroll can reduce JavaScript.
- Motion modernization: compare current Framer Motion route/page transitions with progressive View Transitions, keeping reduced-motion behavior and existing visual continuity as acceptance criteria.
- Token consistency: document how `ThemeProvider` JS tokens, CSS custom properties, CSS Modules, and hardcoded page styles should relate before adding new project case-study styles.
- Layered UI readiness: no immediate overlay work is required, but future dialogs, tooltips, and menus should prefer native `<dialog>` or `popover` where component-library behavior is unnecessary.
- Research only: keep HTML-in-Canvas, overscroll gestures, scoped View Transitions, CSS `@function`, CSS `if()`, `corner-shape`, and `fit-text` out of production scope until a specific Portfolio use case justifies a pilot.

## Validation

- Plan-only pass: confirm `git status --short --branch` before editing and keep the diff scoped to `.plans/**`.
- Run `git diff --check` after the plan files are added.
- Each future primitive promotion should capture regression risk, vulnerable surfaces, fallback behavior, proof required, existing abstraction fit, and reversibility before runtime work starts.
- Do not run `bun run lint`, `bun run build`, or Storybook validation for this pass because no runtime files should change and the checkout has unrelated active UI work.

## Assumptions

- Portfolio should use the lightweight TAS-style planning model rather than the heavier Green Goods or Coop plan-hub contracts.
- Backlog-first means this feature pack becomes the tracking surface for future CSS modernization, not an implementation batch.
- Existing Framer Motion and Three.js surfaces stay in place until a future task proves a modern browser primitive can replace or simplify them safely.
