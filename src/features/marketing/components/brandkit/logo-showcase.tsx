import { Download } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { BRAND_KIT_ZIP, BRAND_LOGOS, type BrandLogo } from './brand-kit-data';

function LogoCard({ logo }: { logo: BrandLogo }) {
  const light = logo.surface === 'light';

  return (
    <div
      className={cn(
        'relative flex h-[200px] items-center justify-center overflow-hidden rounded-[20px]',
        light ? 'bg-white' : 'border border-white/20'
      )}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={256}
        height={40}
        unoptimized
        className='h-10 w-auto'
      />

      <a
        href={logo.src}
        download
        aria-label={`Download ${logo.alt} (SVG)`}
        className={cn(
          'absolute right-4 bottom-4 rounded-full border-[0.5px] px-2 pb-1 text-xs transition-colors',
          light
            ? 'border-[#1a1b1e] text-[#111] hover:bg-black/5'
            : 'border-white/20 text-white hover:bg-white/10'
        )}
      >
        .svg
      </a>
    </div>
  );
}

/** "Boundless Logo" showcase: heading, download action, and the logo grid. */
export function LogoShowcase() {
  return (
    <div className='mx-auto flex max-w-[1040px] flex-col gap-8'>
      <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-heading text-3xl leading-none font-semibold tracking-[-1.28px] text-primary lg:text-[32px]'>
            Boundless Logo
          </h2>
          <p className='text-base text-white'>
            With typography in multiple versions
          </p>
        </div>

        <a
          href={BRAND_KIT_ZIP}
          download
          className='inline-flex shrink-0 items-center gap-2 rounded-full border border-white/40 px-4 py-3 text-[15px] font-semibold tracking-[0.625px] text-white transition-colors hover:bg-white/10'
        >
          Download
          <Download className='size-5' />
        </a>
      </div>

      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
        {BRAND_LOGOS.map(logo => (
          <LogoCard key={logo.src} logo={logo} />
        ))}
      </div>
    </div>
  );
}
