'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Tabs } from '@/components/ui/tabs';

import { Section } from '../section';
import { BlogCard } from './blog-card';
import { BLOG_CATEGORIES, BLOG_POSTS } from './blog-data';

const PAGE_SIZE = 3;

const SORTS = [
  { value: 'latest', label: 'Lastest' },
  { value: 'oldest', label: 'Oldest' },
] as const;

type Sort = (typeof SORTS)[number]['value'];

/** Blog index: filter tabs, sort control, responsive card grid, and paging. */
export function BlogList() {
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<Sort>('latest');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [mobileCount, setMobileCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = BLOG_POSTS.filter(
      post =>
        (category === 'all' || post.category === category) &&
        (q === '' || post.title.toLowerCase().includes(q))
    );
    return sort === 'oldest' ? [...list].reverse() : list;
  }, [category, sort, query]);

  const resetPaging = () => {
    setPage(1);
    setMobileCount(PAGE_SIZE);
  };

  const onCategoryChange = (value: string) => {
    setCategory(value);
    resetPaging();
  };

  const onSortChange = (value: Sort) => {
    setSort(value);
    resetPaging();
  };

  const onQueryChange = (value: string) => {
    setQuery(value);
    resetPaging();
  };

  const desktopPosts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const mobilePosts = filtered.slice(0, mobileCount);
  const sortLabel = SORTS.find(s => s.value === sort)?.label;
  const categoryLabel =
    BLOG_CATEGORIES.find(c => c.value === category)?.label ?? 'All Posts';
  const hasMoreMobile = mobileCount < filtered.length;

  const sortMenu = (
    <DropdownMenuContent align='end'>
      {SORTS.map(option => (
        <DropdownMenuItem
          key={option.value}
          onSelect={() => onSortChange(option.value)}
        >
          {option.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );

  return (
    <Section className='py-10 lg:py-12'>
      {/* Desktop: full tab row + sort. */}
      <div className='hidden items-center justify-between gap-4 lg:flex'>
        <Tabs
          items={BLOG_CATEGORIES.map(c => ({ value: c.value, label: c.label }))}
          value={category}
          onValueChange={onCategoryChange}
        />

        <DropdownMenu>
          <DropdownMenuTrigger className='flex shrink-0 items-center gap-3 rounded-full border border-white px-[25px] py-2.5 text-[15px] font-semibold tracking-[0.625px] whitespace-nowrap text-white outline-none focus-visible:ring-2 focus-visible:ring-primary/50'>
            {sortLabel}
            <ChevronDown className='size-5' />
          </DropdownMenuTrigger>
          {sortMenu}
        </DropdownMenu>
      </div>

      {/* Mobile / tablet: category dropdown + search + sort. */}
      <div className='flex items-center justify-between gap-3 lg:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium whitespace-nowrap text-[#1c1e13] outline-none focus-visible:ring-2 focus-visible:ring-primary/50'>
            {categoryLabel}
            <ChevronDown className='size-5' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {BLOG_CATEGORIES.map(c => (
              <DropdownMenuItem
                key={c.value}
                onSelect={() => onCategoryChange(c.value)}
              >
                {c.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='flex items-center gap-3'>
          <button
            type='button'
            aria-label='Search posts'
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(open => !open)}
            className='flex items-center rounded-full border border-white/20 p-2.5 text-white transition-colors hover:bg-white/10'
          >
            <Search className='size-5' />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className='flex shrink-0 items-center gap-3 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white outline-none focus-visible:ring-2 focus-visible:ring-primary/50'>
              {sortLabel}
              <ChevronDown className='size-5' />
            </DropdownMenuTrigger>
            {sortMenu}
          </DropdownMenu>
        </div>
      </div>

      {searchOpen ? (
        <div className='mt-4 lg:hidden'>
          <Input
            type='search'
            autoFocus
            value={query}
            onChange={event => onQueryChange(event.target.value)}
            placeholder='Search posts'
            className='h-11 rounded-full border-white/20 px-5'
          />
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className='mt-16 text-center text-text-muted'>
          No posts match your filters yet.
        </p>
      ) : (
        <>
          {/* Mobile / tablet: cumulative list revealed by "View more". */}
          <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:hidden'>
            {mobilePosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {hasMoreMobile ? (
            <div className='mt-8 flex justify-center lg:hidden'>
              <button
                type='button'
                onClick={() => setMobileCount(count => count + PAGE_SIZE)}
                className='rounded-full border border-white px-7 py-2.5 text-[15px] font-semibold tracking-[0.625px] text-white transition-colors hover:bg-white/10'
              >
                View more
              </button>
            </div>
          ) : null}

          {/* Desktop: paginated grid. */}
          <div className='mt-8 hidden gap-8 lg:grid lg:grid-cols-3'>
            {desktopPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            totalItems={filtered.length}
            onPageChange={setPage}
            className='mt-10 hidden justify-center lg:flex'
          />
        </>
      )}
    </Section>
  );
}
