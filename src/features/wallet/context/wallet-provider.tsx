'use client';

import {
  getAddress,
  getNetwork,
  isConnected as freighterIsConnected,
  requestAccess,
  WatchWalletChanges,
} from '@stellar/freighter-api';
import { createContext, type ReactNode, useEffect, useState } from 'react';

interface WalletContextValue {
  /** Connected Stellar G-address, or null when no wallet is linked. */
  address: string | null;
  /** Wallet's current network label (e.g. "TESTNET", "PUBLIC"). */
  network: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

/**
 * Wallet connection state, intentionally decoupled from auth. It only knows how
 * to link a Stellar wallet and expose its address; sign-in, sessions, and
 * transaction building live elsewhere. This is the seam that kept v1's wallet
 * logic from collapsing into the auth monolith. Multi-wallet support (e.g.
 * stellar-wallets-kit) can replace the Freighter calls without touching
 * consumers.
 */
export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Silently restore a previously authorized connection (no extension prompt).
  useEffect(() => {
    let active = true;
    void (async () => {
      const connected = await freighterIsConnected();
      if (!active || !connected.isConnected) return;
      const restored = await getAddress();
      if (!active || restored.error || !restored.address) return;
      setAddress(restored.address);
      const net = await getNetwork();
      if (active && !net.error) setNetwork(net.network);
    })();
    return () => {
      active = false;
    };
  }, []);

  // Track in-wallet account / network switches while connected.
  useEffect(() => {
    if (!address) return;
    const watcher = new WatchWalletChanges(3000);
    watcher.watch(({ address: nextAddress, network: nextNetwork }) => {
      setAddress(nextAddress || null);
      setNetwork(nextNetwork || null);
    });
    return () => watcher.stop();
  }, [address]);

  async function connect() {
    setIsConnecting(true);
    setError(null);
    try {
      const access = await requestAccess();
      if (access.error) {
        setError(access.error.message || 'Wallet connection was rejected.');
        return;
      }
      setAddress(access.address);
      const net = await getNetwork();
      if (!net.error) setNetwork(net.network);
    } finally {
      setIsConnecting(false);
    }
  }

  function disconnect() {
    // Freighter exposes no programmatic disconnect; dropping the local
    // reference is how the app ends the wallet session.
    setAddress(null);
    setNetwork(null);
    setError(null);
  }

  const value: WalletContextValue = {
    address,
    network,
    isConnected: Boolean(address),
    isConnecting,
    error,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export { WalletContext };
export type { WalletContextValue };
