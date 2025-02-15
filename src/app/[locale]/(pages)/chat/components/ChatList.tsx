"use client";

import UserApi from "@/api/User";
import { Button } from "@/components";
import { RootState } from "@/store";
import { useState } from "react";
import { useSelector } from "react-redux";

type ChatListProps = {
  setSelectedChat: (receiverId: string) => void;
};

const ChatList = ({ setSelectedChat }: ChatListProps) => {
  const [chats, setChats] = useState([
    { receiverId: "123123", name: "用户A" },
    { receiverId: "456456", name: "用户B" },
    { receiverId: "789789", name: "用户C" },
  ]);

  console.log(localStorage.getItem("conversations"));

  // Track the selected chat
  const [selectedChat, setSelectedChatState] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [receiverId, setReceiverId] = useState(""); // Input field state
  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const handleChatSelect = (receiverId: string) => {
    setSelectedChat(receiverId);
    setSelectedChatState(receiverId); // Update the local selected chat
  };

  const handleAddChat = async () => {
    if (receiverId) {
      const res = await UserApi.CreateConversation({
        user_id: String(user_id),
        receiver_id: receiverId,
      });

      if (res.data.code !== 200) {
        return alert(res.message);
      } else {
        const newChat = {
          receiverId: receiverId,
          name: `用户${receiverId}`,
        };

        // Add new chat to the list
        setChats((prevChats) => [newChat, ...prevChats]);

        // Automatically select the new chat
        setSelectedChat(receiverId);
        setSelectedChatState(receiverId);

        // Close the modal and reset input field
        setShowModal(false);
        setReceiverId("");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="font-semibold text-xl text-gray-700 flex justify-between items-center">
        <span>会话列表</span>
        <Button onClick={() => setShowModal(true)}>添加会话</Button>
      </div>

      {chats.map((chat) => (
        <div
          key={chat.receiverId}
          className={`cursor-pointer p-3 rounded-lg transition duration-200 ease-in-out ${
            selectedChat === chat.receiverId
              ? "bg-blue-100" // Highlight the selected chat
              : "hover:bg-blue-100"
          }`}
          onClick={() => handleChatSelect(chat.receiverId)}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg text-gray-800">{chat.name}</span>
            <span className="text-xs text-gray-500">最近</span>
          </div>
        </div>
      ))}

      {/* Modal for adding new chat */}
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
    </div>
  );
};

export default ChatList;
