import type { Metadata } from 'next';

import { ArticleDetail } from '@/features/marketing';

export const metadata: Metadata = {
  title: 'Article',
  description: 'A story from the Boundless blog.',
};

export default function BlogArticlePage() {
  return <ArticleDetail />;
}
