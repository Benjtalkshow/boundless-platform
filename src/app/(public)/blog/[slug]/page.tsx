import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleDetail, BLOG_POSTS, getBlogPost } from '@/features/marketing';

export function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return { title: 'Article' };

  return { title: post.title, description: post.excerpt };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return <ArticleDetail post={post} />;
}
