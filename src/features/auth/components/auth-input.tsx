import * as React from 'react';

import { cn } from '@/lib/utils';

interface AuthInputProps extends React.ComponentProps<'input'> {
  /** Static icon shown on the right (e.g. a mail glyph). */
  icon?: React.ReactNode;
  /** Interactive trailing control (e.g. a password visibility toggle). */
  trailing?: React.ReactNode;
}

/**
 * Auth-styled text input: 56px tall, neutral-600 border, with an optional
 * right-aligned icon or interactive trailing control.
 */
export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput({ className, icon, trailing, ...props }, ref) {
    const hasAdornment = Boolean(icon || trailing);

    return (
      <div className='relative w-full'>
        <input
          ref={ref}
          className={cn(
            'h-14 w-full rounded-md border border-neutral-600 bg-transparent px-4 text-sm text-[#f1fff1] transition-colors outline-none placeholder:text-[#7a8f8b]/70 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error-500',
            hasAdornment && 'pr-12',
            className
          )}
          {...props}
        />
        {hasAdornment ? (
          <div className='absolute top-1/2 right-4 flex -translate-y-1/2 items-center text-[#7a8f8b]'>
            {trailing ?? icon}
          </div>
        ) : null}
      </div>
    );
  }
);
