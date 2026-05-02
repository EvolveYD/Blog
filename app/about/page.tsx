import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        关于我
      </h1>

      <section className="mb-10">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          你好！我是 EvolveYD，一名计算机专业的学生。这个博客记录了我从零开始学习
          Web 开发的成长历程。
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          我相信最好的学习方式就是动手做项目。这个博客本身就是一个学习项目 ——
          从 Next.js 基础到部署上线，每一步都是实战经验。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          技术栈
        </h2>
        <div className="flex flex-wrap gap-3">
          {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'Vercel'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          关于这个博客
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            基于 Next.js 16 + App Router 构建
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            使用 Markdown 文件作为内容管理（文件即 CMS）
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            通过 Vercel 部署，全球 CDN 加速
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            支持暗黑模式
          </li>
        </ul>
      </section>

      <Link
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← 返回首页
      </Link>
    </main>
  );
}
