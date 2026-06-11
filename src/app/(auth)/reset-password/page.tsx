import type { Metadata } from 'next';

import { AuthCard, ResetPasswordForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Reset password' };

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title='Reset password'
      subtitle="Enter your email and we'll send you a unique code to reset your password."
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
