import * as Sentry from '@sentry/nextjs';

type LogContext = Record<string, unknown>;

const isDev = process.env.NODE_ENV === 'development';

/**
 * Thin structured logger. Console output everywhere; warnings and errors also
 * flow to Sentry. When no Sentry DSN is configured the capture calls are safe
 * no-ops, so this is fine to call from any runtime.
 */
export const logger = {
  debug(message: string, context?: LogContext) {
    if (isDev) console.debug(message, context ?? '');
  },

  info(message: string, context?: LogContext) {
    console.info(message, context ?? '');
  },

  warn(message: string, context?: LogContext) {
    console.warn(message, context ?? '');
    Sentry.captureMessage(message, { level: 'warning', extra: context });
  },

  error(message: string, error?: unknown, context?: LogContext) {
    console.error(message, error ?? '', context ?? '');
    Sentry.captureException(error ?? new Error(message), {
      extra: { message, ...context },
    });
  },
};
