import { notFound } from "next/navigation";
// import CommentSection from "@/components/CommentSection";
import Image from "next/image";
import CommonApi from "@/api/Common";
import ReactMarkdown from "react-markdown";
import React from "react";
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
    <div className="max-w-5xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-4  break-all">
        {post.title}
      </h1>
      <p className="text-gray-500 text-sm mb-6">{post.created_at}</p>

      <div className="prose prose-lg dark:prose-invert  break-all">
        <ReactMarkdown
          components={{
            img: ({ src }) => {
              if (!src) return null; // 避免空 src 时报错
              return (
                <Image
                  src={src || "/images/post1.png"}
                  alt={post.title}
                  width={200}
                  height={150}
                  priority={true}
                  className="object-cover w-full h-full"
                />
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      <div className="mt-10">{/* <CommentSection /> */}</div>
    </div>
  );
};

export default React.memo(PostPage);
