import type { Metadata } from 'next';

import { getPillar } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

import { discoverMetadata } from '../seo';

export const metadata: Metadata = discoverMetadata({
  title: 'Hackathons',
  description: 'Join hackathons on Boundless, team up, and ship to win.',
  path: '/hackathons',
});

export default function HackathonsPage() {
  const pillar = getPillar('hackathons');
  return (
    <DiscoverView
      heading={pillar.heading}
      subtext={pillar.subtext}
      type='hackathon'
    />
  );
}
