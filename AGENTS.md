<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Working in this repo

Read [ARCHITECTURE.md](./ARCHITECTURE.md) before changing structure, and
[CONTRIBUTING.md](./CONTRIBUTING.md) for the commit and PR workflow. This app is
feature-first: a domain feature is a `src/features/<name>/` folder, exposed
through its `index.ts`.

## Hard rules

- **Generated types.** REST types come from the backend OpenAPI spec. Never
  hand-write API types; run `npm run codegen` and derive from the generated
  schema. Do not edit `src/lib/api/generated/`.
- **One API client.** Call the backend through `@/lib/api` (`apiClient` +
  `unwrapData`). The envelope unwrap and error normalization live there.
- **Validated env.** Import `env` from `@/lib/env`; never read `process.env`
  directly. `next.config.ts` validates env at load.
- **Feature boundaries.** Import features via their `index.ts`, not internals.
- **Auth.** The backend (`boundless-nestjs`, the source of truth) is the
  better-auth server; this app ships only the client (`@/lib/auth`). Route
  gating lives in `proxy.ts` (Next 16 renamed `middleware`).
- **Stellar.** Never follow Horizon `_links`; build calls from the configured
  server only.
- **UI primitives.** Build interactive UI from the shadcn components in
  `src/components/ui` (`Button`, `Input`, `Select`, `Checkbox`, `Dialog`, etc.),
  customized to our design system via cva variants/props and `className`.
  `Button` is the Boundless button system: compose `intent` (primary | secondary
  | white | destructive) x `appearance` (solid | outline | text) x `size` (small
  | large) x `shape` (rounded | pill), plus `iconOnly` and `loading`. Anything
  that reads as an action button uses `Button`; do not hand-roll a raw
  `<button>`/`<input>`/`<select>` when a primitive exists. Bespoke menu/combobox/
  disclosure triggers and compact nav icon affordances that do not fit the
  action-button system may stay semantic `<button>`s with their own layout.
- **House style.** No em dashes in code, comments, or copy.

## Before finishing a change

```bash
npm run typecheck && npm run lint && npm run test
```

Run `npm run build` as well when you touch config (`next.config.ts`, env,
Sentry, Tailwind).
