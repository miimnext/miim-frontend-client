/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const ChatList = () => {
  const router = useRouter();
  const pathname = usePathname().split("/")[2];
  const chatList = useSelector((state: RootState) => state.chatList.chatList);

  return (
    <>
      {chatList.map((chat: any) => (
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
            <span className="text-lg ">{chat.participant.username}</span>
            <span className="text-xs ">最近</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatList;
