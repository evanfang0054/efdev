import { defineConfig } from 'dumi';

const repo = 'efdev';

export default defineConfig({
  resolve: {
    // atomDirs: [{ type: 'component', dir: 'components' }], // 预留后续新增组件库时需要
    codeBlockMode: 'passive',
  },
  metas: [
    { name: 'build-time', content: Date.now().toString() },
  ],
  https: {},
  favicons: [`${process.env.NODE_ENV === 'production' ? `/${repo}/` : '/'}favicon.ico`],
  themeConfig: {
    name: 'EvanFang',
    socialLinks: {
      github: 'https://github.com/evanfang0054/efdev',
    },
    logo: `${process.env.NODE_ENV === 'production' ? `/${repo}/` : '/'}logo.png`,
    // rtl: true,
    prefersColor: { default: 'auto' },
    footer: `Copyright © ${new Date().getFullYear()} EvanFang`
  },
  base: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  publicPath: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
});
