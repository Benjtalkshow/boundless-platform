import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { BlogPost } from './blog-data';

interface BlogCardProps {
  post: BlogPost;
  /** Max tags shown before collapsing the remainder into a "+N" badge. */
  maxTags?: number;
  className?: string;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className='rounded border-[0.5px] border-primary-500 px-2.5 py-1 text-[11px] text-primary-500'>
      {children}
    </span>
  );
}

/** Blog index card: cover, tags, title, excerpt, and author/read-time meta. */
export function BlogCard({ post, maxTags = 2, className }: BlogCardProps) {
  const visibleTags = post.tags.slice(0, maxTags);
  const overflow = post.tags.length - visibleTags.length;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex flex-col rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none',
        className
      )}
    >
      <div className='relative h-[201px] w-full overflow-hidden rounded-xl'>
        <Image
          src={post.cover}
          alt={post.title}
          fill
          unoptimized
          sizes='(min-width: 1024px) 402px, 100vw'
          className='object-cover transition-transform duration-300 group-hover:scale-[1.02]'
        />
      </div>

      <div className='flex flex-col gap-5 py-5'>
        <div className='flex items-center gap-2'>
          {visibleTags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {overflow > 0 ? <Tag>+{overflow}</Tag> : null}
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='font-heading text-[22px] font-semibold tracking-[-0.88px] text-white'>
            {post.title}
          </h3>
          <p className='line-clamp-2 text-sm text-text-muted'>{post.excerpt}</p>
        </div>
      </div>

      <div className='flex items-center justify-between py-4'>
        <div className='flex items-center gap-2 text-[13px] text-text-muted'>
          <span>By {post.author}</span>
          <span className='size-1.5 rounded-full bg-text-muted' />
          <span>{post.date}</span>
        </div>
        <div className='flex items-center gap-1 text-[13px] text-text-muted'>
          <Clock className='size-5' />
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
