/**
 * Returns `path` only when it is a safe same-origin destination, otherwise the
 * fallback. Guards against open redirects: rejects absolute URLs and
 * protocol-relative (`//host`) or backslash (`/\host`) paths that browsers may
 * treat as cross-origin.
 */
export function safeRedirect(
  path: string | null | undefined,
  fallback = '/dashboard'
): string {
  if (!path || !path.startsWith('/')) return fallback;
  if (path.startsWith('//') || path.startsWith('/\\')) return fallback;
  return path;
}
