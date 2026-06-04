'use client';

import { Play } from 'lucide-react';
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { HeroBackground } from './hero-background';
import { Section } from './section';

/** Gap (px) the stars carry past the text, then clamped clear of the card. */
const FIELD_MARGIN = 56;
const CARD_CLEARANCE = 16;

interface HeroSectionProps {
  /** Hero content (heading, subtext, CTAs). Passed in so the shell stays reusable. */
  children?: ReactNode;
  /** Content for the framed media card; falls back to a play placeholder. */
  media?: ReactNode;
  /** Render the framed media card. Implied when `media` is provided. */
  showMedia?: boolean;
  /** Extra classes for the inner Section. */
  className?: string;
}

/**
 * Marketing hero shell: starfield background, a content slot, and an optional
 * framed media card. Text-free so it can be reused across pages.
 */
export function HeroSection({
  children,
  media,
  showMedia = false,
  className,
}: HeroSectionProps) {
  const hasMedia = media != null || showMedia;

  // Fade the starfield out where the text ends, clamped clear of the card.
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [fieldHeight, setFieldHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      const textEnd = el.offsetTop + el.offsetHeight + FIELD_MARGIN;
      const card = cardRef.current;
      const limit = card ? card.offsetTop - CARD_CLEARANCE : Infinity;
      setFieldHeight(Math.min(textEnd, limit));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (cardRef.current) observer.observe(cardRef.current);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [children, hasMedia]);

  return (
    <HeroBackground fieldHeight={fieldHeight}>
      <Section className={cn('pt-24 pb-16 lg:pt-44 lg:pb-20', className)}>
        {children ? (
          <div ref={contentRef} className='max-w-[772px]'>
            {children}
          </div>
        ) : null}

        {hasMedia ? (
          <div
            ref={cardRef}
            className='mt-12 aspect-1240/520 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/2'
          >
            {media ?? (
              <div className='flex size-full items-center justify-center'>
                <span className='flex size-20 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm'>
                  <Play className='size-8 translate-x-0.5 fill-white text-white' />
                </span>
              </div>
            )}
          </div>
        ) : null}
      </Section>
    </HeroBackground>
  );
}
