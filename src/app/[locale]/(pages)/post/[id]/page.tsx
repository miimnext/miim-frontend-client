import { notFound } from "next/navigation";
import CommentSection from "@/app/components/CommentSection";
import CommonApi from "@/api/Common";
import styles from "./PostPage.module.scss"; // 导入CSS模块

// 获取单篇文章
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 等待解析 id
  const { id } = await params;

  // 使用 API 查询文章
  const getPostByID = (id: string) => {
    return CommonApi.getPostByID(id).then((res) => {
      return res.data;
    });
  };

  // 获取文章数据
  const post = await getPostByID(id);

  // 如果没有找到文章，跳转到 404 页面
  if (!post) {
    notFound(); // 这里是跳转到 404 页面
    return null; // 防止继续渲染页面
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
