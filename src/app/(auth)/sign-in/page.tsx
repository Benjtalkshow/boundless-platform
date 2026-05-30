import type { Metadata } from 'next';
import { Suspense } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignInForm } from '@/features/auth';

export const metadata: Metadata = { title: 'Sign in' };

export default function SignInPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center px-6 py-16'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Welcome back. Sign in to continue to Boundless.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* `SignInForm` reads `useSearchParams`, which needs a Suspense
              boundary so the route can prerender without bailing out. */}
          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
