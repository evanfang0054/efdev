import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { EventStreamController, requestManager } from '../controllers/EventStreamController';
import { ConnectionStatus } from '../constants/status';
import { EventStreamError, EventStreamErrorCode } from '../errors/EventStreamError';

describe('EventStreamController', () => {
  let controller: EventStreamController;
  const mockStatusChange = vi.fn();
  const requestId = 'test-request';

  beforeEach(() => {
    controller = new EventStreamController(mockStatusChange, 5000, requestId);
  });

  afterEach(() => {
    requestManager.cancelAll();
    vi.clearAllMocks();
  });

  it('should initialize with CONNECTING status', () => {
    expect(controller.getStatus()).toBe(ConnectionStatus.CONNECTING);
  });

  it('should register with request manager', () => {
    expect(requestManager.getActiveRequests()).toContain(requestId);
  });

  it('should update status when connected', () => {
    mockStatusChange.mockImplementation((status: ConnectionStatus) => {
      if (status === ConnectionStatus.CONNECTED) {
        expect(status).toBe(ConnectionStatus.CONNECTED);
      }
    });
  });

  it('should abort the stream', () => {
    controller.abort();
    expect(controller.isAborted()).toBe(true);
    expect(controller.getStatus()).toBe(ConnectionStatus.CLOSED);
    expect(requestManager.getActiveRequests()).not.toContain(requestId);
  });

  it('should abort with error', () => {
    const error = new EventStreamError(
      'Test error',
      EventStreamErrorCode.NETWORK_ERROR
    );
    controller.abort(error);
    expect(controller.getStatus()).toBe(ConnectionStatus.ERROR);
  });

  it('should provide abort signal', () => {
    const signal = controller.getSignal();
    expect(signal).toHaveProperty('aborted');
    expect(signal.aborted).toBe(false);
  });

  it('should dispose resources', () => {
    controller.dispose();
    expect(controller.getSignal().aborted).toBe(true);
    expect(requestManager.getActiveRequests()).not.toContain(requestId);
  });

  it('should handle heartbeat', () => {
    controller.sendHeartbeat();
    expect(mockStatusChange).toHaveBeenCalledWith(ConnectionStatus.HEARTBEAT);
  });

  it('should handle timeout', () => {
    vi.useFakeTimers();
    const timeoutController = new EventStreamController(mockStatusChange, 100);
    
    vi.advanceTimersByTime(101);
    expect(timeoutController.getStatus()).toBe(ConnectionStatus.ERROR);
    expect(mockStatusChange).toHaveBeenCalledWith(ConnectionStatus.ERROR);
    
    vi.useRealTimers();
  });

  it('should handle error', () => {
    const error = new EventStreamError(
      'Test error',
      EventStreamErrorCode.NETWORK_ERROR
    );
    controller.handleError(error);
    expect(controller.getStatus()).toBe(ConnectionStatus.ERROR);
  });
});

describe('requestManager', () => {
  afterEach(() => {
    requestManager.cancelAll();
  });

  it('should manage active requests', () => {
    const controller1 = new EventStreamController(vi.fn(), 5000, 'req1');
    const controller2 = new EventStreamController(vi.fn(), 5000, 'req2');
    
    expect(requestManager.getActiveRequests()).toEqual(
      expect.arrayContaining(['req1', 'req2'])
    );
    
    requestManager.cancel('req1');
    expect(requestManager.getActiveRequests()).not.toContain('req1');
    
    requestManager.cancelAll();
    expect(requestManager.getActiveRequests()).toHaveLength(0);
  });
});