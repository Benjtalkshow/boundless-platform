import type { Metadata } from 'next';

import {
  BrandKitHero,
  ColorPalette,
  DownloadAssets,
  LogoShowcase,
} from '@/features/marketing';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Brand Kit',
  description:
    'Download the latest Boundless brand assets: logo lockups, mark variants, color palette, and product assets.',
  path: '/brand-kit',
});

export default function BrandKitPage() {
  return (
    <>
      <BrandKitHero>
        <LogoShowcase />
      </BrandKitHero>
      <ColorPalette />
      <DownloadAssets />
    </>
  );
}
