import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

/**
 * A QueryClient with retries and caching disabled so hook tests resolve
 * deterministically and error states surface on the first attempt. Build a
 * fresh one per test to keep cache state from leaking between cases.
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

/**
 * Wrapper that provides a fresh test QueryClient. Pass to `renderHook`/`render`
 * as `{ wrapper: createQueryWrapper() }` when testing feature hooks.
 */
export function createQueryWrapper() {
  const client = createTestQueryClient();
  return function QueryWrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
}
