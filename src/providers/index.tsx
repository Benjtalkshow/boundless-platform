import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { AuthFlowProvider } from '@/features/auth';
import { WalletProvider } from '@/features/wallet';

import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

/**
 * The app's full provider tree, composed once and mounted in the root layout.
 * better-auth keeps the session in a global store, so there is no auth context;
 * `AuthFlowProvider` only orchestrates auth triggers, onboarding and the
 * get-started popup. `Toaster` sits inside `ThemeProvider` because it reads the
 * active theme.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <WalletProvider>
          <AuthFlowProvider>{children}</AuthFlowProvider>
        </WalletProvider>
      </QueryProvider>
      <Toaster />
    </ThemeProvider>
  );
}
