import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: sessionData, status } = useSession();
  return (
    <nav className="dark:[#2e026d] fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-[#2e026d] dark:border-gray-600">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Articuno
        </span>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-[#2e026d] p-1 font-medium dark:border-gray-700 md:mt-0 md:flex-row md:space-x-8 md:border-0">
            <li>
              <Link
                href="/"
                className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-2xl text-white md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {sessionData && status === "authenticated" ? (
              <>
                <li>
                  <Link
                    href="/post"
                    className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-2xl text-white md:bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    My Posts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-2xl text-white md:bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    {sessionData.user.name}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => void signOut()}
                    className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-2xl text-white md:bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/auth/signin"
                  className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-2xl text-white md:bg-transparent md:p-0 "
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
