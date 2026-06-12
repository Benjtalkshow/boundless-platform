import { renderBrandIcon } from '@/lib/og-image';

/**
 * Stable PNG brand logo at `/logo.png`, used as the Organization `logo` in
 * structured data (search engines prefer a raster logo).
 */
export function GET() {
  return renderBrandIcon(512);
}
