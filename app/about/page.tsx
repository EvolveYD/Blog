import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我',
  description: 'EvolveYD — 计算机专业学生，记录从 0 到 1 的 Web 开发成长历程。',
  openGraph: {
    title: '关于我 | EvolveYD.Blog',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="about-heading text-3xl font-bold mb-8">
        关于我
      </h1>

      <section className="mb-10">
        <p className="about-text leading-relaxed mb-4">
          你好！我是 EvolveYD，一名计算机专业的学生。这个博客记录了我从零开始学习
          Web 开发的成长历程。
        </p>
        <p className="about-text leading-relaxed">
          最好的学习方式是动手做项目。这个博客本身就是一个学习项目 ——
          从 Next.js 基础到部署上线，每一步都是实战经验。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="about-heading text-xl font-semibold mb-4">
          技术栈
        </h2>
        <div className="flex flex-wrap gap-3">
          {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'Vercel'].map((tech) => (
            <span
              key={tech}
              className="about-tech-tag px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="about-heading text-xl font-semibold mb-4">
          关于这个博客
        </h2>
        <ul className="space-y-2 about-text">
          <li className="flex items-start gap-2">
            <span className="about-bullet mt-1">•</span>
            基于 Next.js 16 + App Router 构建
          </li>
          <li className="flex items-start gap-2">
            <span className="about-bullet mt-1">•</span>
            使用 Markdown 文件作为内容管理（文件即 CMS）
          </li>
          <li className="flex items-start gap-2">
            <span className="about-bullet mt-1">•</span>
            通过 Vercel 部署，全球 CDN 加速
          </li>
          <li className="flex items-start gap-2">
            <span className="about-bullet mt-1">•</span>
            支持暗黑模式
          </li>
        </ul>
      </section>

      <Link
        href="/"
        className="about-link hover:underline"
      >
        ← 返回首页
      </Link>
    </main>
  );
}
