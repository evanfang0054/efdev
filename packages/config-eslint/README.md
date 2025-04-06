# @efdev/config-eslint

ESLint 配置包，提供统一的代码规范和格式化规则。

## 📦 功能特性

- 🎯 统一的代码风格规范
- 🔍 严格的代码质量检查
- ⚡️ 支持 TypeScript
- 🛠 可扩展的规则配置

## 📂 目录结构

```
config-eslint/
├── rules/                # ESLint 规则配置
│   ├── base/            # 基础规则
│   │   ├── best-practices.js    # 最佳实践
│   │   ├── possible-errors.js   # 可能的错误
│   │   ├── style.js            # 代码风格
│   │   ├── variables.js        # 变量相关
│   │   ├── es6.js             # ES6+ 特性
│   │   └── strict.js          # 严格模式
│   └── imports/        # 导入/导出规则
├── typescript/         # TypeScript 相关配置
├── node.js            # Node.js 环境配置
├── index.js           # 主配置入口
├── .eslintrc.js       # ESLint 配置文件
├── .eslintignore      # ESLint 忽略配置
```

## 🚀 快速开始

在项目根目录创建 `.eslintrc.js` 文件, 并添加以下配置:

### JavaScript 项目配置

```bash
pnpm add -D @efdev/config-eslint @babel/core @babel/eslint-parser eslint-plugin-import
```

```javascript
module.exports = {
  extends: ['@efdev/config-eslint'],
};
```

### TypeScript 项目配置

```bash
pnpm add -D @efdev/config-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-import-resolver-typescript
```

```javascript
module.exports = {
  extends: ['@efdev/config-eslint/typescript'],
};
```

### Node.js + JavaScript 项目配置

```bash
pnpm add -D @efdev/config-eslint @babel/core @babel/eslint-parser eslint-plugin-import eslint-config-egg
```

```javascript
module.exports = {
  extends: ['@efdev/config-eslint/node'],
};
```

### Node.js + TypeScript 项目配置

```bash
pnpm add -D @efdev/config-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-import-resolver-typescript eslint-config-egg
```

```javascript
module.exports = {
  extends: ['@efdev/config-eslint/node', '@efdev/config-eslint/typescript'],
};
```

## 🎨 配合 Prettier 使用

为了确保 ESLint 规则与 Prettier 格式化规则的一致性，需要进行以下配置：

### 安装依赖

```bash
# pnpm
pnpm add -D eslint-config-prettier eslint-plugin-prettier

# npm
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

# yarn
yarn add -D eslint-config-prettier eslint-plugin-prettier
```

### ESLint 集成

修改 `.eslintrc.js` 配置，添加 Prettier 支持：

````javascript
// 基础项目
module.exports = {
  extends: ['@efdev/config-eslint', 'prettier'],
};

// TypeScript 项目
module.exports = {
  extends: ['@efdev/config-eslint/typescript', 'prettier'],
};

> **注意**：确保 `prettier` 配置位于 `extends` 数组的最后位置，以避免其他配置覆盖 Prettier 规则。

## 📋 可用的配置

- `@efdev/config-eslint`: 基础配置
- `@efdev/config-eslint/typescript`: TypeScript 配置
- `@efdev/config-eslint/node`: Node.js 配置

## 🔧 自定义规则

可以在项目的 `.eslintrc.js` 中覆盖默认规则：

```javascript
module.exports = {
  extends: ['@efdev/config-eslint'],
  rules: {
    // 自定义规则
    'no-console': 'warn',
    'no-unused-vars': 'error',
  },
};
````

## 📝 规则说明

### 基础规则集

- **最佳实践**: 包含代码最佳实践相关规则
- **可能的错误**: 帮助发现代码中潜在的错误
- **代码风格**: 统一的代码风格规范
- **变量相关**: 变量声明和使用的规则
- **ES6+**: ES6 及更高版本特性的使用规范
- **严格模式**: 与严格模式相关的规则

## 🔍 常见问题

### 1. ESLint 与 Prettier 规则冲突

如果遇到 ESLint 规则与 Prettier 格式化结果冲突，请确保：

1. 已正确安装 `eslint-config-prettier` 和 `eslint-plugin-prettier`
2. 在 `.eslintrc.js` 的 `extends` 数组中，`prettier` 配置位于最后
3. `.prettierrc.js` 配置与团队规范一致

### 2. TypeScript 项目配置

对于 TypeScript 项目，确保：

1. 项目根目录包含有效的 `tsconfig.json`
2. 使用正确的配置扩展（`typescript`）
3. 安装了所需的依赖（`@typescript-eslint/parser` 和 `@typescript-eslint/eslint-plugin`）
