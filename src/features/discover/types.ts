import type { Schemas } from '@/lib/api/types';

/**
 * Server DTO for a single opportunity row, straight from the backend.
 * Re-exported here so feature code does not reach into `@/lib/api` directly.
 */
export type OpportunityListItem = Schemas['OpportunityListItemDto'];

/** Pillar discriminator returned by the backend. */
export type OpportunityType = Schemas['OpportunityType'];

/** Cursor-paginated envelope for the `/api/opportunities` endpoint. */
export type OpportunityListResponse = Schemas['OpportunityListResponseDto'];

/** Sort modes supported by the backend. */
export type OpportunitySort = 'newest' | 'deadline' | 'prize_desc';

/** Pillar filter accepted by `GET /api/opportunities?type=`. */
export type OpportunityTypeFilter =
  | 'all'
  | 'bounty'
  | 'hackathon'
  | 'grant'
  | 'crowdfunding';

/**
 * Card view model. The discovery card renders against this rather than the
 * raw DTO so the network shape and the visual shape can evolve independently.
 */
export type OpportunityCardStatus =
  | 'open'
  | 'applications'
  | 'review'
  | 'completed';

export interface OpportunityCardView {
  id: string;
  org: string;
  /** Display number rendered as `#42` next to the org. Pillar-local sequence. */
  index: number;
  status: OpportunityCardStatus;
  title: string;
  category: string;
  participants: number;
  /** Sub-mode label or pillar name. Empty string when nothing better is available. */
  mode: string;
  comments: number;
  /** Pre-formatted countdown like `4D:22H:49M`, or an empty string when no deadline. */
  endsIn: string;
  reward: { amount: number; currency: string };
  /** Detail page path so cards can link out. */
  detailUrl: string;
  isFeatured: boolean;
}
