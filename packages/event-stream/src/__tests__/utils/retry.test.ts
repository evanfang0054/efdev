import { describe, it, expect, vi } from 'vitest';
import { createRetryHandler } from '../../utils/retry';
import { EventStreamError, EventStreamErrorCode } from '../../errors/EventStreamError';

describe('retry utils', () => {
  it('should allow retry by default', () => {
    const retry = createRetryHandler();
    expect(retry()).toBe(true);
    expect(retry()).toBe(true);
    expect(retry()).toBe(true);
    expect(retry()).toBe(false); // 超过默认3次
  });

  it('should respect custom maxRetries', () => {
    const retry = createRetryHandler({ maxRetries: 1 });
    expect(retry()).toBe(true);
    expect(retry()).toBe(false);
  });

  it('should not retry on AUTH_ERROR', () => {
    const retry = createRetryHandler();
    const error = new EventStreamError(
      'Auth failed',
      EventStreamErrorCode.AUTH_ERROR
    );
    expect(retry(error)).toBe(false);
  });

  it('should retry on other errors', () => {
    const retry = createRetryHandler();
    const error = new EventStreamError(
      'Network error',
      EventStreamErrorCode.NETWORK_ERROR
    );
    expect(retry(error)).toBe(true);
  });

  it('should increment retry count only when retrying', () => {
    const retry = createRetryHandler({ maxRetries: 2 });
    const authError = new EventStreamError(
      'Auth failed',
      EventStreamErrorCode.AUTH_ERROR
    );
    
    // 不重试的情况不计入重试次数
    expect(retry(authError)).toBe(false);
    expect(retry()).toBe(true); // 第一次重试
    expect(retry()).toBe(true); // 第二次重试
    expect(retry()).toBe(false); // 超过最大重试次数
  });
});