import type { Metadata } from 'next';

import { AuthCard, AuthFooterPill, SignUpEmailForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Sign up with your email' };

export default function SignUpEmailPage() {
  return (
    <>
      <AuthCard title='Sign up with your email'>
        <SignUpEmailForm />
      </AuthCard>
      <AuthFooterPill
        prompt='Already have an account?'
        actionLabel='Sign In'
        href='/sign-in'
      />
    </>
  );
}
