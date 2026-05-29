---
title: "技术总结"
date: "2026-05-29"
description: "这是搭建完个人博客后的总结文档。"
tags: ["summary", "学习笔记"]
---

# 从零到一：一个大一学生的博客搭建之旅

## 前言

作为一名计算机专业的大一学生，我在入学初期便萌生了搭建个人博客的想法——既是技术练兵场，也是记录学习历程的数字笔记本。从最初连 HTML 标签都认不全，到最终将博客部署上线（[https://evolveyd.top](https://evolveyd.top/)），这个过程充满了踩坑与收获。本文将从学习历程、技术选型、问题攻克三个方面，对整个项目进行一次技术层面的总结。

## 一、学习历程：从 Hello World 到全栈博客

一切始于对网页的好奇。大一上学期，我自学了 HTML 与 CSS 的基础知识，能够编写简单的静态页面。随后，我开始接触 JavaScript，理解了 DOM 操作、事件机制和异步编程等核心概念。在这个阶段，我尝试用原生 JS 写过几个小工具，比如计时器、待办清单等，初步建立了前端开发的直觉。

真正的转折点是接触 React。React 的组件化思维让我意识到，页面不再是零散的 HTML 标签堆砌，而是一个个可复用、可组合的逻辑单元。在掌握了 React 的 Hooks（`useState`、`useEffect`）和 JSX 语法后，我决定用 Next.js 框架来搭建博客——它基于 React，同时提供了服务端渲染、文件系统路由、API 路由等开箱即用的能力，非常适合全栈项目的起步。

学习过程中，AI 辅助工具（如 Claude Code）极大地加速了我的开发效率。许多我不熟悉的配置细节——ESLint 规则、TypeScript 类型约束、Next.js App Router 的服务端/客户端组件边界——都能在对话中快速得到解答。当然，工具只是辅助，真正的理解来自动手实践中的反复试错。

## 二、技术选型：务实与精简

在技术栈的选择上，我遵循了"够用即可、主流优先"的原则，最终确定了如下方案：

**框架与语言：Next.js 16 + TypeScript 5 + React 19。** Next.js 的 App Router 模式是目前社区推荐的架构范式，支持服务端组件（Server Component）和客户端组件（Client Component）的灵活组合。TypeScript 的引入则让代码在编译期就能捕获大量类型错误，对于初学者而言，这是一种极具性价比的"安全网"。

**样式方案：Tailwind CSS v4 + 纯 CSS 暗色模式。** Tailwind 的原子化 CSS 理念大幅减少了样式文件的维护成本。值得一提的是，我并未使用 Tailwind 内置的 `dark:` 变体来实现暗色模式，而是选择在 `globals.css` 中统一使用 `html.dark` 选择器编写所有暗色样式。这一决策的好处在于：所有暗色模式的逻辑集中在单一 CSS 文件中，便于全局管控和调试，避免了在每个组件的 Tailwind 类名中散落大量 `dark:` 前缀。

**内容管理：基于文件的 Markdown 系统。** 没有使用 CMS 或数据库，所有博客文章以 `.md` 文件的形式存放在 `/posts` 目录中，通过 YAML frontmatter 声明标题、日期、描述和标签等元数据。`gray-matter` 负责解析 frontmatter，`remark` + `rehype` 构成的管道则将 Markdown 转换为带有语法高亮的 HTML。代码高亮由 `rehype-pretty-code` 驱动，底层使用 Shiki 引擎，主题为 `github-dark`。这套方案零外部依赖、无 API 调用，部署和迁移都极为简单。

**评论与 SEO：Giscus + 全套搜索引擎优化。** 评论系统基于 GitHub Discussions 的 Giscus，无需额外的后端服务。SEO 方面，我实现了 JSON-LD 结构化数据（首页的 `WebSite` schema、文章页的 `BlogPosting` 和 `BreadcrumbList`）、Open Graph 元数据、动态 OG 图片生成（`@vercel/og`，Edge 运行时）、RSS 订阅源（`feed` 库）以及自动生成的 `sitemap.xml` 和 `robots.txt`。

**部署：Vercel。** 作为 Next.js 的"亲儿子"平台，Vercel 提供了零配置部署、自动 HTTPS、全球 CDN 和 Edge Functions 支持。自定义域名的绑定也十分便捷。

## 三、问题攻克与优化

开发过程中，我遇到了不少值得记录的技术挑战。

**暗色模式闪烁问题。** 最初的实现是在 `useEffect` 中读取 `localStorage` 并设置 `dark` class，但这会导致页面加载时先出现亮色再跳转到暗色的闪烁。最终的解决方案是将主题初始化逻辑移入 `useState` 的惰性初始化函数中——它在组件挂载的同步阶段执行，确保 `dark` class 在首帧渲染前就被应用到 `document.documentElement` 上，从根源上消除了闪烁。

**中文阅读时长计算。** 标准的英文阅读时长算法按单词数统计，但中文没有天然的单词分隔。我实现了一个 CJK 感知的 `calcReadingTime()` 函数，用正则 `/[一-鿿㐀-䶿]/` 匹配中文字符并逐字计数，剩余部分按英文单词处理，统一以 400 单位/分钟的速率估算阅读时间。

**目录导航与高亮联动。** 文章详情页的侧边目录（TOC）需要在滚动时高亮当前所在的章节。我使用 `IntersectionObserver` 监听各标题元素的可见性变化，通过计算每个标题与视口顶部的距离来确定"活跃"章节，实现了流畅的滚动联动效果，避免了传统 `scroll` 事件频繁触发导致的性能问题。

**React Hooks 的 lint 规则踩坑。** 在多人协作场景中，ESLint 的 `react-hooks/set-state-in-effect` 规则报错——不允许在 `useEffect` 的回调中同步调用 `setState`。这促使我重新审视了代码逻辑，将原本在 effect 中执行的状态初始化重构为 `useState` 的惰性初始化器，既满足了 lint 规则，又减少了不必要的渲染次数。

**缓存策略优化。** 在 `next.config.ts` 中，我为静态资源（图片、JS、CSS）配置了 1 年的强缓存（`immutable`），为动态生成的 RSS 和 sitemap 配置了 1 小时缓存加 `stale-while-revalidate` 策略，在性能与内容时效性之间取得了合理的平衡。

## 结语

这个博客项目是我从零开始学习 Web 开发的一个阶段性成果。它不算复杂，但涵盖了前端工程化的核心要素：组件化开发、样式管理、内容渲染、SEO 优化、部署上线。更重要的是，在解决一个个具体问题的过程中，我逐渐建立了"遇到问题→分析原因→查阅资料→动手解决"的工程思维。接下来，我会继续完善博客的功能与样式，同时把更多精力投入到内容创作中——毕竟，技术博客的核心价值，始终在于它承载的思考与分享。