# @efdev/config-stylelint

> stylelint 配置

支持配套的 [stylelint 可共享配置](https://stylelint.io/user-guide/configure)。

## 安装

需要先行安装 [stylelint](https://www.npmjs.com/package/stylelint) 、 [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)、 [stylelint-order](https://www.npmjs.com/package/stylelint-order)：

```bash
npm install config-stylelint -D
```

```bash
npm install stylelint -D
```

## 使用

在 `.stylelintrc` 中继承本包:

```json
{
  "extends": "@efdev/config-stylelint"
}
```
