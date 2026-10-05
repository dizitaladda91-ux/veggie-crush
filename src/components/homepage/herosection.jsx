"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Sprout, ShieldCheck } from "lucide-react";

const HERO_CARDS = [
  {
    eyebrow: "Morning Harvest",
    title: "Fresh Finds from the Soil: Discover Pure Organic Roots & Greens",
    description: "Picked at dawn from local pesticide-free farms and delivered straight to your door in 12 hours.",
    buttonText: "Shop Daily Harvest",
    href: "/products",
    image: "/homesection/veggiecrush.png",
    badge: "100% Organic",
    badgeIcon: <Sprout size={12} color="#6FAE3E" />,
  },
  {
    eyebrow: "Wellness & Superleaves",
    title: "Potent Herbal Nutrition: Moringa, Pure Giloy & Vitality Herbs",
    description: "Ayurvedic superfoods cold-ground to preserve 100% natural phytonutrients and vitamins.",
    buttonText: "Explore Superfoods",
    href: "/products?category=wellness",
    image: "/products/moringa_1.webp",
    badge: "Immunity Booster",
    badgeIcon: <Sparkles size={12} color="#F0B429" />,
  },
  {
    eyebrow: "Farm Box Subscription",
    title: "Curated Family Boxes: Seasonal Veggies Delivered Weekly",
    description: "Customized weekly farm boxes packed with hand-sorted produce, fresh herbs, and recipe cards.",
    buttonText: "Explore Farm Boxes",
    href: "/farm-boxes",
    image: "/products/beetroot_1.webp",
    badge: "Weekly Delivery",
    badgeIcon: <ShieldCheck size={12} color="#6FAE3E" />,
  },
];

export default function HeroSection() {
  return (
    <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
      {/* 3-Column Editorial Hero Grid matching reference site structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 p-1">
        {HERO_CARDS.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.5 }}
            className="group relative h-[480px] sm:h-[540px] lg:h-[620px] rounded-3xl overflow-hidden flex flex-col justify-end p-8 sm:p-10 border"
            style={{ backgroundColor: "#142612", borderColor: "#274623" }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={card.image}
                alt={card.title}
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-60"
              />
            </div>

            {/* Dark gradient overlay for typography readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(14,28,13,0.92) 0%, rgba(14,28,13,0.65) 50%, rgba(14,28,13,0.2) 100%)",
              }}
            />

            {/* Content Container */}
            <div className="relative z-10">
              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 text-[#C8F090] bg-white/10 backdrop-blur-md border border-white/20">
                {card.badgeIcon}
                <span>{card.eyebrow}</span>
              </div>

              {/* Headline */}
              <h2
                className="text-2xl sm:text-3xl font-black text-white leading-snug tracking-tight mb-3"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                {card.title}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#E0EBD2] leading-relaxed line-clamp-3 mb-6 max-w-sm">
                {card.description}
              </p>

              {/* Outline Button matching reference site button style */}
              <Link
                href={card.href}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold text-white border-2 border-white/80 transition-all duration-300 group-hover:bg-[#6FAE3E] group-hover:border-[#6FAE3E] group-hover:shadow-lg"
              >
                <span>{card.buttonText}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}