/**
 * 事件流错误代码枚举
 */
export enum EventStreamErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  PARSE_ERROR = 'PARSE_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  HEARTBEAT_ERROR = 'HEARTBEAT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * 事件流错误类
 */
export class EventStreamError extends Error {
  constructor(
    message: string,
    readonly code: EventStreamErrorCode,
    readonly status?: number,
    readonly cause?: Error
  ) {
    super(message);
    this.name = 'EventStreamError';
    
    // 保持正确的原型链
    Object.setPrototypeOf(this, EventStreamError.prototype);
  }

  /**
   * 转换为可读的错误信息
   */
  toString(): string {
    return `[${this.code}] ${this.message}${  
      this.cause ? `\nCaused by: ${this.cause.message}` : ''}`;
  }

  /**
   * 转换为JSON格式
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      status: this.status,
      cause: this.cause
    };
  }
}