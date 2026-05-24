---
name: Portfolio Design System
description: Lightweight design contract for the Afolabi portfolio site, grounded in the current Next.js, Storybook, SCSS, CSS Modules, Framer Motion, and Three.js implementation.
---

# Portfolio Design System

This site is a personal portfolio and case-study surface. It should feel precise, editorial, technical, and calm: the work is the signal, with motion and 3D used to deepen the story rather than decorate every section.

## Source Of Truth

- Runtime theme tokens live in `src/components/ThemeProvider/theme.js`.
- Global CSS ownership lives in `src/layouts/App/global.scss` and `src/layouts/App/reset.css`.
- Component and route styling lives in CSS Modules next to the component or page.
- Storybook is the visual review surface; use `bun run agentic:browser-proof` when UI, layout, motion, or public routes change.

## Token Rules

- Use `ThemeProvider` tokens for color, spacing, typography, motion duration, easing, and z-index before adding raw values.
- New project pages should reuse `src/pages/projects/CaseStudy.module.scss` and existing `layouts/Project` patterns before adding a new visual grammar.
- Raw hex, `rgba()`, `linear-gradient()`, `100vw`, `100vh`, raw radius, raw duration, and raw easing values are design-system risks. They are allowed only when captured in `scripts/data/design-token-baseline.tsv` with a reason.
- Metadata colors in `_document.page.js` are allowed because browser chrome cannot consume CSS variables reliably.

## Layout And Responsiveness

- Prefer scrollbar-safe sizing over `width: 100vw`.
- Prefer dynamic viewport units or content-driven sizing over `height: 100vh` and `min-height: 100vh` on mobile-sensitive sections.
- Keep focus states visible, touch targets large enough for coarse pointers, and text readable when browser text scaling increases.

## Motion And 3D

- Framer Motion and Three.js are part of the current identity, but new motion must honor reduced-motion behavior and should not be required to understand content.
- Prefer CSS/browser primitives when they replace custom scroll listeners or route animation code without losing accessibility.

## Validation

Run `bun run check:design-tokens` for UI/CSS changes. Run `bun run agentic:check` before handoff. Use `bun run agentic:browser-proof` for layout, route, Storybook, motion, 3D, or public-page changes.
