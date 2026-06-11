import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AuthCard, AuthFooterPill, SignInEmailForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Sign in' };

export default function SignInEmailPage() {
  return (
    <>
      <AuthCard title='Log into your account'>
        {/* `SignInEmailForm` reads `useSearchParams`, which needs a Suspense
            boundary so the route can prerender without bailing out. */}
        <Suspense fallback={null}>
          <SignInEmailForm />
        </Suspense>
      </AuthCard>
      <AuthFooterPill
        prompt="Don't have an account?"
        actionLabel='Sign up'
        href='/sign-up'
      />
    </>
  );
}
