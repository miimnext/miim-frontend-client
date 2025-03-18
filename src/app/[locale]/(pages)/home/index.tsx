import React, { Suspense } from "react";
import PostMain from "../../components/PostMain";
import CommonApi from "@/api/Common";
import PostList from "../../components/PostList";
import SSSIDheader from "../../components/SSSIDheader";
import Banner from "../../components/Banner";
import TopicList from "../../components/Topic";
import TopAuthor from "../../components/TopAuthor";
const Home = async () => {
  const headers = await SSSIDheader();
  const initialPosts = await CommonApi.getPostList(
    {
      page: 1,
      page_size: 10,
    },
    headers
  );
  return (
    <div className="max-w-5xl mx-auto flex justify-between ">
      <div className=" max-w-full xl:max-w-3xl p-4 ">
        <Banner />

        <PostList posts={initialPosts.data.list || []} />
        <PostMain />
      </div>
      <div className="hidden xl:block sticky top-[--header-height] w-[--aside-w] h-full">
        <Suspense>
          <TopAuthor />
        </Suspense>
        <Suspense>
          <TopicList />
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(Home);
