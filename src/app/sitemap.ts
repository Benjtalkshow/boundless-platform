import type { MetadataRoute } from 'next';

import { EXPLORE, PILLARS } from '@/config/pillars';
import { BLOG_POSTS } from '@/features/marketing';
import { SITE_URL } from '@/lib/site';

function parseDate(value: string, fallback: Date): Date {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE_URL}${path}`;

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
