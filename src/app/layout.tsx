import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Bebas_Neue, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google';

import { Providers } from '@/providers';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Boundless',
    template: '%s | Boundless',
  },
  description:
    'Boundless is the platform for hackathons, bounties, grants, and crowdfunding on Stellar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${jakarta.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className='flex min-h-full flex-col'>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
