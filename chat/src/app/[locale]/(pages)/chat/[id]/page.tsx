/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ChatMain from "../components/ChatMain";
import { RootState } from "@/store";
import {
  sendMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "@/utils/websocket";
import { useSelector } from "react-redux";
import ConversationsApi from "@/api/Chat";

export default function Main({ params }: { params: Promise<{ id: string }> }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const user_id = useSelector((state: RootState) => state.auth.user.id);
  const unwrappedParams = React.use(params);

  // 首次进入加载信息
  useEffect(() => {
    if (unwrappedParams?.id) {
      ConversationsApi.GetConversationByID(unwrappedParams.id).then((res) => {
        setMessages(res.data);
      });
    }
  }, [unwrappedParams]);

  // 发送消息
  const handleSendMessage = (message: string): void => {
    const msg = {
      type: "private",
      content: message,
      conversation_id: conversationId,
      created_at: Date.now(),
      sender_id: user_id,
    };
    setMessages((prev) => [...prev, msg]);
    sendMessage(msg);
  };

  useEffect(() => {
    setConversationId(unwrappedParams.id);
    const handleNewMessage = (msg: any): void => {
      setMessages((prev) => [...prev, msg]);
    };
    subscribeToMessages(unwrappedParams.id, handleNewMessage);
    return () => {
      unsubscribeFromMessages(unwrappedParams.id, () => {});
    };
  }, [unwrappedParams]);
  const markMessageAsRead = (index: number) => {
    sendMessage({
      type: "updateRead",
      conversation_id: conversationId,
      readId: index,
    });
  };
  return (
    <ChatMain
      sendMessage={handleSendMessage}
      messages={messages}
      markMessageAsRead={markMessageAsRead}
    />
  );
}
