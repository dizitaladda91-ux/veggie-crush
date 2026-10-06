"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Wellness & Superleaves",
    subtitle: "Moringa, Neem & Herbal Extracts",
    image: "/products/moringa_1.webp",
    count: "4 Products",
    href: "/products?category=wellness",
    bg: "#EAF4DA",
  },
  {
    title: "Immunity & Vitality",
    subtitle: "Giloy, Gooseberry & Everfit",
    image: "/products/everfit_1.webp",
    count: "3 Products",
    href: "/products?category=immunity",
    bg: "#F0FDF4",
  },
  {
    title: "Farm-Fresh Roots",
    subtitle: "Organic Beetroot & Seasonal Picks",
    image: "/products/beetroot_1.webp",
    count: "2 Products",
    href: "/products?category=roots",
    bg: "#ECFDF5",
  },
  {
    title: "Curated Farm Boxes",
    subtitle: "Weekly Handpicked Bundles",
    image: "/homesection/veggiecrush.png",
    count: "Custom Bundles",
    href: "/farm-boxes",
    bg: "#F3F4F6",
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
            href="/products"
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
                className="group relative block rounded-3xl overflow-hidden border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
                style={{ backgroundColor: cat.bg, borderColor: "#E5E7EB" }}
              >
                <div className="flex items-start justify-between relative z-10 mb-8">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "#7A8B6F" }}>
                      {cat.count}
                    </span>
                    <h3 className="text-lg font-extrabold mt-0.5 leading-snug" style={{ color: "#1E4620" }}>
                      {cat.title}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "#5F6C53" }}>
                      {cat.subtitle}
                    </p>
                  </div>
                  <span
                    className="w-8 h-8 rounded-full bg-white/80 grid place-items-center transition-transform group-hover:scale-110 group-hover:bg-[#1E4620] group-hover:text-white"
                  >
                    <ArrowUpRight size={14} />
                  </span>
                </div>

                <div className="relative h-44 w-full flex items-center justify-center">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
