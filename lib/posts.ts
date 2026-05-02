import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMeta {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export function getSortedPostsData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || '无标题',
        date: matterResult.data.date || '未知日期',
        description: matterResult.data.description || '',
        tags: matterResult.data.tags || [],
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    tags: matterResult.data.tags || [],
  };
}

export function getPostsByTag(tag: string): PostMeta[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const allPosts = getSortedPostsData();
  const tagSet = new Set<string>();
  allPosts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
