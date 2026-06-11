import Link from 'next/link';

interface AuthFooterPillProps {
  prompt: string;
  actionLabel: string;
  href: string;
}

/** Rounded pill under the card, e.g. "Already have an account? Sign In". */
export function AuthFooterPill({
  prompt,
  actionLabel,
  href,
}: AuthFooterPillProps) {
  return (
    <div className='flex items-center gap-1 rounded-[30px] bg-ink-soft px-7 py-4'>
      <span className='text-body-sm text-[#72736f]'>{prompt}</span>
      <Link
        href={href}
        className='rounded-lg text-body-sm font-semibold text-primary-300 transition-colors hover:text-primary-200'
      >
        {actionLabel}
      </Link>
    </div>
  );
}
