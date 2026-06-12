import { getPillar } from '@/config/pillars';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

const pillar = getPillar('grants');

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = pillar.heading;

export default function Image() {
  return renderOgImage({ title: pillar.heading, subtitle: pillar.subtext });
}
