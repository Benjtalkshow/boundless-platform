import { type DefaultOptions, QueryClient } from '@tanstack/react-query';

import { ApiError } from './client';

const RETRYABLE_ATTEMPTS = 2;

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Client errors (4xx) are deterministic, so retrying wastes a round trip.
      if (
        error instanceof ApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        return false;
      }
      return failureCount < RETRYABLE_ATTEMPTS;
    },
  },
  mutations: {
    retry: false,
  },
};

export function makeQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions });
}

let browserQueryClient: QueryClient | undefined;

/**
 * A fresh QueryClient per server request, a singleton in the browser. The
 * provider (and any future server prefetch) should call this rather than
 * constructing a QueryClient directly.
 */
export function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
