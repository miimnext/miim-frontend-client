import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatItem {
  conversation_id: string;
  last_message_at: string;
  participant: {
    user_id: number;
    username: string;
    avatar: string;
    email: string;
    last_login: string | null;
  };
  type: string;
}

interface ChatListState {
  chatList: ChatItem[];
}

const initialState: ChatListState = { chatList: [] };
const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    // **外部传入数据，处理排序**
    setChatList: (state, action: PayloadAction<ChatItem[]>) => {
      state.chatList = action.payload.sort(
        (a, b) =>
          new Date(b.last_message_at).getTime() -
          new Date(a.last_message_at).getTime()
      );
    },

    // **本地新增或更新消息**
    updateChatList: (state, action: PayloadAction<ChatItem>) => {
      const newMessage = action.payload;
      const index = state.chatList.findIndex(
        (chat) => chat.conversation_id === newMessage.conversation_id
      );

      if (index !== -1) {
        // 更新已存在的会话
        state.chatList[index].last_message_at = newMessage.last_message_at;
        state.chatList.unshift(state.chatList.splice(index, 1)[0]); // 移动到顶部
      } else {
        // 新会话，直接添加
        state.chatList.unshift(newMessage);
      }
    },
  },
});

export const { setChatList, updateChatList } = chatListSlice.actions;
export default chatListSlice.reducer;
