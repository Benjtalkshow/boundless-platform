import type { Metadata } from 'next';

import { getPillar } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

import { discoverMetadata } from '../seo';

export const metadata: Metadata = discoverMetadata({
  title: 'Bounties',
  description:
    'Discover bounties that match your skills and compete for rewards on Boundless.',
  path: '/bounties',
});

export default function BountiesPage() {
  const pillar = getPillar('bounties');
  return (
    <DiscoverView
      heading={pillar.heading}
      subtext={pillar.subtext}
      type='bounty'
    />
  );
}
