/**
 * ES5 特定规则配置
 * 用于覆盖与 ES6+ 规则不同的配置项
 * 主要包含语法特性差异导致的规则调整
 */

module.exports = {
  rules: {
    // 对象和数组末尾逗号配置
    // ES5 语法不支持末尾逗号,需要设置为 never
    // 避免在 IE8 及以下版本中出现语法错误
    'comma-dangle': ['error', 'never'],
  },
};
