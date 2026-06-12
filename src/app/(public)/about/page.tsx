import type { Metadata } from 'next';

import {
  AboutHero,
  AboutIntro,
  AboutMission,
  AboutTeam,
  BrandKitCta,
  CtaSection,
} from '@/features/marketing';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'Boundless is building the infrastructure for people to learn, collaborate, fund ideas, and create meaningful impact online.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutMission />
      <AboutTeam />
      <BrandKitCta />
      <CtaSection />
    </>
  );
}
