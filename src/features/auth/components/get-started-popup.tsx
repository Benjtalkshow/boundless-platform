'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { GetStartedModal } from '@/features/marketing';

import { useAuth } from '../hooks/use-auth';

const DELAY_MS = 45_000;
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const COOLDOWN_KEY = 'boundless:getStartedLastShown';

/** Auth, app and utility surfaces where the popup must never appear. */
const BLOCKED_PREFIXES = [
  '/sign-in',
  '/sign-up',
  '/reset-password',
  '/dashboard',
  '/organizations',
];

function isBlockedPath(pathname: string | null): boolean {
  if (!pathname) return true;
  if (pathname.includes('-preview')) return true;
  return BLOCKED_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function onCooldown(): boolean {
  try {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) ?? 0);
    return Date.now() - last < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function stampCooldown() {
  try {
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
  } catch {
    // ignore storage failures
  }
}

/**
 * Nudges guests to register: after ~45s on an allowed page it opens the
 * get-started modal, then stays quiet for 7 days. Never shown to authenticated
 * users or on auth / app / preview routes. The timer resets on navigation
 * between allowed pages.
 */
export function GetStartedPopup() {
  const { isAuthenticated, isPending } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const eligible = !isPending && !isAuthenticated && !isBlockedPath(pathname);

  React.useEffect(() => {
    if (!eligible || open || onCooldown()) return;
    const timer = setTimeout(() => {
      stampCooldown();
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(timer);
    // Restart the timer when the route changes within allowed pages.
  }, [eligible, pathname, open]);

  return (
    <GetStartedModal
      open={open && eligible}
      onOpenChange={setOpen}
      onGetStarted={() => {
        setOpen(false);
        router.push('/sign-up');
      }}
    />
  );
}
