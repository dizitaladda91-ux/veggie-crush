"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { uploadSignedImage } from "@/lib/cloudinary-upload";

const emptyForm = {
  title: "",
  slug: "",
  metaTitle: "",
  metaDescription: "",
  publisher: "VeggieCrush",
  category: "",
  tags: "",
  keywords: "",
  coverImg: "",
  ogImage: "",
  excerpt: "",
  readTime: "4 min read",
  emoji: "🌿",
  accent: "#1E4620",
  content: "",
  featured: false,
  schemas: [],
};

const inputClass = "w-full rounded-2xl border border-[#DCE6D1] bg-[#F8FAF5] px-4 py-3 text-sm outline-none focus:border-[#6FAE3E]";
const helpClass = "mt-1 block text-xs leading-relaxed text-[#6B7D69]";

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseCommaSeparated(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export default function SeoAdminClient({ authenticated, initialPosts }) {
  const [isLoggedIn, setIsLoggedIn] = useState(authenticated);
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [posts, setPosts] = useState(initialPosts || []);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories = useMemo(
    () => ["Seasonal Guide", "Behind the Scenes", "Recipes", "Our Story", "Growth Tips"],
    []
  );

  const setField = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "title" && !slugTouched ? { slug: slugify(value) } : {}),
    }));
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (name === "slug") setSlugTouched(true);
    setField(name, type === "checkbox" ? checked : value);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus("");
    setError("");
    try {
      const signatureResponse = await fetch("/api/seo/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: file.type, size: file.size }),
      });
      const signature = await signatureResponse.json();
      if (!signatureResponse.ok) {
        throw new Error(signature.error || "Could not authorize the image upload.");
      }

      const imageUrl = await uploadSignedImage(file, signature);
      setForm((current) => ({
        ...current,
        coverImg: imageUrl,
        ogImage: current.ogImage || imageUrl,
      }));
      setStatus("Cover image uploaded.");
    } catch (uploadError) {
      setError(uploadError.message || "Image upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    setError("");

    try {
      if (!form.title.trim() || !form.content.trim()) {
        throw new Error("Please add a title and article content.");
      }

      const schemas = form.schemas.filter((schema) => schema.trim()).map((schema, index) => {
        let parsed;
        try {
          parsed = JSON.parse(schema);
        } catch {
          throw new Error(`Schema ${index + 1} must contain valid JSON.`);
        }
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error(`Schema ${index + 1} must be a JSON object.`);
        }
        return parsed;
      });

      const payload = {
        ...form,
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        excerpt: form.excerpt.trim() || form.metaDescription.trim(),
        tags: parseCommaSeparated(form.tags),
        keywords: parseCommaSeparated(form.keywords),
        schemas,
      };

      const response = await fetch("/api/seo/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong while saving the blog post.");
      }

      setPosts((current) => [data.post, ...current.filter((post) => post.id !== data.post.id)]);
      setForm(emptyForm);
      setSlugTouched(false);
      setStatus("Blog post published successfully.");
    } catch (submitError) {
      setError(submitError.message || "Something went wrong while saving the blog post.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/seo/logout", { method: "POST" });
      if (!response.ok) throw new Error("Could not log out. Please try again.");
      setIsLoggedIn(false);
    } catch (logoutError) {
      setError(logoutError.message || "Could not log out. Please try again.");
    }
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
              <input id="username" name="username" type="text" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#1E4620]">Password</label>
              <input id="password" name="password" type="password" required className={inputClass} />
            </div>
            {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("error") === "invalid" && (
              <p className="text-sm font-medium text-[#C43D3D]">Invalid username or password.</p>
            )}
            <button type="submit" className="w-full rounded-2xl bg-[#1E4620] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#234a23]">
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
            <p className="mt-1 text-sm text-[#607462]">Create search-ready stories for the VeggieCrush journal.</p>
          </div>
          <button type="button" onClick={handleLogout} className="rounded-full border border-[#DADFCB] bg-white px-4 py-2 text-sm font-semibold text-[#1E4620]">
            Log out
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[30px] border border-[#E2ECD8] bg-white p-6 shadow-[0_18px_50px_rgba(30,70,32,0.04)] sm:p-8">
            <h2 className="mb-1 text-2xl font-black">Create a blog post</h2>
            <p className="mb-6 text-sm text-[#607462]">Add article details, images, SEO metadata, and structured data.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="space-y-5">
                <h3 className="border-b border-[#E6EDE1] pb-2 text-lg font-bold">Post details</h3>
                <div>
                  <label htmlFor="post-title" className="mb-2 block text-sm font-semibold">Title</label>
                  <input id="post-title" name="title" value={form.title} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="post-slug" className="mb-2 block text-sm font-semibold">URL slug</label>
                  <input id="post-slug" name="slug" value={form.slug} onChange={handleChange} placeholder="auto-generated-from-title" className={inputClass} />
                  <small className={helpClass}>Generated from the title; edit to override it.</small>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="post-category" className="mb-2 block text-sm font-semibold">Category</label>
                    <select id="post-category" name="category" value={form.category} onChange={handleChange} className={inputClass}>
                      <option value="">Select a category</option>
                      {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="post-publisher" className="mb-2 block text-sm font-semibold">Publisher / Author</label>
                    <input id="post-publisher" name="publisher" value={form.publisher} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="post-excerpt" className="mb-2 block text-sm font-semibold">Post summary</label>
                  <textarea id="post-excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} className={inputClass} />
                  <small className={helpClass}>Shown on blog cards. If empty, the meta description is used.</small>
                </div>
              </section>

              <section className="space-y-5">
                <h3 className="border-b border-[#E6EDE1] pb-2 text-lg font-bold">SEO metadata</h3>
                <div>
                  <label htmlFor="meta-title" className="mb-2 block text-sm font-semibold">Meta title</label>
                  <input id="meta-title" name="metaTitle" value={form.metaTitle} onChange={handleChange} maxLength={60} placeholder="50–60 characters recommended" className={inputClass} />
                  <small className={helpClass}>{form.metaTitle.length}/60 characters. Defaults to the post title.</small>
                </div>
                <div>
                  <label htmlFor="meta-description" className="mb-2 block text-sm font-semibold">Meta description</label>
                  <textarea id="meta-description" name="metaDescription" value={form.metaDescription} onChange={handleChange} maxLength={160} rows={3} placeholder="150–160 characters recommended" className={inputClass} />
                  <small className={helpClass}>{form.metaDescription.length}/160 characters. Used in search and social summaries.</small>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="post-tags" className="mb-2 block text-sm font-semibold">Tags</label>
                    <input id="post-tags" name="tags" value={form.tags} onChange={handleChange} placeholder="organic, recipes, nutrition" className={inputClass} />
                    <small className={helpClass}>Comma-separated.</small>
                  </div>
                  <div>
                    <label htmlFor="post-keywords" className="mb-2 block text-sm font-semibold">SEO keywords</label>
                    <input id="post-keywords" name="keywords" value={form.keywords} onChange={handleChange} placeholder="organic vegetables, farm fresh" className={inputClass} />
                    <small className={helpClass}>Comma-separated; defaults to your tags.</small>
                  </div>
                </div>
              </section>

              <section className="space-y-5">
                <h3 className="border-b border-[#E6EDE1] pb-2 text-lg font-bold">Images</h3>
                <div>
                  <label htmlFor="cover-image" className="mb-2 block text-sm font-semibold">Cover image URL</label>
                  <input id="cover-image" name="coverImg" type="url" value={form.coverImg} onChange={handleChange} placeholder="https://" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="post-image-upload" className="mb-2 block text-sm font-semibold">Or upload a cover image</label>
                  <input id="post-image-upload" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#EAF4DB] file:px-4 file:py-2 file:font-semibold file:text-[#1E4620]" />
                  <small className={helpClass}>{uploading ? "Uploading image…" : "JPEG, PNG, or WebP; up to 50 MB. Images are securely uploaded to VeggieCrush Cloudinary."}</small>
                </div>
                <div>
                  <label htmlFor="og-image" className="mb-2 block text-sm font-semibold">Social sharing image URL</label>
                  <input id="og-image" name="ogImage" type="url" value={form.ogImage} onChange={handleChange} placeholder="Leave blank to use the cover image" className={inputClass} />
                  <small className={helpClass}>Used in Open Graph previews. Uploading a cover image fills this automatically if blank.</small>
                </div>
                {form.coverImg && (
                  <div className="overflow-hidden rounded-2xl border border-[#E2ECD8]">
                    <div role="img" aria-label="Blog cover image preview" className="h-48 bg-cover bg-center" style={{ backgroundImage: `url("${form.coverImg.replaceAll('"', "%22")}")` }} />
                  </div>
                )}
              </section>

              <section className="space-y-5">
                <h3 className="border-b border-[#E6EDE1] pb-2 text-lg font-bold">Article content</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="post-read-time" className="mb-2 block text-sm font-semibold">Reading time</label>
                    <input id="post-read-time" name="readTime" value={form.readTime} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="post-emoji" className="mb-2 block text-sm font-semibold">Card emoji</label>
                    <input id="post-emoji" name="emoji" value={form.emoji} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="post-content" className="mb-2 block text-sm font-semibold">Content</label>
                  <textarea id="post-content" name="content" value={form.content} onChange={handleChange} rows={16} required placeholder={"Write your article here. Use blank lines to separate paragraphs.\n\nYou can include headings as plain text."} className={`${inputClass} leading-7`} />
                </div>
                <label className="flex items-center gap-3 text-sm font-semibold">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 accent-[#1E4620]" />
                  Feature this post on the journal page
                </label>
              </section>

              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6EDE1] pb-2">
                  <h3 className="text-lg font-bold">Structured data (JSON-LD)</h3>
                  <button type="button" onClick={() => setForm((current) => ({ ...current, schemas: [...current.schemas, ""] }))} className="rounded-full border border-[#DADFCB] px-4 py-2 text-sm font-semibold hover:bg-[#F6FAF3]">
                    + Add schema
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-[#6B7D69]">Optional. Add valid JSON objects such as BlogPosting or FAQPage; each will be included on the article page.</p>
                {form.schemas.map((schema, index) => (
                  <div key={index}>
                    <div className="mb-2 flex items-center justify-between">
                      <label htmlFor={`schema-${index}`} className="text-sm font-semibold">Schema {index + 1}</label>
                      <button type="button" onClick={() => setForm((current) => ({ ...current, schemas: current.schemas.filter((_, schemaIndex) => schemaIndex !== index) }))} className="text-xs font-semibold text-[#B63A3A]">Remove</button>
                    </div>
                    <textarea id={`schema-${index}`} value={schema} onChange={(event) => setForm((current) => ({ ...current, schemas: current.schemas.map((item, schemaIndex) => schemaIndex === index ? event.target.value : item) }))} rows={7} placeholder={'{"@context":"https://schema.org","@type":"BlogPosting"}'} className={`${inputClass} font-mono text-xs`} />
                  </div>
                ))}
              </section>

              {status && <p role="status" className="text-sm font-medium text-[#1E4620]">{status}</p>}
              {error && <p role="alert" className="text-sm font-medium text-[#C43D3D]">{error}</p>}
              <button type="submit" disabled={saving || uploading} className="rounded-full bg-[#1E4620] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#234a23] disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? "Publishing…" : "Publish blog post"}
              </button>
            </form>
          </section>

          <aside className="rounded-[30px] border border-[#E2ECD8] bg-white p-6 shadow-[0_18px_50px_rgba(30,70,32,0.04)]">
            <h2 className="mb-5 text-2xl font-black">Published posts</h2>
            {posts.length === 0 ? (
              <p className="rounded-2xl bg-[#F8FAF5] p-5 text-sm text-[#607462]">No posts published yet. Your first post will appear here.</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <article key={post.id} className="overflow-hidden rounded-2xl border border-[#E6EDE1] bg-[#F8FAF5]">
                    {post.coverImg && <div role="img" aria-label="" className="h-36 bg-cover bg-center" style={{ backgroundImage: `url("${post.coverImg.replaceAll('"', "%22")}")` }} />}
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        {!post.coverImg && <span className="text-lg" aria-label="Post emoji">{post.emoji || "🌿"}</span>}
                        <span className="rounded-full bg-[#EAF4DB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E4620]">{post.category || "General"}</span>
                      </div>
                      <h3 className="text-base font-black text-[#1E4620]">{post.title}</h3>
                      <p className="mt-2 text-sm text-[#4C6250]">{post.excerpt}</p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-[#617160]">
                        <span>{post.publisher || post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
