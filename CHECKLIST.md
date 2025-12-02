# 部署前检查清单

## 代码准备

- [x] 项目结构搭建完成
- [x] Next.js 配置正确
- [x] lily-ui 组件库集成
- [x] API 统计页面实现
- [x] 本地构建测试通过

## 部署前确认

- [ ] 代码已推送到 GitHub 仓库
- [ ] 确认 `.gitignore` 配置正确
- [ ] 确认 `public/lily-ui/` 文件已包含在仓库中
- [ ] 环境变量已准备好（如需要）

## Vercel 配置

- [ ] 已登录 Vercel 账号
- [ ] 已导入 GitHub 仓库
- [ ] 环境变量已配置（可选）
  - `NEXT_PUBLIC_API_URL`: 后端 API 地址
- [ ] 已触发首次部署

## 部署后验证

- [ ] 访问首页 `/` 正常显示
- [ ] 访问 `/admin-next/api-stats` 页面正常
- [ ] 样式加载正常（lily-ui）
- [ ] API 调用正常（返回模拟数据）
- [ ] 响应式布局在移动端正常
- [ ] 页面性能良好

## 后端集成（当后端准备好后）

- [ ] 更新 `NEXT_PUBLIC_API_URL` 环境变量
- [ ] 修改 API 调用逻辑连接真实后端
- [ ] 测试跨域请求（CORS）
- [ ] 测试 API 认证（如需要）
- [ ] 处理 API 错误情况

## 可选优化

- [ ] 配置自定义域名
- [ ] 启用 Vercel Analytics
- [ ] 配置 CDN 缓存策略
- [ ] 添加 SEO 元数据
- [ ] 配置 Lighthouse 性能监控
- [ ] 设置错误监控（如 Sentry）

## 文档

- [x] README.md 完善
- [x] DEPLOYMENT.md 部署指南
- [x] CHECKLIST.md 检查清单

## 下一步

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 触发部署
5. 验证部署结果
6. 连接后端 API（当准备好时）

---

## 快速命令参考

```bash
# 本地开发
npm run dev

# 构建测试
npm run build

# 部署到 Vercel
vercel --prod

# 查看项目状态
vercel ls
```
