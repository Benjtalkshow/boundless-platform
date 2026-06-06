'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { BlogCard } from './blog-card';
import type { BlogPost } from './blog-data';

/**
 * "Read more stories" rail. Reuses the listing `BlogCard`. On desktop the cards
 * sit in a horizontal scroller driven by the prev/next arrows; on mobile they
 * stack with a "See more Articles" link to the index.
 */
export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 32 : track.clientWidth;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  if (posts.length === 0) return null;

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between gap-4'>
        <h2 className='font-heading text-h2 font-semibold tracking-[-1.28px] text-white'>
          Read more stories
        </h2>

        <div className='hidden items-center gap-3 lg:flex'>
          <button
            type='button'
            aria-label='Previous stories'
            onClick={() => scroll(-1)}
            className='flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
          >
            <ChevronLeft className='size-5' />
          </button>
          <button
            type='button'
            aria-label='Next stories'
            onClick={() => scroll(1)}
            className='flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10'
          >
            <ChevronRight className='size-5' />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className='scrollbar-hide flex flex-col gap-8 lg:flex-row lg:overflow-x-auto'
      >
        {posts.map(post => (
          <div
            key={post.slug}
            data-card
            className='lg:w-[calc((100%-64px)/3)] lg:shrink-0'
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      <Link
        href='/blog'
        className='flex items-center justify-center gap-2 font-medium text-primary transition-colors hover:text-primary-500 lg:hidden'
      >
        See more Articles
        <ArrowRight className='size-5' />
      </Link>
    </div>
  );
}
