import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import React from "react";
import LikeDislikeButton from "../LikeDislikeButton";
import Avatar from "../Avatar";
type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  const findFirstImageInHTML = (html: string) => {
    const regex = /<img[^>]*src="([^"]*)"[^>]*>/g;
    const match = regex.exec(html);

    if (match) {
      return match[1]; // match[1] contains the src of the first image
    }

    return null; // Return null if no image is found
  };

  return (
    <ul className="list-none  p-0 m-0">
      {posts?.map((post) => (
        <li
          key={post.id}
          className="  my-6 cursor-pointer flex flex-col sm:flex-row items-center px-2 sm:px-6 py-4 rounded-lg bg-background-1 shadow-lg hover:shadow-xl transition-all dark:bg-gray-800 dark:text-white"
        >
          <div className="w-full sm:w-32 h-32 sm:h-24 flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden relative">
            <Image
              src={findFirstImageInHTML(post.content) || "/images/post1.png"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={true}
            />
          </div>

          <div className="flex-1 sm:ml-6 mt-4 sm:mt-0  w-full">
            <Link
              href={`/post/${post.id}`}
              className="text-2xl font-bold  hover:text-blue-600 "
              prefetch={false}
            >
              <div className=" max-w-full break-all line-clamp-3 sm:line-clamp-2">
                {post.title}
              </div>
            </Link>
            <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm flex space-x-6 items-center ">
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
            <div className="my-2 text-gray-500 dark:text-gray-300 text-sm line-clamp-3 break-all">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/<img[^>]*>/g, "") // Remove all <img> tags
                    .replace(
                      /<(\/?)(h1|h2|h3|h4|h5|h6|div|p|span|a|ul|ol|li|blockquote|table|thead|tbody|tr|td|th)[^>]*>/g,
                      "<$1span>"
                    ), // Replace paired tags with <span>
                }}
              ></div>
            </div>
            {/* 点赞和踩按钮 评论数量*/}
            <LikeDislikeButton
              likes={post.likes}
              id={post.id}
              comment_count={post.comment_count}
              ReactionType={post.ReactionType}
            ></LikeDislikeButton>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(PostList);
