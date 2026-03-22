// app/blog/page.tsx
import { getSortedPostsData } from '@/lib/posts';
import ClientBlogList from '@/components/ClientBlogList';

export default function BlogPage() {
  const allPostsData = getSortedPostsData(); // ✅ 服务端安全调用 fs
  return <ClientBlogList posts={allPostsData} />; // ✅ 传给客户端组件渲染
}