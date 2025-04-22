# @efdev/event-stream

浏览器端事件流处理库，提供高性能、可靠且类型安全的SSE(Server-Sent Events)和自定义事件流实现。

## ✨ 特性

- 🚀 完整的 TypeScript 支持
- 🔄 智能的重试机制
- ❤️ 心跳检测保持连接
- 🎭 支持自定义事件类型
- 🎯 精确的状态管理
- 🛡️ 健壮的错误处理
- 📦 零依赖，仅依赖 @microsoft/fetch-event-source
- 🎨 优雅的 API 设计
- ⚡ 高性能优化设计

## 📦 安装

```bash
npm install @efdev/event-stream -S
# 或
yarn add @efdev/event-stream -S
# 或
pnpm add @efdev/event-stream -S
```

## 🔨 使用指南

### 基本使用

```typescript
import { createEventStream } from '@efdev/event-stream';

const controller = createEventStream('api/stream', {
  onMessage: (message) => console.log('收到消息:', message),
  onError: (error) => console.error('发生错误:', error),
  onStatusChange: (status) => console.log('连接状态变更:', status),
});
```

### 完整配置选项

```typescript
interface EventStreamOptions<T = unknown> {
  // 请求唯一标识
  requestId?: string;
  // 心跳检测间隔(毫秒)
  heartbeatInterval?: number;
  // 自定义事件处理回调
  onEvent?: (event: CustomEvent) => void;
  // 消息处理回调
  onMessage?: (message: StreamMessage<T>) => void | Promise<void>;
  // 错误处理回调
  onError?: (error: EventStreamError) => void;
  // 状态变更回调
  onStatusChange?: (status: ConnectionStatus) => void;
  // 连接建立回调
  onOpen?: (response: Response) => Promise<void>;
  // 连接关闭回调
  onClose?: () => void;
  // 请求完成回调
  onComplete?: () => void;
  // 重试策略配置
  retry?: RetryOptions;
  // 调试模式开关
  debug?: boolean;
  // 其他 FetchEventSourceInit 配置
  headers?: Record<string, string>;
  method?: string;
  // 请求负载数据
  data?: Record<string, unknown>;
  // Token获取函数
  getToken?: () => string | Promise<string>;
}
```

## 🎓 高级用法

### 请求ID (requestId) 使用

`requestId` 用于唯一标识一个事件流请求，便于后续管理和取消：

```typescript
// 生成唯一请求ID
const requestId = `stream-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;

const controller = createEventStream('api/stream', {
  requestId, // 设置请求ID
  onMessage: (message) => console.log(message),
});

// 后续可以通过ID取消请求
cancelRequest(requestId);
```

最佳实践：

1. 确保 requestId 全局唯一
2. 在复杂应用中，可以使用业务相关的ID便于追踪
3. 建议将 requestId 与业务数据关联存储

### 心跳检测 (heartbeatInterval) 配置

`heartbeatInterval` 用于设置心跳检测间隔(毫秒)，保持连接活跃：

```typescript
// 每30秒发送一次心跳
createEventStream('api/stream', {
  heartbeatInterval: 30000,
  onEvent: (event) => {
    if (event.type === EventType.HEARTBEAT) {
      console.log('收到心跳响应');
    }
  },
});
```

配置建议：

1. 生产环境推荐值：20000-60000ms
2. 测试环境可以设置更短间隔(如5000ms)便于调试
3. 设置为0可禁用心跳检测

### 自定义重试策略

```typescript
createEventStream('api/stream', {
  retry: {
    maxRetries: 5,
    retryDelay: (retryCount) => Math.pow(2, retryCount) * 1000,
    shouldRetry: (error) => error.code !== EventStreamErrorCode.ABORT_ERROR,
  },
});
```

### 认证与授权

```typescript
createEventStream('api/secure-stream', {
  getToken: async () => {
    const token = await fetchToken();
    return `Bearer ${token}`;
  },
});
```

### 性能优化

```typescript
// 使用防抖处理高频消息
let debounceTimer: number;
createEventStream('api/high-frequency', {
  onMessage: (message) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      processMessage(message);
    }, 100);
  },
});
```

## 📚 API 参考

### createEventStream<T>(url: string, options?: EventStreamOptions<T>): EventStreamController

创建并启动一个新的事件流请求。

#### 参数

- `url`: 目标接口URL
- `options`: 事件流配置选项

#### 返回值

`EventStreamController` 实例，用于控制请求生命周期

### EventStreamController 方法

- `abort()`: 中止请求
- `dispose()`: 清理资源
- `getStatus()`: 获取当前连接状态
- `isAborted()`: 检查是否已中止
- `sendHeartbeat()`: 发送心跳检测

### 请求管理方法

- `cancelRequest(requestId: string)`: 取消指定请求
- `cancelAllRequests()`: 取消所有请求
- `getActiveRequests()`: 获取所有活跃请求ID

## 🏗️ 框架集成

### React 示例

```tsx
import { useEffect } from 'react';
import { createEventStream } from '@efdev/event-stream';

