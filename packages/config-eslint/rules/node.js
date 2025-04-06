/**
 * Node.js 相关的 ESLint 规则配置
 *
 * 继承自 egg-config-egg 的 Node.js 规则集
 * 包含了 eslint-plugin-node 插件提供的规则
 * 用于检查 Node.js 相关的代码规范
 *
 * 主要包括:
 * - Node.js 版本兼容性检查
 * - require/import 语句检查
 * - Node.js 核心模块使用检查
 * - 文件和目录命名规范
 * - process 对象使用规范
 *
 * @see https://github.com/eggjs/eslint-config-egg/blob/master/lib/rules/node.js
 * @see https://github.com/mysticatea/eslint-plugin-node
 */

module.exports = {
  extends: [
    'eslint-config-egg/lib/rules/node',
  ],
};
