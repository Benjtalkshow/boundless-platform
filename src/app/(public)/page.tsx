import type { Metadata } from 'next';
import Link from 'next/link';

import {
  CtaSection,
  Faq,
  FundingPaths,
  HeroSection,
  MarketingButton,
  NewsSection,
  Personas,
  Testimonials,
  TrustBar,
} from '@/features/marketing';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Boundless | Hackathons, Bounties, Grants & Crowdfunding on Stellar',
  description:
    'Boundless is where builders find hackathons, bounties, and grants, and where ideas get crowdfunded. Build, earn, and belong on Stellar.',
  path: '/',
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HeroSection>
        <div className='inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-body-xs text-white/70'>
          <span className='rounded-full bg-white/10 px-3 py-1 font-medium text-white'>
            Build. Earn. Belong
          </span>
          <Link
            href='/about'
            className='inline-flex items-center gap-1 pr-3 pl-1 transition-colors hover:text-white'
          >
            Learn More
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <h1 className='mt-6 font-heading text-5xl leading-none font-semibold tracking-tight sm:text-6xl lg:text-[72px] lg:tracking-[-4px] lg:whitespace-nowrap'>
          <span className='text-white'>Discover Opportunities.</span>
          <br />
          <span className='text-primary'>Build. Get Funded. Grow.</span>
        </h1>

        <p className='mt-6 max-w-xl text-body-lg text-pretty text-text-muted-brand lg:text-xl'>
          Launch ideas, join hackathons, earn from bounties, apply for grants
          and raise community support through crowdfunding.
        </p>

        <div className='mt-8 flex flex-wrap items-center gap-4'>
          <Link
            href='/docs'
            className='inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10'
          >
            Read Docs
          </Link>
          <MarketingButton asChild>
            <Link href='/opportunities'>Explore Opportunities</Link>
          </MarketingButton>
        </div>
      </HeroSection>
      <TrustBar />
      <FundingPaths />
      <Personas />
      <Testimonials />
      <Faq />
      <NewsSection />
      <CtaSection />
    </>
  );
}
