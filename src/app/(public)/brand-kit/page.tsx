import type { Metadata } from 'next';

import {
  BrandKitHero,
  ColorPalette,
  DownloadAssets,
  LogoShowcase,
} from '@/features/marketing';

export const metadata: Metadata = {
  title: 'Brand Kit',
  description:
    'Download the latest Boundless brand assets: logo lockups, mark variants, color palette, and product assets.',
};

export default function BrandKitPage() {
  return (
    <>
      <BrandKitHero />
      <LogoShowcase />
      <ColorPalette />
      <DownloadAssets />
    </>
  );
}
