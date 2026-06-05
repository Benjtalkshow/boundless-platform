import { HeroSection } from '../hero-section';
import { PartnerLogos } from '../partner-logos';
import { YouTubeEmbed } from '../youtube-embed';

/** About page hero: brand statement over the starfield with a media card. */
export function AboutHero() {
  return (
    <HeroSection
      partners={<PartnerLogos />}
      media={<YouTubeEmbed id='rOSZhhblE_8' title='Boundless' />}
      className='pt-16 lg:pt-36'
    >
      <h1 className='font-heading text-5xl leading-none font-semibold tracking-tight sm:text-6xl lg:text-[72px] lg:tracking-[-4px]'>
        <span className='text-white'>Designing the Future of </span>
        <span className='text-primary'>Digital Opportunity</span>
      </h1>
      <p className='mt-4 text-lg leading-[1.2] tracking-[-0.48px] text-text-muted-brand lg:text-2xl'>
        Boundless is building the infrastructure for people to learn,
        collaborate, fund ideas, and create meaningful impact online.
      </p>
    </HeroSection>
  );
}
