"use client";
import { useState, useCallback } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";
import useDebounce from "@/hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { addPosts, setPage, setHasMore } from "@/store/postSlice";
import React from "react";
import PostList from "@/app/[locale]/components/PostList";
import AuthorApi from "@/api/Author";

const AuthorPostMain = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.post.posts);
  const page = useSelector((state: RootState) => state.post.page);
  const hasMore = useSelector((state: RootState) => state.post.hasMore);
  const [isLoading, setIsLoading] = useState(false);
  const page_size = 10;
  // 加载帖子列表
  const loadPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const res = await AuthorApi.getAuthorPosts(id, { page, page_size });
      const newPosts = res?.data?.list || [];
      // 更新 hasMore 和 page
      dispatch(setHasMore(newPosts.length >= page_size));
      dispatch(addPosts(newPosts)); // 向 Redux 中添加更多帖子
      dispatch(setPage(page + 1)); // 增加当前页
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, id, page, dispatch]);
  const debouncedLoadMorePosts = useDebounce(loadPosts, 300);
  return (
    <InfiniteScroll
      onLoad={debouncedLoadMorePosts}
      isLoading={isLoading}
      hasMore={hasMore}
    >
      <PostList posts={posts} />
    </InfiniteScroll>
  );
};

export default React.memo(AuthorPostMain);
