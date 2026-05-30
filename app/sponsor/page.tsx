'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HEART_CHARS = ['♥', '♡', '❤', '💗', '💖'];

export default function SponsorPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHeartClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 18; i++) {
      const el = document.createElement('span');
      el.className = 'heart-particle';
      el.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];

      const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.5;
      const dist = 60 + Math.random() * 120;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 40;
      const size = 10 + Math.random() * 16;
      const dur = 0.6 + Math.random() * 0.6;
      const rot = (Math.random() - 0.5) * 720;
      const colors = ['#ec4899', '#f472b6', '#db2777', '#f9a8d4', '#fb7185'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      el.style.setProperty('--p-tx', `${tx}px`);
      el.style.setProperty('--p-ty', `${ty}px`);
      el.style.setProperty('--p-size', `${size}px`);
      el.style.setProperty('--p-dur', `${dur}s`);
      el.style.setProperty('--p-rot', `${rot}deg`);
      el.style.setProperty('--p-color', color);

      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  }, []);

  return (
    <div className="sponsor-page" ref={containerRef}>
      <p className="sponsor-title">喜欢可以赞助一下喵~</p>

      <div className="sponsor-content">
        <div className="sponsor-qr-wrap">
          <Image
            src="/vx.jpg"
            alt="微信收款码"
            width={200}
            height={200}
            className="sponsor-qr"
          />
          <span className="sponsor-qr-label">微信</span>
        </div>

        <div className="heart-3d-wrapper" onClick={handleHeartClick}>
          <div className="heart-3d-glow" />
          <div className="heart-3d">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f9a8d4" />
                  <stop offset="40%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#be185d" />
                </linearGradient>
                <radialGradient id="hglow" cx="50%" cy="35%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                fill="url(#hg)"
              />
              <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                fill="url(#hglow)"
              />
            </svg>
          </div>
        </div>

        <div className="sponsor-qr-wrap">
          <Image
            src="/zfb.jpg"
            alt="支付宝收款码"
            width={200}
            height={200}
            className="sponsor-qr"
          />
          <span className="sponsor-qr-label">支付宝</span>
        </div>
      </div>

      <Link
        href="/"
        className="btn-outline px-6 py-2 rounded transition-colors mt-10"
        style={{ fontSize: '0.85rem' }}
      >
        ← 返回首页
      </Link>
    </div>
  );
}
