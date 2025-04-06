module.exports = {
  rules: {
    // 关闭 strict mode 的校验
    // 由于现代前端开发大多使用打包工具,会自动添加 strict mode
    // 且 ES modules 默认就是严格模式,因此不需要额外的 strict 声明
    strict: 'off',
  },
};
