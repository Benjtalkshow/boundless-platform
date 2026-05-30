'use client';

import {
  adminClient,
  emailOTPClient,
  lastLoginMethodClient,
  magicLinkClient,
  organizationClient,
  twoFactorClient,
  usernameClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

/**
 * The better-auth React client. Pinned to the backend's 1.4.x line.
 *
 * No `baseURL` is set on purpose: in the browser better-auth infers the current
 * origin and calls `/api/auth/*`, which the Next rewrite proxies to the
 * backend. Keeping it same-origin means the httpOnly session cookie stays
 * first-party across preview and production domains. Setting an explicit
 * `baseURL` would pin auth to one host and break cookies on preview URLs.
 *
 * The plugin list mirrors the server plugins in boundless-nestjs `src/lib/auth`
 * so the client exposes correctly typed methods (e.g. `signIn.magicLink`,
 * `organization.*`, `twoFactor.*`). Deferred on purpose:
 *  - passkey: lives in `@better-auth/passkey`, admin-scoped, not installed here.
 *  - oneTap: needs a Google client id; wire it in once that config exists.
 *  - admin access-control roles: the server enforces them; the client can mirror
 *    the backend `ac`/roles later for typed permission checks.
 * The custom Stellar-signature login is a plain backend endpoint, so it goes
 * through `apiClient`, not a better-auth plugin.
 */
export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    twoFactorClient(),
    emailOTPClient(),
    magicLinkClient(),
    organizationClient(),
    adminClient(),
    lastLoginMethodClient(),
  ],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
