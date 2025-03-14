import React from "react";
import AuthorApi from "@/api/Author";
import PostList from "@/app/[locale]/components/PostList";
import AuthorInfo from "../compoonents/AuthorInfo";
import SSSIDheader from "@/app/[locale]/components/SSSIDheader";
import AuthorPostMain from "../compoonents/AuthorPostMain";

const AuthorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const headers = await SSSIDheader();
  const { id } = await params;
  const page_size = 10;
  const postsResponse = await AuthorApi.getAuthorPosts(
    id,
    {
      page: 1,
      page_size,
    },
    headers
  );
  const authorInfo = await AuthorApi.getAuthorInfo(id);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <AuthorInfo authorInfo={authorInfo.data} />
      <PostList posts={postsResponse.data.list} />
      {postsResponse.data.list.length >= page_size && (
        <AuthorPostMain id={id} />
      )}
    </div>
  );
};

export default AuthorPage;
