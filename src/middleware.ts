import { withAuth } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside

export default withAuth(
  function middleware() {
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
  }
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/post/:path*"],
};
