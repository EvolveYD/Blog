// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ReadingProgress';

export const metadata: Metadata = {
  metadataBase: new URL('https://evolveyd.top'),
  title: {
    default: 'EvolveYD.Blog',
    template: '%s | EvolveYD.Blog',
  },
  description: 'EvolveYD 的技术博客 — 记录从 0 到 1 的 Web 开发之旅，涵盖 Next.js、React、TypeScript 等技术栈的学习笔记与项目实战。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'EvolveYD.Blog',
    title: 'EvolveYD.Blog',
    description: '记录从 0 到 1 的 Web 开发之旅',
  },
  twitter: {
    card: 'summary',
    title: 'EvolveYD.Blog',
    description: '记录从 0 到 1 的 Web 开发之旅',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      'baidu-site-verification': 'codeva-tYXH9PPxeV',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col transition-colors">
        <ReadingProgress />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}