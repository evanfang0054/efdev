/**
 * 消息状态枚举
 */
export enum MessageStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DONE = '[DONE]',
}

/**
 * 连接状态枚举
 */
export enum ConnectionStatus {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  CLOSED = 'CLOSED',
  ERROR = 'ERROR',
  HEARTBEAT = 'HEARTBEAT',
  RECONNECTING = 'RECONNECTING',
}

/**
 * 事件类型枚举
 */
export enum EventType {
  MESSAGE = 'message',
  ERROR = 'error',
  HEARTBEAT = 'heartbeat',
  OPEN = 'open',
  CLOSE = 'close',
  CUSTOM = 'custom',
}
