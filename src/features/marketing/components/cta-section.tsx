import { ArrowRight } from 'lucide-react';

import { MarketingButton } from './marketing-button';
import { Reveal } from './reveal';
import { Section } from './section';

/** Closing call to action: a centered card with badge, heading, copy and CTA. */
export function CtaSection() {
  return (
    <Section className='bg-ink py-[50px] lg:py-20'>
      <div className='w-full rounded-2xl bg-[#111616] px-5 py-[50px] lg:border lg:border-white/10 lg:py-[70px]'>
        <Reveal className='mx-auto flex max-w-[484px] flex-col items-center gap-6'>
          <div className='flex flex-col items-center gap-3'>
            <div className='inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-[5px] text-body-xs font-medium text-white'>
              <span>Build. Earn. Belong</span>
              <span aria-hidden className='h-3.5 w-px bg-white/15' />
              <span className='inline-flex items-center gap-1'>
                Learn More
                <ArrowRight className='size-3.5' />
              </span>
            </div>

            <h2 className='text-center font-heading text-h3 font-semibold text-white lg:text-display-sm'>
              Your Next Opportunity Starts Here.
            </h2>

            <p className='text-center font-sans text-body-sm text-text-muted-brand lg:font-heading lg:text-h5'>
              Explore grants, join hackathons, earn through bounties, or launch
              a crowdfunding campaign, all in one place.
            </p>
          </div>

          <MarketingButton asChild>
            <a href='#'>
              Get Started
              <ArrowRight />
            </a>
          </MarketingButton>
        </Reveal>
      </div>
    </Section>
  );
}
