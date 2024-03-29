import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log(JSON.stringify(req, null, 2));

    if (
      req.nextUrl.pathname.startsWith("/CreateUser") &&
      req?.nextauth?.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/CreateUser"] };
