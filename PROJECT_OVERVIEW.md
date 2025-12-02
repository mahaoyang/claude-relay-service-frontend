# Claude Relay Service Frontend - 项目概览

## 项目信息

- **项目名称**: Claude Relay Service Frontend
- **技术栈**: Next.js 15 + TypeScript + lily-ui
- **部署平台**: Vercel
- **创建日期**: 2024-12-02

## 功能模块

### 1. API 统计页面 (`/admin-next/api-stats`)

展示 Claude Relay Service 的 API 使用统计信息，包括：

- **总请求数**: 显示所有 API 请求总数
- **成功请求**: 显示成功处理的请求数量
- **失败请求**: 显示失败的请求数量
- **平均响应时间**: 显示 API 平均响应时间（毫秒）
- **按端点统计**: 展示各个 API 端点的调用次数和占比
- **请求趋势**: 显示最近 7 天的请求趋势

### 2. 首页 (`/`)

简单的导航页面，提供到各个功能模块的链接。

## 项目结构

```
claude-relay-service-frontend/
├── src/
│   ├── app/
│   │   ├── admin-next/
│   │   │   └── api-stats/
│   │   │       └── page.tsx        # API 统计页面（客户端组件）
│   │   ├── api/
│   │   │   └── stats/
│   │   │       └── route.ts        # 模拟 API 端点（返回测试数据）
│   │   ├── layout.tsx              # 根布局（包含 lily-ui 集成）
│   │   ├── page.tsx                # 首页
│   │   └── globals.css             # 全局样式（导入 lily-ui）
├── public/
│   └── lily-ui/                    # lily-ui 组件库静态资源
│       ├── output.css              # lily-ui 编译后的 CSS
│       └── alpine.js               # Alpine.js（lily-ui 依赖）
├── package.json                    # 项目依赖配置
├── tsconfig.json                   # TypeScript 配置
├── tailwind.config.js              # Tailwind CSS 配置
├── next.config.js                  # Next.js 配置
├── vercel.json                     # Vercel 部署配置
├── .env.example                    # 环境变量示例
├── .env.local                      # 本地环境变量
├── .gitignore                      # Git 忽略配置
├── README.md                       # 项目说明文档
├── DEPLOYMENT.md                   # 部署指南
├── CHECKLIST.md                    # 部署检查清单
└── PROJECT_OVERVIEW.md             # 项目概览（本文档）
```

## 核心文件说明

### 1. `src/app/admin-next/api-stats/page.tsx`

API 统计页面主组件，使用 React Hooks 实现数据获取和状态管理。

**主要功能**：
- 使用 `useEffect` 在组件挂载时获取统计数据
- 使用 `useState` 管理加载状态、错误状态和数据状态
- 展示 4 个统计卡片（总请求、成功、失败、响应时间）
- 展示按端点统计的条形图
- 展示按日期统计的趋势图
- 提供数据刷新功能

**关键代码**：
```typescript
const fetchStats = async () => {
  const response = await fetch('/api/stats')
  const data = await response.json()
  setStats(data)
}
```

### 2. `src/app/api/stats/route.ts`

Next.js API 路由，提供统计数据接口。

**当前实现**：返回模拟数据用于演示和测试

**未来改进**：连接真实后端 API

**示例响应**：
```json
{
  "totalRequests": 15847,
  "successRequests": 14923,
  "failedRequests": 924,
  "averageResponseTime": 287,
  "requestsByEndpoint": [...],
  "requestsByDate": [...]
}
```

### 3. `src/app/layout.tsx`

根布局组件，负责：
- 引入 lily-ui CSS 样式
- 引入 Alpine.js 脚本
- 设置页面元数据（标题、描述）
- 提供全局布局结构

### 4. `vercel.json`

Vercel 部署配置，指定：
- 构建命令：`npm run build`
- 输出目录：`.next`
- 框架：Next.js
- 区域：香港（hkg1）
- 路由重写规则

## 技术细节

### lily-ui 集成

lily-ui 是基于 Tailwind CSS 和 Alpine.js 的组件库。集成方式：

