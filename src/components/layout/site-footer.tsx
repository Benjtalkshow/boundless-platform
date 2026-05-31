import Link from 'next/link';

import { BoundlessMark } from '@/components/layout/boundless-logo';
import { SocialGlyph } from '@/components/layout/brand-icons';
import { Button } from '@/components/ui/button';
import { footerColumns, socialLinks } from '@/config/marketing-nav';

function isExternal(href: string) {
  return href.startsWith('http');
}

/** Marketing footer: oversized wordmark, newsletter prompt, link columns, and a social panel. */
export function SiteFooter() {
  return (
    <footer className='border-t border-white/5 bg-ink'>
      <div className='mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-12 lg:grid-cols-[1fr_300px] lg:gap-0 lg:px-[100px]'>
        {/* Main block */}
        <div className='lg:pr-12'>
          {/* Oversized wordmark with brand glow */}
          <div className='relative overflow-hidden'>
            <div
              aria-hidden
              className='pointer-events-none absolute -top-10 right-0 h-48 w-2/3 rounded-full bg-brand/20 blur-3xl'
            />
            <div className='relative flex items-center gap-3'>
              <BoundlessMark className='h-[clamp(2rem,7vw,4.5rem)] w-auto text-brand' />
              <span className='font-heading text-[clamp(2.75rem,11vw,7rem)] leading-none font-bold tracking-tight text-white'>
                boundless
              </span>
            </div>
          </div>

          <div className='mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]'>
            {/* Newsletter */}
            <div className='sm:col-span-2 lg:col-span-1'>
              <p className='max-w-44 text-sm text-white/60'>
                Subscribe to The boundless newsletter
              </p>
              <Button
                variant='outline'
                className='mt-4 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white'
              >
                Get Updates
              </Button>
            </div>

            {/* Link columns */}
            {footerColumns.map(column => (
              <div key={column.label}>
                <p className='mb-3 text-xs font-medium tracking-wider text-white/40 uppercase'>
                  {column.label}
                </p>
                <ul className='space-y-2.5'>
                  {column.items.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        target={isExternal(item.href) ? '_blank' : undefined}
                        rel={isExternal(item.href) ? 'noreferrer' : undefined}
                        className='text-sm text-white/70 transition-colors hover:text-white'
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className='mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between'>
            <p>
              Built on Stellar · Powered by Trustless Execution · Designed for
              Global Contributors
            </p>
            <p>© 2026 Boundless</p>
          </div>
        </div>

        {/* Social panel */}
        <div className='border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10'>
          <h2 className='mb-4 text-sm font-medium text-white'>Social links</h2>
          <div className='space-y-2.5'>
            {socialLinks.map(social => (
              <Link
                key={social.key}
                href={social.href}
                target={isExternal(social.href) ? '_blank' : undefined}
                rel={isExternal(social.href) ? 'noreferrer' : undefined}
                className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white'
              >
                <SocialGlyph
                  name={social.key}
                  className='size-4 text-white/55'
                />
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
