module.exports = {
  rules: {
    // 强制 getter/setter 成对出现,默认关闭
    'accessor-pairs': 'off',

    // 数组方法的回调函数必须包含 return 语句,允许隐式返回 undefined
    'array-callback-return': ['error', { allowImplicit: true }],

    // 强制把 var 声明视为块级作用域,防止变量提升导致的问题
    'block-scoped-var': 'error',

    // 类方法中是否强制使用 this,默认关闭
    'class-methods-use-this': [
      'off',
      {
        exceptMethods: [],
      },
    ],

    // 代码圈复杂度检查,默认关闭,建议在 IDE 中进行检查
    complexity: ['off', 10],

    // 是否强制函数统一返回值类型,默认关闭以提供更大灵活性
    'consistent-return': 'off',

    // 控制流语句使用大括号规范:多行必须使用,单行推荐使用
    curly: ['error', 'multi-line'],

    // switch 语句必须包含 default 分支,可通过注释跳过检查
    'default-case': ['warn', { commentPattern: '^no default$' }],

    // 链式调用换行时点操作符在属性前面
    'dot-location': ['error', 'property'],

    // 优先使用点号访问对象属性,允许关键字属性
    'dot-notation': ['error', { allowKeywords: true }],

    // 要求使用 === 和 !==,null 比较除外
    eqeqeq: ['warn', 'always', { null: 'ignore' }],

    // for-in 循环中需要使用 hasOwnProperty 过滤
    'guard-for-in': 'warn',

    // 每个文件的类数量不做限制
    'max-classes-per-file': 'off',

    // 禁止使用 alert/confirm/prompt
    'no-alert': 'warn',

    // 禁止使用 arguments.caller/callee (严格模式下不可用)
    'no-caller': 'error',

    // switch 语句中声明变量需要大括号包裹
    'no-case-declarations': 'error',

    // 允许使用看似除法的正则表达式
    'no-div-regex': 'off',

    // 允许 if-else-return 的模式
    'no-else-return': 'off',

    // 空函数检查规则,允许箭头函数、普通函数和类方法为空
    'no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],

    // 禁止解构中出现空对象或数组模式
    'no-empty-pattern': 'error',

    // 允许直接与 null 比较
    'no-eq-null': 'off',

    // 禁止使用 eval
    'no-eval': 'error',

    // 禁止扩展原生对象原型
    'no-extend-native': 'error',

    // 禁止不必要的 Function.prototype.bind() 调用
    'no-extra-bind': 'error',

    // 禁止不必要的标签
    'no-extra-label': 'error',

    // switch 语句不允许 case 落空
    'no-fallthrough': 'error',

    // 浮点数必须包含小数点前后的数字
    'no-floating-decimal': 'error',

    // 禁止对原生对象或只读全局变量赋值
    'no-global-assign': ['error', { exceptions: [] }],

    // 允许使用简写的类型转换
    'no-implicit-coercion': [
      'off',
      {
        boolean: false,
        number: true,
        string: true,
        allow: [],
      },
    ],

    // 允许全局变量声明
    'no-implicit-globals': 'off',

    // 禁止使用隐式的 eval()
    'no-implied-eval': 'error',

    // 允许在类外使用 this
    'no-invalid-this': 'off',

    // 禁止使用 __iterator__ 属性
    'no-iterator': 'error',

    // 不建议使用标签语句
    'no-labels': ['warn', { allowLoop: false, allowSwitch: false }],

    // 禁止不必要的代码块嵌套
    'no-lone-blocks': 'error',

    // 禁止循环中创建函数引用外部变量
    'no-loop-func': 'error',

    // 允许使用魔术数字
    'no-magic-numbers': [
      'off',
      {
        ignore: [],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
      },
    ],

    // 禁止出现多个连续空格
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: false,
      },
    ],

    // 禁止使用多行字符串字面量
    'no-multi-str': 'error',

    // 禁止单独使用 new 操作符
    'no-new': 'error',

    // 禁止使用 Function 构造函数
    'no-new-func': 'error',

    // 禁止使用原始包装类型构造函数
    'no-new-wrappers': 'error',

    // 禁止使用八进制字面量
    'no-octal': 'error',

    // 禁止字符串中使用八进制转义序列
    'no-octal-escape': 'error',

    // 不建议修改函数参数,但允许特定场景
    'no-param-reassign': [
      'warn',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // reduce 累加器
          'e', // 事件对象
          'ctx', // Koa 上下文
          'draft', // Immer draft
          'req', // Express 请求
          'request', // Express 请求
          'res', // Express 响应
          'response', // Express 响应
          '$scope', // Angular 作用域
        ],
      },
    ],

    // 禁止使用 __proto__ 属性
    'no-proto': 'error',

    // 禁止重复声明
    'no-redeclare': 'error',

    // 允许使用对象的任意属性
    'no-restricted-properties': 'off',

    // 禁止在返回语句中赋值
    'no-return-assign': ['error', 'always'],

    // 允许 return await
    'no-return-await': 'off',

    // 禁止使用 javascript: URL
    'no-script-url': 'error',

    // 禁止自我赋值
    'no-self-assign': 'error',

    // 禁止自我比较
    'no-self-compare': 'error',

    // 禁止使用逗号操作符(循环除外)
    'no-sequences': 'error',

    // 建议抛出 Error 对象而非字面量
    'no-throw-literal': 'warn',

    // 允许循环条件不变
    'no-unmodified-loop-condition': 'off',

    // 禁止未使用的表达式,但允许短路、三元和标签模板
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],

    // 禁止未使用的标签
    'no-unused-labels': 'error',

    // 允许使用 .call() 和 .apply()
    'no-useless-call': 'off',

    // 禁止不必要的 catch 子句
    'no-useless-catch': 'error',

    // 禁止不必要的字符串连接
    'no-useless-concat': 'error',

    // 禁止不必要的转义字符
    'no-useless-escape': 'error',

    // 禁止冗余的 return
    'no-useless-return': 'error',

    // 禁止使用 void 运算符
    'no-void': 'error',

    // 允许 TODO/FIXME 注释
    'no-warning-comments': ['off', { terms: ['todo', 'fixme'], location: 'start' }],

    // 禁止使用 with 语句
    'no-with': 'error',

    // 建议 Promise.reject() 使用 Error 对象
    'prefer-promise-reject-errors': ['warn', { allowEmptyReject: true }],

    // 建议 parseInt() 使用基数参数
    radix: 'warn',

    // 允许无 await 的 async 函数
    'require-await': 'off',

    // 不强制使用 u 标志的正则
    'require-unicode-regexp': 'off',

    // 允许 var 声明出现在任意位置
    'vars-on-top': 'off',

    // 立即执行函数必须用括号包裹
    'wrap-iife': ['error', 'any', { functionPrototypeMethods: false }],

    // 禁止 Yoda 条件表达式
    yoda: 'warn',
  },
};
