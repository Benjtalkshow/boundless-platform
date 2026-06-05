import { Slot } from 'radix-ui';
import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/** Drop shadow plus the inset highlight that gives the green CTA its gloss. */
const PILL_GLOW =
  'shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_10px_15px_-3px_rgba(0,0,0,0.05),0px_4px_6px_-4px_rgba(0,0,0,0.05),inset_0px_0px_0px_2px_rgba(255,255,255,0.1),inset_0px_1px_0px_1px_rgba(255,255,255,0.15),inset_0px_0px_25px_2px_rgba(255,255,255,0.05)]';

type PillButtonProps = ComponentProps<'button'> & { asChild?: boolean };

/**
 * Pill-shaped brand CTA used across the navbars (Launch App, Subscribe, Sign
 * in). Pass `asChild` to wrap a link.
 */
export function PillButton({
  className,
  asChild = false,
  ...props
}: PillButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-500 px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:bg-primary-400 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none',
        PILL_GLOW,
        className
      )}
      {...props}
    />
  );
}
