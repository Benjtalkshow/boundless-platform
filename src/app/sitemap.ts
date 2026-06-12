import type { MetadataRoute } from 'next';

import { EXPLORE, PILLARS } from '@/config/pillars';
import { BLOG_POSTS } from '@/features/marketing';
import { SITE_URL } from '@/lib/site';

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/**
 * Deterministically parse the "DD Month YYYY" blog date format (UTC), falling
 * back when the value is not in that shape. Avoids the implementation-defined
 * behaviour of `new Date(string)` for non-ISO inputs.
 */
function parseDate(value: string, fallback: Date): Date {
  const match = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(value.trim());
  if (match) {
    const day = Number(match[1]);
    const month = MONTHS.indexOf(match[2].toLowerCase());
    const year = Number(match[3]);
    if (month !== -1) return new Date(Date.UTC(year, month, day));
  }
  return fallback;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path || '/', SITE_URL).toString();

  const marketing: MetadataRoute.Sitemap = [
    { url: url(''), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: url('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: url('/careers'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: url('/faq'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: url('/brand-kit'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: url('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const discover: MetadataRoute.Sitemap = [
    EXPLORE.href,
    ...PILLARS.map(p => p.href),
  ].map(path => ({
    url: url(path),
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: url(`/blog/${post.slug}`),
    lastModified: parseDate(post.publishedDate, now),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...marketing, ...discover, ...posts];
}
