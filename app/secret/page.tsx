'use client';

import { useState } from 'react';

const PASSWORD_HASH = '125a79033bc931970749b2cfd13c1a06d1fa9312b7b0346c16e5c381a23a669e';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function SecretPage() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hash = await sha256(input);
    if (hash === PASSWORD_HASH) {
      setUnlocked(true);
      setError('');
    } else {
      setError('密码错误');
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-20">
      {!unlocked ? (
        <div className="secret-card text-center">
          <div className="text-4xl mb-6">&#128274;</div>
          <h1 className="text-xl font-semibold mb-6">输入密码</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入密码"
              className="secret-input w-full px-4 py-2 rounded border"
              autoFocus
            />
            <button
              type="submit"
              className="secret-btn w-full px-4 py-2 rounded font-medium"
            >
              验证
            </button>
          </form>
          {error && <p className="secret-error mt-4 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="secret-card text-center">
          <div className="text-4xl mb-6">&#128275;</div>
          <p className="secret-content text-2xl font-bold">2024-07-18</p>
        </div>
      )}
    </main>
  );
}
