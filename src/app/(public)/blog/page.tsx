import type { Metadata } from 'next';

import { BlogHero, BlogList, BrandKitCta } from '@/features/marketing';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'The latest news, stories, and opportunities from Boundless.',
};

export default function BlogPage() {
  return (
    <>
      {/* The hero's `fadeBottom` gradient peaks teal around the card list, then
          resolves to ink at its bottom edge — so it meets the brand-kit's dark
          section in one continuous gradient, with no seam. */}
      <BlogHero>
        <BlogList />
      </BlogHero>
      <BrandKitCta />
    </>
  );
}
