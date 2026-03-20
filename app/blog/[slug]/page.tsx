// app/blog/[slug]/page.tsx
import { getPostData } from '@/lib/posts';
import Header from '@/components/Header';
import Link from 'next/link';

// 生成静态路径（可选，但推荐用于性能优化）
export async function generateStaticParams() {
  const { getSortedPostsData } = await import('@/lib/posts');
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15+ 中 params 是 Promise，需要 await
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
          ← 返回博客列表
        </Link>
        
        <article className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{postData.title}</h1>
          <p className="text-gray-500 text-sm mb-8">{postData.date}</p>
          
          {/* 渲染 Markdown 转换后的 HTML */}
          <div 
            className="prose lg:prose-xl text-gray-700"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />
        </article>
      </main>
    </div>
  );
}