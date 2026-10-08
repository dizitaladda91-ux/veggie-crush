"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";

const CATEGORIES = [
  {
    number: "01",
    title: "Leafy Greens & Microgreens",
    description: "Farm-fresh spinach, methi, kale, coriander & nutrient-rich hydroponic microgreens.",
    image: "/categories/leafy-greens.jpg",
    href: "/products?category=leafy-greens",
    itemCount: "14 Varieties",
  },
  {
    number: "02",
    title: "Root Veggies & Gourds",
    description: "Crisp beetroot, sweet red carrots, baby potatoes, fresh lauki & country gourds.",
    image: "/categories/root-vegetables.jpg",
    href: "/products?category=root-vegetables",
    itemCount: "18 Varieties",
  },
  {
    number: "03",
    title: "Vedic Wellness Powders",
    description: "Sun-dried moringa, giloy extract, whole amla, turmeric & pure vitality herbs.",
    image: "/categories/herbs-superfoods.jpg",
    href: "/products?category=wellness",
    itemCount: "12 Powders",
  },
  {
    number: "04",
    title: "Seasonal Gourds & Squash",
    description: "Tender bitter gourd, ridge gourd, ash gourd & zucchini grown with natural bio-fertilizers.",
    image: "/categories/gourds-squash.jpg",
    href: "/products?category=gourds",
    itemCount: "9 Varieties",
  },
  {
    number: "05",
    title: "Farm Subscription Boxes",
    description: "Hand-curated weekly family boxes packed with dawn-picked produce & seasonal greens.",
    image: "/products/beetroot_1.webp",
    href: "/farm-boxes",
    itemCount: "3 Curated Plans",
  },
];

export default function CategoriesSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-6 lg:px-12 border-b border-[#E6EFE3]" style={{ backgroundColor: "#F7FAF5" }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#EAF3E7", color: "#2E5D31" }}>
              <Leaf size={12} className="text-[#5C8E42]" />
              <span>DISCOVER VEGGIECRUSH</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ color: "#173719" }}
            >
              Shop by Category
            </h2>
            <p className="text-base text-[#556F59] mt-4 max-w-md leading-relaxed">
              Browse our freshly cultivated harvests categorized by botanical family and nutrition profile.
            </p>
          <div className="mt-8 flex items-center gap-3 text-xs font-semibold tracking-wider text-[#556F59]">
            <span className="h-px w-10 bg-[#AFC6A7]" />
            <span>{String(CATEGORIES.length).padStart(2, "0")} FRESH COLLECTIONS</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:sticky"
              style={{
                top: `calc(7rem + ${idx * 14}px)`,
                zIndex: idx + 1,
              }}
            >
              <Link
                href={cat.href}
                className="group relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E2ECE0",
                }}
              >
                <div className="relative h-56 sm:h-64 lg:h-[280px] w-full overflow-hidden bg-[#F2F7F0]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102D16]/75 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-[#1E4620] shadow-sm border border-[#E2ECE0]">
                    {cat.number}
                  </div>
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm grid place-items-center transition-all group-hover:bg-[#1E4620] group-hover:text-white shadow-sm text-[#1E4620]">
                    <ArrowUpRight size={18} />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-6 sm:left-6">
                    <span className="text-xs font-semibold tracking-wider text-white/80">
                      {cat.itemCount}
                    </span>
                    <h3 className="mt-1.5 text-xl sm:text-2xl font-bold leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-4 sm:px-6 sm:py-4">
                  <p className="max-w-xl text-xs sm:text-sm text-[#5D7361] leading-relaxed">
                    {cat.description}
                  </p>
                  <span className="shrink-0 text-sm font-bold text-[#1E4620] group-hover:underline">
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
