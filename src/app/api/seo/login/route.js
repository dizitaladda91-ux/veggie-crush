import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSeoPortalCredentials } from "@/lib/blog-data";

export async function POST(request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const credentials = getSeoPortalCredentials();

  const isValid = username === credentials.username && password === credentials.password;

  if (!isValid) {
    return NextResponse.redirect(new URL("/seo-admin?error=invalid", request.url));
  }

  const cookieStore = await cookies();
  cookieStore.set("seo_portal_auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.redirect(new URL("/seo-admin", request.url));
}
