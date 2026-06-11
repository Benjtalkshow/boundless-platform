'use client';

import { Camera, User } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AvatarUploadProps {
  /** Current avatar image source, if any. */
  src?: string | null;
  /** Called with the file the user picks. */
  onSelectFile?: (file: File) => void;
  className?: string;
}

/** 64px avatar with a camera badge that opens the file picker. */
export function AvatarUpload({
  src,
  onSelectFile,
  className,
}: AvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onSelectFile?.(file);
    event.target.value = '';
  }

  return (
    <div className={cn('relative size-16', className)}>
      <Button
        type='button'
        intent='secondary'
        appearance='text'
        onClick={() => inputRef.current?.click()}
        className='size-16 rounded-full p-0 focus-visible:ring-primary-500/40'
        aria-label='Upload profile photo'
      >
        <span className='flex size-16 items-center justify-center overflow-hidden rounded-full bg-primary-50'>
          {src ? (
            <Image
              src={src}
              alt=''
              width={64}
              height={64}
              className='size-16 object-cover'
              unoptimized
            />
          ) : (
            <User
              className='size-8 text-ink'
              fill='currentColor'
              strokeWidth={0}
            />
          )}
        </span>
        <span className='absolute right-0 bottom-0 flex size-5 items-center justify-center rounded-full border border-white bg-[#5c6f6b]'>
          <Camera className='size-3 text-white' />
        </span>
      </Button>
      <input
        ref={inputRef}
        type='file'
        accept='image/png,image/jpeg,image/gif'
        className='sr-only'
        onChange={handleChange}
      />
    </div>
  );
}
