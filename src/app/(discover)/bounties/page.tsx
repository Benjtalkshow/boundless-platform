import { getPillar } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

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
