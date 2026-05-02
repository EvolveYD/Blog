import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-blue-600">
          EvolveYD.Blog
        </Link>

        {/* 导航链接 + 主题切换按钮 */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/blog" className="hover:text-blue-600 transition-colors">
            文章
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            关于
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}