function StreamComponent() {
  useEffect(() => {
    const controller = createEventStream('api/stream', {
      onMessage: (message) => {
        // 更新状态
      },
      onError: (error) => {
        // 处理错误
      },
    });

    return () => controller.dispose();
  }, []);

  return <div>Stream Component</div>;
}
```

### Vue 示例

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { createEventStream } from '@efdev/event-stream';

let controller;

onMounted(() => {
  controller = createEventStream('api/stream', {
    onMessage: (message) => {
      // 更新响应式数据
    },
  });
});

onUnmounted(() => {
  controller?.dispose();
});
</script>
```

## ⚠️ 注意事项

1. **连接管理**:

   - 确保在组件卸载时调用 `controller.dispose()`
   - 合理配置心跳间隔保持连接

2. **性能优化**:

   - 对于高频消息流，考虑使用防抖/节流
   - 避免在回调中进行耗时操作

3. **错误处理**:

   - 实现完整的错误处理逻辑
   - 区分可重试错误和不可重试错误

4. **类型安全**:
   - 充分利用 TypeScript 类型推断
   - 为消息数据定义明确的类型

## 🔍 常见问题

### 如何检测连接断开？

通过 `onStatusChange` 回调监听状态变化：

```typescript
createEventStream('api/stream', {
  onStatusChange: (status) => {
    if (
      status === ConnectionStatus.ERROR ||
      status === ConnectionStatus.CLOSED
    ) {
      console.log('连接已断开');
    }
  },
});
```

### 如何实现自动重连？

配置 `retry` 选项：

```typescript
createEventStream('api/stream', {
  retry: {
    maxRetries: 3,
    retryDelay: 1000,
    shouldRetry: (error) => error.isRetriable,
  },
});
```

### 如何发送自定义事件？

服务端发送格式：

```
event: custom-event
data: {"key":"value"}
```

客户端处理：

```typescript
createEventStream('api/stream', {
  onEvent: (event) => {
    if (event.type === 'custom-event') {
      console.log('收到自定义事件:', event.data);
    }
  },
});
```

### 如何调试问题？

启用调试模式：

```typescript
createEventStream('api/stream', {
  debug: true, // 将在控制台输出详细日志
});
```

## 📝 类型定义

### 核心类型

```typescript
// 流式消息
interface StreamMessage<T = unknown> {
  data: T;
  status: MessageStatus;
  timestamp: number;
}

// 自定义事件
interface CustomEvent {
  type: EventType;
  data: string;
  timestamp: number;
}

// 重试策略
interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number | ((retryCount: number) => number);
  shouldRetry?: (error: EventStreamError) => boolean;
}
```

### 枚举类型

```typescript
// 消息状态
enum MessageStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DONE = '[DONE]',
}

// 连接状态
enum ConnectionStatus {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  CLOSED = 'CLOSED',
  ERROR = 'ERROR',
  HEARTBEAT = 'HEARTBEAT',
  RECONNECTING = 'RECONNECTING',
}

// 事件类型
enum EventType {
  MESSAGE = 'message',
  ERROR = 'error',
  HEARTBEAT = 'heartbeat',
  OPEN = 'open',
  CLOSE = 'close',
  CUSTOM = 'custom',
}
```

## 🏆 最佳实践

1. **请求ID管理**:

   ```typescript
   // 使用UUID生成唯一ID
   import { v4 as uuidv4 } from 'uuid';
   const requestId = uuidv4();
   ```

2. **错误处理**:

   ```typescript
   createEventStream('api/stream', {
     onError: (error) => {
       if (error.code === EventStreamErrorCode.NETWORK_ERROR) {
         // 处理网络错误
       } else {
         // 处理其他错误
       }
     },
   });
   ```

3. **性能监控**:

   ```typescript
   let lastMessageTime = Date.now();
   createEventStream('api/stream', {
     onMessage: (message) => {
       const now = Date.now();
       console.log(`消息延迟: ${now - message.timestamp}ms`);
       lastMessageTime = now;
     },
   });
   ```

4. **资源清理**:
   ```typescript
   // 在页面卸载时清理
   window.addEventListener('beforeunload', () => {
     cancelAllRequests();
   });
   ```
