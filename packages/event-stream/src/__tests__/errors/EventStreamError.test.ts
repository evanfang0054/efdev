import { describe, it, expect } from 'vitest';
import { EventStreamError, EventStreamErrorCode } from '../../errors/EventStreamError';

describe('EventStreamError', () => {
  it('should create error with required parameters', () => {
    const error = new EventStreamError('Test error', EventStreamErrorCode.UNKNOWN_ERROR);
    expect(error.message).toBe('Test error');
    expect(error.code).toBe(EventStreamErrorCode.UNKNOWN_ERROR);
    expect(error.name).toBe('EventStreamError');
    expect(error.stack).toBeDefined();
    expect(error.status).toBeUndefined();
    expect(error.cause).toBeUndefined();
  });

  it('should create error with status code', () => {
    const error = new EventStreamError(
      'Test error',
      EventStreamErrorCode.NETWORK_ERROR,
      500
    );
    expect(error.status).toBe(500);
  });

  it('should create error with cause', () => {
    const cause = new Error('Original error');
    const error = new EventStreamError(
      'Test error',
      EventStreamErrorCode.NETWORK_ERROR,
      undefined,
      cause
    );
    expect(error.cause).toBe(cause);
  });

  it('should have all error codes defined', () => {
    expect(EventStreamErrorCode).toEqual({
      NETWORK_ERROR: 'NETWORK_ERROR',
      PARSE_ERROR: 'PARSE_ERROR',
      AUTH_ERROR: 'AUTH_ERROR',
      TIMEOUT_ERROR: 'TIMEOUT_ERROR',
      HEARTBEAT_ERROR: 'HEARTBEAT_ERROR',
      UNKNOWN_ERROR: 'UNKNOWN_ERROR'
    });
  });

  it('should be instance of Error and EventStreamError', () => {
    const error = new EventStreamError('Test', EventStreamErrorCode.UNKNOWN_ERROR);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(EventStreamError);
  });

  it('should serialize to JSON correctly', () => {
    const cause = new Error('Cause');
    const error = new EventStreamError(
      'Test error',
      EventStreamErrorCode.NETWORK_ERROR,
      500,
      cause
    );
    
    const json = error.toJSON();
    expect(json).toEqual({
      name: 'EventStreamError',
      code: 'NETWORK_ERROR',
      message: 'Test error',
      status: 500,
      cause: cause
    });
  });

  it('should format string representation correctly with cause', () => {
    const cause = new Error('Cause');
    const error = new EventStreamError(
      'Test error',
      EventStreamErrorCode.NETWORK_ERROR,
      undefined,
      cause
    );
    
    expect(error.toString()).toContain('[NETWORK_ERROR] Test error');
    expect(error.toString()).toContain('Caused by: Cause');
  });

  it('should format string representation correctly without cause', () => {
    const error = new EventStreamError(
      'Test error',
      EventStreamErrorCode.NETWORK_ERROR
    );
    
    expect(error.toString()).toBe('[NETWORK_ERROR] Test error');
    expect(error.toString()).not.toContain('Caused by:');
  });
});