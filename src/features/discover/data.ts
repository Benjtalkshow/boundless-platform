/**
 * Discovery surface category list. The full discovery view consumes the live
 * `/api/opportunities` endpoint via the `useOpportunities` hook; this file
 * only owns the static category vocabulary used by the category tabs.
 *
 * The selected category is passed to the backend as a single-element `tags`
 * filter; pillars match it case-insensitively against their own tag
 * vocabulary. The "All" sentinel skips the tags filter.
 */

export const OPPORTUNITY_CATEGORIES = [
  'All',
  'Design',
  'Development',
  'Content',
  'Growth',
  'Community',
  'Others',
] as const;

export type OpportunityCategory = (typeof OPPORTUNITY_CATEGORIES)[number];
