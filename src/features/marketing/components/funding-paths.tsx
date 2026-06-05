import { CtaTicker } from './cta-ticker';
import { ExplorePath } from './explore-path';
import { PrizePool } from './prize-pool';
import { Section } from './section';

/** Funding paths overview. Plain scaffold pending design. */
export function FundingPaths() {
  return (
    <Section>
      {/* <Placeholder label='Funding Paths' /> */}
      <div className='flex items-center justify-center'>
        <ExplorePath />
        <PrizePool />
        <CtaTicker />
      </div>
    </Section>
  );
}
