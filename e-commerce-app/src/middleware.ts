import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
export function middleware(req: NextRequest) {
  console.log("masuk middleware");
  if (req.url.includes("/wishlist")) {
    const auth = cookies().get("Authorization");
    
    auth
    
    if (!auth) {
      return NextResponse.json(
        {
          message: "Authentication failed",
        },
        {
          status: 401,
        }
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
  matcher: "/api/:path*",
};
