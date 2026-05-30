import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_COOKIE_PREFIX } from '@/lib/auth/config';

/**
 * Next 16 request interceptor (the file formerly known as `middleware.ts`).
 * Not to be confused with the backend rewrite proxy in `next.config.ts`; this
 * only gates page navigations by session presence.
 *
 * Routes under these prefixes require a signed-in session. Everything else
 * (landing, public hackathon/campaign pages, the auth screens) stays open.
 */
const PROTECTED_PREFIXES = ['/dashboard'];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isProtected(pathname)) return NextResponse.next();

  // Optimistic, presence-only check. The cookie is httpOnly and signed, so it
  // is neither readable nor verifiable here; the backend re-validates it on
  // every API call. This only stops signed-out visitors from seeing protected
  // UI flash before that check.
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: AUTH_COOKIE_PREFIX,
  });
  if (sessionCookie) return NextResponse.next();

  const signInUrl = new URL('/sign-in', request.url);
  signInUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  // Skip the API rewrite proxy, Next internals, and static assets; gate only
  // page routes.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
