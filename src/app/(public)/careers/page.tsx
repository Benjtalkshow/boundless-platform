import type { Metadata } from 'next';

import { CareersHero, JobBoard } from '@/features/marketing';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Come build the future of digital opportunities with Boundless.',
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <JobBoard />
    </>
  );
}
