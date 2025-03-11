import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import React from "react";
import ReactMarkdown from "react-markdown";
import LikeDislikeButton from "../LikeDislikeButton";
import Avatar from "../Avatar";
type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className="list-none  p-0 m-0">
      {posts?.map((post) => (
        <li
          key={post.id}
          className="  my-6 cursor-pointer flex flex-col sm:flex-row items-center px-6 py-4 rounded-lg bg-background-1 shadow-lg hover:shadow-xl transition-all dark:bg-gray-800 dark:text-white"
        >
          <div className="w-full sm:w-32 h-32 sm:h-24 flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={post.image || "/images/post1.png"}
              alt={post.title}
              width={120}
              height={96}
              priority={true}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 whitespace-nowrap truncate">
            <Link
              href={`/post/${post.id}`}
              className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 transition-all w-full"
              aria-label={`Read more about ${post.title}`}
              prefetch={false}
            >
              {post.title}
            </Link>

            <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm flex space-x-6 items-center">
              <span>
                {dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </span>

              <Link href={`/author/${post.author.id}`} prefetch={false}>
                <span className="flex items-center">
                  <Avatar avatar={post.author.avatar} w={25} h={25}></Avatar>
                  <span className="ml-2">{post.author.nickname}</span>
                </span>
              </Link>
            </div>
            <div className="my-2 text-gray-500 dark:text-gray-300 text-sm line-clamp-3  overflow-hidden text-ellipsis whitespace-pre-wrap break-words">
              <ReactMarkdown
                components={{
                  img: () => {
                    return null;
                  },
                  a: ({ ...props }) => <span>{props.children}</span>,
                  h1: ({ ...props }) => <span>{props.children}</span>,
                  h2: ({ ...props }) => <span>{props.children}</span>,
                  h3: ({ ...props }) => <span>{props.children}</span>,
                  h4: ({ ...props }) => <span>{props.children}</span>,
                  h5: ({ ...props }) => <span>{props.children}</span>,
                  h6: ({ ...props }) => <span>{props.children}</span>,
                  p: ({ ...props }) => <span>{props.children}</span>,
                  strong: ({ ...props }) => <span>{props.children}</span>,
                  em: ({ ...props }) => <span>{props.children}</span>,
                  ul: ({ ...props }) => <span>{props.children}</span>,
                  ol: ({ ...props }) => <span>{props.children}</span>,
                  li: ({ ...props }) => <span>{props.children}</span>,
                  code: ({ ...props }) => <span>{props.children}</span>,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            {/* 点赞和踩按钮 */}
            <LikeDislikeButton
              likes={post.likes}
              id={post.id}
              ReactionType={post.ReactionType}
            ></LikeDislikeButton>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(PostList);
