"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Camera, Heart } from "lucide-react";

const GRAM_POSTS = [
  {
    image: "/homesection/veggiecrush.png",
    likes: "1.2k",
    caption: "Morning harvest box unpacked! Crisp cucumbers, fresh coriander and sweet beets.",
  },
  {
    image: "/categories/leafy-greens.jpg",
    likes: "840",
    caption: "Hydroponic baby spinach smoothie bowl to kick off Monday morning right.",
  },
  {
    image: "/products/moringa_1.webp",
    likes: "2.1k",
    caption: "Vedic morning routine: pure sun-dried moringa stirred into warm lemon water.",
  },
  {
    image: "/categories/root-vegetables.jpg",
    likes: "950",
    caption: "Zero pesticides, 100% soil nutrition. Earthy goodness straight from our farms.",
  },
  {
    image: "/homesection/banner.png",
    likes: "1.7k",
    caption: "Dawn at our organic farming collective. Every leaf picked with gratitude.",
  },
];

export default function SocialGram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full py-16 sm:py-20 px-6 lg:px-12 border-b border-[#E6EFE3]" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase px-3.5 py-1 rounded-full mb-3" style={{ backgroundColor: "#EAF3E7", color: "#2E5D31" }}>
            <Camera size={12} className="text-[#5C8E42]" />
            <span>COMMUNITY STORIES</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: "#173719" }}
          >
            VeggieCrush on the #Gram
          </h2>
          <p className="text-sm text-[#556F59] mt-2 max-w-md">
            Tag @VeggieCrush to share your farm-fresh kitchen creations, detox juices, and joyful unboxings.
          </p>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border hover:bg-[#1E4620] hover:text-white"
            style={{ borderColor: "#CBDDC5", color: "#1E4620", backgroundColor: "#F7FAF5" }}
          >
            <Camera size={14} />
            <span>Follow @VeggieCrush</span>
          </a>
        </div>

        <div
          className="min-w-0 overflow-hidden"
          role="region"
          aria-label="VeggieCrush community stories"
        >
          <motion.div
            className="flex w-max"
            animate={shouldReduceMotion ? undefined : { x: ["-50%", "0%"] }}
            transition={shouldReduceMotion ? undefined : { duration: 30, ease: "linear", repeat: Infinity }}
          >
            {(shouldReduceMotion ? [0] : [0, 1]).map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
                {GRAM_POSTS.map((post, idx) => (
                  <motion.div
                    key={`${copy}-${idx}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.35 }}
                    className="group relative aspect-[4/5] w-[72vw] max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#E2ECE0] bg-[#F2F7F0] sm:w-[260px]"
                  >
                    <Image
                      src={post.image}
                      alt={copy === 1 ? "" : "VeggieCrush community harvest"}
                      fill
                      sizes="(max-width: 640px) 72vw, 280px"
                      className="object-contain p-2"
                    />

                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ backgroundColor: "rgba(30, 70, 32, 0.75)" }}
                    >
                      <Camera size={24} className="mb-2" />
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-bold">
                        <Heart size={13} fill="currentColor" />
                        <span>{post.likes}</span>
                      </div>
                      <p className="line-clamp-3 text-[10px] text-[#E0EBD2]">
                        {post.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
