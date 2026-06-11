import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AuthCard, ResetPasswordNewForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Set a new password' };

export default async function ResetPasswordNewPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = '' } = await searchParams;
  if (!email) redirect('/reset-password');

  return (
    <AuthCard
      title='Set a new password'
      subtitle='Choose a strong password you have not used before.'
    >
      <ResetPasswordNewForm email={email} />
    </AuthCard>
  );
}
