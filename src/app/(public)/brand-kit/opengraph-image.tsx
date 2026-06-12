import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Boundless Brand Kit';

export default function Image() {
  return renderOgImage({
    title: 'Brand Kit',
    subtitle: 'Logo lockups, mark variants, color palette, and product assets.',
  });
}
