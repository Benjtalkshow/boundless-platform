import Link from 'next/link';

/** Terms and privacy line pinned to the bottom of every auth screen. */
export function AuthTerms() {
  return (
    <p className='px-6 pb-8 text-center text-body-sm text-[#72736f]'>
      By continuing, you agree to Boundless&apos;s{' '}
      <Link href='/terms' className='text-[#929f9c] underline hover:text-white'>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link
        href='/privacy'
        className='text-[#929f9c] underline hover:text-white'
      >
        Privacy Policy.
      </Link>
    </p>
  );
}
