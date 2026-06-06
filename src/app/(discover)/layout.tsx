import type { ReactNode } from 'react';

import { AppNav } from '@/components/layout/app-nav';
import { MotionProvider } from '@/components/motion-provider';
import { PillarTabs } from '@/features/discover';

/**
 * Shell for the discovery surface (explore plus the per-pillar views). Open to
 * both guests and members: `proxy.ts` does not list these paths under
 * PROTECTED_PREFIXES. Uses the shared app nav plus the pillar tab bar. The brand
 * surface is dark, so we scope `.dark` here like the public shell does.
 * `MotionProvider` scopes reduced-motion-aware animation to the whole surface.
 */
export default function DiscoverLayout({ children }: { children: ReactNode }) {
  return (
    <div className='dark flex min-h-screen flex-col bg-ink text-white'>
      <MotionProvider>
        <AppNav />
        <div className='w-full'>
          <PillarTabs />
        </div>
        <main className='mx-auto w-full flex-1 px-5 py-8 lg:px-8'>
          {children}
        </main>
      </MotionProvider>
    </div>
  );
}
