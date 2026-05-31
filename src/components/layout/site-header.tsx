'use client';

import { ChevronDownIcon, MenuIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { BoundlessLogo } from '@/components/layout/boundless-logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { headerMenus } from '@/config/marketing-nav';

type HeaderVariant = 'default' | 'content';

function NavDivider() {
  return <span aria-hidden className='h-6 w-px shrink-0 bg-white/15' />;
}

function CloseGlyph() {
  return (
    <svg
      viewBox='0 0 24 24'
      className='size-5'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      aria-hidden
    >
      <path d='M6 6l12 12M18 6L6 18' />
    </svg>
  );
}

/**
 * Search affordance for the content (blog) header. Rendered as a placeholder
 * until blog search ships; wire its handler then.
 */
function SearchButton() {
  return (
    <button
      type='button'
      aria-label='Search'
      className='inline-flex size-10 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white'
    >
      <SearchIcon className='size-5' />
    </button>
  );
}

/**
 * Center mega-menu nav (default header). Opens on hover with a short close
 * delay so the cursor can travel from a trigger to its panel, and still opens
 * on click and keyboard through the underlying menu.
 */
function MegaMenu() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenLabel(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenLabel(null), 120);
  };

  return (
    <nav className='flex items-center gap-1' aria-label='Primary'>
      {headerMenus.map(menu => (
        <DropdownMenu
          key={menu.label}
          open={openLabel === menu.label}
          onOpenChange={isOpen => setOpenLabel(isOpen ? menu.label : null)}
          modal={false}
        >
          <DropdownMenuTrigger
            onMouseEnter={() => openMenu(menu.label)}
            onMouseLeave={scheduleClose}
            className='group inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-white/70 transition-colors outline-none hover:text-white data-[state=open]:text-white'
          >
            {menu.label}
            <ChevronDownIcon className='size-4 transition-transform group-data-[state=open]:rotate-180' />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            sideOffset={12}
            onMouseEnter={() => openMenu(menu.label)}
            onMouseLeave={scheduleClose}
            className='w-80 rounded-2xl border-white/10 bg-ink p-2'
          >
            {menu.items.map(item => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className='w-full items-start gap-3 rounded-xl p-3 focus:bg-white/5'
                >
                  <Link href={item.href}>
                    <span className='grid size-10 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-brand'>
                      {Icon ? <Icon className='size-5' /> : null}
                    </span>
                    <span className='flex flex-col gap-0.5'>
                      <span className='text-sm font-semibold text-white'>
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className='text-xs text-white/50'>
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className='border-t border-white/5 bg-ink lg:hidden'>
      <div className='space-y-6 px-5 py-6'>
        {headerMenus.map(menu => (
          <div key={menu.label}>
            <p className='mb-2 text-xs font-medium tracking-wider text-white/40 uppercase'>
              {menu.label}
            </p>
            <div className='grid gap-1'>
              {menu.items.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className='flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5'
                  >
                    <span className='grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-brand'>
                      {Icon ? <Icon className='size-4' /> : null}
                    </span>
                    <span className='flex flex-col'>
                      <span className='text-sm font-medium text-white'>
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className='text-xs text-white/45'>
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        <div className='flex flex-col gap-2 pt-2'>
          <Button
            asChild
            variant='outline'
            className='rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white'
          >
            <Link href='/sign-in' onClick={onNavigate}>
              Login
            </Link>
          </Button>
          <Button asChild className='rounded-full'>
            <Link href='/sign-up' onClick={onNavigate}>
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Sticky marketing header. Two variants keyed off the route: the default header
 * carries the center mega-menu plus Login and Get Started; the content header
 * (blog) swaps in a search affordance and a Subscribe action.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const variant: HeaderVariant = (pathname ?? '').startsWith('/blog')
    ? 'content'
    : 'default';

  return (
    <header className='sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md'>
      <div className='mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-6 px-5 lg:px-[100px]'>
        <BoundlessLogo />

        {/* Desktop: nav and actions grouped on the right */}
        <div className='hidden items-center gap-6 lg:flex'>
          {variant === 'default' ? <MegaMenu /> : null}

          <div className='flex items-center gap-3'>
            {variant === 'content' ? <SearchButton /> : null}
            <NavDivider />
            {variant === 'content' ? (
              <>
                <Button
                  asChild
                  variant='ghost'
                  className='rounded-full text-white hover:bg-white/10 hover:text-white'
                >
                  <Link href='/sign-up'>Get Started</Link>
                </Button>
                {/* Newsletter subscribe; wire to the newsletter when it ships. */}
                <Button type='button' className='rounded-full'>
                  Subscribe
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant='ghost'
                  className='rounded-full text-white hover:bg-white/10 hover:text-white'
                >
                  <Link href='/sign-in'>Login</Link>
                </Button>
                <Button asChild className='rounded-full'>
                  <Link href='/sign-up'>Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile actions */}
        <div className='flex items-center gap-2 lg:hidden'>
          {variant === 'content' ? (
            <>
              <SearchButton />
              {/* Newsletter subscribe; wire to the newsletter when it ships. */}
              <Button type='button' size='sm' className='rounded-full'>
                Subscribe
              </Button>
            </>
          ) : (
            <>
              <Button asChild size='sm' className='rounded-full'>
                <Link href='/sign-up'>Get Started</Link>
              </Button>
              <button
                type='button'
                onClick={() => setOpen(value => !value)}
                className='inline-flex size-10 items-center justify-center rounded-full text-white'
                aria-label='Toggle menu'
                aria-expanded={open}
              >
                {open ? <CloseGlyph /> : <MenuIcon className='size-5' />}
              </button>
            </>
          )}
        </div>
      </div>

      {variant === 'default' && open ? (
        <MobileMenu onNavigate={() => setOpen(false)} />
      ) : null}
    </header>
  );
}
