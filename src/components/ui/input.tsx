import { cva, type VariantProps } from 'class-variance-authority';
import { CircleCheck, CircleX } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Boundless input field. The bordered frame holds an optional leading icon, the
 * text control, and optional trailing add-on / icon, with a label above and
 * helper text below. Compose the look from `inputSize` (small | large), `shape`
 * (rounded | pill) and `state` (default | success | error). The interactive
 * states from the design (hover, active, typing, filled) are handled by CSS via
 * `:hover` / `:focus-within` and the presence of a value; `readOnly` and
 * `disabled` are driven by the native attributes.
 */
const inputFrameVariants = cva(
  'flex w-full min-w-0 items-center gap-3 overflow-hidden border transition-colors',
  {
    variants: {
      inputSize: {
        small: 'h-9 px-3 py-2',
        large: 'h-14 px-4 py-4',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
      },
      state: {
        default:
          'border-neutral-600 focus-within:border-primary-500 focus-within:bg-ink-soft hover:border-neutral-500',
        success: 'border-[#22c55e] bg-ink-soft',
        error: 'border-[#f19f9d] focus-within:border-[#f19f9d]',
      },
    },
    defaultVariants: { inputSize: 'large', shape: 'rounded', state: 'default' },
  }
);

const STATUS_ICON: Record<'success' | 'error', React.ReactNode> = {
  success: <CircleCheck className='size-5 text-[#22c55e]' />,
  error: <CircleX className='size-5 text-[#e02e2a]' />,
};

const HELPER_COLOR: Record<'default' | 'success' | 'error', string> = {
  default: 'text-[#929f9c]/80',
  success: 'text-[#04802e]',
  error: 'text-[#e02e2a]',
};

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputFrameVariants> & {
    label?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    /** Trailing icon. Overrides the success / error status icon when set. */
    rightIcon?: React.ReactNode;
    /** Trailing text add-on (e.g. a unit or suffix). */
    addOn?: string;
    /** Class applied to the bordered frame. */
    className?: string;
    /** Class applied to the raw input element. */
    inputClassName?: string;
    /** Class applied to the outer container (label + frame + helper). */
    containerClassName?: string;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    inputClassName,
    containerClassName,
    label,
    helperText,
    leftIcon,
    rightIcon,
    addOn,
    inputSize,
    shape,
    state,
    id,
    readOnly,
    disabled,
    type,
    ...props
  },
  ref
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const resolvedState = state ?? 'default';
  const trailing =
    rightIcon ??
    (resolvedState === 'success' || resolvedState === 'error'
      ? STATUS_ICON[resolvedState]
      : null);

  return (
    <div
      className={cn('flex w-full min-w-0 flex-col gap-2', containerClassName)}
    >
      <div className='flex w-full flex-col gap-1'>
        {label ? (
          <label
            htmlFor={inputId}
            className='text-sm font-medium text-[#72736f]'
          >
            {label}
          </label>
        ) : null}
        <div
          data-slot='input-frame'
          data-state={resolvedState}
          className={cn(
            inputFrameVariants({ inputSize, shape, state: resolvedState }),
            readOnly &&
              'border-[#2c3a37]/50 bg-ink-soft focus-within:border-[#2c3a37]/50 hover:border-[#2c3a37]/50',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
        >
          {leftIcon ? (
            <span className='flex size-5 shrink-0 items-center justify-center text-[#7a8f8b]'>
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            type={type}
            data-slot='input'
            readOnly={readOnly}
            disabled={disabled}
            aria-invalid={resolvedState === 'error' || undefined}
            className={cn(
              'min-w-0 flex-1 bg-transparent text-sm text-[#f1fff1] caret-primary-500 outline-none placeholder:text-[#7a8f8b]/70 read-only:cursor-default disabled:cursor-not-allowed',
              inputClassName
            )}
            {...props}
          />
          {trailing || addOn ? (
            <div className='flex shrink-0 items-center gap-1'>
              {addOn ? (
                <span className='text-sm text-[#667185]'>{addOn}</span>
              ) : null}
              {trailing ? (
                <span className='flex size-5 items-center justify-center text-[#7a8f8b]'>
                  {trailing}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {helperText ? (
        <p className={cn('text-sm', HELPER_COLOR[resolvedState])}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export { Input, inputFrameVariants };
