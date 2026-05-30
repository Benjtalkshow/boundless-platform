import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center'>
      <p className='text-sm font-medium text-primary'>404</p>
      <h1 className='text-2xl font-semibold tracking-tight'>Page not found</h1>
      <p className='max-w-sm text-sm text-muted-foreground'>
        The page you are looking for does not exist or has moved.
      </p>
      <Button asChild>
        <Link href='/'>Back to home</Link>
      </Button>
    </main>
  );
}
