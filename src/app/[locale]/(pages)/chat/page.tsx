/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  sendMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "@/utils/websocket";
import { Button } from "@/components";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [receiverID, setReceiverID] = useState<string>("");

  useEffect(() => {
    const handleNewMessage = (msg: any): void => {
      setMessages((prev) => [msg, ...prev]); // Update message list
    };

    subscribeToMessages("private", handleNewMessage);

    return () => {
      unsubscribeFromMessages("private", () => { });
    };
  }, []);

  const handleSendMessage = (): void => {
    if (message.trim()) {
      const msg = { type: "private", content: message, receiver_id: receiverID }; // Default user name as 'Anonymous'
      sendMessage(msg); // Send message with type
      setMessage(""); // Clear input box
    }
  };

  return (
    <div className="flex flex-col h-[--main-height] bg-white p-8">
      <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={receiverID}
          onChange={(e) => setReceiverID(e.target.value)}
          placeholder="对方id"
          className="flex-1 p-4 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Chat history */}
      <ul className="mt-6 p-0 flex-1 max-h-[70vh] overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`p-4 rounded-md shadow-md space-y-2 ${msg.type === "chat"
              ? "bg-blue-50 border-l-4 border-blue-500"
              : msg.type === "system"
                ? "bg-gray-50 border-l-4 border-gray-500"
                : "bg-green-50 border-l-4 border-green-500"
              }`}
          >
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-gray-700">
                {msg.user}
              </span>
              <span className="text-sm text-gray-500">({msg.type})</span>
              <span className="text-xs text-gray-400">
                {new Date(msg.sendTime).toLocaleString()}
              </span>
            </div>
            <p className="text-lg text-gray-700">{msg.content}</p>
          </li>
        ))}
      </ul>

      {/* Message input and send buttons fixed at the bottom */}
      <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入消息"
          className="flex-1 p-4 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button onClick={() => handleSendMessage()} className="bg-blue-500 ">
            发送聊天
          </Button>
          {/* <Button
            onClick={() => handleSendMessage("system")}
            className="bg-gray-500 "
          >
            发送系统
          </Button>
          <Button
            onClick={() => handleSendMessage("notification")}
            className="bg-green-500 "
          >
            发送通知
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
