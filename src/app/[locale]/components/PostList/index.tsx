import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Post } from "@/types/post";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="list-none p-0 m-0">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex items-center bg-white p-4 rounded-lg shadow-sm mb-4 gap-4"
        >
          <div>{post.id}</div>
          <Image
            src={post.image ?? "/images/post1.png"}
            alt={post.title}
            width={96}
            height={72}
            priority={true} // Remove if not critical
            className="rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/post1.png"; // Fallback image
            }}
          />
          <div className="flex-1 pl-4">
            <Link
              href={`/post/${post.id}`}
              className="text-xl font-semibold text-blue-600 no-underline hover:underline"
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
