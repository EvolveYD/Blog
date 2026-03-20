// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 获取 posts 文件夹的绝对路径
const postsDirectory = path.join(process.cwd(), 'posts');

// 获取所有文章元数据（用于列表页）
export function getSortedPostsData() {
  // 获取文件下的文件名
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // 去掉 ".md" 得到 id (slug)
    const id = fileName.replace(/\.md$/, '');

    // 读取文件内容
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 解析 frontmatter
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title || '无标题',
      date: matterResult.data.date || '未知日期',
      description: matterResult.data.description || '',
    };
  });

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 获取单篇文章内容（用于详情页）
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 解析 frontmatter
  const matterResult = matter(fileContents);

  // 将 markdown 转为 HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
  };
}