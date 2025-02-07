import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Post } from "@/types/post";
import styles from "./PostList.module.scss"; // 引入自定义样式

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className={styles.postList}>
      {posts.map((post) => (
        <li key={post.id} className={styles.postItem}>
          <div>{post.id}</div>
          <div className={styles.imageContainer}>
            <Image
              src={post.image ?? "/images/post1.png"}
              alt={post.title}
              priority // Remove if not critical
              fill
              sizes="96px"
              className={styles.image}
              onError={(e) => {
                e.currentTarget.src = "/images/post1.png"; // Fallback image
              }}
            />
          </div>
          <div className={styles.textContainer}>
            <Link
              href={`/post/${post.id}`}
              className={styles.title}
              aria-label={`Read more about ${post.title}`}
              prefetch={false}
            >
              {post.title}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
