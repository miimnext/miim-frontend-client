import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import React from "react";

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className="list-none p-0 m-0 space-y-6">
      {posts?.map((post) => (
        <li
          key={post.id}
          className="cursor-pointer flex flex-col sm:flex-row items-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all dark:bg-gray-800 dark:text-white"
        >
          <div className="w-full sm:w-32 h-32 sm:h-24 flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={"/images/post1.png"}
              alt={post.title}
              width={120}
              height={96}
              priority={true}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
            <Link
              href={`/post/${post.id}`}
              className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 transition-all"
              aria-label={`Read more about ${post.title}`}
              prefetch={false}
            >
              {post.title}
            </Link>

            <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm flex space-x-6">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 19L3 12l3-7m12 7l3 7-3 7M9 5h6"
                  />
                </svg>
                <span className="ml-1">
                  {dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h8M8 14h4M8 18h8"
                  />
                </svg>
                <span className="ml-1">
                  <Link href={`/author/${post.author.id}`} prefetch={false}>
                    {post.author.nickname}
                  </Link>
                </span>
              </span>
            </div>

            <p className="mt-4 text-gray-500 dark:text-gray-300 text-sm line-clamp-3">
              {post.content?.substring(0, 150)}...
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(PostList);
