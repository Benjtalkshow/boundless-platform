import { type ReactNode } from 'react';

import { HeroBackground } from '../hero-background';
import { Section } from '../section';
import { JOBS } from './careers-data';

/**
 * Careers hero. The starfield/gradient hero is stretched to host the job board
 * (passed as `children`) so the dark-to-teal background flows through the page.
 * The open-roles count is shown next to the title on mobile only.
 */
export function CareersHero({ children }: { children?: ReactNode }) {
  return (
    <HeroBackground fieldHeight={520} fadeBottom>
      <Section className='pt-24 pb-0 lg:pt-36 lg:pb-0'>
        <div className='flex max-w-[772px] flex-col gap-4'>
          <h1 className='font-heading text-5xl leading-none font-semibold tracking-tight text-white sm:text-6xl lg:text-[72px] lg:tracking-[-4px]'>
            Open positions
            <span className='lg:hidden'> ({JOBS.length})</span>
          </h1>
          <p className='text-lg leading-[1.2] tracking-[-0.48px] text-text-muted-brand lg:text-2xl'>
            Come build the future of digital opportunities with us.
          </p>
        </div>
      </Section>

      {children}
    </HeroBackground>
  );
}
