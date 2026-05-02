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
  readingTime: string;
}

function calcReadingTime(content: string): string {
  const cjkChars = content.match(/[一-鿿㐀-䶿]/g)?.length || 0;
  const latinWords = content.replace(/[一-鿿㐀-䶿]/g, '').split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil((cjkChars + latinWords * 1.5) / 400);
  return `${Math.max(1, minutes)} 分钟`;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of markdown.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const text = match[2].replace(/`/g, '');
      const id = text.toLowerCase().replace(/[^\w一-鿿]+/g, '-').replace(/^-|-$/g, '');
      items.push({ id, text, level: match[1].length });
    }
  }
  return items;
}

function injectHeadingIds(html: string, toc: TocItem[]): string {
  let i = 0;
  return html.replace(/<h([23])>(.*?)<\/h\1>/g, (_match, level, inner) => {
    if (i < toc.length && toc[i].level === Number(level)) {
      return `<h${level} id="${toc[i++].id}">${inner}</h${level}>`;
    }
    return `<h${level}>${inner}</h${level}>`;
  });
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
        readingTime: calcReadingTime(matterResult.content),
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
  const toc = extractToc(matterResult.content);

  return {
    id,
    contentHtml: injectHeadingIds(contentHtml, toc),
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    tags: matterResult.data.tags || [],
    readingTime: calcReadingTime(matterResult.content),
    toc,
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
