import {
  CtaSection,
  Faq,
  FourSteps,
  FundingPaths,
  HeroSection,
  NewsSection,
  Personas,
  Testimonials,
  TrustBar,
} from '@/features/marketing';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FundingPaths />
      <FourSteps />
      <Personas />
      <Testimonials />
      <Faq />
      <NewsSection />
      <CtaSection />
    </>
  );
}
