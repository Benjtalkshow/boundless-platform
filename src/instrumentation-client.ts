import * as Sentry from '@sentry/nextjs';

import { env } from '@/lib/env';

// `process.env.NODE_ENV` (not `env.NODE_ENV`) on purpose: it is inlined by Next
// in the browser bundle, whereas `env.NODE_ENV` is a server-only key and would
// throw if read on the client.
if (env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.1,
    enableLogs: true,
  });
}

// Instruments client-side router navigations for performance tracing.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
