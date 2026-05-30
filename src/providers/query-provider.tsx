'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

import { getQueryClient } from '@/lib/api';

export function QueryProvider({ children }: { children: ReactNode }) {
  // Per-request client on the server, a stable singleton in the browser, so
  // cache state survives re-renders without leaking across requests.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
