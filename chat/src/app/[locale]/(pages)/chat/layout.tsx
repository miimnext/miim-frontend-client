"use client";
import React, { useState } from "react";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaUsers, FaComments } from "react-icons/fa";
import ChatList from "./components/ChatList";

export default function ChatPage({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("conversations"); // 当前选中的 tab（联系人或会话列表）
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false); // 控制添加好友弹窗
  const router = useRouter();

  // 打开添加好友弹窗
  const openAddFriendModal = () => setIsAddFriendModalOpen(true);

  // 关闭添加好友弹窗
  const closeAddFriendModal = () => setIsAddFriendModalOpen(false);

  return (
    <div className="flex h-[--main-height]">
      {/* PC端左侧侧边栏 */}
      <div className="hidden lg:flex flex-col w-64  space-y-6">
        <h2 className="text-2xl font-semibold p-6">Chat</h2>
        {/* Tab 切换按钮 */}
        <div className="flex gap-2 px-6">
          <Button onClick={() => setActiveTab("conversations")}>
            <FaComments className="inline-block " />
          </Button>
          <Button onClick={() => setActiveTab("contacts")}>
            <FaUsers className="inline-block " />
          </Button>

          <Button onClick={openAddFriendModal}>
            <FaUserPlus className="inline-block" />
          </Button>
        </div>
        <div>
          {/* 会话列表 Tab 内容 */}
          {activeTab === "conversations" && (
            <div className=" bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">会话列表</h3>
              <ChatList></ChatList>
            </div>
          )}
          {activeTab === "contacts" && (
            <div className="col-span-3 sm:col-span-1 lg:col-span-1 bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                联系人列表
              </h3>
              <p className="text-gray-600 mt-2">这是联系人列表的内容区域。</p>
            </div>
          )}
        </div>
      </div>
      {/* 主要内容区域 */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="lg:flex justify-between items-center mb-6">
          {/* PC端顶部导航 */}
          <div className="hidden lg:block text-2xl font-bold text-gray-800">
            主页面
          </div>
        </div>

        {/* 联系人 Tab 内容 */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
      {/* H5端底部导航 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around items-center">
        <Button
          onClick={() => {
            setActiveTab("contacts");
            router.push("/contacts");
          }}
          className={`p-2 rounded-md hover:bg-gray-700 transition-all ${
            activeTab === "contacts" ? "bg-gray-700" : ""
          }`}
        >
          <FaUsers className="text-white" />
        </Button>
        <Button
          onClick={() => {
            setActiveTab("conversations");
            router.push("/conversations");
          }}
          className={`p-2 rounded-md hover:bg-gray-700 transition-all ${
            activeTab === "conversations" ? "bg-gray-700" : ""
          }`}
        >
          <FaComments className="text-white" />
        </Button>
      </div>

      {/* 添加好友弹窗 */}
      {isAddFriendModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h3 className="text-xl font-semibold text-gray-800">添加好友</h3>
            <div className="mt-4">
              <input
                type="text"
                placeholder="请输入好友用户名"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                onClick={closeAddFriendModal}
                className="bg-gray-400 text-white"
              >
                取消
              </Button>
              <Button className="bg-blue-600 text-white">添加</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
