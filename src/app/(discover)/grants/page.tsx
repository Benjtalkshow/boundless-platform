import { getPillar } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

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
