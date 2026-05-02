'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
}

export default function ClientBlogList({
  posts,
  currentPage = 1,
  totalPages = 1,
}: {
  posts: Post[];
  currentPage?: number;
  totalPages?: number;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>

      <input
        type="text"
        placeholder="搜索文章..."
        className="search-input w-full p-3 mb-8 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              className="post-card block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-2">{post.title}</h2>
              <div className="flex items-center gap-3 mb-3">
                <p className="text-sm text-gray-500">{post.date}</p>
                <span className="text-sm text-gray-400">· {post.readingTime}</span>
                {post.tags.length > 0 && (
                  <div className="flex gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag-badge px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-gray-700">{post.description}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">没有找到相关文章。</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
            >
              ← 上一页
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/blog?page=${page}`}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
            >
              下一页 →
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
