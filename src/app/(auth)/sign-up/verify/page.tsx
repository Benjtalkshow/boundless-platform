import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AuthCard, OtpVerifyForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Verify your email' };

export default async function SignUpVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = '' } = await searchParams;
  if (!email) redirect('/sign-up/email');

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
