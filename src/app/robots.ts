import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/**
 * Allow crawling of public pages; keep the authenticated app, auth flows, API
 * and dev preview routes out of the index. Points crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/organizations',
        '/sign-in',
        '/sign-up',
        '/reset-password',
        '/api/',
        '/loader-preview',
        '/input-preview',
        '/onboarding-preview',
        '/get-started-modal-preview',
      ],
    },
    sitemap: new URL('sitemap.xml', SITE_URL).toString(),
  };
}
