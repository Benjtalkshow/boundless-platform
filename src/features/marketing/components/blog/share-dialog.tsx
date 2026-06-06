'use client';

import { Link2, Mail, X } from 'lucide-react';
import Image from 'next/image';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { type ReactNode, useState } from 'react';

import { SocialGlyph } from '@/components/layout/brand-icons';
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import type { BlogPost } from './blog-data';

function shareTargets(url: string, title: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return [
    {
      key: 'telegram',
      label: 'Telegram',
      href: `https://t.me/share/url?url=${u}&text=${t}`,
      icon: <SocialGlyph name='telegram' className='size-5' />,
    },
    {
      key: 'x',
      label: '(formerly Twitter)',
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      icon: <SocialGlyph name='x' className='size-5' />,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: <SocialGlyph name='linkedin' className='size-5' />,
    },
    {
      key: 'mail',
      label: 'Mail',
      href: `mailto:?subject=${t}&body=${u}`,
      icon: <Mail className='size-5' />,
    },
  ];
}

/**
 * Share dialog for a blog post. Wraps `children` as the trigger. Renders a
 * centered modal on desktop and a bottom sheet on mobile, over the shared
 * blurry dialog backdrop. Copy + Telegram/X/LinkedIn/Mail share targets.
 */
export function ShareDialog({
  post,
  children,
}: {
  post: BlogPost;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  // The dialog content only mounts client-side (on open), so reading the
  // location at render is safe and avoids a set-state-in-effect round trip.
  const url = typeof window === 'undefined' ? '' : window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); ignore silently.
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='bg-black/60 backdrop-blur-md' />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            // Mobile: bottom sheet sliding up from the bottom edge.
            'fixed inset-x-0 bottom-0 z-50 flex flex-col gap-5 rounded-t-[20px] border border-white/20 bg-[#182120] p-5 shadow-[16px_16px_20px_rgba(73,75,66,0.16)] outline-none',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-4',
            // Desktop: centered modal.
            'sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-full sm:max-w-[480px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[20px]'
          )}
        >
          <div className='flex items-center justify-between'>
            <DialogTitle className='font-heading text-h4 font-semibold tracking-[-0.48px] text-white'>
              Share
            </DialogTitle>
            <DialogClose className='text-white/70 transition-colors hover:text-white'>
              <X className='size-5' />
              <span className='sr-only'>Close</span>
            </DialogClose>
          </div>

          <div className='overflow-hidden rounded-2xl border border-white/8'>
            <div className='aspect-442/221 w-full overflow-hidden'>
              <Image
                src={post.cover}
                alt={post.title}
                width={442}
                height={221}
                unoptimized
                className='size-full object-cover'
              />
            </div>
            <div className='flex flex-col gap-3 px-6 py-5'>
              <h3 className='font-heading text-2xl font-semibold tracking-[-0.968px] text-white'>
                {post.title}
              </h3>
              <p className='line-clamp-2 text-sm text-text-muted'>
                {post.excerpt}
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4'>
            <button
              type='button'
              onClick={copyLink}
              className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-semibold text-[#0d1111] transition-colors hover:bg-primary-600 lg:w-auto'
            >
              <Link2 className='size-5' />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>

            {shareTargets(url, post.title).map(target => (
              <a
                key={target.key}
                href={target.href}
                target='_blank'
                rel='noreferrer'
                aria-label={`Share on ${target.label}`}
                className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-soft px-4 py-3 text-white transition-colors hover:bg-white/10 lg:w-auto'
              >
                {target.icon}
                <span className='lg:hidden'>{target.label}</span>
              </a>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
