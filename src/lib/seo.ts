import type { Metadata } from 'next';

import { SITE_NAME } from '@/lib/site';

interface PageMetadataInput {
  /** Page title. Flows through the root `%s | Boundless` template by default. */
  title: string;
  description: string;
  /** Root-relative path, e.g. `/about`. Used for canonical + OG url. */
  path: string;
  /** Set when `title` is already the full title (e.g. the home page). */
  absoluteTitle?: boolean;
}

/**
 * Builds consistent page metadata: title, description, canonical, Open Graph
 * and Twitter card. Open Graph / Twitter images come from the route-level
 * `opengraph-image` files and resolve against the root `metadataBase`.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
