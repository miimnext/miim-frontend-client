import React from "react";
import PostMain from "../../components/PostMain";
import CommonApi from "@/api/Common";
import PostList from "../../components/PostList";
const Home = async () => {
  const initialPosts = await CommonApi.getPostList({
    page: 1,
    page_size: 10,
  });

  return (
    <div className="p-4 max-w-5xl mx-auto ">
      <PostList posts={initialPosts.data.list || []} />
      {/* <PostMain initialPosts={initialPosts.data.list} /> */}
      <PostMain />
    </div>
  );
};

export default React.memo(Home);
