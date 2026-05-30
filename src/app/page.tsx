import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center'>
      <span className='rounded-full border px-3 py-1 text-xs text-muted-foreground'>
        Boundless v2 foundation
      </span>
      <h1 className='max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl'>
        Fund and build the open web on{' '}
        <span className='text-primary'>Stellar</span>.
      </h1>
      <p className='max-w-md text-pretty text-muted-foreground'>
        Hackathons, bounties, grants, and crowdfunding for builders and the
        communities that back them.
      </p>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Button size='lg'>Get started</Button>
        <Button size='lg' variant='outline'>
          Explore projects
        </Button>
      </div>
    </main>
  );
}
