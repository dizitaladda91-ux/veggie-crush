"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Search, BookOpen, User, Tag } from "lucide-react";

export const BLOG_POSTS = [
  {
    id: "1",
    slug: "seasonal-vegetables-month",
    title: "5 Seasonal Vegetables You Should Be Eating This Month",
    excerpt: "Eating with the natural agricultural calendar yields better flavour, lower carbon footprints, and up to 300% more bioavailable vitamins.",
    category: "Seasonal Guide",
    readTime: "6 min read",
    date: "Aug 3, 2026",
    author: "Dr. Rajeshwar Rao, Agronomist",
    emoji: "🥕",
    accent: "#6FAE3E",
    featured: true,
    content: `
When you consume produce harvested in its natural season, plants develop full nutrient spectrums without artificial ripening gases or prolonged refrigeration. 

### Why Seasonal Eating Matters
1. **Higher Phytonutrient Density**: Studies demonstrate that spinach harvested in winter contains twice the Vitamin C levels of out-of-season summer spinach.
2. **Superior Flavor**: Cold-weather roots accumulate natural starches and sugars that convert into sweet, crisp flavours.
3. **Soil Regeneration**: Seasonal crop rotations preserve soil microbiomes and reduce nitrogen depletion.

### Top 5 Picks for This Month
- **Cold-Pressed Beetroot**: High in dietary nitrates to support cardiovascular endurance.
- **Tender Farm Fenugreek (Methi)**: Rich in soluble fiber for natural glucose moderation.
- **Young Drumstick Moringa**: Loaded with plant-based protein and over 46 natural antioxidants.
- **Sweet Farm Carrots**: Abundant in beta-carotene and essential carotenoids.
- **Fresh Country Giloy**: Renowned in classical Ayurveda for immune system modulation.
    `,
  },
  {
    id: "2",
    slug: "cold-chain-logistics",
    title: "How We Keep Vegetables Fresh From Farm to Door in 12 Hours",
    excerpt: "A deep dive into our solar-powered cold hubs, ozone water sanitization, and temperature-controlled doorstep delivery.",
    category: "Behind the Scenes",
    readTime: "4 min read",
    date: "Jul 28, 2026",
    author: "Pooja Varma, Logistics Lead",
    emoji: "🚚",
    accent: "#1E4620",
    featured: false,
    content: `
Traditional supermarket produce spends between 5 to 9 days in transit, losing up to 50% of vital vitamin reserves before reaching your kitchen. At VeggieCrush, we engineered a direct farm-to-kitchen pipeline.

### Our 12-Hour Journey
- **5:30 AM**: Harvesters hand-cut crops at lowest soil temperature.
- **8:00 AM**: Produce is rinsed with food-grade ozone-infused chilled water.
- **11:00 AM**: Hand-sorted and packed in breathable, eco-friendly cartons.
- **4:00 PM - 8:00 PM**: Reached to your kitchen via temperature-regulated electric vans.
    `,
  },
  {
    id: "3",
    slug: "weeknight-veggie-recipes",
    title: "3 Simple Nutrient-Packed Recipes for Weeknight Dinners",
    excerpt: "Quick, vegetable-forward meals that take less than 20 minutes to prepare, without sacrificing flavor or holistic wellness.",
    category: "Recipes",
    readTime: "5 min read",
    date: "Jul 20, 2026",
    author: "Chef Anita Deshmukh",
    emoji: "🍲",
    accent: "#6FAE3E",
    featured: false,
    content: `
Busy weekdays don't mean you need to compromise on real, wholesome nutrition. With farm-fresh produce that retains its natural moisture and snap, cooking times are cut in half.

### 1. Warm Moringa & Lentil Soup
Simmer yellow lentils with 1 tablespoon of Moringa superleaf powder, garlic, and cumin. Ready in 15 minutes.

### 2. Roasted Beetroot & Amla Bowl
Toss diced beetroot with crushed amla powder, olive oil, and rock salt. Roast for 18 minutes until caramelised.
    `,
  },
  {
    id: "4",
    slug: "why-pesticide-free",
    title: "Why We Went 100% Pesticide-Free & What That Means For Your Family",
    excerpt: "The story behind our third-party testing protocols, regenerative composting, and bio-friendly pest management.",
    category: "Our Story",
    readTime: "7 min read",
    date: "Jul 12, 2026",
    author: "Devendra Patel, Founder",
    emoji: "🌱",
    accent: "#1E4620",
    featured: false,
    content: `
Synthetic pesticides don't just stay on the peel; systemic chemicals penetrate deep into root systems and leaf capillaries. Washing produce at home only removes surface residue.

### Our Living Soil Philosophy
We rely exclusively on vermicompost, neem oil foliar sprays, beneficial predator insects, and companion planting (like marigolds alongside leafy greens) to naturally ward off pests without a single drop of neurotoxic synthetics.
    `,
  },
];

const CATEGORIES = ["All", "Seasonal Guide", "Behind the Scenes", "Recipes", "Our Story"];

export default function BlogIndexPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCat = selectedCat === "All" || post.category === selectedCat;
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const listPosts = filteredPosts.filter((p) => p.id !== featured?.id);

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
            The VeggieCrush Journal
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Fresh Reads & Farm Insights
          </h1>
          <p className="text-xs sm:text-sm mt-2 text-[#6B7280]">
            Agricultural science, seasonal cooking guides, and holistic Ayurvedic nutrition written by our agronomists and chefs.
          </p>
        </div>

        {/* Filter bar */}
        <div className="rounded-3xl border p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#F9FAFB] border-[#E5E7EB]">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-[#1E4620] text-white"
                    : "bg-white text-[#1E4620] border border-[#E5E7EB]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white border-[#E5E7EB] w-full md:w-64">
            <Search size={14} color="#7A8B6F" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs outline-none text-[#1E4620] w-full"
            />
          </div>
        </div>

        {/* Featured Post Card */}
        {featured && (
          <Link href={`/blog/${featured.id}`} className="block mb-12 group">
            <div className="rounded-3xl border p-8 sm:p-12 relative overflow-hidden bg-[#F9FAFB] border-[#E5E7EB] transition-all hover:shadow-lg">
              <span className="absolute -right-4 -bottom-6 text-[10rem] opacity-30 select-none pointer-events-none">
                {featured.emoji}
              </span>

              <div className="max-w-2xl relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full text-white bg-[#1E4620]">
                    {featured.category}
                  </span>
                  <span className="text-xs text-[#6B7280] font-medium flex items-center gap-1">
                    <Clock size={12} />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2 leading-tight group-hover:underline" style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}>
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#4B5443] mt-3 leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">
                    By {featured.author} • {featured.date}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#1E4620] text-white grid place-items-center transition-transform group-hover:scale-110">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid of Other Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {listPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block group">
              <div className="rounded-3xl border p-6 flex flex-col justify-between h-full bg-white border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] grid place-items-center text-3xl mb-4">
                    {post.emoji}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6FAE3E]">
                    {post.category}
                  </span>
                  <h3 className="text-base font-bold mt-1 leading-snug group-hover:underline" style={{ color: "#1E4620" }}>
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1 font-semibold text-[#1E4620]">
                    Read <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
