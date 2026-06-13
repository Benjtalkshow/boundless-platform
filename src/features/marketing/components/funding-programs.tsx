'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Section } from './section';

type Program = { name: string; description: string };

const PROGRAMS: Program[] = [
  {
    name: 'Bounties',
    description: 'Complete tasks and earn rewards for your contributions.',
  },
  {
    name: 'Hackathons',
    description: 'Compete, collaborate, and bring new ideas to life.',
  },
  {
    name: 'Crowdfunding',
    description:
      'Raise support directly from communities that believe in your vision.',
  },
  {
    name: 'Grants',
    description: 'Secure funding for impactful projects and initiatives.',
  },
];

// Auto-advance interval for the desktop selector.
const STEP_MS = 4000;

/** Blank placeholder for a program's dashboard screenshot. */
function DashboardCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl border-2 border-white/10 bg-white/2',
        className
      )}
    />
  );
}

/** Title, description and arrow shown beneath a dashboard card. */
function Caption({ program }: { program: Program }) {
  return (
    <div className='flex items-center gap-5 lg:pr-5'>
      <div className='flex flex-1 flex-col gap-2'>
        <h3 className='font-heading text-2xl font-semibold tracking-[-0.48px] text-white'>
          {program.name}
        </h3>
        <p className='text-base leading-[1.45] text-text-muted'>
          {program.description}
        </p>
      </div>
      <ArrowUpRight
        aria-hidden
        strokeWidth={1.5}
        className='size-9 shrink-0 text-white lg:size-10'
      />
    </div>
  );
}

/**
 * "Every Funding Path. One Platform.": a program selector (Bounties,
 * Hackathons, Crowdfunding, Grants) beside a dashboard-screenshot card. On
 * desktop the selector auto-advances and is clickable; on mobile every program
 * stacks vertically.
 */
export function FundingPrograms() {
  const [active, setActive] = useState(0);

  // Re-scheduling on each change means a manual pick also resets the timer.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setTimeout(
      () => setActive(current => (current + 1) % PROGRAMS.length),
      STEP_MS
    );
    return () => clearTimeout(id);
  }, [active]);

  return (
    <Section
      className='bg-ink bg-[linear-gradient(180deg,rgba(13,17,17,0)_48.68%,rgba(46,237,170,0.08)_100%)]'
      innerClassName='flex flex-col gap-10 lg:flex-row lg:gap-16'
    >
      {/* Left: heading, CTA and the program selector (selector is desktop-only). */}
      <div className='flex flex-col gap-10 lg:w-[412px] lg:shrink-0 lg:gap-[60px]'>
        <div className='flex flex-col gap-5'>
          <h2 className='font-heading text-3xl leading-none font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:tracking-[-1.92px]'>
            Every Funding Path.
            <span className='block text-primary'>One Platform.</span>
          </h2>
          <p className='text-base leading-[1.45] text-text-muted lg:text-xl lg:leading-[1.2] lg:tracking-[-0.4px]'>
            Boundless unifies multiple ways to launch, support and fund projects
            in a single accountable system.
          </p>
          <Link
            href='/opportunities'
            className='hidden items-center gap-2 self-start text-sm font-semibold text-primary transition-colors hover:text-primary-400 lg:inline-flex'
          >
            Get Started
            <ArrowRight className='size-5' />
          </Link>
        </div>

        <div className='hidden flex-col gap-5 lg:flex'>
          {PROGRAMS.map((program, index) => {
            const isActive = index === active;
            return (
              <button
                key={program.name}
                type='button'
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                className='flex cursor-pointer items-center gap-2 text-left'
              >
                <span
                  className={cn(
                    'h-6 w-0.5 shrink-0 rounded-full transition-colors',
                    isActive ? 'bg-primary' : 'bg-transparent'
                  )}
                />
                <span
                  className={cn(
                    'text-lg transition-colors',
                    isActive ? 'font-bold text-white' : 'text-text-muted'
                  )}
                >
                  {program.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right (desktop): the active program's card + caption. */}
      <div className='hidden flex-1 flex-col gap-5 lg:flex'>
        <DashboardCard className='h-[480px]' />
        <Caption program={PROGRAMS[active]} />
      </div>

      {/* Mobile: every program stacked. */}
      <div className='flex flex-col gap-8 lg:hidden'>
        {PROGRAMS.map((program, index) => (
          <Fragment key={program.name}>
            <div className='flex flex-col gap-5'>
              <DashboardCard className='h-[360px]' />
              <Caption program={program} />
            </div>
            {index < PROGRAMS.length - 1 ? (
              <span aria-hidden className='h-px w-full bg-white/10' />
            ) : null}
          </Fragment>
        ))}
      </div>
    </Section>
  );
}
