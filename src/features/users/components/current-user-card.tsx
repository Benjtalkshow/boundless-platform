'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ApiError } from '@/lib/api';

import { useCurrentUser } from '../api/use-current-user';

/**
 * Smoke-slice surface: proves the typed client, envelope unwrap, and TanStack
 * Query render path end to end against `GET /api/users/me`.
 *
 * Branch on `query` directly instead of destructuring so TypeScript keeps the
 * react-query discriminated union intact and narrows `query.data` to `User`
 * under `isSuccess`.
 */
export function CurrentUserCard() {
  const query = useCurrentUser();

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Your profile</CardTitle>
        <CardDescription>
          Live data from the backend, loaded through the typed API client.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {query.isPending ? (
          <p className='text-sm text-muted-foreground'>
            Loading your profile...
          </p>
        ) : query.isError ? (
          <div className='flex flex-col items-start gap-3'>
            <p className='text-sm text-destructive'>
              {query.error instanceof ApiError
                ? query.error.message
                : 'Could not load your profile.'}
            </p>
            <Button size='sm' variant='outline' onClick={() => query.refetch()}>
              Try again
            </Button>
          </div>
        ) : query.isSuccess ? (
          <dl className='grid gap-3 text-sm'>
            <div className='grid gap-0.5'>
              <dt className='text-muted-foreground'>Name</dt>
              <dd className='font-medium'>{query.data.name}</dd>
            </div>
            <div className='grid gap-0.5'>
              <dt className='text-muted-foreground'>Email</dt>
              <dd className='font-medium'>{query.data.email}</dd>
            </div>
          </dl>
        ) : null}
      </CardContent>
    </Card>
  );
}
