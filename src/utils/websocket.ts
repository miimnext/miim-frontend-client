export interface ChatMessageInterface {
  type?: string; // 消息类型: 'chat', 'system', 'notification'
  user?: string; // 发送者
  message?: string; // 消息内容
  sendTime: number;
  action?: string;
  content?: string;
  status?: "PENDING" | "SENT" | "FAILED"; // 消息状态
}

let socket: WebSocket | null = null;
let messageCallbacks: Array<{
  type: string;
  callback: (message: ChatMessageInterface) => void;
}> = []; // 存储消息类型和对应的回调函数

let messageQueue: ChatMessageInterface[] = []; // 消息队列，用于存储待发送的消息

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
export const connectWebSocket = (): void => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket("ws://localhost:8081/ws");

    socket.onopen = () => {
      currentStatus = WebSocketStatus.OPEN;
      console.log("WebSocket 连接成功");

      // 连接成功后，发送所有缓存的消息
      messageQueue.forEach((message) => {
        message.status = "SENT"; // 更新状态为已发送
        socket!.send(JSON.stringify(message));
      });
      messageQueue = []; // 清空消息队列
    };

    socket.onmessage = (event: MessageEvent) => {
      console.log("收到消息:", event.data);
      const chatMessage: ChatMessageInterface = JSON.parse(event.data);
      // 通知所有的回调函数（根据类型过滤）
      messageCallbacks.forEach((entry) => {
        if (entry.type === chatMessage.type) {
          entry.callback(chatMessage); // 只调用匹配类型的回调
        }
      });
    };

    socket.onerror = (error: Event) => {
      currentStatus = WebSocketStatus.CLOSED;
      console.error("WebSocket 发生错误:", error);
    };

    socket.onclose = () => {
      currentStatus = WebSocketStatus.CLOSED;
      console.log("WebSocket 连接关闭");
      // 如果需要的话，重新连接
      // connectWebSocket();
    };
  }
};

// 发送聊天消息
export const sendMessage = ({
  type,
  user,
  message,
  action,
  content,
}: {
  action?: string;
  content?: string;
  type?: string;
  user?: string;
  message?: string;
}): void => {
  const sendTime = new Date().getTime();
  const chatMessage: ChatMessageInterface = {
    type,
    user,
    message,
    sendTime,
    action,
    content,
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
  callback: (message: ChatMessageInterface) => void
): void => {
  // 如果该类型的回调已存在，避免重复注册
  if (
    !messageCallbacks.some(
      (entry) => entry.type === type && entry.callback === callback
    )
  ) {
    messageCallbacks.push({ type, callback });
  }
};

// 取消订阅 WebSocket 消息（指定类型）
export const unsubscribeFromMessages = (
  type: string,
  callback: (message: ChatMessageInterface) => void
): void => {
  messageCallbacks = messageCallbacks.filter(
    (entry) => !(entry.type === type && entry.callback === callback) // 移除指定类型和回调的订阅
  );
};

// 关闭 WebSocket 连接
export const closeWebSocket = (): void => {
  if (socket) {
    socket.close();
  }
};
