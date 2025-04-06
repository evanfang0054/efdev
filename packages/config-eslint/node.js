/**
 * ESLint 配置文件 - Node.js 环境
 *
 * 该配置文件用于 Node.js 项目的 ESLint 规则配置:
 * 1. 继承基础配置规则集 './index'
 * 2. 引入 Node.js 环境特定规则集 './rules/node'
 * 3. 通过 require.resolve 解析配置文件的绝对路径
 *
 * @type {import('eslint').Linter.Config}
 */

module.exports = {
  extends: [
    './index', // 基础 ESLint 规则配置
    './rules/node', // Node.js 环境专用规则配置
  ].map(require.resolve),
};
