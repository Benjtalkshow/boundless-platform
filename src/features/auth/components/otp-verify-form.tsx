'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth';

import { OtpInput } from './otp-input';

const OTP_LENGTH = 6;

interface OtpVerifyFormProps {
  /** Email the code was sent to, used to complete verification. */
  email: string;
  confirmLabel: string;
  backHref: string;
  /**
   * `sign-in` completes an email-OTP sign-in (used for both sign-up and
   * sign-in). `reset` verifies a password-reset code.
   */
  mode: 'sign-in' | 'reset';
  redirectTo?: string;
}

/** Verification-code entry with confirm / go-back actions. */
export function OtpVerifyForm({
  email,
  confirmLabel,
  backHref,
  mode,
  redirectTo = '/dashboard',
}: OtpVerifyFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [pending, setPending] = useState(false);
  const complete = otp.length === OTP_LENGTH;

  async function handleConfirm() {
    if (!complete) return;
    setPending(true);

    if (mode === 'sign-in') {
      const { error } = await authClient.signIn.emailOtp({ email, otp });
      if (error) {
        toast.error(error.message ?? 'Invalid or expired code. Try again.');
        setPending(false);
        return;
      }
      router.push(redirectTo);
      return;
    }

    // mode === 'reset': carry the verified code to the set-new-password step
    // via sessionStorage (not the URL) so the OTP never lands in history or a
    // referrer header. The next step reads and clears it.
    sessionStorage.setItem(`boundless:resetOtp:${email}`, otp);
    router.push(`/reset-password/new?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className='flex w-full flex-col gap-8'>
      <OtpInput value={otp} onChange={setOtp} length={OTP_LENGTH} autoFocus />
      <div className='flex w-full flex-col gap-3'>
        <Button
          type='button'
          intent='primary'
          shape='pill'
          size='small'
          className='w-full'
          loading={pending}
          disabled={!complete}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
        <Button
          asChild
          intent='secondary'
          appearance='outline'
          shape='pill'
          size='small'
          className='w-full'
        >
          <Link href={backHref}>Go back</Link>
        </Button>
      </div>
    </div>
  );
}
