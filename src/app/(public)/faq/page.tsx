import type { Metadata } from 'next';

import {
  FAQ_ITEMS,
  FAQ_LAST_UPDATED,
  FaqAccordion,
  HeroBackground,
  Section,
} from '@/features/marketing';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'FAQs',
  description: 'Answers to common questions about Boundless.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <HeroBackground fieldHeight={520} fadeBottom>
      <Section className='pt-24 pb-16 lg:pt-44 lg:pb-20'>
        <div className='mx-auto flex max-w-[812px] flex-col gap-12 lg:gap-16'>
          <header className='flex flex-col gap-4'>
            <h1 className='font-heading text-5xl leading-none font-semibold tracking-tight text-white sm:text-6xl lg:text-[72px] lg:tracking-[-4px]'>
              FAQs
            </h1>
            <p className='text-lg leading-[1.2] tracking-[-0.48px] text-text-muted-brand lg:text-2xl'>
              {FAQ_LAST_UPDATED}
            </p>
          </header>

          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </Section>
    </HeroBackground>
  );
}
