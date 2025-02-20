/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ConversationsApi from "@/api/Chat";
import UserApi from "@/api/User";
import { Button } from "@/components";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type ChatListProps = {
  selectChat: (conversation_id: string) => void;
};

const ChatList = ({ selectChat }: ChatListProps) => {
  const [activeTab, setActiveTab] = useState<"chats" | "contacts">("chats");
  const [chats, setChats] = useState<any>([]);
  const [contacts, setContacts] = useState<any>([]);
  const [selectedChat, setSelectedChatState] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [receiverId, setReceiverId] = useState(""); // 目标用户ID输入框
  const user_id = useSelector((state: RootState) => state.auth.user.id);

  useEffect(() => {
    if (user_id) {
      async function fetchChats() {
        const res = await ConversationsApi.getConversations();
        setChats(res.data);
      }
      fetchChats();
    }
  }, [user_id]);

  useEffect(() => {
    if (activeTab === "contacts") {
      async function fetchContacts() {
        setContacts([]);
      }
      fetchContacts();
    }
  }, [activeTab]);

  const handleChatSelect = (conversation_id: string) => {
    selectChat(conversation_id);
    setSelectedChatState(conversation_id);
  };

  const handleAddChat = async () => {
    if (receiverId) {
      const res = await UserApi.CreateConversation({
        user_id: String(user_id),
        receiver_id: receiverId,
      });

      if (res.data.code !== 200) {
        return alert(res.message);
      }

      // 新增会话并选中
      const newChat = {
        conversation_id: res.data.conversation_id,
        participant: { username: `用户${receiverId}` },
      };
      setChats((prevChats: any) => [newChat, ...prevChats]);
      handleChatSelect(res.data.conversation_id);

      // 关闭弹窗并清空输入
      setShowModal(false);
      setReceiverId("");
    }
  };

  return (
    <>
      {/* Tab 切换按钮 */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Button
            onClick={() => setActiveTab("chats")}
            className={activeTab === "chats" ? "font-bold" : ""}
          >
            会话列表
          </Button>
          <Button
            onClick={() => setActiveTab("contacts")}
            className={activeTab === "contacts" ? "font-bold" : ""}
          >
            通讯录
          </Button>
          <Button onClick={() => setShowModal(true)}>添加会话</Button>
        </div>
      </div>

      {/* 会话列表 */}
      {activeTab === "chats" && (
        <div className="space-y-2">
          {chats.map((chat: any) => (
            <div
              key={chat.conversation_id}
              className={`cursor-pointer p-3 rounded-lg transition duration-200 ease-in-out ${
                selectedChat === chat.conversation_id
                  ? "bg-blue-100"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => handleChatSelect(chat.conversation_id)}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-800">
                  {chat.participant.username}
                </span>
                <span className="text-xs text-gray-500">最近</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 通讯录 */}
      {activeTab === "contacts" && (
        <div className="space-y-2">
          {contacts.map((contact: any) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <span className="text-lg text-gray-800">{contact.username}</span>
              <Button
                onClick={() => {
                  setReceiverId(contact.id);
                  setShowModal(true);
                }}
              >
                聊天
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 创建会话弹窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">添加会话</h2>
            <input
              type="text"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-md mb-4"
              placeholder="请输入对方ID"
            />
            <div className="flex justify-end">
              <Button onClick={() => setShowModal(false)} className="mr-2">
                取消
              </Button>
              <Button onClick={handleAddChat}>创建会话</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatList;
