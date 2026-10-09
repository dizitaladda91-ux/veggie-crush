import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, BookOpen, Sparkles } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "VeggieCrush Journal | Blog",
  description: "Read seasonal farm insights, recipes, and organic nutrition stories from VeggieCrush.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((post) => post.featured) || posts[0];
  const listPosts = posts.filter((post) => post.id !== featured?.id);

  return (
    <main className="min-h-screen bg-white px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4620] transition-opacity hover:opacity-75">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FAE3E]">The VeggieCrush Journal</span>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1E4620] sm:text-4xl lg:text-5xl">
            Fresh Reads & Farm Insights
          </h1>
          <p className="mt-3 text-sm text-[#5C705D] sm:text-base">
            Agricultural science, seasonal cooking guides, and holistic nutrition written by our agronomists and chefs.
          </p>
        </div>

        <div className="mb-10 rounded-[28px] border border-[#E4EDE0] bg-[#F9FBF8] p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {Array.from(new Set(posts.map((post) => post.category))).map((category) => (
              <span key={category} className="rounded-full border border-[#DCE9D6] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E4620]">
                {category}
              </span>
            ))}
          </div>
        </div>

        {featured && (
          <Link href={`/blog/${featured.id}`} className="group mb-12 block">
            <article className="relative overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-[#F9FAFB] p-8 transition-all hover:shadow-xl sm:p-12">
              <span className="pointer-events-none absolute -bottom-6 -right-4 text-[10rem] opacity-20 select-none">{featured.emoji}</span>
              <div className="relative z-10 max-w-2xl">
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-[#1E4620] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#5C705D]">
                    <Clock size={12} />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="text-2xl font-black leading-tight text-[#1E4620] sm:text-4xl">
                  {featured.title}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#4B5443] sm:text-base">
                  {featured.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#5C705D]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#1E4620]">
                    <BookOpen size={12} />
                    {featured.author}
                  </span>
                  <span>•</span>
                  <span>{featured.date}</span>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E4620]">
                  Read article
                  <ArrowUpRight size={12} />
                </div>
              </div>
            </article>
          </Link>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block">
              <article className="h-full rounded-[28px] border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: post.accent || "#1E4620" }}>
                    {post.category}
                  </span>
                  <span className="text-2xl" aria-label="Blog category icon">{post.emoji || "🌿"}</span>
                </div>

                <h3 className="text-xl font-black leading-snug text-[#1E4620]">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5443]">{post.excerpt}</p>

                <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB] pt-4 text-[11px] text-[#5C705D]">
                  <span>{post.author}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E4620]">
                  Read story
                  <ArrowUpRight size={12} />
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] border border-[#E4EDE0] bg-[#F9FBF8] p-6 sm:p-8">
          <div className="flex items-center gap-2 text-[#1E4620]">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Fresh thinking</span>
          </div>
          <h3 className="mt-3 text-2xl font-black text-[#1E4620]">Want to publish a new SEO story?</h3>
          <Link href="/seo-admin" className="mt-4 inline-flex items-center rounded-full bg-[#1E4620] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#234a23]">
            Open SEO portal
          </Link>
        </div>
      </div>
    </main>
  );
}
