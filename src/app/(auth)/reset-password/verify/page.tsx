import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AuthCard, OtpVerifyForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Verify reset code' };

export default async function ResetPasswordVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = '' } = await searchParams;
  if (!email) redirect('/reset-password');

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
        confirmLabel='Continue'
        backHref='/reset-password'
        mode='reset'
      />
    </AuthCard>
  );
}
