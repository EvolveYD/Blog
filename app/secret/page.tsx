'use client';

import { useState } from 'react';

// Password hash (SHA-256)
const PASSWORD_HASH = '125a79033bc931970749b2cfd13c1a06d1fa9312b7b0346c16e5c381a23a669e';

// Encrypted content (AES-256-GCM)
const ENC = {
  salt: '5425a6aaf7657870ab10dd05d3f4b7b6',
  iv: 'd262f1e609b45549e413f7ba',
  ciphertext: '952fcbaeb41ff3587ab0',
  authTag: '7043c5a144a1d4c1567942327230fed6',
};

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function decryptContent(password: string): Promise<string> {
  // Import password as raw key material
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  // Derive AES key using PBKDF2
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: hexToBytes(ENC.salt).buffer as ArrayBuffer, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );

  // Decrypt: ciphertext + authTag concatenated
  const encryptedData = new Uint8Array([
    ...hexToBytes(ENC.ciphertext),
    ...hexToBytes(ENC.authTag),
  ]);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: hexToBytes(ENC.iv).buffer as ArrayBuffer },
    key,
    encryptedData,
  );

  return new TextDecoder().decode(decrypted);
}

export default function SecretPage() {
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hash = await sha256(input);
    if (hash === PASSWORD_HASH) {
      try {
        const decrypted = await decryptContent(input);
        setContent(decrypted);
        setError('');
      } catch {
        setError('解密失败');
      }
    } else {
      setError('密码错误');
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-20">
      {!content ? (
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
          <p className="secret-content text-2xl font-bold">{content}</p>
        </div>
      )}
    </main>
  );
}
