import { renderBrandIcon } from '@/lib/og-image';

export const size = { width: 256, height: 256 };
export const contentType = 'image/png';

export default function Icon() {
  return renderBrandIcon(256);
}
