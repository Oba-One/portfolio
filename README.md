# Personal portfolio

[![Site preview](/public/site-preview.webp)](https://afolabi.info)

My design portfolio to showcase my projects. Built with [Next.js](https://nextjs.org/). View the [live site](https://afolabi.info).

## Setup

Make sure you have Node.js `22.22.1` and Bun `1.3.10` installed. This repo uses the checked-in `bun.lock`, so use Bun for all package scripts and dependency installs.

```bash
bun install --frozen-lockfile
```

Once it's done, start the full local environment with:

```bash
bun run dev
```

That launches the Next site on `3201` and Storybook on `3202` through the
repo-native coordinator in `scripts/dev.mjs`. Press Ctrl-C to stop both.

To run only the Next site or only Storybook:

```bash
bun run dev:site
bun run storybook
```

To create a production build:

```bash
bun run build
```
