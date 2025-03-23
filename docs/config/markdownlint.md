---
toc: content
group: 规范配置
---

# markdownlint 配置

支持配套的 [markdownlint 可共享配置](https://www.npmjs.com/package/markdownlint#optionsconfig)。

## 安装

需要先全局安装 [markdownlint-cli](https://www.npmjs.com/package/markdownlint-cli)

```bash
npm install -g markdownlint-cli
```

再安装 [markdownlint](https://www.npmjs.com/package/markdownlint)：

```bash
npm install @efdev/config-markdownlint -D
```

```bash
npm install markdownlint -D
```

## 使用

在 `.markdownlint.json` 中继承本包:

```json
{
  "extends": "@efdev/config-markdownlint"
}
```
