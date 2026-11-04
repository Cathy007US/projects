<div align="right">

**EN** | [CN](#cn)

</div>

# Cathy — Personal Portfolio

A clean, fast, single-page portfolio site to showcase my personal projects — built with a static-first philosophy: no framework, no runtime dependencies, just semantic HTML, modern CSS and vanilla JavaScript.

**Live site:** [projects.aboutlife.cloud](https://projects.aboutlife.cloud)

## ✨ Features

- **EN / CN language switch** — one click toggles every piece of copy on the page (hero, project descriptions, tech stacks, footer). The choice is persisted in `localStorage`, and **English is shown by default** on first visit.
- **Project cards with carousels** — 2×2 responsive grid; each card has an image carousel with left/right arrows (vertically centered on both sides), dot indicators, auto-play (pauses on hover/focus), keyboard `←`/`→` navigation and touch swipe on mobile.
- **Intro / Tech stack tabs** — cards 1 & 2 toggle between an intro pane and a categorized tech-stack list (bullet list, bilingual); cards 3 & 4 are upcoming projects with the stack inlined in the intro.
- **Graceful image placeholders** — each project has its own color scheme for placeholder art; drop real screenshots into `images/` and they are picked up automatically.
- **Bilingual, accessible markup** — every text node exists as EN/CN `<span>` pairs toggled via a single `data-lang` attribute on `<html>`; `aria-pressed`, `aria-label`, keyboard focus states throughout.
- **Dark-brown favicon** & dynamic copyright year (auto-updates at New Year).

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Hand-written CSS (custom properties, flexbox, grid, `prefers-reduced-motion` aware) |
| Behavior | Vanilla JavaScript (ES5-compatible, zero dependencies) |
| Build | Grunt (`clean` → `copy` → `cssmin` → `uglify` → `text-replace`) |
| Icons / Fonts | System font stack (SF Pro / PingFang SC / Microsoft YaHei), no webfont requests |
| Hosting | Static files on Nginx (HTTPS via Let's Encrypt / Certbot) |

## 📁 Project Structure

```
├── index.html          # Single page source (bilingual spans)
├── css/style.css       # All styles
├── js/main.js          # Language switch, carousels, tabs, reveal-on-scroll
├── images/             # Screenshots (auto-detected) + favicon.ico / favicon-512.png
├── Gruntfile.js        # Build pipeline
├── package.json        # Dev dependencies & scripts
└── dist/               # Build output (git-ignored) — deploy this
```

## 🚀 Getting Started

```bash
npm install          # install Grunt toolchain
npm run watch        # dev: rebuild on change
npm run build        # produce dist/ for deployment
```

For a quick local preview without building, serve the source directly:

```bash
python3 -m http.server 4173
# → http://127.0.0.1:4173
```

## 📦 Deployment

1. `npm run build`
2. Upload the contents of `dist/` to the server, e.g.:
   ```bash
   rsync -avz --delete dist/ root@<server>:/root/website
   ```
3. Nginx serves it as a static site (`try_files $uri $uri/ /index.html`).

## 📄 Projects Showcased

| # | Project | Status | Stack highlights |
|---|---|---|---|
| 01 | Quality IQC Inspection Standards Knowledge Base | Live | React 18, Vite, TS, FastAPI, PostgreSQL 16, Docker, Nginx |
| 02 | Bookhealth | Live | React 18, Node.js, Express, Socket.IO, PostgreSQL, JWT |
| 03 | Charity Bills | In development | React, Vite, TS, Stripe/PayPal, PostgreSQL |
| 04 | My Journal | In development | React, Vite, TS, MediaRecorder, ASR, PostgreSQL |

---

Copyright © 2026 Cathy Studio. All rights reserved.

---

<div align="right">

[EN](#cathy--personal-portfolio) | **CN**

</div>

<a id="cn"></a>

# Cathy — 个人项目展示

一个简洁、快速的单页作品集网站，用来展示我的个人项目。坚持"静态优先"理念：不用框架、没有运行时依赖，只有语义化 HTML、现代 CSS 和原生 JavaScript。

**在线访问：** [projects.aboutlife.cloud](https://projects.aboutlife.cloud)

## ✨ 功能特性

- **EN / CN 中英文切换** — 页面右上角一键切换全站文案（首屏、项目描述、技术栈、页脚），选择存入 `localStorage`，**首次访问默认显示英文**。
- **项目卡片轮播** — 2×2 响应式网格；每张卡片带图片轮播：左右箭头（垂直居中于图片两侧）、圆点指示器、自动播放（悬停/聚焦暂停）、键盘 `←`/`→` 切换、移动端手势滑动。
- **简介 / 技术栈双标签** — 卡片 1、2 可在简介和技术栈分类圆点列表之间切换（中英双语）；卡片 3、4 为待开发项目，技术栈并入简介展示。
- **优雅的占位图** — 每个项目有专属配色的占位画面；把真实截图放进 `images/` 即自动替换显示。
- **双语无障碍标记** — 所有文案以 EN/CN 成对 `<span>` 存在，靠 `<html>` 上的 `data-lang` 一个属性切换显示；全站 `aria-pressed`、`aria-label` 与键盘焦点样式。
- **深棕色站点图标** 与动态版权年份（跨年自动更新）。

## 🛠 技术栈

| 层面 | 选型 |
|---|---|
| 页面结构 | 语义化 HTML5 |
| 样式 | 手写 CSS（自定义属性、Flexbox、Grid，尊重 `prefers-reduced-motion`） |
| 交互 | 原生 JavaScript（兼容 ES5，零依赖） |
| 构建 | Grunt（`clean` → `copy` → `cssmin` → `uglify` → `text-replace`） |
| 字体 | 系统字体栈（SF Pro / 苹方 / 微软雅黑），零网络字体请求 |
| 部署 | Nginx 托管静态文件（Let's Encrypt / Certbot HTTPS） |

## 📁 目录结构

```
├── index.html          # 单页源码（中英双语 span）
├── css/style.css       # 全部样式
├── js/main.js          # 语言切换、轮播、标签切换、滚动渐显
├── images/             # 项目截图（自动识别）+ favicon.ico / favicon-512.png
├── Gruntfile.js        # 构建流水线
├── package.json        # 构建依赖与脚本
└── dist/               # 构建产物（已 git-ignore）— 部署用这个
```

## 🚀 快速开始

```bash
npm install          # 安装 Grunt 工具链
npm run watch        # 开发：文件变动自动构建
npm run build        # 生成 dist/ 用于部署
```

不打包直接本地预览：

```bash
python3 -m http.server 4173
# → http://127.0.0.1:4173
```

## 📦 部署

1. `npm run build`
2. 上传 `dist/` 内容到服务器：
   ```bash
   rsync -avz --delete dist/ root@<服务器>:/root/website
   ```
3. Nginx 以静态站点方式托管（`try_files $uri $uri/ /index.html`）。

## 📄 展示的项目

| # | 项目 | 状态 | 技术栈要点 |
|---|---|---|---|
| 01 | 太阳能组件质量 IQC 标准检验规范库 | 已上线 | React 18、Vite、TS、FastAPI、PostgreSQL 16、Docker、Nginx |
| 02 | Bookhealth 预约平台 | 已上线 | React 18、Node.js、Express、Socket.IO、PostgreSQL、JWT |
| 03 | 公益账单 | 开发中 | React、Vite、TS、Stripe/PayPal、PostgreSQL |
| 04 | 我的日记本 | 开发中 | React、Vite、TS、MediaRecorder、ASR、PostgreSQL |

---

版权所有 © 2026 Cathy Studio，保留所有权利。
