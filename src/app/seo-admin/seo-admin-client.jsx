"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const initialForm = {
  title: "",
  slug: "",
  category: "Seasonal Guide",
  excerpt: "",
  author: "VeggieCrush Editorial Team",
  readTime: "4 min read",
  emoji: "🌿",
  accent: "#1E4620",
  content: "",
  seoTitle: "",
  seoDescription: "",
  focusKeyword: "",
  tags: "",
};

export default function SeoAdminClient({ authenticated, initialPosts }) {
  const [isLoggedIn, setIsLoggedIn] = useState(authenticated);
  const [form, setForm] = useState(initialForm);
  const [posts, setPosts] = useState(initialPosts || []);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const categories = useMemo(
    () => ["Seasonal Guide", "Behind the Scenes", "Recipes", "Our Story", "Growth Tips"],
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Saving post...");
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const response = await fetch("/api/seo/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("");
      setError(data.error || "Something went wrong while saving the blog post.");
      return;
    }

    setPosts((current) => [data.post, ...current.filter((post) => post.id !== data.post.id)]);
    setForm(initialForm);
    setStatus("Blog post saved successfully.");
  };

  const handleLogout = async () => {
    await fetch("/api/seo/logout", { method: "POST" });
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#F4F8EF] px-6 py-16">
        <div className="mx-auto max-w-md rounded-[32px] border border-[#DDEAD8] bg-white p-8 shadow-[0_24px_80px_rgba(30,70,32,0.08)]">
          <div className="mb-8 text-center">
            <span className="inline-flex rounded-full bg-[#EAF4DB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1E4620]">
              SEO Portal
            </span>
            <h1 className="mt-4 text-3xl font-black text-[#1E4620]">VeggieCrush Blog CMS</h1>
          </div>

          <form action="/api/seo/login" method="POST" className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold text-[#1E4620]">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full rounded-2xl border border-[#D9E4D2] bg-[#F8FAF5] px-4 py-3 text-sm text-[#1E4620] outline-none transition focus:border-[#6FAE3E]"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#1E4620]">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-2xl border border-[#D9E4D2] bg-[#F8FAF5] px-4 py-3 text-sm text-[#1E4620] outline-none transition focus:border-[#6FAE3E]"
              />
            </div>

            {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("error") === "invalid" && (
              <p className="text-sm font-medium text-[#C43D3D]">Invalid username or password.</p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#1E4620] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#234a23]"
            >
              Log in to portal
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#607462]">
            Use credentials from the environment variables <span className="font-semibold">SEO_PORTAL_USERNAME</span> and <span className="font-semibold">SEO_PORTAL_PASSWORD</span>.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6FAF3] px-5 py-10 text-[#1E4620]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold text-[#1E4620] hover:opacity-80">← Back to site</Link>
            <h1 className="mt-2 text-3xl font-black">SEO Blog Portal</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-[#DADFCB] bg-white px-4 py-2 text-sm font-semibold text-[#1E4620]"
          >
            Log out
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[30px] border border-[#E2ECD8] bg-white p-6 shadow-[0_18px_50px_rgba(30,70,32,0.04)]">
            <h2 className="mb-6 text-2xl font-black">Create / update blog post</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Title</label>
                  <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Slug</label>
                  <input name="slug" value={form.slug} onChange={handleChange} placeholder="blog-slug" className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]">
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Author</label>
                  <input name="author" value={form.author} onChange={handleChange} className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Read time</label>
                  <input name="readTime" value={form.readTime} onChange={handleChange} className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Emoji</label>
                  <input name="emoji" value={form.emoji} onChange={handleChange} className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Accent color</label>
                  <input name="accent" type="color" value={form.accent} onChange={handleChange} className="h-[50px] w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-2 py-2 outline-none focus:border-[#6FAE3E]" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Excerpt</label>
                  <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Content</label>
                  <textarea name="content" value={form.content} onChange={handleChange} rows={10} required className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">SEO title</label>
                  <input name="seoTitle" value={form.seoTitle} onChange={handleChange} className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Focus keyword</label>
                  <input name="focusKeyword" value={form.focusKeyword} onChange={handleChange} className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">SEO description</label>
                  <textarea name="seoDescription" value={form.seoDescription} onChange={handleChange} rows={3} className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Tags (comma separated)</label>
                  <input name="tags" value={form.tags} onChange={handleChange} placeholder="organic, veggies, healthy" className="w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]" />
                </div>
              </div>

              {status && <p className="text-sm font-medium text-[#1E4620]">{status}</p>}
              {error && <p className="text-sm font-medium text-[#C43D3D]">{error}</p>}

              <button type="submit" className="rounded-full bg-[#1E4620] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#234a23]">
                Save blog post
              </button>
            </form>
          </section>

          <aside className="rounded-[30px] border border-[#E2ECD8] bg-white p-6 shadow-[0_18px_50px_rgba(30,70,32,0.04)]">
            <h2 className="mb-5 text-2xl font-black">Published posts</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="rounded-2xl border border-[#E6EDE1] bg-[#F8FAF5] p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-lg" aria-label="Post emoji">{post.emoji || "🌿"}</span>
                    <span className="rounded-full bg-[#EAF4DB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E4620]">
                      {post.category || "General"}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[#1E4620]">{post.title}</h3>
                  <p className="mt-2 text-sm text-[#4C6250]">{post.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#617160]">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
