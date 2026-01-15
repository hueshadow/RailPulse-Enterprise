# Netlify 部署指南

## 自动部署设置

1. 访问 [Netlify](https://www.netlify.com/) 并登录

2. 点击 "Add new site" → "Import an existing project"

3. 选择 "Deploy with GitHub" 并授权 Netlify 访问你的仓库

4. 选择仓库：`RailPulse-Enterprise`

5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

6. 点击 "Deploy site"

7. 等待构建完成（约 1-2 分钟）

8. 访问生成的 URL（格式：`https://random-name-123456.netlify.app`）

## 手动部署

如果需要手动部署：

```bash
# 构建项目
npm run build

# 部署到 Netlify
npx netlify deploy --prod --dir=dist
```

## 注意事项

- 每次推送到 `main` 分支会自动触发部署
- 配置文件 `netlify.toml` 已包含重定向规则，确保 SPA 路由正常工作
