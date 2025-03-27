<!-- markdownlint-disable-next-line -->
<div align="center">
  <img height="100" src="public/logo.png" alt="EvanFang">
  <h1>efdev</h1>

[Changelog](./CHANGELOG.md) · 中文

![---------------------------------](./assets/lines/rainbow.png)

</div>

## 📦 开发指南

### 环境准备

- Node.js >= 18.16.0
- pnpm >= 8

### 安装和启动

```bash
# 安装依赖
$ pnpm run init

# 启动开发服务器
$ pnpm start

# 构建文档
$ pnpm run build

# 本地预览生产构建
$ pnpm run preview
```

### 代码提交规范

提交信息需要遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范:

```bash
# 示例
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复某个bug"
git commit -m "docs: 更新文档"
```

### 目录结构

```bash
├── packages/           # 子包目录
├── docs/              # 文档
└── package.json       # 项目配置
```

### 开发工具配置

本项目使用以下工具来确保代码质量:

- ESLint - JavaScript 代码检查
- Prettier - 代码格式化
- StyleLint - CSS 代码检查
- CommitLint - Git 提交信息检查
- MarkdownLint - Markdown 文档检查
