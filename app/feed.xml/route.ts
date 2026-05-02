import { generateFeed } from '@/lib/feed';

export async function GET() {
  const feed = generateFeed();
  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
