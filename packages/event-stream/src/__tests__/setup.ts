import { vi } from 'vitest';

vi.mock('@microsoft/fetch-event-source', () => ({
  fetchEventSource: vi.fn()
}));
import { AbortController as PolyfillAbortController } from '@azure/abort-controller';

// Use polyfill AbortController in test environment
global.AbortController = PolyfillAbortController as unknown as typeof AbortController;

// Mock nanoid
vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'test-id')
}));

// Mock fetch-event-source
vi.mock('@microsoft/fetch-event-source', () => ({
  fetchEventSource: vi.fn(() => Promise.resolve()),
  EventStreamContentType: 'text/event-stream'
}));

// Mock window object for browser tests
if (typeof window === 'undefined') {
  global.window = {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  } as unknown as Window & typeof globalThis;
}