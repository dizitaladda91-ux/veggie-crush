import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getBlogPosts, upsertBlogPost } from "@/lib/blog-data";

export async function GET() {
  const posts = await getBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("seo_portal_auth");

  if (authCookie?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const payload = {
    id: body.id || Date.now().toString(),
    title: body.title,
    excerpt: body.excerpt,
    category: body.category,
    readTime: body.readTime,
    date: body.date,
    author: body.author,
    emoji: body.emoji,
    accent: body.accent,
    featured: Boolean(body.featured),
    content: body.content,
    slug: body.slug,
    seoTitle: body.seoTitle,
    seoDescription: body.seoDescription,
    focusKeyword: body.focusKeyword,
    tags: body.tags,
  };

  if (!payload.title || !payload.content) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  const post = await upsertBlogPost(payload);
  return NextResponse.json({ success: true, post });
}
