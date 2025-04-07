/**
 * @efdev/config-eslint TypeScript 配置测试
 */

const { ESLint } = require('eslint');
const tsConfig = require('../typescript');
const tsNodeConfig = require('../typescript/node');

describe('@efdev/config-eslint/typescript', () => {
  describe('TypeScript 配置测试', () => {
    it('应该正确继承 TypeScript 配置', () => {
      expect(tsConfig.extends.map(path => path.replace(/\\/g, '/'))).toEqual(
        expect.arrayContaining([
          expect.stringContaining('rules/typescript'),
        ])
      );
    });

    it('应该包含必要的 TypeScript 规则', () => {
      const extendedConfig = require(tsConfig.extends[1]);
      expect(extendedConfig.parser).toBe('@typescript-eslint/parser');
      expect(extendedConfig.plugins).toContain('@typescript-eslint');
    });
  });

  describe('Node.js TypeScript 配置测试', () => {
    it('应该导出有效的 Node.js TypeScript ESLint 配置', () => {
      expect(tsNodeConfig).toBeValidESLintConfig();
    });

    it('应该继承 TypeScript 基础配置和 Node.js 规则', () => {
      expect(tsNodeConfig.extends.map(path => path.replace(/\\/g, '/'))).toEqual(
        expect.arrayContaining([
          expect.stringContaining('typescript/index'),
          expect.stringContaining('rules/node'),
        ])
      );
    });
  });

  describe('TypeScript 规则测试', () => {
    let eslint;

    beforeEach(() => {
      eslint = new ESLint({
        useEslintrc: false,
        baseConfig: {
          parser: '@typescript-eslint/parser',
          plugins: ['@typescript-eslint'],
          parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
          },
          rules: {
            'semi': ['error', 'always'],
            '@typescript-eslint/semi': ['error', 'always'],
            '@typescript-eslint/member-delimiter-style': ['error', {
              multiline: {
                delimiter: 'semi',
                requireLast: true
              },
              singleline: {
                delimiter: 'semi',
                requireLast: false
              }
            }]
          },
        },
      });
    });

    it('应该能正确检查 TypeScript 代码', async () => {
      const results = await eslint.lintText(`
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'John',
  age: 30
};
`, { filePath: 'test.ts' });

      // 检查具体的错误信息，帮助调试
      if (results[0].errorCount > 0) {
        console.log('TypeScript Errors:', results[0].messages);
      }

      expect(results[0].errorCount).toBe(0);
    });

    it('应该检测出代码中的分号错误', async () => {
      const results = await eslint.lintText(`
interface User {
  name: string
  age: number
}

const user: User = {
  name: 'John',
  age: 30
}
`, { filePath: 'test.ts' });

      expect(results[0].errorCount).toBeGreaterThan(0);
    });
  });
}); 