import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Validated, typed environment access for the whole app.
 * Server-only values are never exposed to the browser; only `NEXT_PUBLIC_*`
 * keys are. Import `env` instead of touching `process.env` directly.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    // Origin of the boundless-nestjs backend. Used server-side as the
    // destination of the same-origin `/api` rewrite proxy so better-auth
    // httpOnly cookies stay first-party.
    BACKEND_URL: z.url(),

    // Managed Stellar Horizon endpoint. The full value is a secret (it
    // identifies the managed provider/key) so it must stay server-side and
    // must never be logged or committed. Client Stellar reads go through the
    // backend, not this URL directly.
    STELLAR_HORIZON_URL: z.url(),
    STELLAR_SOROBAN_RPC_URL: z.url().optional(),

    // Sentry release/source-map upload happens at build time only.
    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
  },

  client: {
    // Same-origin base path the browser hits; rewritten to BACKEND_URL.
    NEXT_PUBLIC_API_BASE_PATH: z.string().default('/api'),

    // Canonical public URL of this app (absolute links, OG tags).
    NEXT_PUBLIC_APP_URL: z.url().optional(),

    // Stellar network selector. The passphrase is a public constant derived
    // from this in `lib/stellar`, so it is not a separate env var.
    NEXT_PUBLIC_STELLAR_NETWORK: z
      .enum(['TESTNET', 'PUBLIC'])
      .default('TESTNET'),

    // Sentry DSN is publishable (safe in the browser bundle).
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  },

  /**
   * Next.js only inlines `NEXT_PUBLIC_*` vars that are statically referenced,
   * so every client var must be listed here explicitly.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: process.env.BACKEND_URL,
    STELLAR_HORIZON_URL: process.env.STELLAR_HORIZON_URL,
    STELLAR_SOROBAN_RPC_URL: process.env.STELLAR_SOROBAN_RPC_URL,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    NEXT_PUBLIC_API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STELLAR_NETWORK: process.env.NEXT_PUBLIC_STELLAR_NETWORK,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },

  // Treat empty strings as "unset" so a blank line in .env doesn't pass a
  // required check with "".
  emptyStringAsUndefined: true,

  // Escape hatch for tooling steps (lint, codegen, Docker image builds) that
  // run without real secrets: `SKIP_ENV_VALIDATION=1`.
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === 'lint',
});
