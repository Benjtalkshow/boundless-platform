import Link from 'next/link';

/**
 * Top bar for the authenticated shell. A skeleton on purpose: the user menu,
 * wallet button, and pillar navigation mount into the right-hand slot as those
 * features land.
 */
export function AppNav() {
  return (
    <header className='sticky top-0 z-40 border-b bg-background/80 backdrop-blur'>
      <div className='mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6'>
        <Link href='/dashboard' className='font-semibold tracking-tight'>
          Boundless
        </Link>
        <nav
          aria-label='Account'
          className='flex items-center gap-2 text-sm text-muted-foreground'
        />
      </div>
    </header>
  );
}
