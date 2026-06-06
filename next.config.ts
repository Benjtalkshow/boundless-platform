import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

// Validate environment at config load so a misconfigured deploy fails the
// build instead of failing at runtime. Relative import: the `@/` alias is not
// available while Next is loading this file.
import { env } from './src/lib/env';

const nextConfig: NextConfig = {
  // Auto-memoize components/hooks (drops most manual useMemo/useCallback).
  // Runs via babel-plugin-react-compiler; Next limits it to relevant files.
  reactCompiler: true,
  allowedDevOrigins: ['172.20.10.2'],

  // Proxy the backend same-origin. The browser only ever calls `/api/*`, so
  // better-auth httpOnly cookies stay first-party (no cross-site cookies, no
  // CORS preflight). Array rewrites run AFTER filesystem routes, so any local
  // route handler under src/app/api/* still takes precedence.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

// Source-map upload runs only when SENTRY_ORG/PROJECT/AUTH_TOKEN are set (i.e.
// in CI/deploys); locally it is a no-op. Source maps upload after the Turbopack
// build completes. `excludeServerRoutes` is intentionally omitted (unsupported
// under Turbopack).
export default withSentryConfig(nextConfig, {
  org: env.SENTRY_ORG,
  project: env.SENTRY_PROJECT,
  authToken: env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
});
