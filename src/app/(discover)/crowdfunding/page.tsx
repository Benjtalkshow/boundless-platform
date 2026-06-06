import { getPillar } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

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
