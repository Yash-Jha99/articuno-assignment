import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ChangeEvent, useEffect, useState } from "react";
import Alert from "~/components/general/Alert";
import { getServerAuthSession } from "~/server/auth";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [toast, setToast] = useState<string>("");
  const { error: signinError } = router.query;
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError({ email: "", password: "" });
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  useEffect(() => {
    if (signinError) {
      if (signinError === "CredentialsSignin")
        setToast("Please Check your credentials");
      else if (signinError === "invalidUser")
        setToast("User doesnot exists, Please signup first");
    }
  }, [router.isReady, signinError]);

  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="flex h-screen items-center justify-center bg-slate-100 bg-gradient-to-b from-[#2e026d] to-[#15162c] bg-cover p-2 dark:text-white">
        <div className="w-full min-w-max max-w-md ">
          <div className="rounded-xl bg-white bg-white/10 p-8 ">
            <div className="mb-4 text-2xl font-bold">Sign In</div>
            <div className="mb-3">
              <label
                className={`${
                  error.email
                    ? "text-red-500 dark:text-red-500"
                    : "text-gray-700 dark:text-white"
                } text-md  mb-1 block font-semibold`}
                htmlFor="email"
              >
                Email*
              </label>
              <input
                value={email}
                name="email"
                className={` mb-1 w-full appearance-none rounded border bg-transparent px-3 py-2 text-lg leading-tight  text-gray-700 focus:outline-blue-500 dark:text-white dark:focus:outline-blue-500 ${
                  error.email && "border-red-500"
                }`}
                id="email"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className={`${
                  error.password
                    ? "text-red-500 dark:text-red-500"
                    : "text-gray-700 dark:text-white"
                } text-md  mb-1 block font-semibold`}
                htmlFor="email"
              >
                Password*
              </label>
              <input
                value={password}
                name="password"
                className={` mb-1 w-full appearance-none rounded border bg-transparent px-3 py-2 text-lg leading-tight text-gray-700 focus:outline-blue-500 dark:text-white dark:focus:outline-blue-500 ${
                  error.password && "border-red-500"
                }`}
                id="password"
                type="password"
                onChange={handleChange}
              />
              <p id="error" className="mt-2 text-sm capitalize text-red-500">
                {error.email || error.password}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 "
                type="submit"
              >
                Sign In
              </button>
              <div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700 dark:text-white">
                    Don&apos;t have an account
                  </p>
                  <Link
                    className="ml-1.5 inline-block align-baseline text-sm font-medium text-green-500 "
                    href="/auth/signup"
                  >
                    Sign Up
                  </Link>
                  {toast && <Alert severity="error">{toast}</Alert>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });
  if (!session?.user) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  }
  const { res } = context;
  res.setHeader("location", "/");
  res.statusCode = 302;
  res.end();
}
