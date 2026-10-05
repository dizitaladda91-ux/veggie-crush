import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";
import { updateSession } from "@/lib/supabase/middleware";

const PROTECTED_API_PREFIXES = ["/api/orders", "/api/user/addresses"];

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Enforce JWT authentication on protected backend routes
  const isProtectedApi = PROTECTED_API_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtectedApi) {
    let token = request.cookies.get("token")?.value;
    const authHeader = request.headers.get("authorization");
    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    const payload = await verifyJWT(token);

    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: "Unauthorized: Valid JWT authentication token required." },
        { status: 401 }
      );
    }

    // Attach decoded user info into request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-email", payload.email || "");
    requestHeaders.set("x-user-role", payload.role || "CUSTOMER");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
