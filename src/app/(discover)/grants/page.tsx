import type { Metadata } from 'next';

import { getPillar } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

import { discoverMetadata } from '../seo';

export const metadata: Metadata = discoverMetadata({
  title: 'Grants',
  description: 'Apply for grants to fund what matters and build on Boundless.',
  path: '/grants',
});

export default function GrantsPage() {
  const pillar = getPillar('grants');
  return (
    <DiscoverView
      heading={pillar.heading}
      subtext={pillar.subtext}
      type='grant'
    />
  );
}
