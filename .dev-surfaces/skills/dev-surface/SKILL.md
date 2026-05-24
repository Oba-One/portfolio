---
name: dev-surface
description: Use when working in Portfolio and needing to start, reuse, open, inspect, validate, or clean up this repo's local development surfaces through the shared dev-surfaces workbench.
---

# Portfolio Dev Surface

Use the global workbench CLI instead of starting duplicate servers manually:

```sh
dev-surfaces status
dev-surfaces up portfolio
dev-surfaces open portfolio
dev-surfaces logs portfolio:<surface>
dev-surfaces down portfolio
```

Stable fallback path: `/Users/afo/Code/dev-surfaces/bin/dev-surfaces.js`.

## Surfaces

- `site`: Next site on `3201`
- `storybook`: Storybook on `3202`

## Validation Notes

- Use Bun scripts for local validation in this repo.
- Run the site and Storybook together when validating portfolio UI changes.
- The manifest pins the Node 22 mise path for both surfaces so Storybook and Next run consistently from agent sessions.
- After changing local port docs or dev scripts, run `dev-surfaces doctor`.

Never kill unknown port occupants. If a port is busy and not owned by dev-surfaces, report the PID/command and ask for direction.
