import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyTokenJose } from "./db/helpers/jwt";

export async function middleware(req: NextRequest) {
  if (req.url.includes("/wishlist")) {
    const authCookie = cookies().get("Authorization");

    if (!authCookie) {
      return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
    }

    const [type, token] = authCookie.value.split(" ");

    if (type !== "Bearer") {
      return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
    }

    const decoded = await verifyTokenJose<{ _id: string; username: string; iat: number }>(token);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-name", decoded.username);
    requestHeaders.set("x-user-id", decoded._id);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/wishlist", "/api/:path*"],
};
