"use client";

import { useState } from "react";
import ChatMain from "./components/ChatMain";
import ChatList from "./components/ChatList";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  const toggleChatList = () => setIsChatListOpen((prev) => !prev);

  return (
    <div className="flex h-[--main-height] bg-gray-50">
      {/* 会话列表（PC端） */}
      <div className="hidden lg:block w-[300px] bg-white p-4 shadow-lg rounded-lg">
        <ChatList setSelectedChat={setSelectedChat} />
      </div>

      {/* 移动端弹出层按钮 */}
      <button
        onClick={toggleChatList}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
      >
        {isChatListOpen ? "关闭会话" : "展开会话"}
      </button>

      {/* 弹出层背景与会话列表 */}
      {isChatListOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-10"
            onClick={toggleChatList}
          />
          <div className="lg:hidden fixed top-0 left-0 bg-white w-[300px] h-full p-4 shadow-lg rounded-lg z-20">
            <ChatList setSelectedChat={setSelectedChat} />
          </div>
        </>
      )}

      {/* 右侧会话内容 */}
      <div className="flex-1 h-[--main-height]">
        {selectedChat ? (
          <ChatMain receiverId={selectedChat} />
        ) : (
          <div className="flex items-center flex-1 justify-center h-[--main-height]">
            <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow-lg w-full max-w-[600px]">
              <div className="mb-4 text-2xl text-gray-700 font-semibold">
                请选择一个会话
              </div>
              <div className="text-lg text-gray-500">点击左侧会话开始聊天</div>
              <div className="mt-4 text-blue-600 text-xl font-bold">
                期待您的互动！
              </div>
              <div className="mt-6">
                <i className="fas fa-comments text-6xl text-blue-500"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
