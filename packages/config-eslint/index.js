/**
 * @efdev/config-eslint
 *
 * ESLint 主配置文件,用于集成和管理所有 ESLint 规则配置
 * 包含基础规则集和扩展规则集的统一配置
 * 提供完整的代码检查和格式化功能
 */

module.exports = {
  extends: [
    // 基础规则配置
    './rules/base/best-practices', // 最佳实践规则,包含推荐的编码实践
    './rules/base/possible-errors', // 潜在问题检测规则,帮助发现代码中可能存在的错误
    './rules/base/style', // 代码风格规范,统一团队代码风格
    './rules/base/variables', // 变量使用规范,确保变量声明和使用的正确性
    './rules/base/es6', // ES6+ 语法规范,规范新特性的使用
    './rules/base/strict', // 严格模式规范,强制执行严格的代码检查

    // 扩展规则配置
    './rules/imports', // 模块导入/导出规范,确保模块使用的规范性
  ].map(require.resolve),

  parser: '@babel/eslint-parser', // 使用 Babel 解析器以支持最新的 JavaScript 语法

  parserOptions: {
    requireConfigFile: false, // 无需强制要求 Babel 配置文件
    ecmaVersion: 2020, // 支持 ES2020 语法特性
    sourceType: 'module', // 启用 ES 模块化支持

    ecmaFeatures: {
      globalReturn: false, // 禁止在全局作用域使用 return 语句
      impliedStrict: true, // 自动启用严格模式解析
      jsx: true, // 启用 JSX 语法支持
    },
  },

  root: true, // 将此配置标记为根配置,阻止配置文件的向上查找
};
