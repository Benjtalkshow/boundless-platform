import { EXPLORE } from '@/config/pillars';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = EXPLORE.heading;

export default function Image() {
  return renderOgImage({ title: EXPLORE.heading, subtitle: EXPLORE.subtext });
}
