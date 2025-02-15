/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  sendMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "@/utils/websocket";
import { Button } from "@/components";

const ChatMain = ({ receiverId }: { receiverId: string }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const handleNewMessage = (msg: any): void => {
      setMessages((prev) => [...prev, msg]);
    };

    subscribeToMessages("private", handleNewMessage);

    return () => {
      unsubscribeFromMessages("private", () => {});
    };
  }, []);

  const handleSendMessage = (): void => {
    if (message.trim() && receiverId) {
      const msg = {
        type: "private",
        content: message,
        receiver_id: receiverId,
      };
      sendMessage(msg);
      setMessage("");

      const messageInfo = {
        type: "private",
        content: message,
        receiver_id: receiverId,
        sendTime: Date.now(),
        isMe: true,
      };
      setMessages((prev) => [...prev, messageInfo]);
    }
  };

  return (
    <div className="flex h-[--main-height] bg-gray-50 p-8">
      {/* Right side: Chat Content */}
      <div className="flex-1 flex flex-col ml-4">
        <div className="flex flex-col h-full bg-gray-50">
          {/* Chat history */}
          <ul className="mt-6 p-0 flex-1 max-h-[70vh] overflow-y-auto space-y-4">
            {messages
              .filter((msg) => msg.receiver_id === receiverId)
              .map((msg, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-md shadow-md space-y-2 max-w-[75%] ${
                    msg.isMe
                      ? "ml-auto text-right bg-blue-100"
                      : "mr-auto text-left bg-gray-100"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      msg.isMe ? "justify-end" : "justify-start"
                    } space-x-2`}
                  >
                    {!msg.isMe && (
                      <span className="font-bold text-lg text-gray-700">
                        {msg.user}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(msg.sendTime).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-lg text-gray-700">{msg.content}</p>
                </li>
              ))}
          </ul>

          {/* Message input and send button */}
          <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="输入消息"
              className="flex-1 p-4 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSendMessage} className="bg-blue-500">
              发送聊天
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
