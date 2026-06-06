import { ArrowRight, Link2, Share2 } from 'lucide-react';
import Image from 'next/image';

import { SocialGlyph } from '@/components/layout/brand-icons';

import { HeroBackground } from '../hero-background';
import { Section } from '../section';
import { BLOG_POSTS, type BlogPost } from './blog-data';
import { RelatedPosts } from './related-posts';
import { ShareDialog } from './share-dialog';

// The article body below is demo content shared across posts; real articles
// would supply their own rich body (CMS/MDX) keyed off the slug.
const INTRO = [
  'The Boundless x Trustless Work Hackathon brought together builders from across the world to design, build, and ship tools that push forward open, trustless coordination.',
  'Across a fast-moving build cycle, teams explored new ideas in automation, AI-assisted workflows, decentralized collaboration, and permissionless task execution — all within the Boundless ecosystem.',
  'This recap highlights the top projects, standout builders, and the patterns shaping what’s next.',
];

const WINNING_PROJECTS = [
  {
    title: '🥇 Best Overall — FlowTrust',
    body: 'A trustless coordination layer for executing tasks between users, builders, and automated agents. FlowTrust stood out for turning complex workflows into simple, verifiable execution paths — making collaboration across strangers seamless and transparent.',
  },
  {
    title: '🥈 Best AI Integration — Boundless Agent',
    body: 'An AI execution system that helps users break down tasks, assign work, and automatically coordinate outputs across contributors. It demonstrated how AI can act as a bridge between intent and execution inside decentralized systems.',
  },
  {
    title: '🥉 Best Builder Tool — TaskKit',
    body: 'A lightweight toolkit for creating, tracking, and verifying bounties and micro-tasks inside Boundless. TaskKit made it easy for teams to spin up structured work flows in minutes.',
  },
];

const SPECIAL_RECOGNITIONS = [
  {
    label: '🔹 Most Innovative Idea — ProofWork',
    body: 'A system that verifies contributions in real time and attaches proof of work to every completed task.',
  },
  {
    label: '🔹 Best UX — FlowBoard',
    body: 'A clean, intuitive dashboard for managing bounties, contributors, and workflow pipelines.',
  },
  {
    label: '🔹 Community Choice — OpenTasks',
    body: 'A fully transparent bounty board where the community can propose, fund, and complete tasks together.',
  },
];

const KEY_THEMES = [
  {
    label: 'AI as a Coordinator, Not Just a Tool',
    body: 'Builders are moving from “AI assistance” to AI-driven task coordination and workflow execution.',
  },
  {
    label: 'Trustless Collaboration',
    body: 'Teams focused on removing dependency on trust by using verifiable actions, proofs, and transparent execution systems.',
  },
  {
    label: 'Bounties as Infrastructure',
    body: 'Work is shifting from static job structures to dynamic, modular bounty-based contribution systems.',
  },
  {
    label: 'Builder-First Experience',
    body: 'The strongest projects focused heavily on simplicity — making it easy for anyone to create, contribute, and ship.',
  },
];

const SHARE_LINKS = [
  {
    key: 'telegram',
    label: 'Telegram',
    icon: (className: string) => (
      <SocialGlyph name='telegram' className={className} />
    ),
  },
  {
    key: 'x',
    label: '(formerly Twitter)',
    icon: (className: string) => <SocialGlyph name='x' className={className} />,
  },
  {
    key: 'others',
    label: 'Others',
    icon: (className: string) => <Link2 className={className} />,
  },
] as const;

function Divider() {
  return <div aria-hidden className='h-px w-full bg-white/10' />;
}

function H5({ children }: { children: React.ReactNode }) {
  return (
    <h3 className='font-heading text-h5 font-semibold tracking-[-0.4px] text-white/80'>
      {children}
    </h3>
  );
}

/**
 * In-body share affordance. Desktop: vertical rail with labels. Mobile: inline
 * icon buttons. Every entry opens the shared `ShareDialog`.
 */
