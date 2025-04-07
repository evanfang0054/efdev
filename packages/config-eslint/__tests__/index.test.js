/**
 * @efdev/config-eslint 主配置测试
 */

const { ESLint } = require('eslint');
const path = require('path');
const baseConfig = require('../index');
const nodeConfig = require('../node');
const es5Config = require('../es5');

describe('@efdev/config-eslint', () => {
  describe('基础配置测试', () => {
    it('应该导出有效的 ESLint 配置', () => {
      expect(baseConfig).toBeValidESLintConfig();
    });

    it('应该包含所有必需的规则集', () => {
      const requiredExtends = [
        './rules/base/best-practices',
        './rules/base/possible-errors',
        './rules/base/style',
        './rules/base/variables',
        './rules/base/es6',
        './rules/base/strict',
        './rules/imports',
      ];

      const resolvedPaths = requiredExtends.map(rulePath => 
        path.resolve(__dirname, '..', `${rulePath}.js`)
      );

      const configPaths = baseConfig.extends.map(configPath => 
        path.resolve(configPath)
      );

      expect(configPaths).toEqual(
        expect.arrayContaining(resolvedPaths)
      );
    });

    it('应该正确配置解析器', () => {
      expect(baseConfig.parser).toBe('@babel/eslint-parser');
      expect(baseConfig.parserOptions).toEqual({
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: true,
        },
      });
    });
  });

  describe('Node.js 配置测试', () => {
    it('应该导出有效的 Node.js ESLint 配置', () => {
      expect(nodeConfig).toBeValidESLintConfig();
    });

    it('应该继承基础配置和 Node.js 规则', () => {
      expect(nodeConfig.extends).toEqual(
        expect.arrayContaining([
          expect.stringContaining('index'),
          expect.stringContaining('rules/node'),
        ])
      );
    });
  });

  describe('ES5 配置测试', () => {
    it('应该导出有效的 ES5 ESLint 配置', () => {
      expect(es5Config).toBeValidESLintConfig();
    });
  });

  describe('实际执行测试', () => {
    let eslint;

    beforeEach(() => {
      eslint = new ESLint({
        useEslintrc: false,
        baseConfig: {
          ...baseConfig,
          rules: {
            ...baseConfig.rules,
            'no-console': 'off', // 测试中允许使用 console
            'semi': ['error', 'never'], // 不使用分号
          },
        },
      });
    });

    it('应该能正确检查 JavaScript 代码', async () => {
      const results = await eslint.lintText(`
const foo = 'bar'
console.log(foo)

function test() {
  return true
}
test()
`);

      // 检查具体的错误信息，帮助调试
      if (results[0].errorCount > 0) {
        console.log('Errors:', results[0].messages);
      }
      
      expect(results[0].errorCount).toBe(0);
    });

    it('应该检测出代码中的错误', async () => {
      const results = await eslint.lintText(`
        const foo = 'bar';    // 使用了分号
        console.log(foo);     // 使用了分号
      `);

      expect(results[0].errorCount).toBeGreaterThan(0);
    });
  });
}); 