# Contributing

Thanks for working on Boundless Platform. This guide covers the workflow and the
checks that run before code lands.

## Setup

See [README.md](./README.md) for prerequisites and first-run steps. `npm ci`
also installs the Git hooks (via the `prepare` script).

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org),
enforced by commitlint (`commitlint.config.mjs`) in the `commit-msg` hook.

```
feat(wallet): add Freighter connect flow
fix(api): unwrap paginated meta on list responses
chore(deps): bump better-auth to 1.4.x
docs(architecture): clarify feature boundaries
```

Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `build`, `ci`.

## Git hooks

Installed with Husky and run automatically:

- **pre-commit**: `lint-staged` runs ESLint `--fix` and Prettier on staged files.
- **commit-msg**: commitlint validates the message.
- **pre-push**: `npm run typecheck`.

Do not bypass hooks (`--no-verify`). If a hook fails, fix the cause.

## Code style

ESLint (flat config) and Prettier own formatting and import order; import
sorting is auto-fixable. Run them yourself with:

```bash
npm run lint        # or: npm run lint:fix
npm run format
```

House style: no em dashes in code, comments, or copy.

## Adding a feature

Read [ARCHITECTURE.md](./ARCHITECTURE.md) first. In short:

1. Create `src/features/<name>/` with `api/`, `components/`, `hooks/`,
   `types.ts`, and an `index.ts` public surface.
2. Build data access as thin Query/mutation hooks in `api/` on top of the typed
   client (`@/lib/api`). Do not hand-write API types; run `npm run codegen` and
   derive types from the generated schema.
3. Export only the public surface from `index.ts`. Import features by their
   folder, not by reaching into their internals.
4. Keep routes in `src/app/` thin; they compose features.

## Testing

- Add Vitest unit or component tests next to the code (`*.test.ts(x)`). Use MSW
  for network calls; see `src/test/`.
- Add a Playwright spec in `e2e/` for user-facing flows worth guarding.
- Run `npm run test` (and `npm run test:e2e` when relevant) before pushing.

## Before you open a PR

Make sure these pass locally; CI runs the same checks plus the production build
and a Playwright e2e job.

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```
