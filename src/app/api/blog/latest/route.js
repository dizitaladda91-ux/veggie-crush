import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog-data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") || "4");
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, Number.isFinite(limit) && limit > 0 ? limit : 4);

  return NextResponse.json({ posts: latestPosts });
}
