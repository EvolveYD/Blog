'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';

interface Post {
  id: string;
  title: string;
  date: string;
  description: string;
}

export default function ClientBlogList({ posts }: { posts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">博客文章</h1>
        
        {/* 搜索框 */}
        <input
          type="text"
          placeholder="搜索文章..."
          className="w-full p-3 mb-8 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link 
                href={`/blog/${post.id}`} 
                key={post.id}
                className="block p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
                <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">没有找到相关文章。</p>
          )}
        </div>
      </main>
    </div>
  );
}