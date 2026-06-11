'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ProfileSetupModal, RoleGateModal } from '@/features/onboarding';

export default function OnboardingPreview() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <main className='grid min-h-dvh place-items-center bg-ink p-10'>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Button shape='pill' onClick={() => setProfileOpen(true)}>
          Profile set up
        </Button>
        <Button shape='pill' onClick={() => setRoleOpen(true)}>
          Complete Sign up
        </Button>
      </div>

      <ProfileSetupModal
        open={profileOpen}
        onOpenChange={setProfileOpen}
        onSubmit={() => setProfileOpen(false)}
      />
      <RoleGateModal
        open={roleOpen}
        onOpenChange={setRoleOpen}
        onContinue={() => setRoleOpen(false)}
        onGoBack={() => setRoleOpen(false)}
      />
    </main>
  );
}
