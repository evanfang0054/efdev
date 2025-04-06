/**
 * TypeScript ESLint 规则配置
 * 使用 @typescript-eslint/parser 作为解析器
 * 使用 @typescript-eslint/eslint-plugin 提供的规则
 * @see https://github.com/typescript-eslint/typescript-eslint
 */

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    // TypeScript 文件的特殊解析配置
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.d.ts', '.tsx'],
    },
    // 使用 typescript 解析器处理导入
    'import/resolver': {
      typescript: {},
    },
    // 支持的文件扩展名
    'import/extensions': ['.js', '.ts', '.mjs'],
  },
  parserOptions: {
    project: './tsconfig.json', // 默认 TypeScript 配置文件
    createDefaultProgram: true, // 支持未在 tsconfig.json 中声明的文件
    extraFileExtensions: ['.vue'], // 额外支持的文件扩展名
  },
  rules: {
    // 函数重载签名必须连续放置
    '@typescript-eslint/adjacent-overload-signatures': 'error',

    // 数组类型定义规范
    // 简单类型使用 T[]
    // 复杂类型(联合、交叉等)使用 Array<T>
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],

    // 允许对非 Promise 对象使用 await
    '@typescript-eslint/await-thenable': 'off',

    // TypeScript 指令注释必须包含说明
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description',
      },
    ],

    // 禁止使用已废弃的 TSLint 注释
    '@typescript-eslint/ban-tslint-comment': 'error',

    // 允许使用所有类型
    '@typescript-eslint/ban-types': 'off',

    // 大括号风格
    // 采用 one true brace style
    // 允许单行代码块
    'brace-style': 'off',
    '@typescript-eslint/brace-style': [
      'error',
      '1tbs',
      { allowSingleLine: true },
    ],

    // 类的字面量属性应使用只读字段而非 getter
    '@typescript-eslint/class-literal-property-style': ['warn', 'fields'],

    // 逗号间隔规则
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': [
      'error',
      { before: false, after: true },
    ],

    // 类型断言规范
    // 必须使用 as Type 语法
    // 禁止对对象字面量使用断言(除了 any)
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],

    // 优先使用 interface 定义对象类型
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],

    // 允许参数默认值放在任意位置
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'off',

    // 优先使用点号访问对象属性
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],

    // 不强制要求函数声明返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',

    // 类成员访问性声明规范
    // public 可以省略
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      { accessibility: 'no-public' },
    ],

    // 不强制要求导出函数和类的公共方法声明类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // 函数调用括号前无空格
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],

    // 缩进使用 2 个空格
    indent: 'off',
    '@typescript-eslint/indent': [
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

    // 允许变量声明时不赋值
    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': 'off',

    // 关键字前后空格规范
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': [
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

    // 允许类成员之间没有空行
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',

    // interface/type 成员分隔符使用分号
    '@typescript-eslint/member-delimiter-style': 'error',

    // 类成员排序规则
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-field',
          'protected-field',
          'private-field',
          'instance-field',
          'field',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-method',
          'protected-method',
          'private-method',
          'instance-method',
          'method',
        ],
      },
    ],

    // interface 方法使用属性语法定义
    '@typescript-eslint/method-signature-style': ['warn', 'property'],

    // 不限制命名规则
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/naming-convention': 'off',

    // 禁止使用 Array 构造函数
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',

    // 允许任意 toString 调用
    '@typescript-eslint/no-base-to-string': 'off',

    // 禁止容易混淆的非空断言
    '@typescript-eslint/no-confusing-non-null-assertion': 'warn',

    // 禁止重复的类成员
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',

    // 允许动态的 delete
    '@typescript-eslint/no-dynamic-delete': 'off',

    // 允许特定的空函数
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],

    // 禁止空的 interface
    '@typescript-eslint/no-empty-interface': 'warn',

    // 允许使用 any
    '@typescript-eslint/no-explicit-any': 'off',

    // 允许多余的非空断言
    '@typescript-eslint/no-extra-non-null-assertion': 'off',

    // 允许额外的括号
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': 'off',

    // 禁止不必要的分号
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',

    // 允许定义只有静态成员的类
    '@typescript-eslint/no-extraneous-class': 'off',

    // 允许未处理的 Promise
    '@typescript-eslint/no-floating-promises': 'off',

    // 允许对数组使用 for-in
    '@typescript-eslint/no-for-in-array': 'off',

    // 允许使用 eval
    '@typescript-eslint/no-implied-eval': 'off',

    // 禁止给有初始值的变量添加类型声明
    '@typescript-eslint/no-inferrable-types': 'warn',

    // 允许在类外使用 this
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': 'off',

    // 禁止无意义的 void 类型
    '@typescript-eslint/no-invalid-void-type': 'error',

    // 允许魔术数字
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',

    // 允许在接口中定义 constructor
    '@typescript-eslint/no-misused-new': 'off',

    // 允许任意使用 Promise
    '@typescript-eslint/no-misused-promises': 'off',

    // 限制 namespace 的使用
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],

    // 禁止在可选链后使用非空断言
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // 允许使用非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',

    // 允许构造函数参数使用修饰符
    '@typescript-eslint/no-parameter-properties': 'off',

    // 不建议使用 require 导入
    '@typescript-eslint/no-require-imports': 'warn',

    // 禁止变量名与上层作用域变量同名
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    // 不建议将 this 赋值给其他变量
    '@typescript-eslint/no-this-alias': [
      'warn',
      {
        allowDestructuring: true,
      },
    ],

    // 允许抛出字面量
    '@typescript-eslint/no-throw-literal': 'off',

    // 允许使用类型别名
    '@typescript-eslint/no-type-alias': 'off',

    // 允许布尔类型的冗余比较
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',

    // 允许永真/永假的条件判断
    '@typescript-eslint/no-unnecessary-condition': 'off',

    // 允许使用命名空间限定符
    '@typescript-eslint/no-unnecessary-qualifier': 'off',

    // 允许显式指定泛型默认值
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',

    // 允许冗余的类型断言
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',

    // 允许 any 类型赋值
    '@typescript-eslint/no-unsafe-assignment': 'off',

    // 允许调用 any 类型的方法
    '@typescript-eslint/no-unsafe-call': 'off',

    // 允许访问 any 类型的属性
    '@typescript-eslint/no-unsafe-member-access': 'off',

    // 允许返回 any 类型
    '@typescript-eslint/no-unsafe-return': 'off',

    // 禁止无用的表达式
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],

    // 禁止未使用的变量
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    // 允许实验性的未使用变量检查
    '@typescript-eslint/no-unused-vars-experimental': 'off',

    // 允许在定义前使用变量
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: false },
    ],

    // 禁止不必要的构造函数
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',

    // 允许使用 require 导入
    '@typescript-eslint/no-var-requires': 'off',

    // 建议使用 as const
    '@typescript-eslint/prefer-as-const': 'warn',

    // 允许使用普通的 for 循环
    '@typescript-eslint/prefer-for-of': 'off',

    // 允许使用接口定义函数类型
    '@typescript-eslint/prefer-function-type': 'off',

    // 允许使用 indexOf
    '@typescript-eslint/prefer-includes': 'off',

    // 禁止使用 module 定义命名空间
    '@typescript-eslint/prefer-namespace-keyword': 'error',

    // 允许使用 ||
    '@typescript-eslint/prefer-nullish-coalescing': 'off',

    // 允许使用 &&
    '@typescript-eslint/prefer-optional-chain': 'off',

    // 允许非只读的私有属性
    '@typescript-eslint/prefer-readonly': 'off',

    // 允许可变参数类型
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',

    // 允许使用类型断言
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',

    // 允许使用 String#match
    '@typescript-eslint/prefer-regexp-exec': 'off',

    // 允许其他方式检查字符串开头结尾
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',

    // 允许使用 @ts-ignore
    '@typescript-eslint/prefer-ts-expect-error': 'off',

    // 允许 async 函数返回非 Promise
    '@typescript-eslint/promise-function-async': 'off',

    // 字符串使用单引号
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],

    // 允许 async 函数不包含 await
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',

    // 加号操作数类型必须一致
    '@typescript-eslint/restrict-plus-operands': 'warn',

    // 允许模板字符串中使用任意类型
    '@typescript-eslint/restrict-template-expressions': 'off',

    // 允许在 return 中使用 await
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'off',

    // 强制使用分号
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],

    // 函数括号前的空格规则
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    // 允许非布尔值用于条件判断
    '@typescript-eslint/strict-boolean-expressions': 'off',

    // 允许 switch 语句遗漏分支
    '@typescript-eslint/switch-exhaustiveness-check': 'off',

    // 限制三斜线指令的使用
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'always',
        lib: 'always',
      },
    ],

    // 类型注解的空格规范
    '@typescript-eslint/type-annotation-spacing': 'error',

    // 类型声明规范
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        parameter: false,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],

    // 允许方法不绑定到 this
    '@typescript-eslint/unbound-method': 'off',

    // 建议使用联合类型代替函数重载
    '@typescript-eslint/unified-signatures': 'warn',

    // 禁止重复声明
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // 在 TypeScript 文件中禁用 no-undef 规则
        // 因为它会对导出的默认接口报错
        // TypeScript 编译器会在启用 strictNullChecks 时捕获这些错误
        'no-undef': 'off',

        // 禁用 ESLint 的模块解析检查
        // 以提供更好的 monorepo 支持
        'import/no-unresolved': 'off',
      },
    },
  ],
};
