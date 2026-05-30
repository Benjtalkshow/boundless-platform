import { env } from '@/lib/env';

/** Stellar network the app targets. Public selector, safe in the browser. */
export type StellarNetwork = 'TESTNET' | 'PUBLIC';

export const STELLAR_NETWORK: StellarNetwork = env.NEXT_PUBLIC_STELLAR_NETWORK;

/**
 * Network passphrases are fixed, public constants. They are hardcoded here on
 * purpose so this module stays client-safe and does not pull the heavy
 * `@stellar/stellar-sdk` into the browser bundle just to read a string.
 */
export const NETWORK_PASSPHRASE: Record<StellarNetwork, string> = {
  TESTNET: 'Test SDF Network ; September 2015',
  PUBLIC: 'Public Global Stellar Network ; September 2015',
};

/** Passphrase for the active network, used when signing transactions. */
export const ACTIVE_NETWORK_PASSPHRASE = NETWORK_PASSPHRASE[STELLAR_NETWORK];

export const IS_MAINNET = STELLAR_NETWORK === 'PUBLIC';
