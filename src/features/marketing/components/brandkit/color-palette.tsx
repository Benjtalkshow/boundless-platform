'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Section } from '../section';
import { BRAND_COLORS, type BrandColor } from './brand-kit-data';

function ColorCard({ color }: { color: BrandColor }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; ignore.
    }
  };

  return (
    <div
      style={{ backgroundColor: color.background }}
      className={cn(
        'flex min-h-[180px] flex-col justify-between rounded-2xl p-6',
        color.dark ? 'border border-white/10 text-white' : 'text-[#111]'
      )}
    >
      <div className='flex items-start justify-between'>
        <p className='text-lg font-semibold'>{color.name}</p>
        <button
          type='button'
          onClick={copy}
          aria-label={`Copy ${color.hex}`}
          className={cn(
            'flex size-8 items-center justify-center rounded-full border transition-colors',
            color.dark
              ? 'border-white/20 hover:bg-white/10'
              : 'border-black/15 hover:bg-black/5'
          )}
        >
          {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
        </button>
      </div>

      <div className='flex flex-col gap-1 text-sm'>
        <span>{color.hex}</span>
        <span className={color.dark ? 'text-white/70' : 'text-[#111]/70'}>
          {color.rgb}
        </span>
      </div>
    </div>
  );
}

/** "Main colors" palette: the core brand swatches with copy-to-clipboard. */
export function ColorPalette() {
  return (
    <Section className='bg-ink'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-heading text-3xl leading-none font-semibold tracking-[-1.28px] text-primary lg:text-[32px]'>
            Main colors
          </h2>
          <p className='text-base text-text-muted'>Our main colors palette</p>
        </div>

        <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
          {BRAND_COLORS.map(color => (
            <ColorCard key={color.name} color={color} />
          ))}
        </div>
      </div>
    </Section>
  );
}
