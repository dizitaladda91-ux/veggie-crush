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

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Provide blog post details." }, { status: 400 });
  }

  const schemas = body.schemas ?? [];
  if (!Array.isArray(schemas)) {
    return NextResponse.json({ error: "Structured data schemas must be a list." }, { status: 400 });
  }
  for (const schema of schemas) {
    if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
      return NextResponse.json({ error: "Each structured data schema must be a JSON object." }, { status: 400 });
    }
  }

  const toList = (value) => {
    if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
    if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
    return [];
  };

  const payload = {
    id: body.id || Date.now().toString(),
    title: typeof body.title === "string" ? body.title : "",
    excerpt: typeof body.excerpt === "string" ? body.excerpt : body.seoDescription,
    category: typeof body.category === "string" ? body.category : "",
    readTime: typeof body.readTime === "string" ? body.readTime : "",
    date: typeof body.date === "string" ? body.date : "",
    author: typeof body.publisher === "string" ? body.publisher : body.author,
    publisher: typeof body.publisher === "string" ? body.publisher : body.author,
    emoji: typeof body.emoji === "string" ? body.emoji : "",
    accent: typeof body.accent === "string" ? body.accent : "",
    coverImg: typeof body.coverImg === "string" ? body.coverImg : "",
    ogImage: typeof body.ogImage === "string" ? body.ogImage : "",
    featured: Boolean(body.featured),
    content: typeof body.content === "string" ? body.content : "",
    slug: typeof body.slug === "string" ? body.slug : "",
    seoTitle: typeof body.metaTitle === "string" ? body.metaTitle : body.seoTitle,
    seoDescription: typeof body.metaDescription === "string" ? body.metaDescription : body.seoDescription,
    focusKeyword: typeof body.focusKeyword === "string" ? body.focusKeyword : toList(body.keywords)[0],
    tags: toList(body.tags),
    keywords: toList(body.keywords),
    schemas,
  };

  if (!payload.title.trim() || !payload.content.trim()) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }
  if (payload.title.length > 200 || payload.slug.length > 100) {
    return NextResponse.json({ error: "Title must be 200 characters or fewer and slug must be 100 characters or fewer." }, { status: 400 });
  }
  if (typeof payload.seoTitle === "string" && payload.seoTitle.length > 60) {
    return NextResponse.json({ error: "Meta title must be 60 characters or fewer." }, { status: 400 });
  }
  if (typeof payload.seoDescription === "string" && payload.seoDescription.length > 160) {
    return NextResponse.json({ error: "Meta description must be 160 characters or fewer." }, { status: 400 });
  }
  if (payload.coverImg && !isHttpUrl(payload.coverImg)) {
    return NextResponse.json({ error: "Cover image must be a valid HTTP or HTTPS URL." }, { status: 400 });
  }
  if (payload.ogImage && !isHttpUrl(payload.ogImage)) {
    return NextResponse.json({ error: "Social image must be a valid HTTP or HTTPS URL." }, { status: 400 });
  }

  const post = await upsertBlogPost(payload);
  return NextResponse.json({ success: true, post });
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
