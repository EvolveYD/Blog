'use client';

import { useEffect, useRef } from 'react';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'EvolveYD/Blog');
    script.setAttribute('data-repo-id', 'R_kgDORrhriQ');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDORrhric4C8MBj');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} />;
}
