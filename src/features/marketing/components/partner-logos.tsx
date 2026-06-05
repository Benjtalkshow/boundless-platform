'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { type ReactNode, useRef } from 'react';

const LOGO_CLASS = 'h-6 w-auto sm:h-8';

const LOGOS: { key: string; node: ReactNode }[] = [
  {
    key: 'stellar',
    node: (
      <Image
        src='/brand/stellar-logo.svg'
        alt='Stellar'
        width={128}
        height={32}
        unoptimized
        className={LOGO_CLASS}
      />
    ),
  },
  {
    key: 'trustlesswork',
    node: (
      <>
        <Image
          src='/brand/trustlesswork-logo.svg'
          alt=''
          width={37}
          height={32}
          unoptimized
          className={LOGO_CLASS}
        />
        <span className='font-display text-[28px] leading-[1.05] font-normal text-white uppercase sm:text-[33.684px] sm:leading-[35.368px]'>
          TrustlessWork
        </span>
      </>
    ),
  },
  {
    key: 'sdf',
    node: (
      <Image
        src='/brand/sdf-logo.svg'
        alt='Stellar Development Foundation'
        width={126}
        height={32}
        unoptimized
        className={LOGO_CLASS}
      />
    ),
  },
  {
    key: 'usdc',
    node: (
      <>
        <Image
          src='/brand/Usdc--Streamline-Cryptocurrency.svg'
          alt=''
          width={25}
          height={25}
          unoptimized
          className='size-6 sm:size-7'
        />
        <span className='text-xl sm:text-2xl'>USD Coin</span>
      </>
    ),
  },
  {
    key: 'scf',
    node: (
      <Image
        src='/brand/stellar-community-fund.svg'
        alt='Stellar Community Fund'
        width={99}
        height={32}
        unoptimized
        className={LOGO_CLASS}
      />
    ),
  },
];

// One pass of the logos. Trailing margin on every item keeps the spacing even
// across the loop seam where the second copy meets the first.
function LogoTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className='flex shrink-0' aria-hidden={ariaHidden}>
      {LOGOS.map(logo => (
        <li
          key={logo.key}
          className='mr-12 flex shrink-0 items-center gap-2 text-white sm:mr-20'
        >
          {logo.node}
        </li>
      ))}
    </ul>
  );
}

/** Ecosystem partner lockups as a seamless, auto-scrolling marquee. */
export function PartnerLogos() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: trackRef }
  );

  return (
    <div className='overflow-hidden'>
      <div ref={trackRef} className='flex w-max'>
        <LogoTrack />
        <LogoTrack ariaHidden />
      </div>
    </div>
  );
}
