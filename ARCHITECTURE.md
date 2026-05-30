# Architecture

This app is **feature-first**. Routes stay thin and all domain logic lives in
self-contained feature modules. The one rule to internalize:

> **Adding a domain feature means adding a `src/features/<name>/` folder.**
> It does not mean threading logic through `app/`, `components/`, and `lib/`.

## Layout

```
src/
  app/                  # routes only: thin server components that compose features
    (app)/              # authenticated shell (layout, error, loading)
    layout.tsx          # root layout, wires <Providers>
    page.tsx            # public landing
    globals.css         # Tailwind v4 @theme tokens
  features/             # one folder per domain (the core convention)
    auth/               # better-auth wrappers + useAuth
    users/              # current-user query hook + types
    wallet/             # Freighter wallet provider + useWallet
  components/
    ui/                 # shadcn primitives (generated, themeable)
    layout/             # nav, shells
  lib/
    api/                # typed REST client (see below)
      generated/        # openapi-typescript output, do not edit
      client.ts         # openapi-fetch instance + envelope-unwrap middleware
      query-client.ts   # TanStack QueryClient defaults
    auth/               # better-auth client + shared constants
    stellar/            # network config derived from validated env
    env.ts              # @t3-oss/env-nextjs validated environment
    logger.ts, utils.ts
  providers/            # the small client provider tree
  test/                 # vitest setup, MSW handlers, test utilities
  proxy.ts              # Next 16 middleware: gates protected routes
  instrumentation*.ts   # Sentry server/client init
e2e/                    # Playwright specs
```

## Anatomy of a feature

A feature folder uses a consistent internal shape and exposes a single public
surface through `index.ts`. Import features by their folder, never by reaching
into their internals.

```
features/<name>/
  api/         # TanStack Query/mutation hooks built on the typed API client
  components/  # feature-scoped UI
  hooks/       # feature-scoped hooks
  types.ts     # types, derived from generated schema where possible
  utils/
  index.ts     # the ONLY public surface; re-export what other code may use
```

```ts
// good: consume the public surface
import { useCurrentUser } from '@/features/users';

// avoid: reaching past the boundary
import { useCurrentUser } from '@/features/users/api/use-current-user';
```

## Data and API layer

The backend (`boundless-nestjs`) is the source of truth. Types are generated,
never hand-written.

1. **Generate types.** `npm run codegen` writes `lib/api/generated/schema.d.ts`
   from the live OpenAPI document. The file is committed so CI needs no backend.
2. **One typed client.** `lib/api/client.ts` is an `openapi-fetch` instance with
   middleware that unwraps the backend's `{ success, data, meta }` envelope, so
   hooks see only `data`. It also normalizes errors into `ApiError` (status,
   field errors, request id) and stashes `meta` (pagination, request id).
3. **Thin per-feature hooks.** Each feature's `api/` folder holds short Query and
   mutation hooks that call the client and `unwrapData`. No giant API modules.

```ts
export function useCurrentUser() {
  return useQuery({
    queryKey: usersKeys.me(),
    queryFn: async (): Promise<User> =>
      unwrapData<User>(await apiClient.GET('/api/users/me')),
  });
}
```

## State

- **Server state**: TanStack Query. Defaults live in `lib/api/query-client.ts`
  (sane stale time, no refetch on focus, no retry on 4xx).
- **Client/UI state**: keep it local or in feature hooks. Introduce a shared
  global store only when genuinely cross-feature UI state demands it.

## Auth

The backend is the better-auth server; this app ships only the client.

- `lib/auth/client.ts` configures the better-auth React client with the plugins
  the backend exposes. `useSession` is a reactive store, so no React provider is
  needed for session state.
- `proxy.ts` (Next 16 middleware) gates protected routes with an optimistic
  session-cookie presence check and redirects to sign-in, preserving the
  intended destination via a `redirect` query param.
- Requests reach the backend through a same-origin `/api` rewrite
  (`next.config.ts`), which keeps better-auth httpOnly cookies first-party.

## Environment

`lib/env.ts` validates all environment variables with zod at load time. Import
`env`; never touch `process.env` directly. `next.config.ts` imports it so a bad
config fails the build.

## Stellar and wallet

`lib/stellar/` derives network config (passphrase, network) from validated env
and stays provider-portable. The wallet is a feature (`features/wallet/`) with a
context provider decoupled from auth. Per the infra setup, code must never
follow Horizon `_links`; build calls from the configured server only.

## Observability

`instrumentation.ts` and `instrumentation-client.ts` initialize Sentry; config
files sit alongside. `next.config.ts` wraps the config with `withSentryConfig`,
and source-map upload happens only when Sentry credentials are present (CI and
deploys). `lib/logger.ts` is the structured logging entry point.

## Testing

- **Unit and component**: Vitest in jsdom with React Testing Library. MSW mocks
  the network (`src/test/msw/`). See `src/test/utils.tsx` for the Query wrapper.
- **End to end**: Playwright in `e2e/`. The two runners never overlap: Vitest
  owns `src/**`, Playwright owns `e2e/`.

## Backend dependencies

`bounties` and `grants` are product pillars that are not yet exposed over REST
by the backend, so they have no feature folder here yet. They are blocked on
backend endpoints, not on this foundation.
