import type { Metadata } from 'next';

import { BlogHero, BlogList, BrandKitCta } from '@/features/marketing';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'The latest news, stories, and opportunities from Boundless.',
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogList />
      <BrandKitCta />
    </>
  );
}
