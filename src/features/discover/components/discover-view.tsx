'use client';

import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useDeferredValue, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DURATION,
  EASE_OUT,
  STAGGER,
  STAGGER_CAP,
  transitions,
} from '@/lib/motion';
import { cn } from '@/lib/utils';

import { useOpportunities } from '../api/use-opportunities';
import { OPPORTUNITY_CATEGORIES } from '../data';
import { toCardOpportunity } from '../lib/to-card-opportunity';
import type { OpportunityTypeFilter } from '../types';
import { CategoryTabs } from './category-tabs';
import { DiscoverHeader } from './discover-header';
import { DiscoverToolbar } from './discover-toolbar';
import {
  EMPTY_FILTERS,
  FilterRail,
  type FilterValue,
  hasActiveFilters,
} from './filter-rail';
import { FilterSheet } from './filter-sheet';
import { OpportunityCard } from './opportunity-card';
import { OpportunityCardSkeleton } from './opportunity-card-skeleton';

/**
 * Discovery surface: header, toolbar, filter rail, and the result grid. Drives
 * the unified `/api/opportunities` endpoint via `useOpportunities`. The
 * `type` prop maps to the backend's pillar filter; the pillar pages pass
 * `bounty`/`hackathon`/`grant`/`crowdfunding`, and the Explore page leaves it
 * at the default `all`.
 *
 * Search is sent to the backend (debounced via `useDeferredValue`). The
 * category tab translates to the backend `tags` filter; unknown categories
 * naturally return zero results because the backend matches case-insensitively
 * against each pillar's own tag vocabulary. The filter rail's broader filter
 * state is not yet wired to the backend; treat the rail as UI scaffolding
 * until the corresponding query params land.
 */
export function DiscoverView({
  heading,
  subtext,
  type = 'all',
}: {
  heading: string;
  subtext: string;
  type?: OpportunityTypeFilter;
}) {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterValue>(EMPTY_FILTERS);

  const deferredQuery = useDeferredValue(query);
  const search = deferredQuery.trim() === '' ? undefined : deferredQuery.trim();
  const tags =
    category === 'All' ? undefined : ([category.toLowerCase()] as const);

  const opportunitiesQuery = useOpportunities({ type, search, tags });

  const items = useMemo(
    () =>
      (opportunitiesQuery.data?.pages ?? []).flatMap((page, pageIndex) =>
        page.items.map((dto, itemIndex) =>
          toCardOpportunity(dto, pageIndex * page.items.length + itemIndex + 1)
        )
      ),
    [opportunitiesQuery.data]
  );

  // The backend returns the filter-aware total on every page (cursor-blind),
  // so any loaded page's `total` is the canonical count. Hide the count while
  // the first page is still loading rather than showing zero.
  const total = opportunitiesQuery.data?.pages[0]?.total;

  const filtersActive = hasActiveFilters(filters);
  const resetFilters = () => setFilters(EMPTY_FILTERS);

  return (
    <div className='flex flex-col gap-6'>
      <DiscoverHeader heading={heading} subtext={subtext} count={total} />

      <DiscoverToolbar
        filtersOpen={filtersOpen}
        onToggleFilters={() => setFiltersOpen(value => !value)}
        onOpenMobileFilters={() => setMobileFilters(true)}
        filtersActive={filtersActive}
        onReset={resetFilters}
        query={query}
        onQueryChange={setQuery}
      />

      <div className='flex gap-6'>
        <AnimatePresence initial={false}>
          {filtersOpen ? (
            <motion.aside
              key='filter-rail'
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 240 }}
              exit={{ opacity: 0, width: 0 }}
              transition={transitions.base}
              className='sticky top-24 hidden shrink-0 self-start overflow-hidden lg:block'
            >
              <div className='max-h-[calc(100vh-7rem)] w-60 overflow-y-auto pr-1'>
                <FilterRail
                  idPrefix='desktop'
                  value={filters}
                  onChange={setFilters}
                />
              </div>
            </motion.aside>
          ) : null}
        </AnimatePresence>

        <div className='min-w-0 flex-1'>
          <CategoryTabs
            categories={OPPORTUNITY_CATEGORIES}
            active={category}
            onSelect={setCategory}
          />

          <ResultGrid
            items={items}
            filtersOpen={filtersOpen}
            isPending={opportunitiesQuery.isPending}
            isError={opportunitiesQuery.isError}
            errorMessage={opportunitiesQuery.error?.message}
            isPlaceholderData={opportunitiesQuery.isPlaceholderData}
            hasNextPage={opportunitiesQuery.hasNextPage}
            isFetchingNextPage={opportunitiesQuery.isFetchingNextPage}
            onLoadMore={() => opportunitiesQuery.fetchNextPage()}
          />
        </div>
      </div>

      <FilterSheet
        open={mobileFilters}
        onOpenChange={setMobileFilters}
        value={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />
    </div>
  );
}

interface ResultGridProps {
  items: ReturnType<typeof toCardOpportunity>[];
  filtersOpen: boolean;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  isPlaceholderData: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

function ResultGrid({
  items,
  filtersOpen,
  isPending,
  isError,
  errorMessage,
  isPlaceholderData,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: ResultGridProps) {
  const gridClass = cn(
    'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
    filtersOpen ? '2xl:grid-cols-3' : 'xl:grid-cols-3'
  );

  if (isError && items.length === 0) {
    return (
      <p className='mt-10 text-center text-sm text-destructive'>
        {errorMessage ?? 'Failed to load opportunities. Please try again.'}
      </p>
    );
  }

  return (
    <div className='mt-6'>
      {isPending ? (
        <div className={gridClass}>
          {Array.from({ length: 6 }).map((_, index) => (
            <OpportunityCardSkeleton key={index} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className='py-10 text-center text-sm text-muted-foreground'>
          No opportunities match your filters yet.
        </p>
      ) : (
        <div
          className={cn(
            gridClass,
            isPlaceholderData &&
              'pointer-events-none opacity-60 transition-opacity duration-200'
          )}
        >
          <AnimatePresence mode='popLayout'>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                className='min-w-0'
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: DURATION.base,
                    ease: EASE_OUT,
                    delay: Math.min(index, STAGGER_CAP) * STAGGER,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 8,
                  transition: { duration: DURATION.fast, ease: EASE_OUT },
                }}
                transition={{ duration: DURATION.base, ease: EASE_OUT }}
              >
                <OpportunityCard opportunity={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {hasNextPage && items.length > 0 ? (
        <div className='mt-8 flex justify-center'>
          <Button
            appearance='outline'
            intent='secondary'
            shape='pill'
            size='small'
            onClick={onLoadMore}
            loading={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading' : 'Load More'}
            {isFetchingNextPage ? null : (
              <ChevronDown className='size-4' strokeWidth={1.75} aria-hidden />
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
