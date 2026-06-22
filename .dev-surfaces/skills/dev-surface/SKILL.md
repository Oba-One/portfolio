---
name: portfolio-dev-surface
description: Use when working in Portfolio and needing the local Next site or Storybook.
---

# Portfolio Dev Surface

Inside this repo, use the repo-native command:

```sh
bun install
bun run dev
```

`bun run dev` runs `scripts/dev.mjs`, which starts the Next site and Storybook together, streams both logs, and cleans up on Ctrl-C.

Expected ports:

- `3201`: Next site
- `3202`: Storybook

Useful native commands:

```sh
bun run dev
bun run dev:site
bun run storybook
```

For cross-repo orchestration from anywhere, use the global workbench:

```sh
dev launch portfolio
dev launch portfolio:site
dev status portfolio
dev health portfolio
dev stop portfolio
```

Do not call `.dev-surfaces/run.mjs`; this repo should not have that wrapper.
