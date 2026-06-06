import type {
  OpportunityCardStatus,
  OpportunityCardView,
  OpportunityListItem,
} from '../types';
import { formatTimeRemaining } from './format-time-remaining';

/**
 * Map any pillar-specific lowercase status string to the four-bucket status
 * the card chip understands. Unknown values fall back to `open` so a typo on
 * the backend never blanks the card.
 */
function bucketStatus(raw: string): OpportunityCardStatus {
  const value = raw.trim().toLowerCase();
  if (
    value === 'completed' ||
    value === 'closed' ||
    value === 'finished' ||
    value === 'cancelled'
  ) {
    return 'completed';
  }
  if (
    value === 'review' ||
    value === 'in_review' ||
    value === 'judging' ||
    value === 'voting'
  ) {
    return 'review';
  }
  if (
    value === 'applications' ||
    value === 'application' ||
    value === 'submitted_for_review' ||
    value === 'review_approved'
  ) {
    return 'applications';
  }
  return 'open';
}

function pillarLabel(type: OpportunityListItem['type']): string {
  switch (type) {
    case 'BOUNTY':
      return 'Bounty';
    case 'HACKATHON':
      return 'Hackathon';
    case 'GRANT':
      return 'Grant';
    case 'CROWDFUNDING':
      return 'Crowdfunding';
  }
}

function rewardAmount(raw: string | null): number {
  if (raw === null) return 0;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Adapt a server `OpportunityListItem` into the view model the card consumes.
 *
 * Conventions:
 *   - `org` falls back to "Boundless" when the row lacks an organization.
 *   - `index` is the row's 1-based position in the page, supplied by the caller.
 *   - `comments` is 0 because the backend does not aggregate it yet.
 *   - `category` is the first tag, the pillar name otherwise.
 *   - `mode` is the pillar name today; the bounty pillar will swap in its sub-mode label later.
 */
export function toCardOpportunity(
  dto: OpportunityListItem,
  positionInPage: number,
  now?: Date
): OpportunityCardView {
  return {
    id: dto.id,
    org: dto.organizationName ?? 'Boundless',
    index: positionInPage,
    status: bucketStatus(dto.status),
    title: dto.title,
    category: dto.tags[0] ?? pillarLabel(dto.type),
    participants: dto.participantCount ?? 0,
    mode: pillarLabel(dto.type),
    comments: 0,
    endsIn: formatTimeRemaining(dto.endsAt, now),
    reward: {
      amount: rewardAmount(dto.totalRewardUsdc),
      currency: 'USDC',
    },
    detailUrl: dto.detailUrl,
    isFeatured: dto.isFeatured,
  };
}
