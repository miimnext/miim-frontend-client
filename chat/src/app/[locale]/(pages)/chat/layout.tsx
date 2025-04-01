/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components";
import { useRouter } from "@/i18n/routing";
import { FaUserPlus, FaUsers, FaComments } from "react-icons/fa";
import ChatList from "./components/ChatList";
import UserApi from "@/api/User";
import { RootState } from "@/store";
import { setChatList } from "@/store/ChatListSlice";
import { useDispatch, useSelector } from "react-redux";
import ConversationsApi from "@/api/Chat";
export default function ChatPage({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("conversations");
  const [showModal, setShowModal] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const user_id = useSelector((state: RootState) => state.auth.user.id);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    ConversationsApi.getConversations().then((res) => {
      dispatch(setChatList(res.data)); // **外部获取数据并存入 Redux**
    });
  }, [dispatch]);
  const handleAddChat = async () => {
    if (receiverId) {
      const res = await UserApi.CreateConversation({
        user_id: String(user_id),
        receiver_id: receiverId,
      });

      if (res.code !== 200) {
        return alert(res.message);
      }
      router.push("/chat/" + res.data.conversation_id);
      // 关闭弹窗并清空输入
      setShowModal(false);
      setReceiverId("");
    }
  };

  return (
    <div className="flex h-[--main-height]">
      {/* PC端左侧侧边栏 */}
      <div className="hidden lg:flex flex-col w-64  space-y-6">
        <h2 className="text-2xl font-semibold p-6">Chat</h2>
        {/* Tab 切换按钮 */}
        <div className="flex gap-2 px-6 justify-between ">
          <Button onClick={() => setActiveTab("conversations")}>
            <FaComments className="inline-block " />
          </Button>
          <Button onClick={() => setActiveTab("contacts")}>
            <FaUsers className="inline-block " />
          </Button>

          <Button onClick={() => setShowModal(true)}>
            <FaUserPlus className="inline-block" />
          </Button>
        </div>
        <div>
          {/* 会话列表 Tab 内容 */}
          {activeTab === "conversations" && (
            <div className=" p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold ">会话列表</h3>
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
      <div className="flex-1 bg-gray-100 ">
        {/* 联系人 Tab 内容 */}
        <main className="flex-1  bg-gray-100 overflow-y-auto h-full">
          {children}
        </main>
      </div>
      {/* H5端底部导航 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around items-center">
        <Button
          onClick={() => {
            setActiveTab("contacts");
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
          }}
          className={`p-2 rounded-md hover:bg-gray-700 transition-all ${
            activeTab === "conversations" ? "bg-gray-700" : ""
          }`}
        >
          <FaComments className="text-white" />
        </Button>
      </div>

      {/* 添加好友弹窗 */}
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
}
