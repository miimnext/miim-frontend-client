import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Post } from "@/types/post"; // 导入 Post 类型
import Image from "next/image";
import { Button } from "@/components"; // 可用于分页、其他交互等
import AuthorApi from "@/api/Author";
import PostList from "@/app/[locale]/components/PostList";
import AuthorInfo from "../compoonents/AuthorInfo";
interface Author {
  id: string;
  nickname: string;
  avatar: string;
  bio: string;
}

const AuthorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const postsResponse = await AuthorApi.getAuthorPosts(id);
  // const [author, setAuthor] = useState<any | null>(null);
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const authorResponse = await AuthorApi.getAuthorInfo(id); // 假设你有 API 获取作者数据
  //       // setAuthor(authorResponse.data);

  //       const postsResponse = await AuthorApi.getAuthorPosts(id); // 假设你有 API 获取作者文章
  //       setPosts(postsResponse.data.list);
  //     } catch (error) {
  //       console.error("Failed to fetch author data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  // if (!author) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 作者信息 */}
      {/* <div className="flex items-center gap-4 mb-8">
        <Image
          src={author.avatar}
          alt={author.nickname}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold">{author.nickname}</h2>
          <p className="text-sm text-gray-600">{author.bio}</p>
        </div>
      </div>

      {/* 作者文章 */}
      {/* <h3 className="text-xl font-semibold mb-4">
        Articles by {author.nickname}
      </h3>  */}
      <AuthorInfo userInfo={213}></AuthorInfo>
      <ul className="list-none p-0 m-0">
        <PostList posts={postsResponse.data.list}></PostList>
      </ul>
    </div>
  );
};

export default AuthorPage;
