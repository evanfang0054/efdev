import type { FetchEventSourceInit } from '@microsoft/fetch-event-source';
import type { EventStreamError } from '../errors/EventStreamError';
import type { ConnectionStatus, EventType, MessageStatus } from '../constants/status';

/**
 * 重试策略配置
 */
export interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number | ((retryCount: number) => number);
  shouldRetry?: (error: EventStreamError) => boolean;
}

/**
 * 流式消息
 * @template T - 消息数据类型
 */
export interface StreamMessage<T = unknown> {
  data: T;
  status: MessageStatus;
  timestamp: number;
}

/**
 * 自定义事件
 */
export interface CustomEvent {
  type: EventType;
  data: string;
  timestamp: number;
}

/**
 * 扩展的 FetchEventSourceInit 配置
 */
export interface ExtendedFetchEventSourceInit extends FetchEventSourceInit {
  /** 请求负载数据 */
  data?: Record<string, unknown>;
  /** 超时时间(ms) */
  timeout?: number;
  /** Token获取函数 */
  getToken?: () => string | Promise<string>;
}

/**
 * 事件流配置选项
 * @template T - 响应消息的数据类型
 */
export interface EventStreamOptions<T = unknown> extends ExtendedFetchEventSourceInit {
  /** 请求唯一标识 */
  requestId?: string;
  /** 心跳检测间隔(毫秒) */
  heartbeatInterval?: number;
  /** 自定义事件处理回调 */
  onEvent?: (event: CustomEvent) => void;
  /** 消息处理回调 */
  onMessage?: (message: StreamMessage<T>) => void | Promise<void>;
  /** 错误处理回调 */
  onError?: (error: EventStreamError) => void;
  /** 状态变更回调 */
  onStatusChange?: (status: ConnectionStatus) => void;
  /** 连接建立回调 */
  onOpen?: (response: Response) => Promise<void>;
  /** 连接关闭回调 */
  onClose?: () => void;
  /** 请求完成回调 */
  onComplete?: () => void;
  /** 重试策略配置 */
  retry?: RetryOptions;
  /** 调试模式开关 */
  debug?: boolean;
}

/**
 * 请求管理器接口
 */
export interface RequestManager {
  /** 取消指定请求 */
  cancel: (requestId: string) => void;
  /** 取消所有请求 */
  cancelAll: () => void;
  /** 获取所有活跃请求ID */
  getActiveRequests: () => string[];
}
