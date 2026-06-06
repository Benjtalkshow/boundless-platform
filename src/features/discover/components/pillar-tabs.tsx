'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EXPLORE, PILLARS } from '@/config/pillars';
import { transitions } from '@/lib/motion';
import { cn } from '@/lib/utils';

const TABS = [
  { label: 'All', href: EXPLORE.href },
  ...PILLARS.map(pillar => ({ label: pillar.label, href: pillar.href })),
];

/**
 * Underline tab bar that switches between the discovery pillars. Every tab sits
 * on the default border; a shared-`layoutId` primary-400 underline slides to the
 * active route. A trailing spacer runs the line to the edge.
 */
export function PillarTabs({ className }: { className?: string }) {
  const pathname = usePathname() ?? '';

  return (
    <nav
      aria-label='Pillars'
      className={cn('flex items-center overflow-x-auto', className)}
    >
      {TABS.map(tab => {
        const active =
          pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'relative shrink-0 border-b border-[#2e3a38] px-4 pt-4 pb-[15px] text-sm font-medium whitespace-nowrap transition-colors',
              active
                ? 'text-primary-400'
                : 'text-[#808080] hover:text-foreground'
            )}
          >
            {tab.label}
            {active ? (
              <motion.span
                layoutId='pillar-underline'
                className='absolute inset-x-0 -bottom-px h-px bg-primary-400'
                transition={transitions.base}
              />
            ) : null}
          </Link>
        );
      })}
      <span aria-hidden className='h-[51px] flex-1 border-b border-[#2e3a38]' />
    </nav>
  );
}
