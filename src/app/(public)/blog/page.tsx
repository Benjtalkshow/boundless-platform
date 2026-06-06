import type { Metadata } from 'next';

import { BlogHero, BlogList, BrandKitCta } from '@/features/marketing';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'The latest news, stories, and opportunities from Boundless.',
};

export default function BlogPage() {
  return (
    <>
      {/* The hero gradient peaks at its bottom edge: dark at the title, teal
          tint by the foot of the card list. */}
      <BlogHero>
        <BlogList />
      </BlogHero>

      {/* Bridge: start from the exact teal-tinted colour the hero ends on
          (#0d1111 under 8% #2eedaa) so there is no seam into the cards, then
          resolve to flat ink well before the footer so the band rhythms with
          the footer's dark + glow on both edges. */}
      <div className='bg-[linear-gradient(180deg,#10231d_0%,var(--color-ink)_55%)]'>
        <BrandKitCta className='bg-transparent' />
      </div>
    </>
  );
}
