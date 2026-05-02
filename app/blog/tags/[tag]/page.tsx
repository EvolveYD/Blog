import { getPostsByTag, getAllTags } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `标签: ${tag} | EvolveYD.Blog`,
    description: `查看所有标记为 "${tag}" 的文章`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
        ← 返回博客列表
      </Link>

      <h1 className="text-3xl font-bold mb-8">
        标签: <span className="text-blue-600">{tag}</span>
      </h1>

      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              className="post-card block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{post.date}</p>
              <p className="text-gray-700">{post.description}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">该标签下暂无文章。</p>
        )}
      </div>
    </main>
  );
}
