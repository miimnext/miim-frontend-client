"use client";
import { useState, useCallback } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Post } from "@/types/post";
import useDebounce from "@/hooks/useDebounce";
import CommonApi from "@/api/Common";
import { useLoading } from "@/hooks/useLoading";
import PostList from "../PostList";

interface PostMainProps {
  initialPosts: Post[];
}

const PostMain: React.FC<PostMainProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(2); // 服务器端已加载第1页，从2开始
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length >= 10);
  const { startLoading, stopLoading } = useLoading();
  const page_size = 10;

  // 加载帖子列表
  const loadPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await CommonApi.getPostList({ page, page_size });
      const newPosts = res?.data?.list || [];

      setHasMore(newPosts.length >= page_size);
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, page_size]);

  const debouncedLoadMorePosts = useDebounce(loadPosts, 300);

  // 删除帖子
  const handlerDelete = (id: number) => {
    startLoading();
    CommonApi.DeletePost(id)
      .then(() => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
      })
      .finally(stopLoading);
  };

  return (
    <InfiniteScroll
      onLoad={debouncedLoadMorePosts}
      isLoading={isLoading}
      hasMore={hasMore}
    >
      <PostList posts={posts} handlerDelete={handlerDelete} />
    </InfiniteScroll>
  );
};

export default PostMain;
