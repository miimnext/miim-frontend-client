"use client";
import { useEffect, useState, useCallback } from "react";
import PostList from "@/app/components/PostList";
import CommonApi from "@/api/Common";
import { Post } from "@/types/post";
import InfiniteScroll from "@/app/components/utils/InfiniteScroll";
import Counter from "@/app/components/utils/Counter";
import Auth from "@/app/components/utils/Auth";
import TodoList from "@/app/components/utils/TodoList";
import ThemeSwitcher from "@/app/components/utils/ThemeSwitcher";
import useDebounce from "@/hooks/useDebounce"; // 引入 useDebounce
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page_size = 10;
  // 加载帖子列表的函数
  const loadPosts = useCallback(
    async (page: number) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const res = await CommonApi.getPostList({ page, page_size });
        const newPosts = res?.data?.list || [];
        if (newPosts.length < page_size) {
          setHasMore(false); // 没有更多帖子可以加载
        }
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, page_size]
  );

  // 加载更多帖子的函数
  const loadMorePosts = async () => {
    if (!isLoading && hasMore) {
      await loadPosts(page);
    }
  };

  // 对 loadMorePosts 进行防抖处理，延迟 300ms
  const debouncedLoadMorePosts = useDebounce(loadMorePosts, 300);

  // 组件卸载时重置状态
  useEffect(() => {
    return () => {
      setPosts([]);
      setPage(1);
      setHasMore(true); // 确保下次加载时有更多帖子
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <TodoList />
      <Counter />
      <Auth />
      <ThemeSwitcher />
      <InfiniteScroll
        loadMore={debouncedLoadMorePosts} // 使用防抖后的函数
        isLoading={isLoading}
        hasMore={hasMore}
      >
        <PostList posts={posts} />
      </InfiniteScroll>
      {isLoading && <p className="text-center my-4">Loading...</p>}
      {!hasMore && <p className="text-center my-4">No more posts.</p>}
    </div>
  );
}
