import { useSession } from "next-auth/react";
import Layout from "~/components/Layout";

const Profile = () => {
  const { data: sessionData, status } = useSession();
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {status === "authenticated" && (
          <p className="flex flex-col gap-12 text-center text-white">
            <div className="text-6xl">{sessionData?.user?.name}</div>
            <div className="text-4xl">{sessionData?.user?.email}</div>
          </p>
        )}
      </main>
    </Layout>
  );
};

export default Profile;
