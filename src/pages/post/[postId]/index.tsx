import { useRouter } from "next/router";
import React from "react";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const PostDetails = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data } = api.post.get.useQuery({ id: postId as string });
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <p className="flex flex-col gap-12 p-16  text-white">
          <div className="text-4xl">{data?.title}</div>
          <div className="text-2xl">{data?.content}</div>
          <div>
            <div className="text-lg ">
              Date : {data?.createdAt.toLocaleString()}
            </div>
            <div className="text-lg ">Author : {data?.user.name}</div>
          </div>
        </p>
      </main>
    </Layout>
  );
};

export default PostDetails;
