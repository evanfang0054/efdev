import { EventStreamError, EventStreamErrorCode } from '../errors/EventStreamError';
import { ConnectionStatus } from '../constants/status';
import type { RequestManager } from '../types';

// 全局请求管理器
const requestManager: RequestManager = (() => {
  const activeRequests = new Map<string, AbortController>();
  const activeRequestIds = new Set<string>();

  return {
    cancel(requestId: string) {
      const controller = activeRequests.get(requestId);
      if (controller) {
        controller.abort();
        activeRequests.delete(requestId);
        activeRequestIds.delete(requestId);
      }
    },
    cancelAll() {
      activeRequests.forEach(controller => controller.abort());
      activeRequests.clear();
      activeRequestIds.clear();
    },
    getActiveRequests() {
      return Array.from(activeRequestIds);
    },
    // 内部方法 - 添加请求
    _addRequest(requestId: string, controller: AbortController) {
      activeRequests.set(requestId, controller);
      activeRequestIds.add(requestId);
    }
  };
})();

export class EventStreamController {
  private status: ConnectionStatus = ConnectionStatus.CLOSED;
  private readonly abortController: AbortController;
  private readonly requestId: string;
  private readonly onStatusChange?: (status: ConnectionStatus) => void;
  private readonly timeout: number;
  private timeoutId?: NodeJS.Timeout;

  constructor(
    onStatusChange?: (status: ConnectionStatus) => void,
    timeout = 50000,
    requestId?: string
  ) {
    this.onStatusChange = onStatusChange;
    this.timeout = timeout;
    this.abortController = new AbortController();
    this.requestId = requestId || `es-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // 注册到全局管理器
    requestManager.cancel(this.requestId); // 先取消同ID的旧请求
    (requestManager as any)._addRequest(this.requestId, this.abortController);
    
    this.setStatus(ConnectionStatus.CONNECTING);
    this.setupTimeout();
  }

  private setStatus(status: ConnectionStatus) {
    this.status = status;
    this.onStatusChange?.(status);
  }

  private setupTimeout() {
    if (this.timeout > 0) {
      this.timeoutId = setTimeout(() => {
        this.abort(new EventStreamError(
          'Request timeout',
          EventStreamErrorCode.TIMEOUT_ERROR
        ));
      }, this.timeout);
    }
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  getStatus(): ConnectionStatus {
    return this.status;
  }

  abort(error?: EventStreamError): void {
    if (this.status === ConnectionStatus.CLOSED || 
        this.status === ConnectionStatus.ERROR) {
      return;
    }

    this.clearTimeout();
    this.abortController.abort();
    this.setStatus(error ? ConnectionStatus.ERROR : ConnectionStatus.CLOSED);
    requestManager.cancel(this.requestId);
  }

  isAborted(): boolean {
    return this.abortController.signal.aborted;
  }

  getSignal(): AbortSignal {
    return this.abortController.signal;
  }

  dispose(): void {
    this.abort();
  }

  sendHeartbeat(): void {
    if (!this.isAborted()) {
      this.setStatus(ConnectionStatus.HEARTBEAT);
    }
  }

  handleError(error: EventStreamError): void {
    this.abort(error);
  }
}

// 导出全局请求管理器
export { requestManager };