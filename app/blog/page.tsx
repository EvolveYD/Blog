// app/blog/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Header from '@/components/Header';

// 👇 加上 async 关键字
export default async function Blog() {
  const allPostsData = getSortedPostsData(); // 现在可以在 async 函数里安全调用

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">博客文章</h1>
        
        <div className="grid gap-6">
          {allPostsData.map((post) => (
            <Link 
              href={`/blog/${post.id}`} 
              key={post.id}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{post.date}</p>
              <p className="text-gray-700">{post.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}