function ShareLinks({
  post,
  variant,
}: {
  post: BlogPost;
  variant: 'rail' | 'inline';
}) {
  if (variant === 'inline') {
    return (
      <div className='flex flex-col gap-4 lg:hidden'>
        <p className='text-sm font-semibold tracking-[1.4px] text-white uppercase'>
          Share this on:
        </p>
        <div className='flex items-center gap-3'>
          {SHARE_LINKS.map(link => (
            <ShareDialog key={link.key} post={post}>
              <button
                type='button'
                aria-label={`Share on ${link.label}`}
                className='flex items-center justify-center rounded-full border border-white/20 bg-[#131e1c] px-4 py-3 text-white transition-colors hover:bg-white/10'
              >
                {link.icon('size-5')}
              </button>
            </ShareDialog>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className='hidden shrink-0 flex-col gap-6 lg:sticky lg:top-28 lg:flex'>
      <p className='text-sm font-semibold tracking-[1.4px] text-white uppercase'>
        Share this:
      </p>
      {SHARE_LINKS.map(link => (
        <ShareDialog key={link.key} post={post}>
          <button
            type='button'
            className='flex items-center gap-2 text-white transition-colors hover:text-primary'
          >
            {link.icon('size-6')}
            <span className='font-heading text-h6 font-normal tracking-[-0.36px]'>
              {link.label}
            </span>
          </button>
        </ShareDialog>
      ))}
    </aside>
  );
}

function EarlyAccess() {
  return (
    <div className='flex flex-col items-start gap-6 rounded-xl border border-white/20 bg-[#131e1c] px-6 py-5 lg:flex-row lg:items-center lg:gap-20 lg:px-10'>
      <div className='flex flex-1 flex-col gap-3'>
        <h3 className='font-heading text-h4 font-semibold tracking-[-0.48px] text-white'>
          Want early access?
        </h3>
        <p className='text-body-sm text-white/80'>
          Get early access to the latest tools, hackathons, and builder programs
          inside the Boundless ecosystem.
        </p>
      </div>
      <button
        type='button'
        className='inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f3e872] px-[25px] py-2.5 font-medium text-[#1c1e13] transition-colors hover:bg-[#eee05a]'
      >
        Apply Now
        <ArrowRight className='size-5' />
      </button>
    </div>
  );
}

/**
 * Full blog article page. The header (title, byline, banner) lives in the
 * shared starfield hero; the body section picks up the hero's teal tint at its
 * top and fades to flat dark toward the footer, so the page reads as one flow.
 */
export function ArticleDetail({ post }: { post: BlogPost }) {
  const related = BLOG_POSTS.filter(item => item.slug !== post.slug).slice(
    0,
    6
  );

  return (
    <>
      <HeroBackground fieldHeight={520}>
        <Section className='pt-24 pb-0 lg:pt-32 lg:pb-0'>
          <header className='mx-auto flex max-w-[1000px] flex-col items-center gap-5 text-center'>
            <h1 className='font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-[56px] lg:leading-none lg:tracking-[-2.24px]'>
              {post.title}
            </h1>

            <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-heading text-base leading-[1.2] font-normal text-white/60 lg:text-2xl lg:tracking-[-0.48px]'>
              <span className='flex items-center gap-2 text-white'>
                <Image
                  src={post.authorAvatar}
                  alt=''
                  width={32}
                  height={32}
                  unoptimized
                  className='size-8 rounded-full object-cover'
                />
                By {post.author}
              </span>

              <span aria-hidden className='h-6 w-px shrink-0 bg-white/20' />
              <span>{post.readTime}</span>

              <span aria-hidden className='h-6 w-px shrink-0 bg-white/20' />
              <span>{post.publishedDate}</span>

              <span aria-hidden className='h-6 w-px shrink-0 bg-white/20' />
              <ShareDialog post={post}>
                <button
                  type='button'
                  className='flex items-center gap-1 transition-colors hover:text-white'
                >
                  Share
                  <Share2 className='size-5' />
                </button>
              </ShareDialog>
            </div>
          </header>

          <div className='mx-auto mt-10 aspect-1240/620 w-full max-w-[1240px] overflow-hidden rounded-[20px] border border-white/10 lg:mt-12'>
            <Image
              src={post.cover}
              alt={post.title}
              width={1240}
              height={620}
              unoptimized
              priority
              className='size-full object-cover'
            />
          </div>
        </Section>
      </HeroBackground>

      <section
        style={{
          background:
            'linear-gradient(180deg, rgba(46, 237, 170, 0.08) 0%, rgba(13, 17, 17, 0) 50%), #0d1111',
        }}
      >
        <Section className='py-10 lg:py-16'>
          <div className='flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20'>
            <article className='flex min-w-0 flex-1 flex-col gap-10'>
              <div className='flex flex-col gap-4 text-body-lg text-white/80'>
                {INTRO.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <Divider />

              <h2 className='font-heading text-h2 font-semibold tracking-[-1.28px] text-white'>
                Winning Projects
              </h2>

              {WINNING_PROJECTS.map((project, index) => (
                <div key={project.title} className='flex flex-col gap-6'>
                  {index > 0 ? <Divider /> : null}
                  <div className='flex flex-col gap-3'>
                    <H5>{project.title}</H5>
                    <p className='text-body-lg text-white/80'>{project.body}</p>
                  </div>
                </div>
              ))}

              <Divider />

              <div className='flex flex-col gap-5'>
                <H5>🌟 Special Recognitions</H5>
                <div className='aspect-2/1 w-full overflow-hidden rounded-[10px] border border-white/10 bg-white/2'>
                  <Image
                    src='/blog/special-recognitions.jpg'
                    alt='Builders at the Boundless x Trustless Work Hackathon'
                    width={790}
                    height={395}
                    unoptimized
                    className='size-full object-cover'
                  />
                </div>
                <div className='flex flex-col gap-3 text-body text-white/80'>
                  {SPECIAL_RECOGNITIONS.map(item => (
                    <p key={item.label}>
                      <span className='font-semibold text-white'>
                        {item.label}
                      </span>{' '}
                      {item.body}
                    </p>
                  ))}
                </div>
              </div>

              <Divider />

              <div className='flex flex-col gap-5'>
                <H5>🧠 Key Themes From This Hackathon</H5>
                <div className='flex flex-col gap-3 text-body text-white/80'>
                  <p>Across submissions, a few clear patterns emerged:</p>
                  {KEY_THEMES.map(theme => (
                    <div key={theme.label}>
                      <p className='font-semibold text-white'>{theme.label}</p>
                      <p>{theme.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <ShareLinks post={post} variant='inline' />

              <EarlyAccess />
            </article>

            <ShareLinks post={post} variant='rail' />
          </div>

          <div className='mt-16 lg:mt-20'>
            <RelatedPosts posts={related} />
          </div>
        </Section>
      </section>
    </>
  );
}
