import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface AuthCardProps {
  title: string;
  /** Optional supporting copy shown under the title. */
  subtitle?: ReactNode;
  /**
   * `plain` is the centered card used by the choose-path, email and reset
   * screens. `sectioned` adds a divided header and tighter body, used by the
   * verification-code screens.
   */
  variant?: 'plain' | 'sectioned';
  className?: string;
  children: ReactNode;
}

/** Elevated auth card on the dark star-field background. */
export function AuthCard({
  title,
  subtitle,
  variant = 'plain',
  className,
  children,
}: AuthCardProps) {
  if (variant === 'sectioned') {
    return (
      <div
        className={cn(
          'w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#2e3a38] bg-ink-soft',
          className
        )}
      >
        <div className='flex flex-col items-center justify-center border-b border-[#2e3a38] px-5 py-6'>
          <h1 className='font-heading text-h4 leading-[1.2] font-semibold text-[#f1fff1]'>
            {title}
          </h1>
        </div>
        <div className='flex flex-col items-center gap-6 px-5 py-6'>
          {subtitle ? (
            <p className='max-w-[232px] text-center text-body-sm text-[#72736f]'>
              {subtitle}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex w-full max-w-[464px] flex-col items-center gap-8 rounded-2xl bg-ink-soft px-8 py-10 shadow-[0px_3px_1px_rgba(46,237,170,0.06),0px_5px_1.5px_rgba(46,237,170,0.02)]',
        className
      )}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='font-heading text-h4 leading-[1.2] font-bold text-white'>
          {title}
        </h1>
        {subtitle ? (
          <p className='max-w-[320px] text-body-sm text-[#72736f]'>
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
