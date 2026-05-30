import type { Metadata } from 'next';

import { CurrentUserCard } from '@/features/users';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Dashboard</h1>
        <p className='text-sm text-muted-foreground'>
          You are signed in. Here is your profile, loaded from the backend.
        </p>
      </div>
      <CurrentUserCard />
    </div>
  );
}
