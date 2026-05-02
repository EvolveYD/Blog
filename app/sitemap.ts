import { getSortedPostsData, getAllTags } from '@/lib/posts';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://evolveyd.top';

  const posts = getSortedPostsData();
  const tags = getAllTags();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/blog/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...postEntries,
    ...tagEntries,
  ];
}
