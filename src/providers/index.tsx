import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { WalletProvider } from '@/features/wallet';

import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

/**
 * The app's full provider tree, composed once and mounted in the root layout.
 * Deliberately small: there is no auth provider because better-auth keeps the
 * session in a global store. `Toaster` sits inside `ThemeProvider` because it
 * reads the active theme.
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
        <WalletProvider>{children}</WalletProvider>
      </QueryProvider>
      <Toaster />
    </ThemeProvider>
  );
}
