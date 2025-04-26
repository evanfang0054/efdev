import { EventStreamError, EventStreamErrorCode } from '../errors/EventStreamError';
import type { RetryOptions } from '../types';

/**
 * 创建重试处理器
 * @param options 重试配置
 * @returns 返回一个函数，用于判断是否应该重试
 */
export function createRetryHandler(options: RetryOptions = {}) {
  const {
    maxRetries = 3,
    // delay = 1000,
    // backoffFactor = 2,
  } = options;

  let retryCount = 0;

  return function shouldRetry(error?: EventStreamError): boolean {
    if (retryCount >= maxRetries) {
      return false;
    }

    // 特定错误不重试
    if (error?.code === EventStreamErrorCode.AUTH_ERROR) {
      return false;
    }

    retryCount++;
    return true;
  };
}
