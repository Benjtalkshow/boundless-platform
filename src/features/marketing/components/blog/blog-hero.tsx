import { type ReactNode } from 'react';

import { HeroBackground } from '../hero-background';
import { Section } from '../section';

/**
 * Blog index hero. The starfield/gradient hero is stretched down to host the
 * blog list (passed as `children`) so the dark-to-teal background flows through
 * the whole page with no seam between the title and the cards.
 */
export function BlogHero({ children }: { children?: ReactNode }) {
  return (
    <HeroBackground fieldHeight={520} fadeBottom>
      <Section className='pt-24 pb-0 lg:pt-36 lg:pb-0'>
        <div className='max-w-[772px]'>
          <h1 className='font-heading text-5xl leading-none font-semibold tracking-tight text-white sm:text-6xl lg:text-[72px] lg:tracking-[-2.88px]'>
            Boundless Blog
          </h1>
          <p className='mt-4 text-lg leading-[1.2] tracking-[-0.48px] text-text-muted-brand/80 lg:text-2xl'>
            The latest news from Boundless
          </p>
        </div>
      </Section>

      {children}
    </HeroBackground>
  );
}
