'use client';

import { useEffect, useState } from 'react';

export default function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/EvolveYD/Blog')
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count ?? 0))
      .catch(() => setStars(0));
  }, []);

  return (
    <a
      href="https://github.com/EvolveYD/Blog"
      target="_blank"
      rel="noopener noreferrer"
      className="gh-star-btn inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
    >
      <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
      </svg>
      Star
      {stars !== null && (
        <span className="gh-star-count">{stars}</span>
      )}
    </a>
  );
}
