import type { Metadata } from 'next';

import { AuthCard, ResetPasswordNewForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Set a new password' };

export default async function ResetPasswordNewPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; otp?: string }>;
}) {
  const { email = '', otp = '' } = await searchParams;

  return (
    <AuthCard
      title='Set a new password'
      subtitle='Choose a strong password you have not used before.'
    >
      <ResetPasswordNewForm email={email} otp={otp} />
    </AuthCard>
  );
}
