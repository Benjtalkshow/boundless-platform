import { EXPLORE } from '@/config/pillars';
import { DiscoverView } from '@/features/discover';

export default function ExplorePage() {
  return <DiscoverView heading={EXPLORE.heading} subtext={EXPLORE.subtext} />;
}
