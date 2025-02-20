/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  sendMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "@/utils/websocket";
import { Button } from "@/components";
import ConversationsApi from "@/api/Chat";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ChatMain = React.memo(
  ({ conversation_id }: { conversation_id: string }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState<string>("");
    const [showNewMessageTip, setShowNewMessageTip] = useState(false);
    const chatListRef = useRef<HTMLUListElement | null>(null);
    const user_id = useSelector((state: RootState) => state.auth.user.id);

    // 组件挂载时加载聊天记录
    useEffect(() => {
      ConversationsApi.GetConversationByID(conversation_id).then((res) => {
        setMessages(res.data);
        setTimeout(scrollToBottom, 10); // 初次加载滚动到底部
      });
    }, [conversation_id]);

    // 订阅新消息
    useEffect(() => {
      const handleNewMessage = (msg: any): void => {
        setMessages((prev) => [...prev, msg]);

        setTimeout(() => {
          if (isAtBottom()) {
            scrollToBottom();
          } else {
            setShowNewMessageTip(true);
          }
        }, 50);
      };

      subscribeToMessages("private", handleNewMessage);
      return () => {
        unsubscribeFromMessages("private", () => {});
      };
    }, []);

    // 监听 messages 变化，确保新消息滚动
    useLayoutEffect(() => {
      setTimeout(() => {
        if (isAtBottom()) {
          scrollToBottom();
        }
      }, 100);
    }, [messages]);

    // 发送消息
    const handleSendMessage = (): void => {
      if (message.trim() && conversation_id) {
        const msg = {
          type: "private",
          content: message,
          conversation_id,
          created_at: Date.now(),
          sender_id: user_id,
        };
        sendMessage(msg);
        setMessage("");
        setMessages((prev) => [...prev, msg]);

        setTimeout(scrollToBottom, 100);
      }
    };

    // 滚动到底部
    const scrollToBottom = () => {
      if (chatListRef.current) {
        chatListRef.current.scrollTo({
          top: chatListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    // 判断是否在底部（误差范围 100px）
    const isAtBottom = (): boolean => {
      if (!chatListRef.current) return false;
      const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
      return scrollHeight - scrollTop - clientHeight < 100;
    };

    // 监听滚动事件
    useEffect(() => {
      const handleScroll = () => {
        if (isAtBottom()) {
          setShowNewMessageTip(false);
        }
      };

      chatListRef.current?.addEventListener("scroll", handleScroll);
      return () => {
        chatListRef.current?.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <div className="flex h-[--main-height] bg-gray-50 p-8">
        <div className="flex-1 flex flex-col ml-4">
          <div className="flex flex-col h-full bg-gray-50">
            {/* 聊天记录 */}
            <ul
              ref={chatListRef}
              className="mt-6 p-1 flex-1 max-h-[70vh] overflow-y-auto space-y-4"
            >
              {messages
                .filter((msg) => msg.conversation_id === conversation_id)
                .map((msg, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded-md shadow-md space-y-2 max-w-[75%] ${
                      msg.sender_id == user_id
                        ? "ml-auto text-right bg-blue-100"
                        : "mr-auto text-left bg-gray-100"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        msg.sender_id == user_id
                          ? "justify-end"
                          : "justify-start"
                      } space-x-2`}
                    >
                      {!msg.isMe && (
                        <span className="font-bold text-lg text-gray-700">
                          {msg.user}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700">{msg.content}</p>
                  </li>
                ))}
            </ul>

            {/* 新消息提示 */}
            {showNewMessageTip && (
              <div
                className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
                onClick={() => scrollToBottom()}
              >
                📩 有新消息，点击查看
              </div>
            )}

            {/* 输入框 */}
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
  }
);
ChatMain.displayName = "ChatMain";
export default ChatMain;
