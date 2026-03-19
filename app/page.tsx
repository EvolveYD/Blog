export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">
        👋 Hello, DevLog!
      </h1>
      <p className="text-lg">
        我的个人博客正在构建中...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        当前时间: {new Date().toLocaleDateString()}
      </p>
    </main>
  );
}