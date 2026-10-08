"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  return (
    <section className="w-full py-16 sm:py-20 px-6 lg:px-12 border-b border-[#E6EFE3]" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-[1440px] mx-auto">
        
        {/* Wix-style Editorial Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
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
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border hover:bg-[#1E4620] hover:text-white"
            style={{ borderColor: "#CBDDC5", color: "#1E4620", backgroundColor: "#F7FAF5" }}
          >
            <Camera size={14} />
            <span>Follow @VeggieCrush</span>
          </a>
        </div>

        {/* 5-Column Grid matching Wix Sprout on the #Gram layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {GRAM_POSTS.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F2F7F0] border border-[#E2ECE0]"
            >
              <Image
                src={post.image}
                alt="VeggieCrush community harvest"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-108"
              />

              {/* Hover overlay with Instagram icon and likes */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white"
                style={{ backgroundColor: "rgba(30, 70, 32, 0.75)" }}
              >
                <Camera size={24} className="mb-2" />
                <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                  <Heart size={13} fill="currentColor" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[10px] text-[#E0EBD2] line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
