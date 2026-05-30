'use client';

import { useContext } from 'react';

import { WalletContext } from '../context/wallet-provider';

/** Access wallet connection state. Must be called under a `WalletProvider`. */
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider.');
  }
  return context;
}
