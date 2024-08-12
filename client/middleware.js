import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const user = request.cookies.get("user");

  const response = NextResponse.next();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
};

// See "Matching Paths" below
export const config = {
  matcher: ["/((?!login|signup|api|_next|static|favicon.ico).*)"],
};
