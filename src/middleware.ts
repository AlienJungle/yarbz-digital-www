import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const authedUrlBase = ["/tutoring/dashboard"];
  const url = new URL(request.url);

  if (!request.cookies.get("session")) {
    const loginRedirect = authedUrlBase.some((x) => request.nextUrl.pathname.startsWith(x));
    if (loginRedirect) {
      return NextResponse.redirect(`${url.origin}/tutoring/login?redirect=${request.nextUrl.pathname}`, {
        headers: requestHeaders,
      });
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
