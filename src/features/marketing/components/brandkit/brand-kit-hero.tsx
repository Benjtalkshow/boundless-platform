import Image from 'next/image';
import { type ReactNode } from 'react';

import { HeroBackground } from '../hero-background';
import { Section } from '../section';
import { BRAND_KIT_ZIP } from './brand-kit-data';

/**
 * Brand kit hero. The starfield/gradient hero is stretched to host the logo
 * showcase (passed as `children`); `fadeBottom` resolves the teal tint to ink
 * so it meets the colour palette section with no seam.
 */
export function BrandKitHero({ children }: { children?: ReactNode }) {
  return (
    <HeroBackground fieldHeight={520} fadeBottom>
      <Section className='pt-24 pb-0 lg:pt-32 lg:pb-0'>
        <div className='flex flex-col items-center gap-6 text-center'>
          <div className='flex size-[100px] items-center justify-center rounded-[20px] border border-white/10 bg-white/5'>
            <Image
              src='/brand/boundless-mark.svg'
              alt=''
              width={64}
              height={64}
              unoptimized
              className='w-14'
            />
          </div>

          <h1 className='max-w-[860px] font-heading text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl lg:text-[72px] lg:leading-none lg:tracking-[-4px]'>
            Get the latest{' '}
            <span className='text-primary lg:whitespace-nowrap'>
              Boundless Brand kits
            </span>
          </h1>

          <div className='mt-2 flex w-full max-w-[520px] flex-col items-stretch gap-3 rounded-3xl border border-white/10 p-2 sm:w-auto sm:flex-row sm:items-center sm:gap-5 sm:rounded-full sm:py-1 sm:pr-1 sm:pl-5'>
            <p className='text-center text-base text-[#f9fafb] sm:text-left sm:whitespace-nowrap'>
              This ZIP file contains Boundless logos and product assets.
            </p>
            <a
              href={BRAND_KIT_ZIP}
              download
              className='shrink-0 rounded-full bg-white/90 px-[25px] py-2.5 text-center text-[15px] font-semibold tracking-[0.625px] whitespace-nowrap text-[#1c1e13] transition-colors hover:bg-white'
            >
              Download Zip
            </a>
          </div>
        </div>

        <div className='mt-16 lg:mt-24'>{children}</div>
      </Section>
    </HeroBackground>
  );
}
