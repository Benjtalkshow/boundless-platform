import Image from 'next/image';
import Link from 'next/link';

import { SocialGlyph } from '@/components/layout/brand-icons';
import { Button } from '@/components/ui/button';
import { footerColumns, socialLinks } from '@/config/marketing-nav';

function externalLinkProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};
}

// Decorative glow behind the card's top edge.
function FooterGlow() {
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute -top-10 left-1/2 h-44 w-[72%] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(90deg,#2eedaa_0%,#86ee54_52%,#c4f24a_100%)] blur-[60px] sm:-top-12 sm:h-56 sm:w-[64%] lg:h-[240px] lg:w-[60%] lg:blur-[80px]'
    />
  );
}

export function SiteFooter() {
  return (
    <footer className='bg-background px-4 pt-24 pb-10 sm:px-6 lg:px-10 lg:pt-28 lg:pb-12'>
      <div className='mx-auto flex w-full max-w-[1360px] flex-col gap-4 lg:flex-row lg:gap-2'>
        {/* Main card */}
        <div className='relative flex-1 rounded-2xl border border-white/8 bg-card/80'>
          <FooterGlow />
          <div className='relative flex flex-col'>
            {/* Raw Image so the wordmark scales to the full card width. */}
            <div className='px-6 py-6 sm:px-8 lg:px-10 lg:py-5'>
              <Image
                src='/brand/boundless-logo-dark.svg'
                alt='Boundless'
                width={437}
                height={69}
                priority
                unoptimized
                className='block h-auto w-full max-w-[895px]'
              />
            </div>

            <div className='border-t border-dotted border-white/10' />

            <div className='flex flex-col gap-8 px-6 py-8 min-[1360px]:flex-row min-[1360px]:items-start min-[1360px]:justify-between sm:px-8 lg:px-10'>
              <div className='min-[1360px]:w-[172px]'>
                <p className='text-body-sm font-medium text-foreground'>
                  Subscribe to The boundless newsletter
                </p>
                <Button className='mt-5 w-full rounded-full bg-white font-semibold text-ink hover:bg-white/90 active:bg-white/80 lg:w-auto'>
                  Get Updates
                </Button>
              </div>

              <div className='grid grid-cols-2 gap-x-8 gap-y-8 min-[1360px]:flex min-[1360px]:gap-20 sm:grid-cols-4'>
                {footerColumns.map(column => (
                  <div key={column.label} className='min-[1360px]:w-[108px]'>
                    <p className='mb-2 text-caption-xs text-foreground uppercase'>
                      {column.label}
                    </p>
                    <ul className='space-y-1'>
                      {column.items.map(item => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            {...externalLinkProps(item.href)}
                            className='text-body-xs text-neutral-300 transition-colors hover:text-foreground'
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className='border-t border-dotted border-white/10' />

            <div className='flex items-center justify-between gap-4 px-6 py-5 text-body-sm text-neutral-300 sm:px-8 lg:px-10'>
              <p>
                Built on Stellar
                <span className='hidden lg:inline'>
                  {' '}
                  • Powered by Trustless Execution • Designed for Global
                  Contributors
                </span>
              </p>
              <p className='whitespace-nowrap'>© 2026 Boundless</p>
            </div>
          </div>
        </div>

        {/* Social card */}
        <div className='flex flex-col gap-4 rounded-2xl border border-white/8 bg-card/80 p-5 lg:w-[325px] lg:shrink-0 lg:justify-center'>
          <h2 className='hidden text-center font-heading text-h5 font-semibold text-foreground lg:block'>
            Social links
          </h2>
          <div className='flex flex-row justify-between gap-2 lg:flex-col lg:gap-4'>
            {socialLinks.map(social => (
              <Link
                key={social.key}
                href={social.href}
                {...externalLinkProps(social.href)}
                aria-label={social.label}
                className='flex size-12 items-center justify-center gap-2 rounded-full bg-secondary text-foreground transition-colors hover:bg-neutral-700 lg:size-auto lg:w-full lg:px-4 lg:py-3'
              >
                <SocialGlyph name={social.key} className='size-5 shrink-0' />
                <span className='hidden text-base lg:inline'>
                  {social.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
