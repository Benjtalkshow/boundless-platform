'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Total number of digits. Split into two equal connected groups. */
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

/** Six-digit verification code input rendered as two connected groups. */
export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled,
  autoFocus,
}: OtpInputProps) {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  function setDigit(index: number, digit: string) {
    const next = Array.from({ length }, (_, i) => value[i] ?? '');
    next[index] = digit;
    onChange(next.join('').slice(0, length));
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const raw = event.target.value.replace(/\D/g, '');
    if (!raw) {
      setDigit(index, '');
      return;
    }
    setDigit(index, raw[raw.length - 1]);
    if (index < length - 1) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      event.preventDefault();
      setDigit(index - 1, '');
      refs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const digits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length);
    if (!digits) return;
    onChange(digits);
    refs.current[Math.min(digits.length, length - 1)]?.focus();
  }

  const half = Math.ceil(length / 2);
  const groups = [
    Array.from({ length: half }, (_, i) => i),
    Array.from({ length: length - half }, (_, i) => half + i),
  ];

  return (
    <div className='flex items-center justify-center gap-3'>
      {groups.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {groupIndex > 0 ? <span className='h-px w-3 bg-[#2e3a38]' /> : null}
          <div className='flex overflow-hidden rounded-lg border border-[#2e3a38]'>
            {group.map(index => (
              <input
                key={index}
                ref={el => {
                  refs.current[index] = el;
                }}
                type='text'
                inputMode='numeric'
                autoComplete='one-time-code'
                maxLength={1}
                aria-label={`Digit ${index + 1} of ${length}`}
                disabled={disabled}
                autoFocus={autoFocus && index === 0}
                value={value[index] ?? ''}
                onChange={event => handleChange(event, index)}
                onKeyDown={event => handleKeyDown(event, index)}
                onPaste={handlePaste}
                className={cn(
                  'h-10 w-9 bg-transparent text-center text-sm font-medium text-[#f1fff1] outline-none focus:bg-white/5 disabled:opacity-50',
                  index > 0 && index !== half && 'border-l border-[#2e3a38]'
                )}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
