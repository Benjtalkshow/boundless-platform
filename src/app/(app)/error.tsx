'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

// `unstable_retry` is the Next 16.2 segment-recovery API: it re-fetches and
// re-renders this boundary's children, unlike `reset` which only clears state.
export default function AppError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center'>
      <h2 className='text-lg font-semibold'>Something went wrong</h2>
      <p className='max-w-sm text-sm text-muted-foreground'>
        {error.digest
          ? `Reference: ${error.digest}`
          : 'An unexpected error occurred. Please try again.'}
      </p>
      <Button onClick={() => unstable_retry()}>Try again</Button>
    </div>
  );
}
