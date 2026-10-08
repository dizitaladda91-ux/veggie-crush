"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Leafy Greens",
    subtitle: "Spinach, Methi, Mint & Superleaves",
    image: "/categories/leafy-greens.jpg",
    href: "/category",
  },
  {
    title: "Root Vegetables",
    subtitle: "Beetroot, Carrots, Sweet Potatoes & Ginger",
    image: "/categories/root-vegetables.jpg",
    href: "/category",
  },
  {
    title: "Herbs & Superfoods",
    subtitle: "Moringa, Giloy, Gooseberry & Vitality",
    image: "/categories/herbs-superfoods.jpg",
    href: "/category",
  },
  {
    title: "Gourds & Squash",
    subtitle: "Bottle Gourd, Ridge Gourd & Bitter Gourd",
    image: "/categories/gourds-squash.jpg",
    href: "/category",
  },
];

export default function CategoriesSection() {
  return (
    <section className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#6FAE3E" }}>
              Curated Collections
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black mt-1 tracking-tight"
              style={{ color: "#1E4620" }}
            >
              Shop By Health & Category
            </h2>
          </div>
          <Link
            href="/category"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-80"
            style={{ color: "#1E4620" }}
          >
            <span>View All Categories</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <Link
                href={cat.href}
                className="group relative block rounded-3xl overflow-hidden border border-[#E5E7EB] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#6FAE3E]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F9FAFB]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm grid place-items-center transition-all group-hover:bg-[#1E4620] group-hover:text-white shadow-md">
                    <ArrowUpRight size={14} />
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
