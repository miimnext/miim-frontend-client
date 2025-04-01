/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Message {
  sender_id: string;
  created_at: string;
  content: string;
  is_read: boolean; // Add a read property
  ID: number;
}

interface ChatProps {
  sendMessage: (message: string) => void;
  messages: Message[];
  markMessageAsRead: (index: number) => void; // Function to mark a message as read
}

const ChatMain = React.memo(
  ({ sendMessage, messages, markMessageAsRead }: ChatProps) => {
    const [message, setMessage] = useState<string>("");
    const [showNewMessageTip, setShowNewMessageTip] = useState(false);
    const chatListRef = useRef<HTMLUListElement | null>(null);
    const user_id = useSelector((state: RootState) => state.auth.user.id);

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Reference for debounce timeout

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          // Clear the existing debounce timeout to reset the delay
          if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
          }
          let lastVisibleMessageID: string | null = null;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              lastVisibleMessageID = entry.target.getAttribute("data-id");
              console.log(lastVisibleMessageID);
            }
          });

          if (lastVisibleMessageID !== null) {
            debounceTimeoutRef.current = setTimeout(() => {
              const lastMessage = messages.find(
                (msg) => msg.ID === Number(lastVisibleMessageID)
              );

              if (lastMessage && !lastMessage.is_read) {
                const lastVisibleIndex = messages.indexOf(lastMessage);
                markMessageAsRead(lastVisibleIndex); // Call the function using index
              }
            }, 300); // Adjust debounce delay as necessary
          }
        },
        {
          root: chatListRef.current,
          threshold: 0.5, // Trigger when 50% of the message is visible
        }
      );

      const messageElements =
        chatListRef.current?.querySelectorAll(".message-item");
      messageElements?.forEach((element) => observer.observe(element));

      return () => {
        observer.disconnect(); // Cleanup observer
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current); // Cleanup debounce timeout
        }
      };
    }, [messages, markMessageAsRead]);

    // Scroll to bottom when new messages are added
    useLayoutEffect(() => {
      if (isAtBottom()) {
        scrollToBottom();
      } else {
        setShowNewMessageTip(true);
      }
    }, [messages]);

    // Send message
    const handleSendMessage = (): void => {
      if (message.trim()) {
        sendMessage(message);
        setMessage("");
        scrollToBottom();
      }
    };

    // Scroll to bottom
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
      if (chatListRef.current) {
        chatListRef.current.scrollTo({
          top: chatListRef.current.scrollHeight,
          behavior,
        });
      }
    };

    // Check if the user is at the bottom of the chat
    const isAtBottom = (): boolean => {
      if (!chatListRef.current) return false;
      const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
      return scrollHeight - scrollTop - clientHeight < 100;
    };

    // Handle scroll events
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
      <div className="flex h-full bg-gray-50">
        <div className="flex-1 flex flex-col px-4">
          <div className="flex flex-col h-[--main-height] bg-gray-50 py-6">
            {/* Chat Messages */}
            <ul
              ref={chatListRef}
              className="flex-1 overflow-y-auto space-y-4"
              style={{ height: "calc(100% - 120px)" }}
            >
              {messages.map((msg, index) => {
                const { sender_id, created_at, content, is_read, ID } = msg;

                return (
                  <li
                    key={index}
                    data-id={ID} // Add data-index for Intersection Observer
                    className={`message-item p-4 rounded-md shadow-md space-y-2 max-w-[75%] ${
                      sender_id == user_id
                        ? "ml-auto text-right bg-blue-100"
                        : "mr-auto text-left bg-gray-100"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        sender_id == user_id ? "justify-end" : "justify-start"
                      } space-x-2`}
                    >
                      <span className="text-xs text-gray-400">
                        {new Date(created_at).toLocaleString()}
                      </span>
                      {!is_read && sender_id == user_id && (
                        <span className="text-xs text-red-500">未读</span>
                      )}
                    </div>
                    <p className="text-lg text-gray-700">{content}</p>
                  </li>
                );
              })}
            </ul>

            {/* New Message Tip */}
            {showNewMessageTip && (
              <div
                className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
                onClick={() => scrollToBottom("smooth")}
              >
                📩 有新消息，点击查看
              </div>
            )}

            {/* Input Area */}
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
