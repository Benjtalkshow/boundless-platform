import { BoundlessLogo } from '@/components/layout/boundless-logo';
import { AuthTerms } from '@/features/auth';
import { HeroBackground } from '@/features/marketing';

/**
 * Shared auth shell: star-field background with a bottom brand glow, the
 * centered Boundless logo, the page content, and the terms line pinned to the
 * bottom of the viewport.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeroBackground>
      <div className='flex min-h-dvh flex-col'>
        <main className='flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16'>
          <BoundlessLogo className='h-6' />
          {children}
        </main>
        <AuthTerms />
      </div>
    </HeroBackground>
  );
}
