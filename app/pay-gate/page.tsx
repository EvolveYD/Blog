'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PayGatePage() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch('/api/verify-payment')
      .then((r) => r.json())
      .then((data) => {
        if (data.paid) {
          window.location.href = '/scientist-brain.html';
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: input.trim() }),
      });
      const data = await res.json();
      if (data.ok) {
        window.location.href = '/scientist-brain.html';
      } else {
        setError(data.error || '验证失败');
      }
    } catch {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="paygate-page">
        <p className="paygate-loading">加载中...</p>
      </div>
    );
  }

  return (
    <div className="paygate-page">
      <div className="paygate-card">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="paygate-title">逢考必过</h1>
          <p className="paygate-subtitle">付费解锁专属页面</p>
        </div>

        <div className="paygate-amount">
          <span className="paygate-currency">¥</span>
          <span className="paygate-price">1.00</span>
        </div>

        <div className="paygate-qr-row">
          <div className="paygate-qr-wrap">
            <Image
              src="/vx.jpg"
              alt="微信收款码"
              width={160}
              height={160}
              className="paygate-qr"
            />
            <span className="paygate-qr-label">微信</span>
          </div>
          <div className="paygate-qr-wrap">
            <Image
              src="/zfb.jpg"
              alt="支付宝收款码"
              width={160}
              height={160}
              className="paygate-qr"
            />
            <span className="paygate-qr-label">支付宝</span>
          </div>
        </div>

        <p className="paygate-hint">
          扫码支付后，联系博主获取验证码
        </p>

        <form onSubmit={handleSubmit} className="paygate-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入验证码"
            className="paygate-input"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="paygate-btn"
          >
            {loading ? '验证中...' : '验证并进入'}
          </button>
        </form>

        {error && <p className="paygate-error">{error}</p>}

        <Link
          href="/"
          className="btn-outline block text-center px-6 py-2 rounded transition-colors mt-4"
          style={{ fontSize: '0.85rem' }}
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
