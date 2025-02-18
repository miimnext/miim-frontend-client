/* eslint-disable @typescript-eslint/no-explicit-any */
let socket: WebSocket | null = null;
let messageCallbacks: Map<string, Array<(message: any) => void>> = new Map(); // 使用 Map 来存储消息类型和回调函数

let messageQueue: any[] = []; // 消息队列，用于存储待发送的消息

// 连接状态
export enum WebSocketStatus {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  CONNECTING = "CONNECTING",
  CLOSING = "CLOSING",
}

let currentStatus: WebSocketStatus = WebSocketStatus.CLOSED;

// 获取当前 WebSocket 状态
export const getWebSocketStatus = (): WebSocketStatus => {
  return currentStatus;
};

// 连接 WebSocket
export const connectWebSocket = (id: string): void => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket("ws://localhost:8082/ws?user_id=" + id);
    currentStatus = WebSocketStatus.CONNECTING;

    socket.onopen = () => {
      currentStatus = WebSocketStatus.OPEN;
      console.log("WebSocket 连接成功");
      // 发送缓存消息
      messageQueue.forEach((message: any) => {
        message.status = "SENT";
        socket!.send(JSON.stringify(message));
      });
      messageQueue = [];
    };

    socket.onmessage = (event: MessageEvent) => {
      console.log("收到消息:", event.data);

      if (event.data === "ping" || event.data === "pong") {
        handlePing();
        return;
      }

      const chatMessage = JSON.parse(event.data);
      const callbacks = messageCallbacks.get(chatMessage.type);
      if (callbacks) {
        callbacks.forEach((callback) => callback(chatMessage));
      }
    };

    socket.onerror = (error: Event) => {
      currentStatus = WebSocketStatus.CLOSED;
      console.error("WebSocket 发生错误:", error);
      reconnectWebSocket(id);
    };

    socket.onclose = () => {
      currentStatus = WebSocketStatus.CLOSED;
      console.log("WebSocket 连接关闭");
      reconnectWebSocket(id);
    };
  }
};

// 处理 ping 消息
const handlePing = (): void => {
  console.log("收到服务器心跳响应");
  if (socket) {
    socket.send("pong");
  }
};

// 发送聊天消息
export const sendMessage = (msg: any): void => {
  if (!msg.type) {
    console.error("消息缺少类型");
    return;
  }

  const sendTime = new Date().getTime();
  const chatMessage = {
    ...msg,
    sendTime,
    status: "PENDING", // 初始状态设置为 PENDING
  };

  // 如果 WebSocket 已连接，则直接发送
  if (socket && socket.readyState === WebSocket.OPEN) {
    chatMessage.status = "SENT"; // 如果 WebSocket 已连接，状态改为 SENT
    socket.send(JSON.stringify(chatMessage));
  } else {
    // 如果 WebSocket 尚未连接，缓存消息到队列
    messageQueue.push(chatMessage);
    console.log("WebSocket 未连接，消息已缓存");
  }
};

// 订阅 WebSocket 消息（指定类型）
export const subscribeToMessages = (
  type: string,
  callback: (message: any) => void
): void => {
  if (!messageCallbacks.has(type)) {
    messageCallbacks.set(type, []);
  }

  const callbacks = messageCallbacks.get(type);
  if (callbacks && !callbacks.includes(callback)) {
    callbacks.push(callback);
  }
};

// 取消订阅 WebSocket 消息（指定类型）
export const unsubscribeFromMessages = (
  type: string,
  callback: (message: any) => void
): void => {
  const callbacks = messageCallbacks.get(type);
  if (callbacks) {
    messageCallbacks.set(
      type,
      callbacks.filter((cb) => cb !== callback)
    );
  }
};

// 关闭 WebSocket 连接
export const closeWebSocket = (): void => {
  if (socket) {
    socket.close();
    socket = null;
    currentStatus = WebSocketStatus.CLOSED;
  }
};

// 重连 WebSocket
const reconnectWebSocket = (id: string): void => {
  console.log("尝试重连 WebSocket...");
  let retryCount = 0;

  const attemptReconnect = () => {
    if (retryCount >= 5) {
      console.log("达到最大重试次数，停止重连");
      return;
    }

    retryCount++;
    setTimeout(
      () => {
        console.log(`重连第 ${retryCount} 次...`);
        connectWebSocket(id);
      },
      Math.pow(2, retryCount) * 1000
    ); // 使用指数退避，延迟增长
  };

  attemptReconnect();
};
