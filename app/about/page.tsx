import Link from 'next/link';
export default function AboutPage(): React.JSX.Element {
  return (
    <main style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>🙋‍♂️ 关于我</h1>
      <p>我正在学习 Next.js 框架。</p>
      <p>今天是 2026 年 3 月 20 日，星期五。</p>

      <div style={{ marginTop: '20px' }}>
        <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          ⬅️ 返回首页
        </Link>
      </div>
    </main>
  );
}