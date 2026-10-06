import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, ShoppingCart } from "lucide-react";
import { BLOG_POSTS } from "../page";

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Journal</span>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full text-white bg-[#1E4620]">
              {post.category}
            </span>
            <span className="text-xs text-[#6B7280] font-medium flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
            style={{ color: "#1E4620" }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
            <span className="font-semibold text-[#1E4620]">{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Hero Emoji / Decorative Banner */}
        <div className="rounded-3xl border p-12 mb-10 flex items-center justify-center bg-[#F9FAFB] border-[#E5E7EB]">
          <span className="text-8xl select-none">{post.emoji}</span>
        </div>

        {/* Article Body */}
        <article className="prose max-w-none text-[#374151] leading-relaxed mb-16 space-y-6 text-sm sm:text-base">
          <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#1E4620] font-medium italic">
            &ldquo;{post.excerpt}&rdquo;
          </div>

          <div className="whitespace-pre-line text-[#4B5443] leading-8 font-normal">
            {post.content}
          </div>
        </article>

        {/* Call to action box */}
        <div className="rounded-3xl border p-8 sm:p-10 mb-16 bg-[#1E4620] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">
              Ready for Pure Farm Nutrition?
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E8BD] mt-1">
              Shop 100% organic roots, superleaves, and greens delivered fresh to your door in 12 hours.
            </p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 rounded-full text-xs font-bold text-[#1E4620] bg-white hover:bg-[#EAF4DA] transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Explore Farm Store</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
