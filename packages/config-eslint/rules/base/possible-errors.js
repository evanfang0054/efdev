module.exports = {
  rules: {
    // 确保 for 循环中的计数器变量朝着正确的方向递增或递减,避免死循环
    'for-direction': 'error',

    // 确保 getter 属性方法有返回值,可以是隐式返回 undefined
    'getter-return': ['error', { allowImplicit: true }],

    // 禁止将 async 函数用作 Promise 构造函数的执行器,因为这可能导致竞态条件和内存泄漏
    'no-async-promise-executor': 'error',

    // 建议避免在循环体中使用 await,因为这会导致串行执行,应该使用 Promise.all() 实现并行
    'no-await-in-loop': 'warn',

    // 禁止与 -0 进行比较,因为 Object.is(+0, -0) 为 false
    'no-compare-neg-zero': 'error',

    // 禁止在条件语句中使用赋值操作符,避免将 = 误写为 ==
    'no-cond-assign': ['error', 'always'],

    // 生产环境不建议使用 console,避免泄露调试信息
    'no-console': 'warn',

    // 条件判断中不建议使用字面常量,这通常表示逻辑错误
    'no-constant-condition': 'warn',

    // 允许在正则表达式中使用控制字符(ASCII 0-31),某些场景可能需要
    'no-control-regex': 'off',

    // 禁止使用 debugger 语句,生产环境中应该被移除
    'no-debugger': 'error',

    // 禁止函数参数重名,这会导致前面的参数被覆盖
    'no-dupe-args': 'error',

    // 禁止对象字面量中出现重复的键名,后者会覆盖前者
    'no-dupe-keys': 'error',

    // 禁止 switch 语句中出现重复的 case 分支
    'no-duplicate-case': 'error',

    // 禁止出现空的代码块,除非有注释说明
    'no-empty': 'error',

    // 禁止在正则表达式中使用空字符类 [],因为它不会匹配任何字符
    'no-empty-character-class': 'error',

    // 禁止对 catch 子句中的异常参数赋值
    'no-ex-assign': 'error',

    // 禁止不必要的布尔类型转换,如 !!foo
    'no-extra-boolean-cast': 'error',

    // 允许额外的括号,有时可以提高代码可读性
    'no-extra-parens': [
      'off',
      'all',
      {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: 'all', // 交由 eslint-plugin-react 处理
        enforceForArrowConditionals: false,
      },
    ],

    // 禁止不必要的分号
    'no-extra-semi': 'error',

    // 禁止对函数声明重新赋值,这会导致意外的行为
    'no-func-assign': 'error',

    // 禁止在嵌套的语句块中声明函数,容易造成变量提升相关的问题
    'no-inner-declarations': 'error',

    // 禁止在 RegExp 构造函数中使用无效的正则表达式字符串
    'no-invalid-regexp': 'error',

    // 禁止使用不规则的空白符(如全角空格)
    'no-irregular-whitespace': 'error',

    // 禁止在正则表达式字符类语法中使用多码点字符
    'no-misleading-character-class': 'error',

    // 禁止将全局对象当作函数调用,如 Math(), JSON()
    'no-obj-calls': 'error',

    // 建议使用 Object 原型方法的替代方法,如 Object.hasOwn()
    'no-prototype-builtins': 'error',

    // 禁止正则表达式中出现多个连续空格,应使用量词
    'no-regex-spaces': 'error',

    // 禁止使用稀疏数组,如 [1,,2],可能导致意外行为
    'no-sparse-arrays': 'error',

    // 警告在常规字符串中出现模板字面量占位符语法
    'no-template-curly-in-string': 'warn',

    // 禁止出现容易引起混淆的多行表达式
    'no-unexpected-multiline': 'error',

    // 禁止在 return、throw、break 和 continue 语句后出现不可达代码
    'no-unreachable': 'error',

    // 禁止在 finally 块中出现控制流语句,因为这会干扰正常的异常处理
    'no-unsafe-finally': 'error',

    // 禁止对关系运算符的左操作数使用否定操作符
    'no-unsafe-negation': 'error',

    // 警告可能导致竞态条件的赋值操作
    'require-atomic-updates': 'warn',

    // 要求使用 Number.isNaN() 检查 NaN
    'use-isnan': 'error',

    // 关闭 JSDoc 注释检查
    'valid-jsdoc': 'off',

    // 强制 typeof 表达式与有效的字符串字面量进行比较
    'valid-typeof': ['error', { requireStringLiterals: true }],
  },
};
