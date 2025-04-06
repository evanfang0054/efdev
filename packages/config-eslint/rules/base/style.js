module.exports = {
  rules: {
    // 控制数组字面量的换行符
    'array-bracket-newline': 'off',

    // 控制数组字面量中括号内的空格
    'array-bracket-spacing': ['error', 'never'],

    // 控制数组元素的换行符
    'array-element-newline': 'off',

    // 控制代码块大括号内的空格
    'block-spacing': ['error', 'always'],

    // 大括号风格配置,允许单行代码块
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // 驼峰命名规则检查
    camelcase: 'off',

    // 注释首字母大写检查
    'capitalized-comments': 'off',

    // 多行对象/数组等末尾逗号配置
    'comma-dangle': ['error', 'always-multiline'],

    // 逗号前后空格配置
    'comma-spacing': ['error', { before: false, after: true }],

    // 逗号位置配置
    'comma-style': ['error', 'last'],

    // 计算属性括号内空格配置
    'computed-property-spacing': ['error', 'never'],

    // this别名一致性检查
    'consistent-this': 'off',

    // 文件末尾空行配置
    'eol-last': ['warn', 'always'],

    // 函数调用括号前空格配置
    'func-call-spacing': ['error', 'never'],

    // 函数名与变量名匹配检查
    'func-name-matching': [
      'off',
      'always',
      {
        includeCommonJSModuleExports: false,
      },
    ],

    // 函数命名要求
    'func-names': 'off',

    // 函数风格要求
    'func-style': 'off',

    // 函数参数换行配置
    'function-paren-newline': ['error', 'consistent'],

    // 标识符黑名单
    'id-blacklist': 'off',

    // 标识符长度限制
    'id-length': 'off',

    // 标识符命名规则
    'id-match': 'off',

    // 箭头函数隐式返回换行配置
    'implicit-arrow-linebreak': ['off', 'beside'],

    // 缩进配置
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
        ignoreComments: false,
      },
    ],

    // JSX属性引号配置
    'jsx-quotes': ['error', 'prefer-double'],

    // 对象属性冒号前后空格配置
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],

    // 关键字前后空格配置
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true },
        },
      },
    ],

    // 行注释位置配置
    'line-comment-position': [
      'off',
      {
        position: 'above',
        ignorePattern: '',
        applyDefaultPatterns: true,
      },
    ],

    // 换行符风格配置
    'linebreak-style': 'off',

    // 类成员之间空行配置
    'lines-between-class-members': ['off', 'always', { exceptAfterSingleLine: false }],

    // 注释周围空行配置
    'lines-around-comment': 'off',

    // 代码嵌套深度限制
    'max-depth': ['off', 4],

    // 单行最大长度配置
    'max-len': [
      'warn',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    // 文件最大行数限制
    'max-lines': [
      'off',
      {
        max: 1000,
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    // 函数最大行数限制
    'max-lines-per-function': [
      'off',
      {
        max: 80,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],

    // 回调函数嵌套深度限制
    'max-nested-callbacks': 'off',

    // 函数参数数量限制
    'max-params': ['off', 3],

    // 函数语句数量限制
    'max-statements': ['off', 10],

    // 单行语句数量限制
    'max-statements-per-line': ['off', { max: 1 }],

    // 多行注释风格配置
    'multiline-comment-style': ['off', 'starred-block'],

    // 三元操作符换行配置
    'multiline-ternary': ['off', 'never'],

    // 构造函数命名规则
    'new-cap': [
      'error',
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
      },
    ],

    // 构造函数调用括号配置
    'new-parens': 'error',

    // 方法链换行配置
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 4 }],

    // Array构造函数使用限制
    'no-array-constructor': 'error',

    // 按位运算符使用限制
    'no-bitwise': 'warn',

    // continue语句使用限制
    'no-continue': 'off',

    // 行内注释限制
    'no-inline-comments': 'off',

    // 单独if语句作为else块限制
    'no-lonely-if': 'error',

    // 混合操作符使用限制
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['**', '+'],
          ['**', '-'],
          ['**', '*'],
          ['**', '/'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],

    // 空格和制表符混用限制
    'no-mixed-spaces-and-tabs': 'error',

    // 连续赋值限制
    'no-multi-assign': ['error'],

    // 多个空行限制
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],

    // 否定条件表达式限制
    'no-negated-condition': 'off',

    // 嵌套三元表达式限制
    'no-nested-ternary': 'error',

    // Object构造函数使用限制
    'no-new-object': 'error',

    // 自增自减运算符使用限制
    'no-plusplus': ['off', { allowForLoopAfterthoughts: true }],

    // 特定语法限制
    'no-restricted-syntax': 'off',

    // 制表符使用限制
    'no-tabs': 'error',

    // 三元操作符使用限制
    'no-ternary': 'off',

    // 行尾空格限制
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],

    // 下划线命名限制
    'no-underscore-dangle': 'off',

    // 不必要的三元表达式限制
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],

    // 属性前空格限制
    'no-whitespace-before-property': 'error',

    // 单行语句位置配置
    'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],

    // 对象大括号换行配置
    'object-curly-newline': 'off',

    // 对象大括号内空格配置
    'object-curly-spacing': ['error', 'always'],

    // 对象属性换行配置
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],

    // 变量声明方式配置
    'one-var': ['error', 'never'],

    // 变量声明换行配置
    'one-var-declaration-per-line': ['error', 'always'],

    // 运算符简写配置
    'operator-assignment': ['warn', 'always'],

    // 运算符换行配置
    'operator-linebreak': 'off',

    // 代码块内部空行配置
    'padded-blocks': ['warn', { blocks: 'never', classes: 'never', switches: 'never' }],

    // 语句间空行配置
    'padding-line-between-statements': 'off',

    // 对象展开运算符使用配置
    'prefer-object-spread': 'off',

    // 对象属性引号配置
    'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

    // 字符串引号配置
    quotes: ['error', 'single', { avoidEscape: true }],

    // JSDoc注释要求
    'require-jsdoc': 'off',

    // 分号配置
    semi: ['error', 'always'],

    // 分号前后空格配置
    'semi-spacing': ['error', { before: false, after: true }],

    // 分号位置配置
    'semi-style': ['error', 'last'],

    // 对象属性排序配置
    'sort-keys': ['off', 'asc', { caseSensitive: false, natural: true }],

    // 变量声明排序配置
    'sort-vars': 'off',

    // 代码块前空格配置
    'space-before-blocks': 'error',

    // 函数括号前空格配置
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    // 括号内空格配置
    'space-in-parens': ['error', 'never'],

    // 中缀操作符空格配置
    'space-infix-ops': 'error',

    // 一元操作符空格配置
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false,
        overrides: {},
      },
    ],

    // 注释空格配置
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!', '/'],
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!'],
          balanced: true,
        },
      },
    ],

    // switch语句冒号空格配置
    'switch-colon-spacing': ['error', { after: true, before: false }],

    // 模板字符串标签空格配置
    'template-tag-spacing': ['error', 'never'],

    // Unicode BOM配置
    'unicode-bom': ['off', 'never'],

    // 正则表达式括号配置
    'wrap-regex': 'off',
  },
};
