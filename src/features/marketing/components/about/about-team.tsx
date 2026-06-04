import { TeamSection } from '../team-section';

const MEMBERS = [
  {
    name: 'First Last',
    role: 'Co-founder, CEO',
    image: '/team/team1.svg',
    linkedin: '#',
  },
  {
    name: 'First Last',
    role: 'Co-founder, CEO',
    image: '/team/team2.svg',
    linkedin: '#',
  },
  {
    name: 'First Last',
    role: 'Co-founder, CEO',
    image: '/team/team3.svg',
    linkedin: '#',
  },
  {
    name: 'First Last',
    role: 'Co-founder, CEO',
    image: '/team/team4.svg',
    linkedin: '#',
  },
];

/** About page team grid. */
export function AboutTeam() {
  return (
    <TeamSection
      title={
        <>
          Meet the team
          <br />
          behind Boundless
        </>
      }
      members={MEMBERS}
    />
  );
}
