'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // 使用函数作为 initialState，这样可以在组件挂载前就确定初始值
  const [isDark, setIsDark] = useState(() => {
    // 只有在客户端才能访问 window
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // 服务端默认亮色
  });

  // 只有一个 useEffect：监听系统主题变化（比如用户晚上自动切换）
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 定义回调函数
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    // 添加监听器
    mediaQuery.addEventListener('change', handleChange);

    // 清理函数：组件卸载时移除监听器
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // 另一个 useEffect：当 isDark 变化时，应用到 HTML 标签
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:scale-110 transition-transform"
      aria-label="切换主题"
    >
      {isDark ? '☀️' : ''}
    </button>
  );
}