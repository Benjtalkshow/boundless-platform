'use client';

import { useSession } from '@/lib/auth';

/**
 * App-shaped view of the current auth state.
 *
 * No context provider is needed: better-auth keeps the session in a global
 * reactive store, so any client component can call this directly. This stays a
 * thin projection over `useSession` on purpose, unlike the monolithic v1 auth
 * provider it replaces.
 */
export function useAuth() {
  const { data, isPending, error, refetch } = useSession();

  return {
    user: data?.user ?? null,
    session: data?.session ?? null,
    isAuthenticated: Boolean(data?.user),
    isPending,
    error,
    refetch,
  };
}
