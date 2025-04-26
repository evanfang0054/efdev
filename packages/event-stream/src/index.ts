/**
 * @packageDocumentation
 * 事件流处理模块 - 用于处理服务端事件流(SSE)和自定义事件流的高级封装
 * @remarks
 * 该模块提供了一个强大的流式请求处理解决方案，支持:
 * - 自动重试机制
 * - 完整类型推导
 * - 灵活的消息和事件处理
 * - 心跳检测
 * - 状态管理
 * - 错误分类处理
 * - 请求ID管理和批量取消
 *
 * @example
 * ```typescript
 * const controller = createEventStream<ResponseType>('api/stream', {
 *   requestId: 'unique-id', // 可选请求ID
 *   onMessage: (message) => console.log(message),
 *   onEvent: (event) => console.log(event),
 *   onError: (error) => console.error(error),
 *   data: { query: 'test' }
 * });
 *
 * // 取消特定请求
 * cancelRequest('unique-id');
 *
 * // 取消所有请求
 * cancelAllRequests();
 * ```
 */

import { fetchEventSource, FetchEventSourceInit, EventStreamContentType, EventSourceMessage } from '@microsoft/fetch-event-source';
import { EventStreamController, requestManager } from './controllers/EventStreamController';
import { EventStreamError, EventStreamErrorCode } from './errors/EventStreamError';
import { MessageStatus, EventType } from './constants/status';
import type { EventStreamOptions, StreamMessage, CustomEvent } from './types';
import { createRetryHandler } from './utils/retry';
import { createLogger } from './utils/logger';

// 导出所有类型
export type {
  EventStreamOptions,
  StreamMessage,
  CustomEvent,
  RetryOptions
} from './types';

// 导出 @microsoft/fetch-event-source 的类型
export type {
  FetchEventSourceInit,
  EventSourceMessage
};

// 导出 @microsoft/fetch-event-source 的常量
export { EventStreamContentType };

export type { Logger } from './utils/logger';

// 导出枚举和类
export {
  MessageStatus,
  ConnectionStatus,
  EventType
} from './constants/status';

// 导出错误
export {
  EventStreamError,
  EventStreamErrorCode
} from './errors/EventStreamError';

// 导出控制器
export { EventStreamController, requestManager };

// 导出请求管理方法
export const cancelRequest = requestManager.cancel;
export const cancelAllRequests = requestManager.cancelAll;
export const {getActiveRequests} = requestManager;

/**
 * 创建并启动一个新的事件流请求
 * @typeParam T - 响应消息的数据类型
 * @param url - 目标接口URL
 * @param options - 事件流配置选项
 * @returns {@link EventStreamController} 实例，用于控制请求生命周期
 * @throws {@link EventStreamError} 当请求初始化失败时
 *
 * @public
 */
export function createEventStream<T = unknown>(
  url: string,
  options: EventStreamOptions<T> = {}
): EventStreamController {
  const {
    requestId,
    onMessage,
    onEvent,
    onError,
    onStatusChange,
    onOpen,
    onClose,
    onComplete,
    headers = {},
    method = 'POST',
    data,
    getToken,
    retry = {},
    debug = false,
    timeout = 50000,
    heartbeatInterval = 30000,
  } = options;

  const controller = new EventStreamController(onStatusChange, timeout, requestId);
  const retryHandler = createRetryHandler(retry);
  const logger = createLogger(debug);
  let heartbeatTimer: NodeJS.Timeout | null = null;

  let beforeunloadHandler: (() => void) | null = null;

  try {
    const token = (getToken?.() ?? '');

    // 设置心跳检测
    const setupHeartbeat = () => {
      if (heartbeatInterval > 0) {
        heartbeatTimer = setInterval(() => {
          logger.debug('Sending heartbeat ping');
          controller.sendHeartbeat();
        }, heartbeatInterval);
      }
    };

    const cleanupHeartbeat = () => {
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }
    };

    fetchEventSource(url, {
      signal: controller.getSignal(),
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      async onopen(response: Response) {
        if (response.ok) {
          logger.info('Event stream connection opened');
          setupHeartbeat();
          await onOpen?.(response);
        } else {
          const error = new EventStreamError(
            `HTTP error ${response.status}: ${response.statusText}`,
            EventStreamErrorCode.NETWORK_ERROR,
            response.status
          );
          controller.handleError(error);
        }
      },
      onmessage(event) {
        try {
          const { data: _data, event: eventType } = event;
          logger.debug('Received message:', _data);

          // 处理自定义事件
          if (eventType && eventType !== 'message') {
            const customEvent: CustomEvent = {
              type: eventType as EventType,
              data: _data,
              timestamp: Date.now(),
            };
            onEvent?.(customEvent);
            return;
          }

          // 处理标准消息
          if (_data === MessageStatus.DONE) {
            onComplete?.();
            requestId ? cancelRequest(requestId) : cancelAllRequests();
            return;
          }

          const message: StreamMessage<T> = {
            data: JSON.parse(_data),
            status: MessageStatus.PENDING,
            timestamp: Date.now(),
          };

          onMessage?.(message);
        } catch (err) {
          const error = new EventStreamError(
            'Failed to parse message',
            EventStreamErrorCode.PARSE_ERROR,
            undefined,
            err as Error
          );
          onError?.(error);
        }
      },
      onclose() {
        logger.info('Event stream connection closed');
        cleanupHeartbeat();
        onClose?.();
        controller.dispose();
      },
      onerror(err): void {
        const error = new EventStreamError(
          'Event stream connection error',
          EventStreamErrorCode.UNKNOWN_ERROR,
          undefined,
          err
        );
        onError?.(error);
        cleanupHeartbeat();

        if (!retryHandler()) {
          controller.dispose();
        }
      },
    });
  } catch (err) {
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    controller.dispose();

    const error = err instanceof EventStreamError
      ? err
      : new EventStreamError(
          'Unexpected error',
          EventStreamErrorCode.UNKNOWN_ERROR,
          undefined,
          err as Error
        );
    
    onError?.(error);
    throw error;
  }

  if (typeof window !== 'undefined') {
    beforeunloadHandler = () => controller.dispose();
    window.addEventListener('beforeunload', beforeunloadHandler);
  }

  // 添加 dispose 方法移除事件监听器
  const originalDispose = controller.dispose.bind(controller);
  controller.dispose = () => {
    if (beforeunloadHandler) {
      window.removeEventListener('beforeunload', beforeunloadHandler);
      beforeunloadHandler = null;
    }
    originalDispose();
  };

  return controller;
}
