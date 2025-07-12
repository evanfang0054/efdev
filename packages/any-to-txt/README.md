# @efdev/any-to-txt

## 工具简介

any-to-txt 是一个命令行工具，用于将代码文件转换为纯文本格式。该工具主要用途是将各种格式的源代码文件批量转换为带有原始路径标记的 .txt 文件，便于后续处理和分析。

## 功能特点

- 递归处理整个目录结构，自动保持原有目录层次
- 可选择性移除代码中的注释（支持多种语言注释格式）
- 支持文件格式过滤（包含或排除特定扩展名）
- 支持目录过滤（排除不需要处理的目录）
- 自动在文件开头添加原始文件路径信息
- 支持自定义输出目录
- 支持递归深度限制，避免处理过深的目录
- 提供实时进度显示，直观了解转换进度
- 支持大文件流式处理，有效降低内存占用
- 可选的缓存机制，避免重复转换未修改的文件

## 安装与依赖

该工具基于 Node.js 环境，使用前请确保已安装 Node.js 运行环境（推荐 v16 以上版本）。

### 全局安装

```bash
# 使用 npm 安装
npm install -g @efdev/any-to-txt

# 使用 yarn 安装
yarn global add @efdev/any-to-txt

# 使用 pnpm 安装
pnpm add -g @efdev/any-to-txt
```

### 项目中安装

```bash
# 使用 npm 安装
npm install @efdev/any-to-txt

# 使用 yarn 安装
yarn add @efdev/any-to-txt

# 使用 pnpm 安装
pnpm add @efdev/any-to-txt
```

## 使用方法

### 全局安装后直接使用

```bash
any-to-txt [源目录路径] [选项]
```

### 通过 npx 使用（无需安装）

```bash
npx @efdev/any-to-txt [源目录路径] [选项]
```

### 参数说明

- `[源目录路径]`：要处理的源代码目录，默认为当前工作目录
- `[选项]`：可选参数，用于控制转换行为

### 可用选项

| 选项                | 简写 | 说明                               | 示例                              |
| ------------------- | ---- | ---------------------------------- | --------------------------------- |
| `--include`         | `-i` | 指定要包含的文件扩展名（逗号分隔） | `--include js,ts,jsx`             |
| `--exclude`         | `-e` | 指定要排除的文件扩展名（逗号分隔） | `--exclude css,html`              |
| `--exclude-dir`     | `-d` | 指定要排除的目录名（逗号分隔）     | `--exclude-dir node_modules,dist` |
| `--keep-comments`   | `-k` | 保留代码中的注释                   | `--keep-comments`                 |
| `--remove-comments` | `-c` | 移除代码中的注释（默认行为）       | `--remove-comments`               |
| `--output`          | `-o` | 指定输出目录名称                   | `--output my-output-dir`          |
| `--max-depth`       | `-m` | 指定递归深度限制（0表示无限制）    | `--max-depth 3`                   |
| `--cache`           | -    | 启用缓存（默认关闭）               | `--cache`                         |
| `--cache-file`      | -    | 指定缓存文件路径                   | `--cache-file .my-cache.json`     |
| `--file-size`       | -    | 流式处理的文件大小阈值（单位：MB） | `--file-size 10`                  |
| `--no-progress`     | -    | 隐藏进度条                         | `--no-progress`                   |
| `--version`         | `-V` | 显示版本号                         | `--version`                       |
| `--help`            | `-h` | 显示帮助信息                       | `--help`                          |

## 转换规则

1. 转换结果将存放在源目录同级的 `{源目录名}-ai-docs` 目录中，除非使用 `--output` 指定其他目录
2. 每个源文件将被转换为同名的 `.txt` 文件
3. 转换后的文件开头会添加原始文件路径信息
4. 默认会移除代码中的注释，可通过 `--keep-comments` 选项保留
5. 大于指定阈值的文件将使用流式处理，减少内存占用
6. 启用缓存时，会跳过未修改的文件，提高转换效率

## 使用示例

### 基本用法

```bash
# 转换当前目录下所有文件（排除node_modules）
any-to-txt

# 转换指定目录下的所有文件
any-to-txt /path/to/project
```

### 过滤特定文件格式

```bash
# 只转换 JavaScript 和 TypeScript 文件
any-to-txt --include js,ts,jsx,tsx

# 排除图片和样式文件
any-to-txt --exclude jpg,png,css,scss
```

### 排除特定目录

```bash
# 排除多个目录
any-to-txt --exclude-dir node_modules,dist,build,temp
```

### 注释处理

```bash
# 保留源代码中的注释
any-to-txt --keep-comments

# 移除源代码中的注释（默认行为）
any-to-txt --remove-comments
```

### 自定义输出目录

```bash
# 指定输出目录
any-to-txt --output /path/to/output

# 指定相对路径的输出目录
any-to-txt --output ../code-docs
```

### 递归深度控制

```bash
# 限制递归深度为2层
any-to-txt --max-depth 2

# 不限制递归深度（默认）
any-to-txt --max-depth 0
```

### 缓存控制

```bash
# 启用缓存功能
any-to-txt --cache

# 指定缓存文件路径
any-to-txt --cache --cache-file .custom-cache.json
```

### 大文件处理

```bash
# 设置大文件阈值为10MB
any-to-txt --file-size 10

# 默认大文件阈值为5MB
any-to-txt
```

### 进度显示控制

```bash
# 隐藏进度条
any-to-txt --no-progress
```

### 组合使用

```bash
# 只处理特定目录中的 JavaScript 文件，并保留注释
any-to-txt /path/to/src --include js --keep-comments

# 转换项目文件但排除测试文件和配置文件，限制深度为3层
any-to-txt --exclude-dir test,config --exclude json,md --max-depth 3

# 转换特定目录到自定义输出位置，启用缓存
any-to-txt /path/to/project --output /path/to/output --include ts,js --cache
```

## 性能优化

1. **缓存机制**：启用 `--cache` 选项可避免重复处理未修改的文件，大幅提升转换速度
2. **流式处理**：大文件自动使用流式处理，有效降低内存占用
3. **递归深度限制**：使用 `--max-depth` 可控制递归深度，避免处理不必要的深层目录

## 注意事项

1. 默认情况下会排除 `node_modules` 目录
2. 处理大型项目时可能需要较长时间
3. 对于非文本文件（如二进制文件）可能会产生乱码，建议使用 `--exclude` 排除
4. 使用 `--output` 时，如果提供的是绝对路径，将直接使用该路径；如果是相对路径，将相对于源目录的父目录
5. 缓存默认关闭，需要显式使用 `--cache` 选项启用
6. 大文件默认阈值为5MB，可通过 `--file-size` 调整
