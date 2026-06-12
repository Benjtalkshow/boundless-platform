import type { Metadata } from 'next';

import { CareersHero, CtaSection, JobBoard } from '@/features/marketing';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Careers',
  description: 'Come build the future of digital opportunities with Boundless.',
  path: '/careers',
});

export default function CareersPage() {
  return (
    <>
      <CareersHero>
        <JobBoard />
      </CareersHero>
      {/* Closing CTA appears on mobile only per the careers design. */}
      <div className='lg:hidden'>
        <CtaSection />
      </div>
    </>
  );
}
