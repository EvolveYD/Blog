import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '项目展示 | EvolveYD.Blog',
  description: 'EvolveYD 的项目作品集',
};

const projects = [
  {
    name: 'EvolveYD.Blog',
    description: '基于 Next.js 16 + App Router 构建的个人技术博客，支持 Markdown、代码高亮、暗黑模式。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    link: 'https://evolveyd.top',
    github: 'https://github.com/EvolveYD/Blog',
  },
];

export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">项目展示</h1>
      <p className="text-gray-500 mb-8">我的学习项目和作品</p>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="post-card p-6 bg-white rounded-lg shadow border border-gray-100"
          >
            <h2 className="text-xl font-bold text-blue-600 mb-2">{project.name}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span key={t} className="tag-badge px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                在线访问 →
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
