import type { ReactNode } from 'react';

import { AppNav } from '@/components/layout/app-nav';

/**
 * Authenticated shell. `proxy.ts` already gates these routes by session
 * presence, so this layout assumes a signed-in visitor.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-full flex-col'>
      <AppNav />
      <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8'>
        {children}
      </main>
    </div>
  );
}
