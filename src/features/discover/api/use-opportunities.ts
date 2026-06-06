'use client';

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { apiClient, unwrapData } from '@/lib/api';

import type { OpportunityListResponse } from '../types';
import { opportunityKeys, type OpportunityListFilters } from './keys';

interface UseOpportunitiesOptions extends Omit<
  OpportunityListFilters,
  'sort' | 'limit'
> {
  sort?: OpportunityListFilters['sort'];
  limit?: number;
}

const DEFAULT_LIMIT = 12;
const DEFAULT_SORT: OpportunityListFilters['sort'] = 'newest';

/**
 * Cursor-paginated feed for `GET /api/opportunities`. Drives the discovery
 * surface for all four pillars and the unified Explore view; pass
 * `type="all"` to fan out.
 *
 * The hook uses `useInfiniteQuery` so the existing `Load More` button can
 * stay in place: render `data.pages.flatMap((p) => p.items)` for the grid,
 * call `fetchNextPage()` when the button is clicked, and gate it on
 * `hasNextPage`.
 */
export function useOpportunities({
  type,
  status,
  search,
  tags,
  sort = DEFAULT_SORT,
  limit = DEFAULT_LIMIT,
}: UseOpportunitiesOptions) {
  const filters: OpportunityListFilters = {
    type,
    status,
    search,
    tags,
    sort,
    limit,
  };

  return useInfiniteQuery({
    queryKey: opportunityKeys.list(filters),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }): Promise<OpportunityListResponse> =>
      unwrapData(
        await apiClient.GET('/api/opportunities', {
          params: {
            query: {
              type,
              ...(status ? { status } : {}),
              ...(search ? { search } : {}),
              ...(tags && tags.length > 0 ? { tags: tags.join(',') } : {}),
              sort,
              ...(pageParam ? { cursor: pageParam } : {}),
              limit,
            },
          },
        })
      ),
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    // Keep the current results on screen while a new filter/search/pillar query
    // loads, so the grid crossfades instead of blanking to skeletons.
    placeholderData: keepPreviousData,
  });
}
