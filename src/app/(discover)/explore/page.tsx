import type { Metadata } from 'next';

import { EXPLORE } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

import { discoverMetadata } from '../seo';

export const metadata: Metadata = discoverMetadata({
  title: 'Explore',
  description:
    'Browse bounties, hackathons, grants, and crowdfunding projects across the Boundless ecosystem on Stellar.',
  path: '/explore',
});

export default function ExplorePage() {
  return <DiscoverView heading={EXPLORE.heading} subtext={EXPLORE.subtext} />;
}
