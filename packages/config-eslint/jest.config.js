/**
 * Jest 配置文件
 * 用于 ESLint 配置包的测试
 */
module.exports = {
  // 测试环境
  testEnvironment: 'node',

  // 覆盖率收集
  collectCoverage: true,
  collectCoverageFrom: [
    'index.js',
    'node.js',
    'es5.js',
    'rules/**/*.js',
    'typescript/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],

  // 覆盖率目标
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  // 测试文件匹配
  testMatch: [
    '**/__tests__/**/*.test.js',
  ],

  // 测试超时设置
  testTimeout: 10000,

  // 测试报告格式
  coverageReporters: ['text', 'lcov', 'html'],

  // 测试环境设置
  setupFilesAfterEnv: ['./__tests__/setup.js'],
};
