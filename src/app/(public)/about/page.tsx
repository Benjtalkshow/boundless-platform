import type { Metadata } from 'next';

import {
  AboutHero,
  AboutIntro,
  AboutMission,
  AboutTeam,
  BrandKitCta,
  CtaSection,
  TrustBar,
} from '@/features/marketing';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Boundless is building the infrastructure for people to learn, collaborate, fund ideas, and create meaningful impact online.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <TrustBar />
      <AboutIntro />
      <AboutMission />
      <AboutTeam />
      <BrandKitCta />
      <CtaSection />
    </>
  );
}
