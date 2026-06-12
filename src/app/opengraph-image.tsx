import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Boundless';

export default function Image() {
  return renderOgImage({
    title: 'Build. Earn. Belong.',
    subtitle: 'Hackathons, bounties, grants, and crowdfunding on Stellar.',
  });
}
