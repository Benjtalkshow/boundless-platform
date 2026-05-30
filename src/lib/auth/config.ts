/**
 * Runtime-agnostic auth constants. No React and no browser APIs, so this is
 * safe to import from `proxy.ts` (Node runtime) and from the client alike.
 */

/**
 * Must match the backend better-auth `cookiePrefix` (boundless-nestjs
 * `src/lib/auth`). The session cookie is therefore `boundless_auth.session_token`
 * (or `__Secure-boundless_auth.session_token` once served over HTTPS).
 */
export const AUTH_COOKIE_PREFIX = 'boundless_auth';

/**
 * better-auth mount path on the backend. The browser hits it same-origin and
 * the Next rewrite proxies it to the backend, keeping httpOnly cookies
 * first-party. This is also the client's default `basePath`.
 */
export const AUTH_BASE_PATH = '/api/auth';
