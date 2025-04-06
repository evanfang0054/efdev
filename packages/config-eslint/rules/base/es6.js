module.exports = {
  rules: {
    // 控制箭头函数体的书写风格,关闭此规则以允许更灵活的书写方式
    'arrow-body-style': [
      'off',
      'as-needed',
      {
        requireReturnForObjectLiteral: false,
      },
    ],

    // 要求箭头函数的参数使用圆括号包裹,与 Prettier 保持一致
    'arrow-parens': ['warn', 'always'],

    // 要求箭头函数的箭头(=>)之前和之后都有空格
    'arrow-spacing': ['error', { before: true, after: true }],

    // 验证构造函数中 super() 的调用
    'constructor-super': 'error',

    // 强制 generator 函数中 * 号的位置
    'generator-star-spacing': ['error', { before: false, after: true }],

    // 禁止修改类声明的变量
    'no-class-assign': 'error',

    // 禁止在可能与比较操作符混淆的地方使用箭头函数
    'no-confusing-arrow': 'error',

    // 禁止修改 const 声明的变量
    'no-const-assign': 'error',

    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 'error',

    // 关闭重复导入检测,使用 import/no-duplicates 替代
    'no-duplicate-imports': 'off',

    // 禁止使用 new 操作符来调用 Symbol
    'no-new-symbol': 'error',

    // 允许任意的导入,可通过配置限制特定模块的导入
    'no-restricted-imports': [
      'off',
      {
        paths: [],
        patterns: [],
      },
    ],

    // 禁止在构造函数中,在调用 super() 之前使用 this 或 super
    'no-this-before-super': 'error',

    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',

    // 禁止不必要的构造函数
    'no-useless-constructor': 'error',

    // 禁止在解构赋值和导入/导出语句中进行无意义的重命名
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],

    // 要求使用 let 或 const 而不是 var
    'no-var': 'error',

    // 要求对象字面量使用简写语法
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],

    // 要求回调函数使用箭头函数
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],

    // 要求优先使用 const 声明变量,let 仅在变量会被重新赋值时使用
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],

    // 优先使用对象和数组的解构赋值
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // 允许使用 parseInt() 进行进制转换
    'prefer-numeric-literals': 'off',

    // 建议使用剩余参数代替 arguments
    'prefer-rest-params': 'warn',

    // 建议使用扩展运算符代替 .apply()
    'prefer-spread': 'warn',

    // 建议使用模板字面量代替字符串拼接
    'prefer-template': 'warn',

    // 要求 generator 函数内有 yield 关键字
    'require-yield': 'error',

    // 禁止扩展运算符及其运算对象之间有空格
    'rest-spread-spacing': ['error', 'never'],

    // 关闭导入语句排序
    'sort-imports': [
      'off',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    // 要求 Symbol 描述内容
    'symbol-description': 'warn',

    // 要求模板字符串中的嵌入表达式周围空格的使用
    'template-curly-spacing': 'warn',

    // 要求 yield* 表达式中的 * 周围空格的使用
    'yield-star-spacing': ['error', 'after'],
  },
};
