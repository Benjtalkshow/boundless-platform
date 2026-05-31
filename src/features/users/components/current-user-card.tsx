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

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

/**
 * Smoke-slice surface: proves the typed client, envelope unwrap, and TanStack
 * Query render path end to end against `GET /api/users/me` (DashboardDto).
 *
 * Branch on `query` directly instead of destructuring so TypeScript keeps the
 * react-query discriminated union intact and narrows `query.data` to
 * `Dashboard` under `isSuccess`.
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
          <div className='grid gap-4'>
            <dl className='grid gap-3 text-sm'>
              <div className='grid gap-0.5'>
                <dt className='text-muted-foreground'>Email</dt>
                <dd className='font-medium'>{query.data.user.email}</dd>
              </div>
              <div className='grid gap-0.5'>
                <dt className='text-muted-foreground'>Role</dt>
                <dd className='font-medium capitalize'>
                  {query.data.user.role}
                </dd>
              </div>
              <div className='grid gap-0.5'>
                <dt className='text-muted-foreground'>Member since</dt>
                <dd className='font-medium'>
                  {dateFormatter.format(new Date(query.data.user.createdAt))}
                </dd>
              </div>
            </dl>
            <div className='grid grid-cols-3 gap-3 border-t pt-4 text-center'>
              <Stat label='Followers' value={query.data.stats.followers} />
              <Stat label='Following' value={query.data.stats.following} />
              <Stat label='Reputation' value={query.data.stats.reputation} />
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className='grid gap-0.5'>
      <span className='text-lg font-semibold'>{value}</span>
      <span className='text-xs text-muted-foreground'>{label}</span>
    </div>
  );
}
