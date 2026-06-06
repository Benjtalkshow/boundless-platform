import type { OpportunitySort, OpportunityTypeFilter } from '../types';

export interface OpportunityListFilters {
  type: OpportunityTypeFilter;
  status?: string;
  search?: string;
  tags?: readonly string[];
  sort: OpportunitySort;
  limit: number;
}

/**
 * Query keys for the discovery feature. Co-locating them prevents drift between
 * the hook and any imperative `queryClient.invalidateQueries` calls.
 */
export const opportunityKeys = {
  all: ['opportunities'] as const,
  list: (filters: OpportunityListFilters) =>
    [...opportunityKeys.all, 'list', filters] as const,
};
