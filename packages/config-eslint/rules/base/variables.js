module.exports = {
  /**
   * 预设环境配置
   * 定义可用的全局变量,避免 no-undef 规则误报
   * @see https://eslint.org/docs/user-guide/configuring#specifying-environments
   */
  env: {
    browser: true, // 浏览器环境中的全局变量
    es6: true, // 启用 ES6 语法支持及全局变量
    jasmine: true, // Jasmine 测试框架的全局变量
    jest: true, // Jest 测试框架的全局变量
    jquery: true, // jQuery 库的全局变量
    mocha: true, // Mocha 测试框架的全局变量
    node: true, // Node.js 全局变量和作用域
  },
  rules: {
    /**
     * 变量声明和初始化规则
     */
    'init-declarations': 'off', // 关闭变量声明时强制初始化的限制

    /**
     * 变量删除相关规则
     */
    'no-delete-var': 'error', // 禁止使用 delete 操作符删除变量,只能用于删除对象的属性

    /**
     * 变量命名规则
     */
    'no-label-var': 'error', // 禁止创建与变量同名的标签,避免混淆

    /**
     * 全局变量使用规则
     */
    'no-restricted-globals': 'off', // 允许使用全局变量,不做限制

    /**
     * 变量作用域规则
     */
    'no-shadow': 'error', // 禁止变量名与上层作用域的变量同名,避免作用域混淆

    /**
     * 保留字相关规则
     */
    'no-shadow-restricted-names': 'error', // 禁止使用关键字和保留字作为变量名

    /**
     * 变量声明检查规则
     */
    'no-undef': 'error', // 禁止使用未声明的变量,避免意外创建全局变量

    /**
     * 变量初始化规则
     */
    'no-undef-init': 'error', // 禁止显式将变量初始化为 undefined

    /**
     * undefined 使用规则
     */
    'no-undefined': 'off', // 允许使用 undefined

    /**
     * 变量使用规则
     */
    'no-unused-vars': ['error', {
      vars: 'all', // 检查所有变量
      args: 'after-used', // 检查最后一个使用的参数之后的参数
      ignoreRestSiblings: true, // 忽略解构赋值中的剩余参数
    }],

    /**
     * 变量声明顺序规则
     */
    'no-use-before-define': ['error', {
      functions: false, // 允许函数声明提升
      classes: false, // 允许类声明提升
      variables: false, // 允许变量声明提升
    }],
  },
};
