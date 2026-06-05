import Image from 'next/image';

import { cn } from '@/lib/utils';

type PrizeTier = {
  place: string;
  amount: string;
};

const DEFAULT_TIERS: PrizeTier[] = [
  { place: '1st Place', amount: '120,000' },
  { place: '2nd Place', amount: '80,000' },
  { place: '3rd Place', amount: '50,000' },
  { place: '4th Place', amount: '30,000' },
  { place: '5th Place', amount: '20,000' },
];

type PrizePoolProps = {
  total?: string;
  currency?: string;
  label?: string;
  tiers?: PrizeTier[];
  className?: string;
};

function PrizeRow({
  place,
  amount,
  currency,
}: PrizeTier & { currency: string }) {
  return (
    <div className='relative flex flex-col justify-center gap-2'>
      <span className='text-body font-normal text-neutral-300'>{place}</span>
      <div className='flex items-start gap-2 text-h6 font-bold'>
        <span className='text-foreground'>{amount}</span>
        <span className='text-neutral-300'>{currency}</span>
      </div>
      {/* Dot straddles the timeline line to the left of the row. */}
      <span
        aria-hidden
        className='absolute top-1 -left-[41px] size-4 rounded-full border-4 border-[#11230f] bg-primary'
      />
    </div>
  );
}

function PrizesBlock({
  total,
  currency,
  label,
  tiers,
  ariaHidden,
}: Required<Omit<PrizePoolProps, 'className'>> & { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className='flex flex-col gap-5 pt-5'>
      <div className='flex items-center gap-3'>
        <Image
          src='/brand/usdc.png'
          alt=''
          width={40}
          height={40}
          className='size-10 shrink-0'
        />
        <div className='flex flex-col'>
          <span className='text-caption-sm text-neutral-300 uppercase'>
            {label}
          </span>
          <div className='flex items-start gap-2 text-h4 font-bold'>
            <span className='text-foreground'>{total}</span>
            <span className='text-neutral-300'>{currency}</span>
          </div>
        </div>
      </div>

      <div className='px-[18px]'>
        <div className='flex flex-col gap-4 border-l-2 border-primary/20 pl-[34px]'>
          {tiers.map((tier, index) => (
            <PrizeRow key={index} {...tier} currency={currency} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Total prize pool with an infinitely scrolling tier breakdown. */
export function PrizePool({
  total = '300,000',
  currency = 'USDC',
  label = 'Total Prize Pool',
  tiers = DEFAULT_TIERS,
  className,
}: PrizePoolProps) {
  const block = { total, currency, label, tiers };
  return (
    <div
      className={cn(
        'group relative h-[200px] w-[234px] overflow-hidden',
        className
      )}
    >
      {/* Track holds two identical copies so the loop is seamless. */}
      <div className='flex animate-prize-scroll flex-col will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none'>
        <PrizesBlock {...block} />
        <PrizesBlock {...block} ariaHidden />
      </div>
    </div>
  );
}
