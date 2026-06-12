import { env } from '@/lib/env';

/**
 * Canonical site constants for SEO (metadata, sitemap, robots, structured
 * data). The public URL comes from the validated `NEXT_PUBLIC_APP_URL`; in
 * production set it to the real domain so absolute links resolve correctly.
 */
export const SITE_URL = env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const SITE_NAME = 'Boundless';

export const SITE_DESCRIPTION =
  'Boundless is the platform for hackathons, bounties, grants, and crowdfunding on Stellar.';

/** Official profiles, used for Organization `sameAs` structured data. */
export const SITE_SOCIALS = [
  'https://x.com/boundless_fi',
  'https://github.com/boundless-fi',
  'https://discord.gg/boundless',
];
