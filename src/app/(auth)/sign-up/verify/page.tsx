import type { Metadata } from 'next';

import { AuthCard, OtpVerifyForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Verify your email' };

export default async function SignUpVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = '' } = await searchParams;

  return (
    <AuthCard
      variant='sectioned'
      title='We emailed you a code'
      subtitle={
        <>
          Enter the verification code sent to{' '}
          <span className='text-white underline'>{email || 'your email'}</span>
        </>
      }
    >
      <OtpVerifyForm
        email={email}
        confirmLabel='Confirm Email'
        backHref='/sign-up/email'
        mode='sign-in'
      />
    </AuthCard>
  );
}
