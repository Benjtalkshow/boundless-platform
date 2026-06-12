import { cn } from '@/lib/utils';

import { Glow } from './glow';

type Step = { title: string; description: string };

const STEPS: Step[] = [
  {
    title: 'Match',
    description: 'Connect with the right contributors or participants.',
  },
  {
    title: 'Secure',
    description: 'Lock funding into escrow before work starts.',
  },
];

/** "Track Progress" illustration: a glassy card over a soft primary glow. */
export function EscrowFlow({ className }: { className?: string }) {
  return (
    <div className={cn('relative w-[260px]', className)}>
      {/* Border glow concentrated at the centre of the left edge (only the
          border line glows here), fading to the figma's faint white border. */}
      <div className='relative rounded-[14px] bg-[radial-gradient(circle_at_left,rgba(46,237,170,0.85),rgba(255,255,255,0.09)_18%)] p-px'>
        <div className='relative overflow-hidden rounded-[14px] bg-ink/70 p-[15px] backdrop-blur-[35px]'>
          {/* Green patch near the centre of the right edge (inside, not on the
              border). */}
          <Glow className='absolute top-1/2 right-0 size-24 translate-x-[45%] -translate-y-1/2 opacity-50 blur-[26px]' />

          <div className='relative flex gap-2'>
            {/* Indicator rail */}
            <div className='flex flex-col items-center gap-1 pt-1'>
              <span className='size-8 shrink-0 rounded-full bg-white/15' />
              <span className='h-11 w-1 rounded-full bg-white/10' />
              <span className='size-8 shrink-0 rounded-full bg-white/15' />
            </div>

            <div className='flex flex-1 flex-col gap-8'>
              {STEPS.map(step => (
                <div key={step.title} className='flex flex-col gap-2'>
                  <p className='text-[15px] leading-none font-medium text-white'>
                    {step.title}
                  </p>
                  <p className='text-xs text-white/50'>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top glow: overlays the card from its top edge and bursts out above,
          centred and kept transparent so it reads as a soft burst. */}
      <Glow className='absolute -top-6 left-1/2 h-14 w-36 -translate-x-1/2 opacity-40 blur-[26px]' />
    </div>
  );
}
