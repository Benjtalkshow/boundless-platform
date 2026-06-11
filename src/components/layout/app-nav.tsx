import {
  Book,
  ChevronDownIcon,
  Database,
  SearchIcon,
  UserRound,
  Wallet2,
} from 'lucide-react';
import Link from 'next/link';

import { BoundlessLogo } from '@/components/layout/boundless-logo';
import { SocialGlyph } from '@/components/layout/brand-icons';
import { PillButton } from '@/components/layout/pill-button';
import { formatCompact, formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

export type AppRole = 'contributor' | 'organizer' | 'judge';

interface AppNavProps {
  role?: AppRole;
  /** Authenticated session. When false the bar shows Sign in instead of the user menu. */
  signedIn?: boolean;
  /** Display name for the signed-in user. */
  userName?: string;
  /** Credit balance; rendered compact (e.g. 1500 -> "1.5K"). */
  credits?: number;
  /** Wallet balance in USD; rendered compact (e.g. 1_200_000 -> "$1.2M"). */
  wallet?: number;
}

type BadgeMeta = { label: string; color: string; bg: string };

const ROLE_META: Record<AppRole, BadgeMeta> = {
  contributor: {
    label: 'Contributor',
    color: '#21a879',
    bg: 'rgba(234,253,247,0.08)',
  },
  organizer: {
    label: 'organizer',
    color: '#ae7f01',
    bg: 'rgba(254,247,230,0.08)',
  },
  judge: { label: 'Judge', color: '#2a77b5', bg: 'rgba(254,247,230,0.08)' },
};

/** A public contributor browses as a generic Explorer until they sign in. */
const EXPLORER_META: BadgeMeta = {
  label: 'Explorer',
  color: '#ee138c',
  bg: 'rgba(228,87,165,0.08)',
};

function RoleBadge({ label, color, bg }: BadgeMeta) {
  return (
    <span
      className='flex items-center justify-center rounded-[12px] px-2 py-0.5 text-xs font-medium whitespace-nowrap'
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  );
}

function Avatar({
  variant,
  name,
}: {
  variant: 'photo' | 'explorer';
  name: string;
}) {
  if (variant === 'explorer') {
    return (
      <span className='grid size-6 shrink-0 place-items-center rounded-full bg-[#eafdf7]'>
        <UserRound className='size-3.5 text-ink' strokeWidth={2} aria-hidden />
      </span>
    );
  }
  return (
    <span className='grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-white bg-primary-700 text-[10px] font-semibold text-white'>
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

/** Left-side identity: avatar, name, role badge, and a menu chevron. */
function UserChip({
  name,
  badge,
  avatar,
}: {
  name: string;
  badge: BadgeMeta;
  avatar: 'photo' | 'explorer';
}) {
  return (
    <button
      type='button'
      aria-label='Account menu'
      className='flex shrink-0 items-center gap-2 outline-none'
    >
      <Avatar variant={avatar} name={name} />
      <span className='text-sm font-medium text-white'>{name}</span>
      <RoleBadge {...badge} />
      <ChevronDownIcon className='size-3.5 text-white/70' />
    </button>
  );
}

function KbdChip({ children, pill }: { children: string; pill?: boolean }) {
  return (
    <span
      className={cn(
        'flex items-center justify-center bg-white/[0.08] px-2 py-0.5 text-xs font-semibold text-[#8b8f97]',
        pill ? 'rounded-full' : 'rounded'
      )}
    >
      {children}
    </span>
  );
}

/** Full search field (desktop). On mobile this collapses to an icon button. */
function SearchField() {
  return (
    <button
      type='button'
      className='flex w-[200px] items-center gap-2 rounded-lg border border-[#1f2a28] py-1 pr-1 pl-2 text-left transition-colors outline-none hover:border-[#2e3a38]'
    >
      <SearchIcon className='size-4 shrink-0 text-[#72736f]' />
      <span className='flex-1 text-sm text-[#72736f]'>Search</span>
      <KbdChip>Ctrl + k</KbdChip>
    </button>
  );
}
function Credits({ value }: { value: number }) {
  return (
    <div
      className='flex shrink-0 items-center gap-2'
      title={formatNumber(value)}
    >
      <Database className='size-4 text-[#72736f]' aria-hidden />
      <KbdChip pill>{formatCompact(value)}</KbdChip>
    </div>
  );
}
function Wallet({
  value,
  showLabel = true,
}: {
  value: number;
  showLabel?: boolean;
}) {
  return (
    <div
      className='flex shrink-0 items-center gap-2'
      title={formatNumber(value, { currency: 'USD' })}
    >
      <Wallet2 className='size-4 text-[#72736f]' aria-hidden />
      {showLabel ? (
        <span className='text-sm font-medium text-[#72736f]'>Wallet</span>
      ) : null}
      <KbdChip pill>{formatCompact(value, { currency: 'USD' })}</KbdChip>
    </div>
  );
}

function Divider() {
  return <span aria-hidden className='h-6 w-px shrink-0 bg-white/10' />;
}

function IconButton({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type='button'
      aria-label={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center text-white/80 transition-colors hover:text-white',
        className
      )}
    >
      {children}
    </button>
  );
}

function AccountMenu({ name }: { name: string }) {
  return (
    <button
      type='button'
      aria-label='Account menu'
      className='flex shrink-0 items-center gap-2 outline-none'
    >
      <Avatar variant='photo' name={name} />
      <ChevronDownIcon className='size-3.5 text-white/70' />
    </button>
  );
}

/**
 * Top bar for the authenticated app shell. Adapts to the active role
 * (Contributor, organizer, Judge) and session state: signed-in members get the
 * search field, credit balance, role tools, and a user menu, while a public
 * visitor browses as an Explorer with a Sign in CTA. User data is placeholder
 * until auth lands; pass real values through props then.
 */
export function AppNav({
  role = 'organizer',
  signedIn = true,
  userName = 'davidemulo',
  credits = 28,
  wallet = 1_200_000,
}: AppNavProps) {
  const explorer = role === 'contributor' && !signedIn;
  const identity = explorer
    ? { name: 'Nova', badge: EXPLORER_META, avatar: 'explorer' as const }
    : { name: userName, badge: ROLE_META[role], avatar: 'photo' as const };

  // organizer always surfaces credits; members see them once signed in.
  const showCredits = role === 'organizer' || signedIn;
  const showWallet = role === 'organizer' || signedIn;
  const discord = (
    <SocialGlyph name='discord' className='size-4 text-[#5865f2]' />
  );

  return (
    <header className='sticky top-0 z-40 border-b border-[#1f2a28] bg-ink'>
      {/* Desktop */}
      <div className='hidden h-16 items-center justify-between px-8 lg:flex'>
        <div className='flex items-center gap-10'>
          <BoundlessLogo href='/dashboard' className='h-5' />
          <UserChip
            name={identity.name}
            badge={identity.badge}
            avatar={identity.avatar}
          />
        </div>

        <div className='flex items-center gap-5'>
          <SearchField />
          {showCredits ? <Credits value={credits} /> : null}
          {showWallet ? <Wallet value={wallet} /> : null}
          {signedIn && role === 'contributor' ? (
            <IconButton label='Documentation'>
              <Book className='size-4' />
            </IconButton>
          ) : null}
          {signedIn && role === 'organizer' ? (
            <IconButton label='Discord'>{discord}</IconButton>
          ) : null}
          <Divider />
          {signedIn ? (
            <AccountMenu name={identity.name} />
          ) : (
            <PillButton asChild>
              <Link href='/sign-in'>Sign in</Link>
            </PillButton>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className='flex flex-col gap-5 px-4 py-5 lg:hidden'>
        <div className='flex items-center justify-between'>
          <BoundlessLogo href='/dashboard' className='h-5' />
          <div className='flex items-center gap-4'>
            <IconButton label='Search'>
              <SearchIcon className='size-6' />
            </IconButton>
            {signedIn && (role === 'contributor' || role === 'organizer') ? (
              <IconButton label='Documentation'>
                <Book className='size-5' />
              </IconButton>
            ) : null}
            {signedIn && role === 'contributor' ? (
              <IconButton label='Discord'>
                <SocialGlyph name='discord' className='size-5 text-[#5865f2]' />
              </IconButton>
            ) : null}
            <Divider />
            {signedIn ? (
              <AccountMenu name={identity.name} />
            ) : (
              <PillButton asChild>
                <Link href='/sign-in'>Sign in</Link>
              </PillButton>
            )}
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <UserChip
            name={identity.name}
            badge={identity.badge}
            avatar={identity.avatar}
          />
          <Credits value={credits} />
          <Wallet value={wallet} showLabel={false} />
        </div>
      </div>
    </header>
  );
}
