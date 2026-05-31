'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrapData } from '@/lib/api';

import type { Dashboard } from '../types';

export const usersKeys = {
  all: ['users'] as const,
  me: () => [...usersKeys.all, 'me'] as const,
};

/**
 * Current user dashboard from `GET /api/users/me`. The `Dashboard` type is
 * derived from the generated schema, so it stays in sync with the backend on
 * every `npm run codegen`. `unwrapData` strips the `{ success, data, meta }`
 * envelope and throws a typed `ApiError` on failure.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: usersKeys.me(),
    queryFn: async (): Promise<Dashboard> =>
      unwrapData(await apiClient.GET('/api/users/me')),
  });
}
