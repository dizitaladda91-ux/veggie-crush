import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "blog-posts.json");

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function ensureFile() {
  const directory = path.dirname(dataFilePath);
  await fs.mkdir(directory, { recursive: true });
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, "[]");
  }
}

export async function getBlogPosts() {
  await ensureFile();
  const raw = await fs.readFile(dataFilePath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("Blog posts data must be a JSON array.");
  }
  return parsed;
}

export async function saveBlogPosts(posts) {
  await ensureFile();
  await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2));
  return posts;
}

export async function getBlogPostById(identifier) {
  const posts = await getBlogPosts();
  return posts.find((post) => String(post.id) === String(identifier) || String(post.slug) === String(identifier)) || null;
}

export async function upsertBlogPost(input) {
  const posts = await getBlogPosts();
  const payload = {
    id: input.id ? String(input.id) : String(Date.now()),
    slug: input.slug || slugify(input.title),
    title: input.title?.trim(),
    excerpt: input.excerpt?.trim() || "",
    category: input.category?.trim() || "General",
    readTime: input.readTime?.trim() || "4 min read",
    date: input.date?.trim() || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    author: input.author?.trim() || "VeggieCrush Editorial Team",
    publisher: input.publisher?.trim() || input.author?.trim() || "VeggieCrush",
    emoji: input.emoji?.trim() || "🌿",
    accent: input.accent?.trim() || "#1E4620",
    coverImg: input.coverImg?.trim() || "",
    ogImage: input.ogImage?.trim() || input.coverImg?.trim() || "",
    featured: Boolean(input.featured),
    content: input.content?.trim() || "",
    seoTitle: input.seoTitle?.trim() || input.title?.trim(),
    seoDescription: input.seoDescription?.trim() || input.excerpt?.trim(),
    focusKeyword: input.focusKeyword?.trim() || "veggiecrush",
    tags: Array.isArray(input.tags) ? input.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
    keywords: Array.isArray(input.keywords) && input.keywords.length
      ? input.keywords.map((keyword) => String(keyword).trim()).filter(Boolean)
      : Array.isArray(input.tags) ? input.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
    schemas: Array.isArray(input.schemas) ? input.schemas : [],
  };

  if (payload.featured) {
    for (const post of posts) {
      if (String(post.id) !== payload.id) post.featured = false;
    }
  }

  const existingIndex = posts.findIndex((post) => String(post.id) === String(payload.id));

  if (existingIndex >= 0) {
    posts[existingIndex] = { ...posts[existingIndex], ...payload };
  } else {
    posts.unshift(payload);
  }

  await saveBlogPosts(posts);
  return payload;
}

export function getSeoPortalCredentials() {
  return {
    username: process.env.SEO_PORTAL_USERNAME || process.env.ADMIN_EMAIL || "veggiecrushseo",
    password: process.env.SEO_PORTAL_PASSWORD || process.env.ADMIN_PASSWORD || "veggiecrushseo@2026",
  };
}
