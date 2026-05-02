// components/Header.tsx
import Link from 'next/link';
import ThemeToggle from './ThemeToggle'; // ✅ 已导入

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">
          EvolveYD.Blog
        </Link>

        {/* 导航链接 + 主题切换按钮 */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            文章
          </Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            关于
          </Link>
          
          {/* 👇 关键：在这里添加主题切换按钮 */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}