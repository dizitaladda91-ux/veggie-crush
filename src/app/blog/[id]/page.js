import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { getBlogPostById } from "@/lib/blog-data";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    return {};
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags?.length ? post.tags.join(", ") : post.focusKeyword,
  };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4620] transition-opacity hover:opacity-75">
          <ArrowLeft size={14} />
          <span>Back to Journal</span>
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-[#1E4620] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#6B7280]">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-black leading-tight text-[#1E4620] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#E5E7EB] pt-4 text-xs text-[#6B7280]">
            <span className="font-semibold text-[#1E4620]">{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>

        <div className="mb-10 flex min-h-[220px] items-center justify-center rounded-[28px] border border-[#E5E7EB] bg-[#F9FAFB] p-10">
          <span className="text-8xl select-none">{post.emoji || "🌿"}</span>
        </div>

        <article className="mb-16 space-y-6 text-sm leading-8 text-[#374151] sm:text-base">
          <div className="rounded-2xl border border-[#DCFCE7] bg-[#F0FDF4] p-5 text-[#1E4620] italic">
            "{post.excerpt}"
          </div>

          <div className="whitespace-pre-line text-[#4B5443]">
            {post.content}
          </div>
        </article>

        <div className="mb-16 rounded-[28px] bg-[#1E4620] p-8 text-white sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-black">Ready for fresh, farm-based nutrition?</h3>
              <p className="mt-2 text-sm text-[#D7E8BD]">
                Shop 100% organic roots, greens, and wellness herbs delivered directly from farm to your door.
              </p>
            </div>

            <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#1E4620] transition hover:bg-[#EAF4DA]">
              <span>Explore Farm Store</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
