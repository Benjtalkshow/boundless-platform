'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useAuth } from '../hooks/use-auth';
import { GetStartedPopup } from './get-started-popup';
import { OnboardingGate } from './onboarding-gate';

interface RequireAuthOptions {
  /** Send the user to the sign-up choose-path instead of sign-in. */
  mode?: 'sign-in' | 'sign-up';
  /** Where to return after auth. Defaults to the current URL. */
  redirectTo?: string;
  /** Run when the user is already authenticated (the gated action). */
  onAuthed?: () => void;
}

interface AuthFlowContextValue {
  isAuthenticated: boolean;
  /**
   * Gate an action behind auth. If signed in, runs `onAuthed` and returns true.
   * Otherwise routes to sign-in / sign-up with a `redirect` back and returns
   * false.
   */
  requireAuth: (options?: RequireAuthOptions) => boolean;
}

const AuthFlowContext = React.createContext<AuthFlowContextValue | null>(null);

export function useAuthFlow() {
  const ctx = React.useContext(AuthFlowContext);
  if (!ctx) {
    throw new Error('useAuthFlow must be used within an AuthFlowProvider');
  }
  return ctx;
}

/**
 * App-wide auth orchestration: a single entry point for triggering auth from
 * anywhere (`requireAuth`), plus the post-auth onboarding gate and the
 * get-started popup for guests.
 */
export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const requireAuth = React.useCallback(
    (options: RequireAuthOptions = {}) => {
      if (isAuthenticated) {
        options.onAuthed?.();
        return true;
      }
      const current =
        options.redirectTo ??
        (typeof window !== 'undefined'
          ? `${window.location.pathname}${window.location.search}`
          : '/');
      const base = options.mode === 'sign-up' ? '/sign-up' : '/sign-in';
      router.push(`${base}?redirect=${encodeURIComponent(current)}`);
      return false;
    },
    [isAuthenticated, router]
  );

  const value = React.useMemo(
    () => ({ isAuthenticated, requireAuth }),
    [isAuthenticated, requireAuth]
  );

  return (
    <AuthFlowContext.Provider value={value}>
      {children}
      <OnboardingGate />
      <GetStartedPopup />
    </AuthFlowContext.Provider>
  );
}
