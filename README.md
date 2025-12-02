# Claude Relay Service Frontend

基于 Next.js 和 lily-ui 组件库的 Claude Relay Service 管理后台前端项目。

## 功能特性

- ✨ API 统计数据展示
- 📊 实时请求监控
- 🎨 使用 lily-ui 组件库
- ⚡ Next.js 15 App Router
- 🚀 Vercel 一键部署

## 技术栈

- **框架**: Next.js 15
- **UI**: lily-ui (基于 Tailwind CSS 和 Alpine.js)
- **语言**: TypeScript
- **部署**: Vercel

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env.local` 并配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### 3. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 页面路由

- `/` - 首页
- `/admin-next/api-stats` - API 统计页面

## Vercel 部署

### 方式一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方式二：通过 Vercel 控制台

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 创建新项目
3. 导入你的 GitHub 仓库
4. 配置环境变量（如果需要）
5. 点击部署

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

- `NEXT_PUBLIC_API_URL`: 后端 API 地址

## 项目结构

```
claude-relay-service-frontend/
├── src/
│   ├── app/
│   │   ├── admin-next/
│   │   │   └── api-stats/
│   │   │       └── page.tsx        # API 统计页面
│   │   ├── api/
│   │   │   └── stats/
│   │   │       └── route.ts        # 模拟 API 端点
│   │   ├── layout.tsx              # 根布局
│   │   ├── page.tsx                # 首页
│   │   └── globals.css             # 全局样式
├── public/
│   └── lily-ui/                    # lily-ui 静态资源
│       ├── output.css
│       └── alpine.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── vercel.json                     # Vercel 配置
```

## 开发说明

### 连接后端 API

目前使用模拟数据。要连接实际后端 API，请修改：

1. 更新 `.env.local` 中的 `NEXT_PUBLIC_API_URL`
2. 修改 `src/app/admin-next/api-stats/page.tsx` 中的 API 调用逻辑

示例：

```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`)
```

### 自定义样式

项目使用 lily-ui 组件库和 Tailwind CSS。样式文件位于：

- `src/app/globals.css` - 全局样式
- `public/lily-ui/output.css` - lily-ui 样式

## 许可证

MIT
