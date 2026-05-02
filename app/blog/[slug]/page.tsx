import { getPostData, getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';
import TocSidebar from '@/components/TocSidebar';
import Giscus from '@/components/Giscus';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: `${postData.title} | EvolveYD.Blog`,
    description: postData.description,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
        ← 返回博客列表
      </Link>

      <div className="flex gap-8">
        <article className="article-card bg-white p-8 rounded-lg shadow border border-gray-100 flex-1 min-w-0">
          <h1 className="text-3xl font-bold mb-3">
            {postData.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <time>{postData.date}</time>
            <span>· {postData.readingTime}</span>
            {postData.tags.length > 0 && (
              <div className="flex gap-2">
                {postData.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${tag}`}
                    className="tag-badge px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          <div className="mt-10 pt-8 border-t border-gray-100">
            <Giscus />
          </div>
        </article>

        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">
            <TocSidebar toc={postData.toc} />
          </div>
        </aside>
      </div>
    </main>
  );
}
