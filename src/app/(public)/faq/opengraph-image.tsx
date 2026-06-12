import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Boundless FAQs';

export default function Image() {
  return renderOgImage({
    title: 'FAQs',
    subtitle: 'Answers to common questions about Boundless.',
  });
}
