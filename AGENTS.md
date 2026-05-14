# AGENTS.md

Working agreements for AI coding agents in `portfolio`.

## Repo invariants

- Use Bun (`bun@1.3.10`), the checked-in `bun.lock`, and the project scripts already present in this repository. Do not reintroduce npm, yarn, or pnpm lockfiles unless the user explicitly asks for that package-manager change.
- Keep changes scoped to the user request and avoid broad dependency, workflow, or agent-config churn.

## Supply-chain and agent safety

- Do not install or upgrade npm, Python, or package-manager dependencies unless the user explicitly approves that install in the current task.
- Prefer existing repo tooling, checked-in lockfiles, and standard library options over adding new packages.
- Treat `package.json`, lockfiles, package-manager config, `.github/workflows/**`, `AGENTS.md`, `CLAUDE.md`, `.codex/**`, and `.claude/**` as security-sensitive surfaces. Call out any changes to them in final summaries.
- Keep dependency installs on the checked-in Bun lockfile path and preserve the repo's release-age gate configuration in `bunfig.toml`.

## Validation

Use the lightest honest validation that matches the touched surface. Do not run dependency installs or package upgrades unless the user explicitly approves them for the current task.
