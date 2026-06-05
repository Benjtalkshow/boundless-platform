import { FeatureListSection } from '../feature-list-section';

const VALUES = [
  {
    title: 'Community First',
    description:
      'Everything we build starts with people. We focus on creating systems that empower collaboration, growth, and shared success.',
  },
  {
    title: 'Innovation Focused',
    description:
      'We combine technology, creativity, and modern digital experiences to help people move from ideas to execution faster.',
  },
  {
    title: 'Opportunity Without Limits',
    description:
      'From hackathons and bounties to grants and crowdfunding, we’re building pathways that help individuals and teams unlock real opportunities.',
  },
  {
    title: 'Built for Builders',
    description:
      'Designed for developers, creators, startups, and curious minds who want to shape the future instead of waiting for it.',
  },
];

/** About mission: guiding values. */
export function AboutMission() {
  return (
    <FeatureListSection
      eyebrow='Our Mission'
      title='What Drives Us'
      items={VALUES}
    />
  );
}
