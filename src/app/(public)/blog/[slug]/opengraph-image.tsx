import { getBlogPost } from '@/features/marketing';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Boundless Blog';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const subtitle = post?.excerpt
    ? `${post.excerpt.slice(0, 140)}${post.excerpt.length > 140 ? '…' : ''}`
    : undefined;

  return renderOgImage({
    title: post?.title ?? 'Boundless Blog',
    subtitle,
  });
}
