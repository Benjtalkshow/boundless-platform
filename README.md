# Boundless Platform

The v2 web app for Boundless: hackathons, bounties, grants, and crowdfunding for
builders on Stellar and the communities that back them. Built on Next.js 16 with
a typed REST layer generated from the `boundless-nestjs` backend's OpenAPI spec.

> New here? Read [ARCHITECTURE.md](./ARCHITECTURE.md) for the feature-first
> convention, then [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

## Stack

- Next.js 16 (App Router, Turbopack, React Compiler) and React 19
- TanStack Query v5 for server state
- `openapi-typescript` + `openapi-fetch` for a typed REST client
- better-auth client (the backend is the better-auth server)
- Tailwind v4 and shadcn/ui (new-york) for the design system
- `@t3-oss/env-nextjs` + zod for validated environment access
- Stellar SDK + Freighter for wallet support
- Sentry and Vercel Analytics for observability
- Vitest + React Testing Library + MSW (unit/component), Playwright (e2e)

## Prerequisites

- Node `>=20.9` (see [.nvmrc](./.nvmrc))
- npm
- The `boundless-nestjs` backend on `http://localhost:8000` for live data and
  for `codegen` (not required for typecheck, lint, test, or build)

## Getting started

```bash
npm ci
cp .env.example .env.local   # then fill in BACKEND_URL and STELLAR_HORIZON_URL
npm run dev                  # http://localhost:3000
```

To regenerate the API types against a running backend:

```bash
npm run codegen
```

## Environment

All environment access goes through [`src/lib/env.ts`](./src/lib/env.ts), which
validates variables with zod at load time. Import `env` from there; never read
`process.env` directly. A misconfigured deploy fails the build instead of
failing at runtime. See [.env.example](./.env.example) for the documented
variables.

## Scripts

| Script                     | Purpose                                            |
| -------------------------- | -------------------------------------------------- |
| `npm run dev`              | Start the dev server (Turbopack)                   |
| `npm run build`            | Production build                                   |
| `npm run start`            | Serve the production build                         |
| `npm run typecheck`        | `tsc --noEmit`                                     |
| `npm run lint`             | ESLint (Next 16 build no longer lints)             |
| `npm run format`           | Prettier write                                     |
| `npm run test`             | Vitest unit and component tests                    |
| `npm run test:watch`       | Vitest in watch mode                               |
| `npm run test:e2e`         | Playwright end-to-end tests                        |
| `npm run codegen`          | Regenerate API types from the live backend OpenAPI |
| `npm run codegen:snapshot` | Regenerate API types from `openapi.snapshot.json`  |

## API types (codegen)

The backend is the source of truth for REST types and wraps every response in a
`{ success, data, meta }` envelope. `npm run codegen` regenerates
[`src/lib/api/generated/schema.d.ts`](./src/lib/api/generated/schema.d.ts) from
the live OpenAPI document (defaults to `http://localhost:8000/openapi.json`,
override with `OPENAPI_URL`). The generated file and a committed
`openapi.snapshot.json` keep typecheck and CI working without a running backend.
Do not edit generated files by hand.

## Testing

- `npm run test`: Vitest in jsdom, with MSW intercepting network calls.
- `npm run test:e2e`: Playwright. Specs live in [`e2e/`](./e2e); Playwright
  boots the app itself.

## Deployment

Deploys to Vercel. CI (GitHub Actions) runs typecheck, lint, test, and build on
every push and pull request, plus a Playwright e2e job.
