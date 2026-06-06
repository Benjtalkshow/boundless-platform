import { describe, expect, it } from 'vitest';

import type { OpportunityListItem } from '../types';
import { toCardOpportunity } from './to-card-opportunity';

function makeDto(
  overrides: Partial<OpportunityListItem> = {}
): OpportunityListItem {
  return {
    type: 'BOUNTY',
    id: 'b_1',
    slug: null,
    title: 'Build a DAO dashboard',
    summary: 'Help us ship governance UX.',
    coverImageUrl: null,
    organizationId: 'org_1',
    organizationName: 'Boundless Labs',
    organizationLogoUrl: null,
    status: 'open',
    totalRewardUsdc: '5000.00',
    fundedAmountUsdc: null,
    publishedAt: '2026-05-01T00:00:00.000Z',
    startsAt: null,
    endsAt: '2026-06-30T00:00:00.000Z',
    participantCount: 42,
    tags: ['stellar', 'defi'],
    detailUrl: '/bounties/b_1',
    isFeatured: false,
    ...overrides,
  };
}

const FROZEN_NOW = new Date('2026-06-26T00:00:00.000Z');

describe('toCardOpportunity', () => {
  it('maps a bounty DTO into the card view model', () => {
    const view = toCardOpportunity(makeDto(), 1, FROZEN_NOW);

    expect(view).toMatchObject({
      id: 'b_1',
      org: 'Boundless Labs',
      index: 1,
      status: 'open',
      title: 'Build a DAO dashboard',
      category: 'stellar',
      participants: 42,
      mode: 'Bounty',
      comments: 0,
      endsIn: '4D:00H:00M',
      reward: { amount: 5000, currency: 'USDC' },
      detailUrl: '/bounties/b_1',
      isFeatured: false,
    });
  });

  it('falls back to "Boundless" when the row has no organization', () => {
    const view = toCardOpportunity(
      makeDto({ organizationName: null, organizationId: null }),
      1,
      FROZEN_NOW
    );

    expect(view.org).toBe('Boundless');
  });

  it('buckets unknown status into "open" so the chip never blanks', () => {
    const view = toCardOpportunity(
      makeDto({ status: 'some_new_pillar_status' }),
      1,
      FROZEN_NOW
    );

    expect(view.status).toBe('open');
  });

  it('buckets review-ish statuses into "review"', () => {
    expect(toCardOpportunity(makeDto({ status: 'voting' }), 1).status).toBe(
      'review'
    );
    expect(toCardOpportunity(makeDto({ status: 'in_review' }), 1).status).toBe(
      'review'
    );
  });

  it('uses pillar name as category when the row has no tags', () => {
    const view = toCardOpportunity(
      makeDto({ type: 'HACKATHON', tags: [] }),
      1,
      FROZEN_NOW
    );
    expect(view.category).toBe('Hackathon');
    expect(view.mode).toBe('Hackathon');
  });

  it('returns reward.amount = 0 when totalRewardUsdc is null', () => {
    const view = toCardOpportunity(
      makeDto({ totalRewardUsdc: null }),
      1,
      FROZEN_NOW
    );
    expect(view.reward.amount).toBe(0);
  });

  it('returns endsIn = "" for past deadlines', () => {
    const view = toCardOpportunity(
      makeDto({ endsAt: '2025-01-01T00:00:00.000Z' }),
      1,
      FROZEN_NOW
    );
    expect(view.endsIn).toBe('');
  });
});
