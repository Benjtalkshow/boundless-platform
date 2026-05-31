import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

/**
 * Shell for the public marketing site. The brand surface is always dark, so we
 * scope `.dark` here (independent of the app's theme toggle) and paint the ink
 * background. Routes in this group render between the shared header and footer.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='dark flex min-h-screen flex-col bg-ink text-white'>
      <SiteHeader />
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  );
}
