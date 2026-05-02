export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse p-6 bg-white rounded-lg shadow border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
