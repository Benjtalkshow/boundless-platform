'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';

import { AppleIcon, GithubIcon, GoogleIcon } from './provider-icons';

type Provider = 'google' | 'apple' | 'github';

const PROVIDERS: { id: Provider; label: string; icon: typeof GoogleIcon }[] = [
  { id: 'google', label: 'Google', icon: GoogleIcon },
  { id: 'apple', label: 'Apple', icon: AppleIcon },
  { id: 'github', label: 'Github', icon: GithubIcon },
];

interface SocialAuthButtonsProps {
  /** Verb shown in each button, e.g. "Sign up" or "Sign in". */
  verb?: string;
  /** Where to land after the provider round-trip. */
  callbackURL?: string;
}

/** Google / Apple / Github OAuth buttons wired to better-auth social sign-in. */
export function SocialAuthButtons({
  verb = 'Sign up',
  callbackURL = '/dashboard',
}: SocialAuthButtonsProps) {
  const [pending, setPending] = useState<Provider | null>(null);

  async function handleSocial(provider: Provider) {
    setPending(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    if (error) {
      toast.error(
        error.message ?? `Could not continue with ${provider}. Try again.`
      );
      setPending(null);
    }
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      {PROVIDERS.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          type='button'
          intent='secondary'
          appearance='outline'
          shape='pill'
          className='w-full border-[#2e3a38] text-white/90'
          loading={pending === id}
          disabled={pending !== null}
          onClick={() => handleSocial(id)}
        >
          <Icon className='size-5' />
          {verb} with {label}
        </Button>
      ))}
    </div>
  );
}
