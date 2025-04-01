import { notFound } from "next/navigation";
// import CommentSection from "@/components/CommentSection";
import CommonApi from "@/api/Common";
import React from "react";
import dayjs from "dayjs";
import CommentSection from "@/app/[locale]/components/CommentSection";
// 获取单篇文章
const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // ✅ API 查询文章
  const getPostByID = async (id: string) => {
    try {
      const res = await CommonApi.getPostByID(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null; // 发生错误时返回 null
    }
  };

  // ✅ `await` 文章数据
  const post = await getPostByID(id);
  // 如果没有找到文章，跳转到 404 页面
  if (!post) {
    notFound(); // ✅ 触发 Next.js 内置的 404 处理
  }
  return (
    <div className="max-w-5xl mx-auto p-4 ">
      <div className="shadow-md rounded-md p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4  break-all">
          {post.title}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </p>

        <div className="prose prose-lg dark:prose-invert  break-all wang-editor-content ">
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
        <div className="mt-4">
          <CommentSection id={id} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostPage);
