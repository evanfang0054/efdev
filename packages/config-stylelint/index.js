module.exports = {
  // 配置默认的严重性等级为警告
  defaultSeverity: 'warning',
  // 插件列表，用于扩展stylelint的功能
  plugins: [
    'stylelint-scss', // 支持SCSS语法的插件
    'stylelint-order', // 支持CSS属性排序的插件
  ],
  // 继承的基础配置，提供了一套标准的最佳实践规则 待定
  // extends: [
  //   'stylelint-config-standard', // 标准样式配置
  //   'stylelint-config-recommended-scss', // 推荐的SCSS样式配置
  // ],
  rules: {
    // 可能的错误
    'at-rule-no-unknown': true, // 不允许未知的@规则
    'scss/at-rule-no-unknown': true, // SCSS中不允许未知的@规则
    'block-no-empty': true, // 不允许空的块
    'color-no-invalid-hex': true, // 不允许无效的十六进制颜色代码
    'comment-no-empty': true, // 不允许空的注释
    'declaration-block-no-duplicate-properties': [
      true,
      { ignore: ['consecutive-duplicates-with-different-values'] }, // 允许连续的相同属性但不同值的声明
    ],
    'declaration-block-no-shorthand-property-overrides': true, // 不允许简写属性覆盖相关的长属性
    'font-family-no-duplicate-names': true, // 不允许字体家族中出现重复名称
    'function-calc-no-unspaced-operator': true, // calc()函数中的运算符前后必须有空格
    'function-linear-gradient-no-nonstandard-direction': true, // 不允许使用非标准方向值的线性渐变
    'keyframe-declaration-no-important': true, // 关键帧声明中不允许使用!important
    'media-feature-name-no-unknown': true, // 不允许使用未知的媒体特性名称
    'no-descending-specificity': null, // 允许低特异性选择器覆盖高特异性选择器（可根据团队需求调整）
    'no-duplicate-at-import-rules': true, // 不允许重复的@import规则
    'no-duplicate-selectors': true, // 不允许重复的选择器
    'no-extra-semicolons': true, // 不允许多余的分号
    'no-invalid-double-slash-comments': true, // 不允许无效的双斜杠注释
    'property-no-unknown': true, // 不允许未知的属性
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global', 'local', 'export'] }, // 忽略某些自定义的伪类
    ],
    'selector-pseudo-element-no-unknown': true, // 不允许未知的伪元素选择器
    'string-no-newline': true, // 字符串中不允许换行
    'unit-no-unknown': [
      true,
      { ignoreUnits: ['rpx', 'rem'] }, // 忽略某些特定的单位，例如rpx和rem
    ],
    // 风格问题
    'indentation': 2, // 指定缩进为2个空格
    'order/properties-alphabetical-order': true, // 属性按字母顺序排序
    'block-closing-brace-newline-before': 'always-multi-line', // 多行块的闭合大括号前必须有新行
    'block-closing-brace-space-before': 'always-single-line', // 单行块的闭合大括号前必须有空白
    'block-opening-brace-newline-after': 'always-multi-line', // 多行块的开始大括号后必须有新行
    'block-opening-brace-space-before': 'always', // 开始大括号前必须有空白
    'block-opening-brace-space-after': 'always-single-line', // 单行块的开始大括号后必须有空白
    'color-hex-case': 'lower', // 十六进制颜色代码必须小写
    'color-hex-length': 'short', // 使用短的十六进制颜色代码
    'comment-whitespace-inside': 'always', // 注释标记内必须有空白
    'declaration-colon-space-before': 'never', // 声明的冒号前不能有空格
    'declaration-colon-space-after': 'always', // 声明的冒号后必须有空格
    'declaration-block-single-line-max-declarations': 1, // 单行声明块中最多允许一条声明
    'declaration-block-trailing-semicolon': [
      'always',
      { severity: 'error' }, // 声明块末尾必须有分号
    ],
    'length-zero-no-unit': [
      true,
      { ignore: ['custom-properties'] }, // 长度为零时不需要单位，但忽略自定义属性
    ],
    'max-line-length': 120, // 最大行长度
    'selector-max-id': 0, // 不允许ID选择器
    'selector-attribute-quotes': 'always', // 属性选择器的属性值必须始终用引号括起来
    'value-list-comma-space-after': 'always-single-line', // 值列表中的逗号后在单行上必须有空格

    // stylelint-scss 规则
    'scss/double-slash-comment-whitespace-inside': 'always', // SCSS中双斜杠注释内必须有空白
    'scss/percent-placeholder-pattern': /^[a-z]+(?:-[a-z]+)*$/, // SCSS占位符的命名规则，只允许小写字母和短划线
  },
  // 忽略文件，不对其进行样式检查
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    'node_modules/**', // 忽略node_modules目录下的文件
  ],
};
