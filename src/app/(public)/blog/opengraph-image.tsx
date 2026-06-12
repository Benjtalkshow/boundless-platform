import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Boundless Blog';

export default function Image() {
  return renderOgImage({
    title: 'Boundless Blog',
    subtitle: 'The latest news, stories, and opportunities from Boundless.',
  });
}
