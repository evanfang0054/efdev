/**
 * Jest 测试环境设置
 */

const { ESLint } = require('eslint');

// 扩展期望方法
expect.extend({
  toBeValidESLintConfig(received) {
    try {
      const eslint = new ESLint({
        useEslintrc: false,
        baseConfig: received,
        overrideConfig: received
      });
      
      return {
        message: () => 'Expected config to be invalid ESLint config',
        pass: true,
      };
    } catch (error) {
      return {
        message: () => `Expected config to be valid ESLint config: ${error.message}`,
        pass: false,
      };
    }
  },
});

// 全局测试超时设置
jest.setTimeout(10000); 