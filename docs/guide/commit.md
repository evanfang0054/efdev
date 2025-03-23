---
nav: 规范指南
group:
  title: Git 相关
  order: 8
toc: content
---

# Commit 规范

Git 每次提交代码，都要写 Commit message，否则不允许提交

## 基本规范

- 每次提交，Commit message 都包括三个部分：Header，Body(非必填) 和 Footer(非必填)
- 提交信息正文开始前必须有一个空行
- 提交信息脚注开始前必须有一个空行
- 不允许空的主题
- 主题后不允许或必须有句号
- 不允许空的类型

```bash
<type>(<scope>): <subject>
# 空一行
<body>
# 空一行
<footer>
```

### Header

Header 部分只有一行，包括三个字段：type（必需）、scope（可选）和 subject（必需）

### type

type 用于说明 commit 的类别，只允许使用下面 13 个标识

```bash
feat：新增功能
fix：bug修复
build：主要母的是修改项目构建系统（例如glup，webpack，rollup，tsconfig的配置等）的提交
merge：分支合并
upd：更新某功能（不是feat，不是fix）
test：新增测试用例或更新现有测试
ci：主要目的是修改项目持续集成流程（例如Travis，Jenkins，Gitlab CI，Circle等）的提交
docs：文档更新
perf：性能，体验优化
refactor：重构代码
style：不影响程度逻辑的代码修改（修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑）
revert：回滚某个更早之前的版本
chore：构建过程或辅助工具的变动
```

### scope

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同

### subject

subject 是 commit 目的的简短描述，不超过 100 个字符