1. **CSS**: 通过 `<link>` 标签在 `layout.tsx` 中引入
2. **JavaScript**: 通过 `<Script>` 组件在 `layout.tsx` 中引入
3. **静态资源**: 放置在 `public/lily-ui/` 目录

### 样式系统

- **Tailwind CSS**: 用于基础样式和工具类
- **lily-ui**: 提供预设计的组件样式
- **自定义样式**: 在 `globals.css` 中定义

### 数据流

```
浏览器 → /admin-next/api-stats (page.tsx)
         ↓
         fetch('/api/stats')
         ↓
      /api/stats (route.ts)
         ↓
      返回模拟数据
         ↓
      页面渲染统计信息
```

**未来架构**（连接后端）：
```
浏览器 → /admin-next/api-stats
         ↓
         fetch(NEXT_PUBLIC_API_URL + '/api/stats')
         ↓
      后端 API 服务
         ↓
      数据库查询
         ↓
      返回真实数据
```

## 环境变量

| 变量名 | 说明 | 开发环境 | 生产环境 |
|--------|------|----------|----------|
| `NEXT_PUBLIC_API_URL` | 后端 API 基础 URL | `http://localhost:3000` | `https://api.example.com` |
| `NODE_ENV` | 运行环境 | `development` | `production` |

## API 接口设计

### GET /api/stats

**描述**: 获取 API 统计数据

**请求**: 无参数

**响应**:
```typescript
interface ApiStats {
  totalRequests: number              // 总请求数
  successRequests: number            // 成功请求数
  failedRequests: number             // 失败请求数
  averageResponseTime: number        // 平均响应时间（ms）
  requestsByEndpoint: Array<{
    endpoint: string                 // 端点路径
    count: number                    // 请求次数
  }>
  requestsByDate: Array<{
    date: string                     // 日期 (YYYY-MM-DD)
    count: number                    // 请求次数
  }>
}
```

## 后续开发计划

### Phase 1: 后端集成（当后端准备好后）

- [ ] 更新 API 调用逻辑连接真实后端
- [ ] 实现 API 认证和授权
- [ ] 处理 API 错误和边界情况
- [ ] 添加请求重试机制

### Phase 2: 功能增强

- [ ] 添加日期范围选择器
- [ ] 实现数据导出功能（CSV/Excel）
- [ ] 添加实时数据刷新（WebSocket）
- [ ] 实现数据可视化图表（Chart.js）
- [ ] 添加数据筛选和搜索功能

### Phase 3: 性能优化

- [ ] 实现数据缓存（React Query）
- [ ] 添加骨架屏加载状态
- [ ] 优化图片和静态资源
- [ ] 实现代码分割和懒加载

### Phase 4: 用户体验

- [ ] 添加深色模式支持
- [ ] 优化移动端体验
- [ ] 添加国际化支持（i18n）
- [ ] 实现无障碍访问（a11y）

## 开发指南

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问应用
# http://localhost:3000
```

### 构建测试

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 Next.js 最佳实践
- 使用 ESLint 进行代码检查
- 保持组件简洁和可复用

## 常见问题

### 1. lily-ui 样式未加载

**原因**: `public/lily-ui/` 文件缺失或路径错误

**解决**:
```bash
cp /home/ha/workspace/lily-ui/dist/output.css public/lily-ui/
cp /home/ha/workspace/lily-ui/node_modules/alpinejs/dist/cdn.min.js public/lily-ui/alpine.js
```

### 2. API 调用失败

**原因**: 环境变量未配置或后端服务未启动

**解决**:
- 检查 `.env.local` 文件
- 确认 `NEXT_PUBLIC_API_URL` 变量正确
- 如果使用真实后端，确保后端服务正在运行

### 3. 构建错误

**原因**: TypeScript 类型错误或依赖缺失

**解决**:
```bash
# 清理缓存
rm -rf .next node_modules package-lock.json

# 重新安装依赖
npm install

# 重新构建
npm run build
```

## 支持和联系

如有问题或建议，请：
1. 查看 [README.md](./README.md)
2. 查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
3. 提交 Issue 到项目仓库

## 许可证

MIT License
