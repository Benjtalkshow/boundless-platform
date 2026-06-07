import { Download } from 'lucide-react';
import Image from 'next/image';

import { MarketingButton } from '../marketing-button';
import { Section } from '../section';
import { BRAND_KIT_ZIP } from './brand-kit-data';

/** Closing CTA: a band prompting a download of the full asset ZIP. */
export function DownloadAssets() {
  return (
    <Section className='bg-ink'>
      <div className='flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-5'>
        <div className='flex items-center gap-5'>
          <div className='hidden size-20 shrink-0 items-center justify-center rounded-2xl border border-neutral-700 bg-white/5 lg:flex'>
            <Image
              src='/brand/boundless-mark.svg'
              alt=''
              width={85}
              height={78}
              unoptimized
              className='w-10'
            />
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-body-xs font-semibold text-primary lg:text-body'>
              Download assets
            </p>
            <h2 className='font-heading text-h4 font-semibold text-white lg:text-h3'>
              This ZIP file contains Boundless logo, variants, and product
              assets.
            </h2>
          </div>
        </div>

        <MarketingButton asChild>
          <a href={BRAND_KIT_ZIP} download>
            Download All
            <Download />
          </a>
        </MarketingButton>
      </div>
    </Section>
  );
}
