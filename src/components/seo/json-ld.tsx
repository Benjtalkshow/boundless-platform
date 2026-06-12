import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SOCIALS,
  SITE_URL,
} from '@/lib/site';

/**
 * Site-wide Organization + WebSite structured data (JSON-LD). Helps search
 * engines understand the brand (knowledge panel, sitelinks) and is rendered
 * once in the root layout.
 */
export function JsonLd() {
  const graph = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/boundless-logo-dark.svg`,
      description: SITE_DESCRIPTION,
      sameAs: SITE_SOCIALS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
  ];

  return (
    <script
      type='application/ld+json'
      // JSON-LD is trusted, static, server-built content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
