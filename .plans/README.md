# Portfolio Planning OS

Portfolio uses a lightweight planning surface modeled after TAS Hub. It is meant
to keep implementation plans reusable without adding lane files, queue scripts,
or tool-specific handoff choreography.

## Layout

- `features/<feature-slug>/spec.md` - execution-ready plan
- `features/<feature-slug>/context.md` - current state, constraints, notes
- `audits/YYYY-MM-DD-<slug>.md` - point-in-time audits and readiness reports
- `templates/feature/` - starter files for new feature folders

## Operating Rules

- Keep plan artifacts human-readable and reusable by future tools.
- Do not add `.todo.md` lane files, queue metadata, handoff branches, or package scripts unless the planning system is deliberately expanded later.
- Keep runtime component, CSS, content, and asset edits out of plan-only passes.
- When the worktree has active story or UI changes, preserve those files and scope plan updates to `.plans/**`.
