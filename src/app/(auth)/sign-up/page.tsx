import { Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  AuthCard,
  AuthFooterPill,
  OrDivider,
  SocialAuthButtons,
} from '@/features/auth';

export const metadata: Metadata = { title: 'Create your account' };

export default function SignUpPage() {
  return (
    <>
      <AuthCard title='Create your account'>
        <div className='flex w-full flex-col gap-4'>
          <Button asChild intent='primary' shape='pill' className='w-full'>
            <Link href='/sign-up/email'>
              <Mail className='size-5' />
              Sign up with your email
            </Link>
          </Button>
          <OrDivider />
          <SocialAuthButtons verb='Sign up' />
        </div>
      </AuthCard>
      <AuthFooterPill
        prompt='Already have an account?'
        actionLabel='Sign In'
        href='/sign-in'
      />
    </>
  );
}
