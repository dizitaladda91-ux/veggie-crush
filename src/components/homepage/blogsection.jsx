"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Leaf } from "lucide-react";

const FALLBACK_POSTS = [
  {
    id: "1",
    title: "5 Seasonal Vegetables You Should Be Eating This Month",
    excerpt: "Eating with the seasons means better flavour, better prices, and better nutrition. Here's what's at its peak right now.",
    category: "Seasonal Guide",
    readTime: "6 min read",
    date: "Aug 3, 2026",
    emoji: "🥕",
    accent: "#6FAE3E",
  },
  {
    id: "2",
    title: "How We Keep Vegetables Fresh From Farm to Door",
    excerpt: "A look inside our cold-chain logistics.",
    category: "Behind the Scenes",
    readTime: "4 min read",
    date: "Jul 28, 2026",
    emoji: "🚚",
    accent: "#D9483A",
  },
  {
    id: "3",
    title: "3 Simple Recipes for Weeknight Dinners",
    excerpt: "Quick, veggie-forward meals for busy people.",
    category: "Recipes",
    readTime: "5 min read",
    date: "Jul 20, 2026",
    emoji: "🍲",
    accent: "#E3A72E",
  },
  {
    id: "4",
    title: "Why We Went 100% Pesticide-Free",
    excerpt: "The story behind our organic certification.",
    category: "Our Story",
    readTime: "7 min read",
    date: "Jul 12, 2026",
    emoji: "🌱",
    accent: "#3F7A56",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function FeaturedCard({ post }) {
  return (
    <motion.a
      href={`/blog/${post.id}`}
      variants={fadeUp}
      whileHover="hover"
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border p-6 sm:p-8 min-h-[420px] lg:min-h-full"
      style={{ backgroundColor: "#F0E8D6", borderColor: "#E7DCC2" }}
    >
      <motion.div
        variants={{ hover: { scale: 1.08, rotate: 4 } }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="absolute -right-6 -top-6 text-[10rem] leading-none opacity-90 select-none"
      >
        {post.emoji}
      </motion.div>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(180deg, transparent 30%, ${post.accent}22 100%)` }}
      />

      <div className="relative z-10">
        <span
          className="inline-block text-[11px] font-bold px-3 py-1 rounded-full text-white mb-4"
          style={{ backgroundColor: post.accent }}
        >
          {post.category}
        </span>
        <h3
          style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3 max-w-lg"
        >
          {post.title}
        </h3>
        <p className="text-sm max-w-md mb-5" style={{ color: "#4B5443" }}>
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs font-medium" style={{ color: "#8B8064" }}>
          <span>{post.date}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>
      </div>

      <motion.span
        variants={{ hover: { x: 4, y: -4 } }}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 rounded-full grid place-items-center z-10"
        style={{ backgroundColor: "#1E4620" }}
      >
        <ArrowUpRight size={18} color="#ffffff" />
      </motion.span>
    </motion.a>
  );
}

function CompactCard({ post }) {
  return (
    <motion.a
      href={`/blog/${post.id}`}
      variants={fadeUp}
      whileHover="hover"
      className="group flex gap-4 rounded-2xl border p-3 sm:p-4"
      style={{ backgroundColor: "#FBF7EC", borderColor: "#E7DCC2" }}
    >
      <motion.div
        variants={{ hover: { scale: 1.08 } }}
        transition={{ type: "spring", stiffness: 250, damping: 16 }}
        className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl grid place-items-center overflow-hidden"
        style={{ backgroundColor: "#F0E8D6" }}
      >
        <span className="text-4xl">{post.emoji}</span>
        <Leaf
          size={60}
          color={post.accent}
          strokeWidth={0.6}
          className="absolute -right-3 -bottom-3 opacity-15"
        />
      </motion.div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <span className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: post.accent }}>
          {post.category}
        </span>
        <h4
          className="text-sm font-bold leading-snug mb-1 line-clamp-2 group-hover:underline"
          style={{ color: "#1E4620" }}
        >
          {post.title}
        </h4>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: "#8B8064" }}>
          <span>{post.date}</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {post.readTime}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function CardSkeleton({ tall }) {
  return (
    <div
      className={`rounded-3xl border overflow-hidden relative ${tall ? "min-h-[420px]" : "h-24"}`}
      style={{ backgroundColor: "#F0E8D6", borderColor: "#E7DCC2" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, transparent, #FBF7EC66, transparent)" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        const res = await fetch("/api/blog/latest?limit=4");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        if (!cancelled) setPosts(data.posts);
      } catch (err) {
        if (!cancelled) setPosts(FALLBACK_POSTS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const [featured, ...rest] = posts;

  return (
    <section style={{ backgroundColor: "#FBF7EC" }} className="w-full px-6 lg:px-10 py-16">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.25em] mb-2" style={{ color: "#6FAE3E" }}>
              FROM THE JOURNAL
            </p>
            <h2
              style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
              className="text-3xl lg:text-4xl font-extrabold"
            >
              Fresh Reads
            </h2>
            <motion.div
              className="h-1 rounded-full mt-3"
              style={{ backgroundColor: "#6FAE3E" }}
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          <motion.a
            href="/blog"
            whileHover={{ x: 4 }}
            className="text-sm font-semibold hidden sm:block"
            style={{ color: "#1E4620" }}
          >
            View All →
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid lg:grid-cols-5 gap-5"
        >
          <div className="lg:col-span-3">
            {loading ? <CardSkeleton tall /> : featured && <FeaturedCard post={featured} />}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
              : rest.map((post) => <CompactCard key={post.id} post={post} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}