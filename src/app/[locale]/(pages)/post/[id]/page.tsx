import { notFound } from "next/navigation";
import CommentSection from "@/app/components/CommentSection";
import CommonApi from "@/api/Common";
import styles from "./PostPage.module.scss"; // 导入 CSS 模块

// 获取单篇文章
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ 直接解构，不要 `await`

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
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.content}>{post.content}</p>
      </div>

      <CommentSection />
    </>
  );
}
