import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl text-center lg:text-left font-mono text-sm">
        <h1 className="hero-title text-4xl font-bold tracking-tight mb-4 text-blue-600">
          EvolveYD&#39;s Blog
        </h1>
        <p className="hero-desc text-lg text-gray-600 mb-8">
          欢迎来到我的技术成长空间 | 记录从 0 到 1 的构建之旅
        </p>

        <div className="flex gap-4 justify-center lg:justify-start">
          <Link href="/blog" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            开始阅读
          </Link>
          <Link href="/about" className="btn-outline px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            关于我
          </Link>
        </div>
      </div>
    </main>
  );
}
