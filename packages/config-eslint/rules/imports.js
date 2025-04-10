/**
 * ESLint 导入规则配置
 * 基于 eslint-plugin-import 插件
 * 主要规范模块导入导出、静态分析、代码风格等
 */

module.exports = {
  plugins: [
    'import',
  ],
  settings: {
    // 配置忽略的文件类型
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  rules: {
    // -------- 静态分析相关规则 --------

    // 确保导入的模块可以被解析
    'import/no-unresolved': 'error',

    // 确保命名导入与命名导出一致
    'import/named': 'error',

    // 确保默认导入与默认导出一致
    'import/default': 'error',

    // 确保命名空间导入的属性在导出中存在
    'import/namespace': 'error',

    // -------- 警告性规则 --------

    // 禁止无效的导出,如多个默认导出
    'import/export': 'error',

    // 禁止默认导入与命名导出重名
    'import/no-named-as-default': 'error',

    // 当访问默认导出的属性与命名导出重名时警告
    'import/no-named-as-default-member': 'warn',

    // 允许使用已标记为废弃的导入
    'import/no-deprecated': 'off',

    // 允许导入未在 package.json 中声明的外部依赖
    'import/no-extraneous-dependencies': 'off',

    // 允许导出可变的绑定
    'import/no-mutable-exports': 'off',

    // -------- 模块系统规则 --------

    // 允许模块解析目标不明确(脚本 vs 模块)
    'import/unambiguous': 'off',

    // 允许使用 require()
    'import/no-commonjs': 'off',

    // 警告使用 AMD 的 require/define
    'import/no-amd': 'warn',

    // 允许使用 Node.js 内置模块
    'import/no-nodejs-modules': 'off',

    // -------- 代码风格规则 --------

    // 要求 import 语句必须放在模块顶部
    'import/first': 'error',

    // 禁止对同一模块多次导入
    'import/no-duplicates': 'error',

    // 允许使用命名空间导入
    'import/no-namespace': 'off',

    // 允许省略文件扩展名
    'import/extensions': 'off',

    // 关闭导入语句排序要求
    'import/order': ['off', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'never',
    }],

    // 要求在最后一个导入语句后保留空行
    'import/newline-after-import': 'warn',

    // 允许不使用默认导出
    'import/prefer-default-export': 'off',

    // 允许导入任意路径的模块
    'import/no-restricted-paths': 'off',

    // 允许模块有任意数量的依赖
    'import/max-dependencies': ['off', { max: 10 }],

    // 允许使用绝对路径导入
    'import/no-absolute-path': 'off',

    // 允许动态 require
    'import/no-dynamic-require': 'off',

    // 允许导入其他模块的子模块
    'import/no-internal-modules': ['off', {
      allow: [],
    }],

    // 允许使用 Webpack 加载器语法
    'import/no-webpack-loader-syntax': 'off',

    // 允许未赋值的导入(用于副作用)
    'import/no-unassigned-import': 'off',

    // 允许使用命名默认导入
    'import/no-named-default': 'off',

    // 允许匿名默认导出
    'import/no-anonymous-default-export': ['off', {
      allowArray: false,
      allowArrowFunction: false,
      allowAnonymousClass: false,
      allowAnonymousFunction: false,
      allowLiteral: false,
      allowObject: false,
    }],

    // 允许导出语句在文件任意位置
    'import/exports-last': 'off',

    // 允许分散的命名导出
    'import/group-exports': 'off',

    // 允许默认导出
    'import/no-default-export': 'off',

    // 禁止模块自引用
    'import/no-self-import': 'error',

    // 禁止循环依赖
    'import/no-cycle': [
      'warn', // 使用 warn 级别而不是 error
      {
        maxDepth: 10, // 限制检查的最大深度
        ignoreExternal: true, // 忽略外部模块
        allowUnsafeDynamicCyclicDependency: false, // 不允许不安全的动态循环依赖
      },
    ],

    // 允许路径中包含冗余片段
    'import/no-useless-path-segments': 'off',

    // 允许动态导入不带 webpackChunkName 注释
    'import/dynamic-import-chunkname': ['off', {
      importFunctions: [],
      webpackChunknameFormat: '[0-9a-zA-Z-_/.]+',
    }],

    // 允许使用相对父路径导入
    'import/no-relative-parent-imports': 'off',
  },
};
