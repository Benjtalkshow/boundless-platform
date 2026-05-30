'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrapData } from '@/lib/api';

import type { User } from '../types';

export const usersKeys = {
  all: ['users'] as const,
  me: () => [...usersKeys.all, 'me'] as const,
};

/**
 * Current authenticated user. `/api/users/me` has no `@ApiResponse` type on the
 * backend yet, so its generated response is untyped; the explicit `unwrapData<User>`
 * bridges it. Re-run `npm run codegen` once the endpoint is annotated, then the
 * type argument becomes redundant and can be dropped.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: usersKeys.me(),
    queryFn: async (): Promise<User> =>
      unwrapData<User>(await apiClient.GET('/api/users/me')),
  });
}
