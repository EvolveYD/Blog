import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'EvolveYD.Blog';
  const description = searchParams.get('description') || '记录从 0 到 1 的 Web 开发之旅';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0f172a',
          padding: '60px 80px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#f8fafc',
              lineHeight: 1.4,
              wordBreak: 'break-word',
              display: 'flex',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#94a3b8',
              display: 'flex',
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 24, color: '#3b82f6', fontWeight: 700 }}>
            EvolveYD.Blog
          </div>
          <div style={{ fontSize: 20, color: '#64748b' }}>evolveyd.top</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
