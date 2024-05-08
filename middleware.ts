import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export function middleware(req: NextRequest) {
  // Parse the cookies from the request headers
  const cookieStore = cookies();

  // Get the value of the "access_token" cookie
  const isLoggedIn = cookieStore.get("isLoggedIn");

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/backend/:path*",
};
