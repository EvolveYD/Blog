import { getSortedPostsData } from '@/lib/posts';
import ClientBlogList from '@/components/ClientBlogList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '博客文章',
  description: '浏览所有技术文章，涵盖 Next.js、React、TypeScript、算法等。',
  openGraph: {
    title: '博客文章 | EvolveYD.Blog',
    url: '/blog',
  },
};

const POSTS_PER_PAGE = 10;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const allPostsData = getSortedPostsData();
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allPostsData.length / POSTS_PER_PAGE));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPostsData.slice(start, start + POSTS_PER_PAGE);

  return (
    <ClientBlogList
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
