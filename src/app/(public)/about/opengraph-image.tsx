import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'About Boundless';

export default function Image() {
  return renderOgImage({
    title: 'About Boundless',
    subtitle:
      'Building the infrastructure for people to learn, collaborate, fund ideas, and create meaningful impact.',
  });
}
