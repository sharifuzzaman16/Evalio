
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
  
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
   
        if (req.nextUrl.pathname.startsWith("/assignments/create")) {
          return token?.role === "instructor";
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/assignments/create",
  ],
};