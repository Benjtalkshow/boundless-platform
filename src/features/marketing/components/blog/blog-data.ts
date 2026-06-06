export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Cover image path under /public, reused as the article banner. */
  cover: string;
  /** Topic tags; the card shows the first two and rolls the rest into "+N". */
  tags: string[];
  /** Category value matched against the filter tabs. */
  category: string;
  author: string;
  /** Author avatar path under /public. */
  authorAvatar: string;
  /** Short display date for cards, e.g. "May 2026". */
  date: string;
  /** Full publish date for the article header, e.g. "15 March 2026". */
  publishedDate: string;
  /** Reading time label, e.g. "4 mins Read". */
  readTime: string;
}

/** Filter tabs shown above the blog grid. `all` shows every post. */
export const BLOG_CATEGORIES = [
  { value: 'all', label: 'All Posts' },
  { value: 'challenge', label: 'Challenge' },
  { value: 'community', label: 'Community' },
  { value: 'crowdfunding', label: 'Crowdfunding' },
  { value: 'fintech-defi', label: 'Fintech/DeFI' },
  { value: 'events', label: 'Events' },
  { value: 'funding', label: 'Funding' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'stellar', label: 'Stellar' },
] as const;

const HACKATHON_EXCERPT =
  'Four days of building wrapped on May 16th, 2026. Conductor, Crypt, and GoPadi took the top three places, with five honorable mentions and four Showcase recognitions.';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'boundless-trustless-work-hackathon-winners',
    title: 'Boundless x Trustless Work Hackathon: Winners and Recognitions',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post1.svg',
    tags: ['Hackathon', 'Web 3', 'Stellar', 'Community'],
    category: 'hackathon',
    author: 'David Emulo',
    authorAvatar: '/team/team1.svg',
    date: 'May 2026',
    publishedDate: '15 March 2026',
    readTime: '4 mins Read',
  },
  {
    slug: 'meet-the-minds-behind-boundless',
    title: 'Meet the Minds Behind Boundless: Why We Built It',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post2.svg',
    tags: ['Community', 'Web 3', 'Stellar', 'Funding'],
    category: 'community',
    author: 'David Emulo',
    authorAvatar: '/team/team2.svg',
    date: 'May 2026',
    publishedDate: '8 March 2026',
    readTime: '4 mins Read',
  },
  {
    slug: 'build-the-future-of-web3-on-stellar',
    title: 'Build the Future of Web3 on Stellar with Boundless',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post3.svg',
    tags: ['Hackathon', 'Web 3', 'Stellar', 'Events'],
    category: 'hackathon',
    author: 'David Emulo',
    authorAvatar: '/team/team3.svg',
    date: 'May 2026',
    publishedDate: '1 March 2026',
    readTime: '4 mins Read',
  },
  {
    slug: 'crowdfunding-comes-to-boundless',
    title: 'Crowdfunding Comes to Boundless: Fund Ideas Trustlessly',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post2.svg',
    tags: ['Crowdfunding', 'Funding', 'Stellar'],
    category: 'crowdfunding',
    author: 'David Emulo',
    authorAvatar: '/team/team4.svg',
    date: 'Apr 2026',
    publishedDate: '20 April 2026',
    readTime: '5 mins Read',
  },
  {
    slug: 'inside-the-boundless-community',
    title: 'Inside the Boundless Community: Builders, Backers, and Mentors',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post1.svg',
    tags: ['Community', 'Events', 'Web 3'],
    category: 'community',
    author: 'David Emulo',
    authorAvatar: '/team/team1.svg',
    date: 'Apr 2026',
    publishedDate: '5 April 2026',
    readTime: '3 mins Read',
  },
  {
    slug: 'defi-on-stellar-explained',
    title: 'DeFi on Stellar, Explained: Rails for Global Opportunity',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post3.svg',
    tags: ['Fintech/DeFI', 'Stellar', 'Web 3'],
    category: 'fintech-defi',
    author: 'David Emulo',
    authorAvatar: '/team/team2.svg',
    date: 'Mar 2026',
    publishedDate: '18 March 2026',
    readTime: '6 mins Read',
  },
  {
    slug: 'grant-funding-for-builders',
    title: 'Grant Funding for Builders: How to Apply on Boundless',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post1.svg',
    tags: ['Funding', 'Challenge', 'Community'],
    category: 'funding',
    author: 'David Emulo',
    authorAvatar: '/team/team3.svg',
    date: 'Mar 2026',
    publishedDate: '12 March 2026',
    readTime: '4 mins Read',
  },
  {
    slug: 'recap-boundless-community-call',
    title: 'Recap: The Boundless Community Call and What Ships Next',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post2.svg',
    tags: ['Events', 'Community', 'Stellar'],
    category: 'events',
    author: 'David Emulo',
    authorAvatar: '/team/team4.svg',
    date: 'Feb 2026',
    publishedDate: '22 February 2026',
    readTime: '3 mins Read',
  },
  {
    slug: 'the-next-boundless-challenge',
    title: 'The Next Boundless Challenge: Ship, Compete, and Win',
    excerpt: HACKATHON_EXCERPT,
    cover: '/blog/blog-post3.svg',
    tags: ['Challenge', 'Hackathon', 'Web 3'],
    category: 'challenge',
    author: 'David Emulo',
    authorAvatar: '/team/team1.svg',
    date: 'Feb 2026',
    publishedDate: '9 February 2026',
    readTime: '5 mins Read',
  },
];

/** Look up a single post by its slug. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
