#!/usr/bin/env node
import fs from 'fs/promises';
import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync } from 'fs';
import path from 'path';
// 修改这行，使用全局process变量
import { Command } from 'commander';
import crypto from 'crypto';
import { pipeline } from 'stream/promises';
import readline from 'readline';
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

// 缓存接口定义
interface FileCache {
  hash: string;
  lastModified: number;
}

interface CacheData {
  files: Record<string, FileCache>;
  version: string;
}

// 获取包信息
const packageJson = JSON.parse(readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));

// 确保目录存在
function ensureDirectoryExists(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// 计算文件哈希值
async function calculateFileHash(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('md5');
      const stream = createReadStream(filePath);
      
      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', (error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}

// 移除代码中的注释
function removeComments(content: string, fileExt: string): string {
  // 不同语言的注释风格处理
  let cleanedContent = content;
  
  // JavaScript/TypeScript 相关文件扩展名
  const jsLikeExts = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue'];
  
  // 移除多行注释 /* ... */
  if (jsLikeExts.includes(fileExt) || ['.css', '.scss', '.less', '.java', '.c', '.cpp', '.cs', '.php'].includes(fileExt)) {
    cleanedContent = cleanedContent.replace(/\/\*[\s\S]*?\*\//g, '');
  }
  
  // 移除单行注释 // ...
  if (jsLikeExts.includes(fileExt) || ['.java', '.c', '.cpp', '.cs', '.php'].includes(fileExt)) {
    cleanedContent = cleanedContent.replace(/\/\/.*$/gm, '');
  }
  
  // 对于 Python、Shell、Ruby 等使用 # 的语言
  if (['.py', '.sh', '.rb', '.pl', '.yml', '.yaml'].includes(fileExt)) {
    cleanedContent = cleanedContent.replace(/#.*$/gm, '');
  }
  
  // 对于 HTML/XML 注释
  if (['.html', '.xml', '.svg', '.jsx', '.tsx'].includes(fileExt)) {
    cleanedContent = cleanedContent.replace(/<!--[\s\S]*?-->/g, '');
  }
  
  return cleanedContent;
}

// 检查文件是否符合过滤条件
function shouldProcessFile(filename: string, includeFormats?: string[], excludeFormats?: string[]): boolean {
  const ext = path.extname(filename).toLowerCase();
  
  // 如果指定了包含格式，则只处理这些格式
  if (includeFormats && includeFormats.length > 0) {
    return includeFormats.includes(ext);
  }
  
  // 如果指定了排除格式，则不处理这些格式
  if (excludeFormats && excludeFormats.length > 0) {
    return !excludeFormats.includes(ext);
  }
  
  // 默认处理所有文件
  return true;
}

// 检查目录是否应该被排除
function shouldProcessDirectory(dirName: string, excludeDirs?: string[]): boolean {
  if (!excludeDirs || excludeDirs.length === 0) {
    return true;
  }
  return !excludeDirs.includes(dirName);
}

interface ConvertOptions {
  includeFormats?: string[];
  excludeFormats?: string[];
  excludeDirs?: string[];
  removeComments?: boolean;
  outputDir?: string;
  maxDepth?: number;
  cacheFile?: string;
  fileSizeThreshold?: number; // 单位：MB
  progressBar?: cliProgress.SingleBar;
  totalFiles?: number;
  processedFiles?: number;
}

// 读取缓存
async function readCache(cachePath: string): Promise<CacheData> {
  try {
    if (existsSync(cachePath)) {
      const cacheContent = await fs.readFile(cachePath, 'utf8');
      return JSON.parse(cacheContent);
    }
  } catch (error) {
    console.warn('读取缓存失败，将创建新缓存');
  }
  
  return { files: {}, version: packageJson.version };
}

// 写入缓存
async function writeCache(cachePath: string, cacheData: CacheData): Promise<void> {
  try {
    const cacheDir = path.dirname(cachePath);
    ensureDirectoryExists(cacheDir);
    await fs.writeFile(cachePath, JSON.stringify(cacheData, null, 2));
  } catch (error: any) {
    console.warn('写入缓存失败:', error.message);
  }
}

// 统计文件总数
async function countFiles(
  sourcePath: string, 
  options: ConvertOptions = {}, 
  currentDepth = 0
): Promise<number> {
  try {
    const items = await fs.readdir(sourcePath);
    let count = 0;
    
    for (const item of items) {
      const sourceItemPath = path.join(sourcePath, item);
      const stats = await fs.stat(sourceItemPath);
      
      if (stats.isDirectory()) {
        if (!shouldProcessDirectory(item, options.excludeDirs)) {
          continue;
        }
        
        // 检查递归深度
        if (options.maxDepth !== undefined && currentDepth >= options.maxDepth) {
          continue;
        }
        
        count += await countFiles(sourceItemPath, options, currentDepth + 1);
      } else if (shouldProcessFile(item, options.includeFormats, options.excludeFormats)) {
        count++;
      }
    }
    
    return count;
  } catch (error: any) {
    console.error(`统计文件数量时出错: ${sourcePath}`, error.message);
    return 0;
  }
}

// 流式处理大文件
async function processLargeFile(
  sourceFilePath: string,
  targetFilePath: string,
  fileExt: string,
  relativePath: string,
  _removeComments: boolean
): Promise<void> {
  try {
    const readStream = createReadStream(sourceFilePath, { encoding: 'utf8' });
    const writeStream = createWriteStream(targetFilePath);
    
    // 写入文件路径头部注释
    writeStream.write(`// 文件路径: ${relativePath}\n\n`);
    
    if (!_removeComments) {
      // 不需要移除注释，直接管道传输
      await pipeline(readStream, writeStream);
    } else {
      // 需要移除注释，按行处理
      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
      });
      
      let buffer = '';
      const bufferSize = 1000; // 缓冲区行数
      let lineCount = 0;
      
      for await (const line of rl) {
        buffer += `${line  }\n`;
        lineCount++;
        
        if (lineCount >= bufferSize) {
          // 处理缓冲区内容并写入
          const cleanedContent = removeComments(buffer, fileExt);
          writeStream.write(cleanedContent);
          buffer = '';
          lineCount = 0;
        }
      }
      
      // 处理剩余缓冲区
      if (buffer) {
        const cleanedContent = removeComments(buffer, fileExt);
        writeStream.write(cleanedContent);
      }
      
      writeStream.end();
    }
  } catch (error: any) {
    throw new Error(`处理大文件失败: ${error.message}`);
  }
}

// 转换文件
async function convertFile(
  sourceFilePath: string,
  targetFilePath: string,
  options: ConvertOptions,
  cache: CacheData,
  relativePath: string
): Promise<boolean> {
  try {
    const fileExt = path.extname(sourceFilePath).toLowerCase();
    const stats = await fs.stat(sourceFilePath);
    
    // 检查缓存
    const currentFileCache = cache.files[relativePath];
    const lastModified = stats.mtimeMs;
    
    if (currentFileCache && currentFileCache.lastModified === lastModified) {
      // 文件未修改，跳过处理
      return false;
    }
    
    // 确保目标目录存在
    ensureDirectoryExists(path.dirname(targetFilePath));
    
    // 大文件处理（默认阈值为 5MB）
    const fileSizeThreshold = (options.fileSizeThreshold || 5) * 1024 * 1024;
    
    if (stats.size > fileSizeThreshold) {
      await processLargeFile(
        sourceFilePath,
        targetFilePath,
        fileExt,
        relativePath,
        !!options.removeComments
      );
    } else {
      // 小文件处理
      const content = await fs.readFile(sourceFilePath, 'utf8');
      const cleanedContent = options.removeComments ? removeComments(content, fileExt) : content;
      
      // 添加文件路径的头部注释
      const headerComment = `// 文件路径: ${relativePath}\n\n`;
      await fs.writeFile(targetFilePath, headerComment + cleanedContent);
    }
    
    // 更新缓存
    const fileHash = await calculateFileHash(sourceFilePath);
    cache.files[relativePath] = {
      hash: fileHash,
      lastModified
    };
    
    return true;
  } catch (error: any) {
    console.error(`无法转换文件: ${sourceFilePath}`, error.message);
    return false;
  }
}

async function convertToTxt(
  sourcePath: string, 
  targetPath: string, 
  options: ConvertOptions = {}, 
  cache: CacheData,
  currentDepth = 0
): Promise<void> {
  try {
    ensureDirectoryExists(targetPath);
    
    const items = await fs.readdir(sourcePath);
    
    for (const item of items) {
      const sourceItemPath = path.join(sourcePath, item);
      const stats = await fs.stat(sourceItemPath);
      
      if (stats.isDirectory()) {
        // 检查目录是否应该被排除
        if (!shouldProcessDirectory(item, options.excludeDirs)) {
          continue;
        }
        
        // 检查递归深度
        if (options.maxDepth !== undefined && currentDepth >= options.maxDepth) {
          continue;
        }
        
        const targetItemPath = path.join(targetPath, item);
        await convertToTxt(sourceItemPath, targetItemPath, options, cache, currentDepth + 1);
      } else {
        try {
          // 检查文件是否符合过滤条件
          if (!shouldProcessFile(item, options.includeFormats, options.excludeFormats)) {
            continue;
          }
          
          const fileName = path.parse(item).name;
          const targetFilePath = path.join(targetPath, `${fileName}.txt`);
          const relativePath = path.relative(process.cwd(), sourceItemPath);
          
          const processed = await convertFile(
            sourceItemPath,
            targetFilePath,
            options,
            cache,
            relativePath
          );
          
          // 更新进度
          if (options.progressBar && options.processedFiles !== undefined) {
            options.processedFiles++;
            options.progressBar.update(options.processedFiles);
          }
          
          if (processed) {
            // console.log(`已转换: ${sourceItemPath} -> ${targetFilePath}`);
          }
        } catch (error: any) {
          console.error(`处理文件失败: ${sourceItemPath}`, error.message);
        }
      }
    }
  } catch (error: any) {
    console.error(`处理目录失败: ${sourcePath}`, error.message);
  }
}

function parseExtensionList(extList?: string): string[] {
  if (!extList) return [];
  
  return extList.split(',')
    .map(ext => {
      ext = ext.trim();
      return ext.startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
    });
}

function parseDirList(dirList?: string): string[] {
  if (!dirList) return [];
  
  return dirList.split(',').map(dir => dir.trim());
}

async function main(): Promise<void> {
  try {
    const program = new Command();
    
    program
      .name('any-to-txt')
      .description('将代码文件转换为纯文本格式')
      .version(packageJson.version)
      .argument('[sourcePath]', '要处理的源代码目录', process.cwd())
      .option('-i, --include <extensions>', '指定要包含的文件扩展名（逗号分隔）', '')
      .option('-e, --exclude <extensions>', '指定要排除的文件扩展名（逗号分隔）', '')
      .option('-d, --exclude-dir <dirs>', '指定要排除的目录名（逗号分隔）', 'node_modules')
      .option('-k, --keep-comments', '保留代码中的注释')
      .option('-c, --remove-comments', '移除代码中的注释（默认行为）')
      .option('-o, --output <dir>', '指定输出目录名称（默认为 {源目录名}-ai-docs）')
      .option('-m, --max-depth <depth>', '指定递归深度限制', '0')
      .option('--cache', '启用缓存（默认关闭）')
      .option('--cache-file <path>', '指定缓存文件路径', '.any-to-txt-cache.json')
      .option('--file-size <mb>', '流式处理的文件大小阈值（单位：MB）', '5')
      .option('--no-progress', '隐藏进度条')
      .parse(process.argv);
    
    const options = program.opts();
    const sourceDir = program.args[0] || process.cwd();
    
    const sourceDirFullPath = path.resolve(sourceDir);
    
    const parentDir = path.dirname(sourceDirFullPath);
    const sourceDirName = path.basename(sourceDirFullPath);
    
    const targetDirName = options.output || `${sourceDirName}-ai-docs`;
    const targetDir = path.isAbsolute(targetDirName) 
      ? targetDirName 
      : path.join(parentDir, targetDirName);
    
    // 解析参数
    const includeFormats = parseExtensionList(options.include);
    const excludeFormats = parseExtensionList(options.exclude);
    const excludeDirs = parseDirList(options.excludeDir);
    // 修改变量名以避免与函数名冲突
    const shouldRemoveComments = !options.keepComments;
    const maxDepth = parseInt(options.maxDepth, 10) || undefined;
    const fileSizeThreshold = parseFloat(options.fileSize) || 5;
    
    console.log(`开始转换目录: ${sourceDirFullPath} -> ${targetDir}`);
    console.log(`移除注释: ${shouldRemoveComments ? '是' : '否'}`);
    
    if (includeFormats.length > 0) {
      console.log(`只处理文件格式: ${includeFormats.join(', ')}`);
    }
    
    if (excludeFormats.length > 0) {
      console.log(`排除文件格式: ${excludeFormats.join(', ')}`);
    }
    
    if (excludeDirs.length > 0) {
      console.log(`排除目录: ${excludeDirs.join(', ')}`);
    }
    
    if (maxDepth !== undefined) {
      console.log(`递归深度限制: ${maxDepth || '无限制'}`);
    }
    
    if (!existsSync(sourceDirFullPath)) {
      console.error(`源目录不存在: ${sourceDirFullPath}`);
      process.exit(1);
    }
    
    // 读取缓存
    const cacheFilePath = options.cacheFile;
    let cache: CacheData = { files: {}, version: packageJson.version };
    
    if (options.cache) {
      console.log(`使用缓存文件: ${cacheFilePath}`);
      cache = await readCache(cacheFilePath);
    } else {
      console.log('缓存已禁用');
    }
    
    // 创建进度条
    let progressBar;
    let totalFiles = 0;
    const processedFiles = 0;
    
    if (options.progress !== false) {
      console.log('统计文件数量...');
      totalFiles = await countFiles(sourceDirFullPath, {
        includeFormats,
        excludeFormats,
        excludeDirs,
        maxDepth,
      });
      
      progressBar = new cliProgress.SingleBar({
        format: `转换进度 |${  colors.cyan('{bar}')  }| {percentage}% | {value}/{total} 文件`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
      });
      
      console.log(`共发现 ${totalFiles} 个文件需要处理`);
      progressBar.start(totalFiles, 0);
    }
    
    const convertOptions = {
      includeFormats,
      excludeFormats,
      excludeDirs,
      removeComments: shouldRemoveComments,
      outputDir: options.output,
      maxDepth,
      fileSizeThreshold,
      progressBar,
      totalFiles,
      processedFiles
    };
    
    const startTime = Date.now();
    
    await convertToTxt(sourceDirFullPath, targetDir, convertOptions, cache);
    
    if (progressBar) {
      progressBar.stop();
    }
    
    const endTime = Date.now();
    const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);
    
    // 写入缓存
    if (options.cache) {
      await writeCache(cacheFilePath, cache);
    }
    
    console.log(`\n转换完成！共处理 ${processedFiles || '未知数量'} 个文件，耗时 ${durationSeconds}s`);
    console.log('输出目录:', targetDir);
  } catch (error: any) {
    console.error('转换过程中发生错误:', error.message);
    console.error('详细错误信息:', error.stack);
    process.exit(1);
  }
}

// 全局异常处理
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('未处理的Promise拒绝:', reason);
});

main().catch(error => {
  console.error('程序执行失败:', error);
  process.exit(1);
});
