import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">页面不存在</p>
      <Link
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </main>
  );
}
