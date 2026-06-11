'use client';

import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

import { ProfileSetupModal, RoleGateModal } from '@/features/onboarding';
import { usersKeys } from '@/features/users';

import { useAuth } from '../hooks/use-auth';

const onboardedKey = (id: string) => `boundless:onboarded:${id}`;

function isOnboarded(id: string): boolean {
  try {
    return localStorage.getItem(onboardedKey(id)) === '1';
  } catch {
    return false;
  }
}

function markOnboarded(id: string) {
  try {
    localStorage.setItem(onboardedKey(id), '1');
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

/**
 * Shows the onboarding modals (role gate, then profile setup) to a signed-in
 * user who hasn't completed it. "Needs onboarding" is inferred from a missing
 * display name (fresh email-OTP signups), and the decision is remembered
 * per-user in localStorage so it never nags. Completing or dismissing marks it
 * done.
 */
export function OnboardingGate() {
  const { isAuthenticated, isPending, user } = useAuth();
  const queryClient = useQueryClient();
  const [step, setStep] = React.useState<'role' | 'profile' | null>(null);
  const [startedFor, setStartedFor] = React.useState<string | null>(null);

  const userId = user?.id ?? null;
  const needsOnboarding =
    isAuthenticated &&
    !isPending &&
    !!userId &&
    !user?.name &&
    !isOnboarded(userId);

  // Open the flow once per user (render-time state sync, no effect).
  if (needsOnboarding && startedFor !== userId) {
    setStartedFor(userId);
    setStep('role');
  }
  // Reset when the user signs out.
  if (!isAuthenticated && startedFor !== null) {
    setStartedFor(null);
    setStep(null);
  }

  function complete() {
    if (userId) markOnboarded(userId);
    queryClient.invalidateQueries({ queryKey: usersKeys.all });
    setStep(null);
  }

  return (
    <>
      <RoleGateModal
        open={step === 'role'}
        onOpenChange={next => {
          if (!next) complete();
        }}
        onContinue={() => setStep('profile')}
        onGoBack={complete}
      />
      <ProfileSetupModal
        open={step === 'profile'}
        onOpenChange={next => {
          if (!next) complete();
        }}
        onSubmit={complete}
        onChangeAccountType={() => setStep('role')}
      />
    </>
  );
}
