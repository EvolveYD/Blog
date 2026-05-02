export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} EvolveYD. All rights reserved.</p>
        <p>
          Powered by{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Next.js
          </a>
        </p>
      </div>
    </footer>
  );
}
