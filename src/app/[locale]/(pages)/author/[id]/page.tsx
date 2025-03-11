import React from "react";
import AuthorApi from "@/api/Author";
import PostList from "@/app/[locale]/components/PostList";
import AuthorInfo from "../compoonents/AuthorInfo";

const AuthorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const postsResponse = await AuthorApi.getAuthorPosts(id);
  const authorInfo = await AuthorApi.getAuthorInfo(id);
  return (
    <div className="max-w-4xl mx-auto ">
      <AuthorInfo authorInfo={authorInfo.data}></AuthorInfo>
      <PostList posts={postsResponse.data.list}></PostList>
    </div>
  );
};

export default AuthorPage;
