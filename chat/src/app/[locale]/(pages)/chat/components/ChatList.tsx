/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ConversationsApi from "@/api/Chat";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "@/i18n/routing";

const ChatList = () => {
  const [chats, setChats] = useState<any>([]);
  const user_id = useSelector((state: RootState) => state.auth.user.id);
  const router = useRouter();
  const pathname = usePathname().split("/")[2];
  useEffect(() => {
    if (user_id) {
      async function fetchChats() {
        const res = await ConversationsApi.getConversations();
        setChats(res.data);
      }
      fetchChats();
    }
  }, [user_id]);

  return (
    <>
      {chats.map((chat: any) => (
        <div
          key={chat.conversation_id}
          className={`cursor-pointer p-3 rounded-lg transition duration-200 ease-in-out ${
            pathname === chat.conversation_id
              ? "bg-blue-100"
              : "hover:bg-blue-100"
          }`}
          onClick={() => router.push(`/chat/${chat.conversation_id}`)}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg text-gray-800">
              {chat.participant.username}
            </span>
            <span className="text-xs text-gray-500">最近</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatList;
