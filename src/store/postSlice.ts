// store/postSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/types/post";

interface PostState {
  posts: Post[];
  page: number;
  hasMore: boolean;
}

const initialState: PostState = {
  posts: [],
  page: 2, // 从第2页开始加载
  hasMore: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const { setPosts, addPosts, setPage, setHasMore } = postSlice.actions;
export default postSlice.reducer;
