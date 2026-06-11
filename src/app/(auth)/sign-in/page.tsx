import { Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  AuthCard,
  AuthFooterPill,
  OrDivider,
  safeRedirect,
  SocialAuthButtons,
} from '@/features/auth';

export const metadata: Metadata = { title: 'Sign in' };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const target = safeRedirect(redirect);
  const emailHref =
    target === '/dashboard'
      ? '/sign-in/email'
      : `/sign-in/email?redirect=${encodeURIComponent(target)}`;

  return (
    <>
      <AuthCard title='Log into your account'>
        <div className='flex w-full flex-col gap-4'>
          <Button asChild intent='primary' shape='pill' className='w-full'>
            <Link href={emailHref}>
              <Mail className='size-5' />
              Sign in with your email
            </Link>
          </Button>
          <OrDivider />
          <SocialAuthButtons verb='Sign in' callbackURL={target} />
        </div>
      </AuthCard>
      <AuthFooterPill
        prompt="Don't have an account?"
        actionLabel='Sign up'
        href='/sign-up'
      />
    </>
  );
}
