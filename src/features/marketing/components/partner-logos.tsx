import Image from 'next/image';

const LOGO_CLASS = 'h-6 w-auto sm:h-8';

/** Ecosystem partner lockups, rendered from the white brand assets. */
export function PartnerLogos() {
  return (
    <ul className='scrollbar-hide flex items-center gap-x-10 overflow-x-auto text-white lg:justify-between lg:overflow-x-visible'>
      <li className='shrink-0'>
        <Image
          src='/brand/stellar-logo.svg'
          alt='Stellar'
          width={128}
          height={32}
          unoptimized
          className={LOGO_CLASS}
        />
      </li>
      <li className='flex shrink-0 items-center gap-2'>
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
      </li>
      <li className='shrink-0'>
        <Image
          src='/brand/sdf-logo.svg'
          alt='Stellar Development Foundation'
          width={126}
          height={32}
          unoptimized
          className={LOGO_CLASS}
        />
      </li>
      <li className='flex shrink-0 items-center gap-2'>
        <Image
          src='/brand/Usdc--Streamline-Cryptocurrency.svg'
          alt=''
          width={25}
          height={25}
          unoptimized
          className='size-6 sm:size-7'
        />
        <span className='text-xl sm:text-2xl'>USD Coin</span>
      </li>
      <li className='shrink-0'>
        <Image
          src='/brand/stellar-community-fund.svg'
          alt='Stellar Community Fund'
          width={99}
          height={32}
          unoptimized
          className={LOGO_CLASS}
        />
      </li>
    </ul>
  );
}
