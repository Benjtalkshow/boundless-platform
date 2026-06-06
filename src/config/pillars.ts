/**
 * The four Boundless pillars as a single source of truth for the discovery
 * surface (the `(discover)` route group). Bounties, hackathons, and grants list
 * "opportunities" you compete for or get funded by; crowdfunding lists
 * "projects" you back, so its noun and heading differ on purpose.
 */

export type PillarKey = 'bounties' | 'hackathons' | 'crowdfunding' | 'grants';

export interface Pillar {
  key: PillarKey;
  /** Tab label in the discovery nav. */
  label: string;
  /** Top-level route, also the target of the marketing Products menu. */
  href: string;
  /** Plural, lowercase noun for the listed items. */
  itemNoun: string;
  /** Page heading for this pillar's discovery view. */
  heading: string;
  /** Supporting line under the heading. */
  subtext: string;
}

export const PILLARS: readonly Pillar[] = [
  {
    key: 'bounties',
    label: 'Bounties',
    href: '/bounties',
    itemNoun: 'opportunities',
    heading: 'Discover Opportunities',
    subtext: 'Find bounties that match your skills and compete for rewards.',
  },
  {
    key: 'hackathons',
    label: 'Hackathons',
    href: '/hackathons',
    itemNoun: 'opportunities',
    heading: 'Discover Hackathons',
    subtext: 'Join hackathons, team up, and ship to win.',
  },
  {
    key: 'crowdfunding',
    label: 'Crowdfunding',
    href: '/crowdfunding',
    itemNoun: 'projects',
    heading: 'Discover Projects',
    subtext: 'Back projects you believe in and help them reach their goals.',
  },
  {
    key: 'grants',
    label: 'Grants',
    href: '/grants',
    itemNoun: 'opportunities',
    heading: 'Discover Grants',
    subtext: 'Apply for funding to build what matters.',
  },
];

/** Combined discovery view spanning every pillar. */
export const EXPLORE = {
  href: '/explore',
  heading: 'Explore Boundless',
  subtext: 'Browse opportunities and projects across the ecosystem.',
  itemNoun: 'listings',
} as const;

export function getPillar(key: PillarKey): Pillar {
  const pillar = PILLARS.find(item => item.key === key);
  if (!pillar) throw new Error(`Unknown pillar: ${key}`);
  return pillar;
}
