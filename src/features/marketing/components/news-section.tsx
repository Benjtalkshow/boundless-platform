import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { BlogCard } from './blog/blog-card';
import { BLOG_POSTS } from './blog/blog-data';
import { Section } from './section';

// Preview the three latest posts; the rest live on /blog.
const FEATURED = BLOG_POSTS.slice(0, 3);

function MoreLink({ className }: { className?: string }) {
  return (
    <Link
      href='/blog'
      className={cn(
        'inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-400',
        className
      )}
    >
      See more Articles
      <ArrowRight className='size-5' />
    </Link>
  );
}

/** Home "Insights, Stories & Opportunities": heading + three blog previews. */
export function NewsSection() {
  return (
    <Section
      className='bg-ink bg-[linear-gradient(180deg,rgba(46,237,170,0.08)_0%,rgba(13,17,17,0)_50.07%)]'
      innerClassName='flex flex-col gap-8'
    >
      <div className='flex items-center justify-between gap-6'>
        <h2 className='font-heading text-3xl leading-none font-semibold tracking-tight text-primary-50 sm:text-4xl lg:text-5xl lg:tracking-[-1.92px]'>
          Insights, Stories &amp; Opportunities
        </h2>
        <MoreLink className='hidden shrink-0 lg:inline-flex' />
      </div>

      <div className='grid gap-8 lg:grid-cols-3'>
        {FEATURED.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <MoreLink className='self-center lg:hidden' />
    </Section>
  );
}
