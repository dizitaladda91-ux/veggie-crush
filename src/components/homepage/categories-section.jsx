"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Leaf } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? CATEGORIES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === CATEGORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-16 sm:py-20 px-6 lg:px-12 border-b border-[#E6EFE3]" style={{ backgroundColor: "#F7FAF5" }}>
      <div className="max-w-[1440px] mx-auto">
        
        {/* Wix-style Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#EAF3E7", color: "#2E5D31" }}>
              <Leaf size={12} className="text-[#5C8E42]" />
              <span>DISCOVER VEGGIECRUSH</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: "#173719" }}
            >
              Shop by Category
            </h2>
            <p className="text-sm text-[#556F59] mt-2 max-w-md">
              Browse our freshly cultivated harvests categorized by botanical family and nutrition profile.
            </p>
          </div>

          {/* Wix-style Next / Previous Carousel Controls & Counter */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-[#556F59] tracking-wider">
              01 / 0{CATEGORIES.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Category"
                className="w-10 h-10 rounded-full border border-[#CBDDC5] bg-white flex items-center justify-center text-[#1E4620] hover:bg-[#1E4620] hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Category"
                className="w-10 h-10 rounded-full border border-[#CBDDC5] bg-white flex items-center justify-center text-[#1E4620] hover:bg-[#1E4620] hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid (Clean Wix-style Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <Link
                href={cat.href}
                className="group relative flex flex-col h-full rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E2ECE0",
                }}
              >
                {/* Image Container with Wix Category Number Badge */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F2F7F0]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Wix style "01", "02" number badge */}
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#1E4620] shadow-sm border border-[#E2ECE0]">
                    {cat.number}
                  </div>

                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm grid place-items-center transition-all group-hover:bg-[#1E4620] group-hover:text-white shadow-sm text-[#1E4620]">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Content details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#173719] group-hover:text-[#5C8E42] transition-colors leading-snug mb-1.5">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#5D7361] line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EDF3EB] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#79947D]">
                      {cat.itemCount}
                    </span>
                    <span className="text-xs font-bold text-[#1E4620] group-hover:underline">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
