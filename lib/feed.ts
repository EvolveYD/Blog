import { Feed } from 'feed';
import { getSortedPostsData } from './posts';

export function generateFeed(): Feed {
  const baseUrl = 'https://evolveyd.top';
  const posts = getSortedPostsData();

  const feed = new Feed({
    title: 'EvolveYD.Blog',
    description: 'EvolveYD 的技术博客 — 记录从 0 到 1 的构建之旅',
    id: baseUrl,
    link: baseUrl,
    language: 'zh-CN',
    copyright: `© ${new Date().getFullYear()} EvolveYD`,
    author: { name: 'EvolveYD', link: baseUrl },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${baseUrl}/blog/${post.id}`,
      link: `${baseUrl}/blog/${post.id}`,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  return feed;
}
