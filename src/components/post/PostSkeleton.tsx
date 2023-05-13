import React from "react";

const PostSkeleton = () => {
  return (
    <div
      role="status"
      className=" h-[20rem] min-w-[25rem] animate-pulse rounded-xl  bg-white/10 p-6"
    >
      <div className="mb-6 h-5 w-10/12  rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3 w-11/12  rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3  rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3   rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3 w-10/12  rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3   rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3  rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3 w-10/12  rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3   rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3   rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="mb-2.5 h-3 w-1/3  rounded-full bg-gray-200 dark:bg-gray-500"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default PostSkeleton;
