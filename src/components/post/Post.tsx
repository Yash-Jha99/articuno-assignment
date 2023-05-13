import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  content: string;
  userId: string;
  className?: string;
};

const Post = ({ id, title, content, userId, className = "" }: Props) => {
  const { data } = useSession();
  return (
    <div
      className={`relative h-[20rem] w-full  rounded-xl bg-white/10 p-6 ${className}`}
    >
      <Link href={`/post/${id}`} className="block h-[17rem] overflow-hidden">
        <div className="flex  flex-col space-y-4 ">
          <div className="w-11/12 truncate text-2xl font-bold">{title}</div>
          <div className="text-lg">{content}</div>
        </div>
      </Link>
      {data?.user.id === userId && (
        <Link href={`/post/edit?id=${id}`} className="absolute right-4 top-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default Post;
