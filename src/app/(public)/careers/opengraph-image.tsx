import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Careers at Boundless';

export default function Image() {
  return renderOgImage({
    title: 'Careers',
    subtitle: 'Come build the future of digital opportunities with Boundless.',
  });
}
