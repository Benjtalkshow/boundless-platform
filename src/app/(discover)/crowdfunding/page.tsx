import type { Metadata } from 'next';

import { getPillar } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

import { discoverMetadata } from '../seo';

export const metadata: Metadata = discoverMetadata({
  title: 'Crowdfunding',
  description:
    'Back crowdfunding projects you believe in and help them reach their goals on Boundless.',
  path: '/crowdfunding',
});

export default function CrowdfundingPage() {
  const pillar = getPillar('crowdfunding');
  return (
    <DiscoverView
      heading={pillar.heading}
      subtext={pillar.subtext}
      type='crowdfunding'
    />
  );
}
