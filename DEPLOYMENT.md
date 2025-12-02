# Vercel 部署指南

## 前提条件

- 已有 Vercel 账号（可使用 GitHub 登录）
- 已将代码推送到 GitHub 仓库

## 部署步骤

### 方法一：通过 Vercel 控制台部署（推荐）

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 GitHub 仓库 `claude-relay-service-frontend`
   - 点击 "Import"

3. **配置项目**
   - **Project Name**: `claude-relay-service-frontend`（或自定义）
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`（自动填充）
   - **Output Directory**: `.next`（自动填充）

4. **配置环境变量**（可选）

   在 "Environment Variables" 部分添加：

   ```
   NEXT_PUBLIC_API_URL = https://your-backend-api.vercel.app
   ```

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待 1-2 分钟完成部署
   - 部署完成后，Vercel 会提供一个唯一的域名，例如：
     `https://claude-relay-service-frontend.vercel.app`

### 方法二：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   # 首次部署
   vercel

   # 生产环境部署
   vercel --prod
   ```

4. **配置环境变量**（通过 CLI）
   ```bash
   vercel env add NEXT_PUBLIC_API_URL production
   ```

   然后输入你的后端 API 地址

## 自动部署

配置完成后，每次推送到主分支（main/master）时，Vercel 会自动触发部署。

- **推送到主分支** → 自动部署到生产环境
- **推送到其他分支** → 自动部署到预览环境

## 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

## 环境变量说明

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | 后端 API 地址 | `https://api.example.com` |

## 部署后检查

1. 访问你的 Vercel 部署地址
2. 检查首页是否正常显示
3. 访问 `/admin-next/api-stats` 查看 API 统计页面
4. 检查 lily-ui 样式是否正常加载

## 常见问题

### 1. 样式未加载

确保 `public/lily-ui/` 目录下的文件已正确推送到仓库：
```bash
ls -la public/lily-ui/
```

### 2. API 调用失败

检查环境变量 `NEXT_PUBLIC_API_URL` 是否正确配置。

### 3. 构建失败

查看 Vercel 构建日志，通常是依赖安装或 TypeScript 错误。

## 监控和日志

- **访问日志**: Vercel Dashboard → 选择项目 → Analytics
- **构建日志**: Vercel Dashboard → 选择项目 → Deployments → 点击具体部署
- **实时日志**: Vercel Dashboard → 选择项目 → Logs

## 回滚版本

如果新版本有问题，可以快速回滚：

1. 进入 Vercel Dashboard
2. 选择项目 → Deployments
3. 找到之前的稳定版本
4. 点击 "Promote to Production"

## 性能优化建议

1. 启用 Vercel Analytics
2. 配置 CDN 缓存
3. 使用 Image Optimization
4. 启用 Edge Functions（如需要）

## 费用说明

- **Hobby Plan**: 免费
  - 无限部署
  - 100GB 带宽/月
  - 适合个人项目

- **Pro Plan**: $20/月
  - 1TB 带宽/月
  - 高级分析功能
  - 适合团队项目
