import { getPillar } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

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
