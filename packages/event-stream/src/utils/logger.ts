export interface Logger {
  info: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

/**
 * 创建日志记录器
 * @param enabled 是否启用日志
 * @returns 日志记录器实例
 */
export function createLogger(enabled = false): Logger {
  return {
    info: (...args) => enabled && console.info('[EventStream]', ...args),
    debug: (...args) => enabled && console.debug('[EventStream]', ...args),
    error: (...args) => enabled && console.error('[EventStream]', ...args),
  };
}
