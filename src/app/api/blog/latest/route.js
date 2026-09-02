import { NextResponse } from "next/server";

const posts = [
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") || "4");

  const latestPosts = posts.slice(0, Number.isFinite(limit) && limit > 0 ? limit : 4);

  return NextResponse.json({ posts: latestPosts });
}
