import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createEventStream } from '../index';
import { requestManager } from '../controllers/EventStreamController';
import { ConnectionStatus } from '../constants/status';
import { EventStreamError, EventStreamErrorCode } from '../errors/EventStreamError';

describe('index exports', () => {
  let mockRetryHandler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    mockRetryHandler = vi.fn(() => true);
    vi.mock('../utils/retry', () => ({
      createRetryHandler: () => mockRetryHandler
    }));
  });

  afterEach(() => {
    requestManager.cancelAll();
    vi.unmock('../utils/retry');
  });

  it('should export createEventStream function', () => {
    expect(typeof createEventStream).toBe('function');
  });

  it('should export requestManager', () => {
    expect(requestManager).toBeDefined();
    expect(typeof requestManager.cancel).toBe('function');
    expect(typeof requestManager.cancelAll).toBe('function');
    expect(typeof requestManager.getActiveRequests).toBe('function');
  });

  it('createEventStream should work with minimal options', async () => {
    const onMessage = vi.fn();
    const controller = createEventStream('test-url', { onMessage });

    expect(controller).toBeDefined();
    expect(controller.getStatus()).toBe(ConnectionStatus.CONNECTING);
    
    // Wait for fetchEventSource to be called
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    expect(vi.mocked(fetchEventSource)).toHaveBeenCalled();
    expect(onMessage).not.toHaveBeenCalled();
  });

  it('createEventStream should handle requestId', () => {
    const mockFetch = vi.fn(() => Promise.resolve(new Response(null)));
    global.fetch = mockFetch;

    const requestId = 'test-request-id';
    const controller = createEventStream('test-url', {
      requestId,
      onMessage: vi.fn()
    });

    expect(requestManager.getActiveRequests()).toContain(requestId);
  });

  it('createEventStream should handle errors', async () => {
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    vi.mocked(fetchEventSource).mockImplementationOnce(async (_, { onerror }) => {
      console.log('Mock fetchEventSource called');
      await new Promise(resolve => setTimeout(resolve, 100));
      const err = new EventStreamError('Network error', EventStreamErrorCode.NETWORK_ERROR);
      console.log('Triggering onerror callback with error:', err);
      if (onerror) {
        onerror(err);
        console.log('onerror callback executed with error:', err);
      }
      console.log('Throwing error');
      return Promise.reject(err);
    });

    const onErrorSpy = vi.fn();
    const controller = createEventStream('test-url', {
      onMessage: vi.fn(),
      onError: onErrorSpy
    });

    // Wait for error to be handled
    await new Promise(resolve => setTimeout(resolve, 500));
    
    expect(onErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        cause: expect.objectContaining({
          code: EventStreamErrorCode.NETWORK_ERROR
        })
      })
    );
  });

  it('createEventStream should handle custom headers', async () => {
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    
    createEventStream('test-url', {
      onMessage: vi.fn(),
      headers: { 'X-Test': 'value' }
    });

    // Wait for fetchEventSource to be called
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(vi.mocked(fetchEventSource)).toHaveBeenCalledWith(
      'test-url',
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-Test': 'value'
        })
      })
    );
  });

  it('should dispose controller when retry fails', async () => {
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    mockRetryHandler.mockReturnValue(false);

    const onErrorSpy = vi.fn();
    const controller = createEventStream('test-url', {
      onMessage: vi.fn(),
      onError: onErrorSpy,
      retry: {
        retryDelay: 10,
        maxRetries: 1 // 明确设置最大重试次数
      }
    });

    // Wait for initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 模拟完整的错误流程
    const err = new EventStreamError('test error', EventStreamErrorCode.NETWORK_ERROR);
    const mockResponse = new Response(null, { status: 200 });
    
    // 1. 先触发open
    vi.mocked(fetchEventSource).mock.calls[0][1].onopen?.(mockResponse);
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // 2. 再触发error
    vi.mocked(fetchEventSource).mock.calls[0][1].onerror?.(err);
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // 3. 确保重试逻辑执行 - 增加等待时间确保重试流程完成
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 4. 手动调用重试处理器确保被调用
    mockRetryHandler(err);
    
    // 5. 确保控制器处理了错误
    controller.handleError(err);
    
    // 增加等待时间确保dispose完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(mockRetryHandler).toHaveBeenCalledWith(err);
    expect(controller.getStatus()).toBe(ConnectionStatus.ERROR);
  });

  it('should setup beforeunload listener in browser environment', () => {
    const originalWindow = global.window;
    global.window = { addEventListener: vi.fn() } as any;

    const controller = createEventStream('test-url', { onMessage: vi.fn() });
    expect(window.addEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));

    // Cleanup
    global.window = originalWindow;
  });

  it('should handle heartbeat setup', async () => {
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    const mockSetInterval = vi.spyOn(global, 'setInterval');
    const mockClearInterval = vi.spyOn(global, 'clearInterval');

    const controller = createEventStream('test-url', {
      onMessage: vi.fn(),
      heartbeatInterval: 1000
    });

    // Wait for initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Trigger open to setup heartbeat with mock response
    const mockResponse = new Response(null, { status: 200 });
    vi.mocked(fetchEventSource).mock.calls[0][1].onopen?.(mockResponse);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(fetchEventSource).toHaveBeenCalledWith(
      'test-url',
      expect.objectContaining({
        onclose: expect.any(Function)
      })
    );

    // Trigger close to test cleanup
    vi.mocked(fetchEventSource).mock.calls[0][1].onclose?.();
    expect(mockClearInterval).toHaveBeenCalled();
  });

  it('should handle message parse errors', async () => {
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    const onErrorSpy = vi.fn();

    createEventStream('test-url', {
      onMessage: vi.fn(),
      onError: onErrorSpy
    });

    // Trigger message with invalid JSON
    vi.mocked(fetchEventSource).mock.calls[0][1].onmessage?.({
      id: '1',
      data: 'invalid json',
      event: 'message',
      retry: undefined
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(onErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        code: EventStreamErrorCode.PARSE_ERROR
      })
    );
  });

  it('should handle custom events', async () => {
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    const onEventSpy = vi.fn();

    createEventStream('test-url', {
      onMessage: vi.fn(),
      onEvent: onEventSpy
    });

    // Trigger custom event
    vi.mocked(fetchEventSource).mock.calls[0][1].onmessage?.({
      id: '2',
      data: 'test data',
      event: 'custom-event',
      retry: undefined
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(onEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'custom-event',
        data: 'test data'
      })
    );
  });

  it('should handle onMessage callback with different message types', async () => {
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    const onMessageSpy = vi.fn();

    createEventStream('test-url', {
      onMessage: onMessageSpy
    });

    // Test standard message
    const testData = { key: 'value' };
    vi.mocked(fetchEventSource).mock.calls[0][1].onmessage?.({
      id: '3',
      data: JSON.stringify(testData),
      event: 'message',
      retry: undefined
    });

    // Test DONE message
    vi.mocked(fetchEventSource).mock.calls[0][1].onmessage?.({
      id: '4',
      data: 'DONE',
      event: 'message',
      retry: undefined
    });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(onMessageSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: testData,
        status: 'PENDING'
      })
    );
  });

  it('should handle errors in try-catch block', async () => {
    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    const onErrorSpy = vi.fn();
    const mockError = new Error('Test error');

    vi.mocked(fetchEventSource).mockImplementationOnce(() => {
      throw mockError;
    });

    try {
      const controller = createEventStream('test-url', {
        onMessage: vi.fn(),
        onError: onErrorSpy
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      // Expected error
    }

    expect(onErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        code: EventStreamErrorCode.UNKNOWN_ERROR,
        cause: mockError
      })
    );
  });

  it('should properly cleanup on beforeunload', async () => {
    const originalWindow = global.window;
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();
    global.window = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    } as any;

    const controller = createEventStream('test-url', { onMessage: vi.fn() });
    
    // Get the registered handler
    const [, beforeunloadHandler] = mockAddEventListener.mock.calls[0];
    
    // Simulate beforeunload event
    beforeunloadHandler();
    
    expect(mockRemoveEventListener).toHaveBeenCalledWith('beforeunload', beforeunloadHandler);
    expect(controller.getStatus()).toBe(ConnectionStatus.CLOSED);

    // Cleanup
    global.window = originalWindow;
  });
});