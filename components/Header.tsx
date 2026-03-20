// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-blue-600">
          EvolveYD.Blog
        </Link>

        {/* 导航链接 */}
        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          {/* 只有“文章”是我们现在做好的功能 */}
          <Link href="/blog" className="hover:text-blue-600">
            文章
          </Link>
          
          {/* 其他链接暂时留空或指向首页 */}
          <Link href="/" className="hover:text-blue-600 opacity-50 cursor-not-allowed">
            项目 (开发中)
          </Link>
          <Link href="/" className="hover:text-blue-600 opacity-50 cursor-not-allowed">
            关于 (开发中)
          </Link>
        </nav>
      </div>
    </header>
  );
}