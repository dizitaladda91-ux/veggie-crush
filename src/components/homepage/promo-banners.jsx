"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="w-full py-12 px-6 lg:px-10" style={{ backgroundColor: "#FBF7EC" }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <div
          className="relative rounded-3xl overflow-hidden border p-8 sm:p-10 flex flex-col justify-between min-h-[320px]"
          style={{ backgroundColor: "#1E4620", borderColor: "#2D5A30" }}
        >
          <div className="relative z-10 max-w-sm">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 text-[#A8D96A] bg-[#2E5830] border border-[#3E7042]"
            >
              <Sparkles size={12} />
              100% Pure Superfoods
            </span>
            <h3
              className="text-2xl sm:text-3xl font-black text-white leading-tight"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              Elevate Your Daily Wellness Routine
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E8BD] mt-3 leading-relaxed">
              From fresh cold-processed moringa to potent giloy extracts, fuel your immunity with pure organic power straight from our fertile soils.
            </p>
          </div>

          <div className="relative z-10 mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold transition-transform hover:scale-105"
              style={{ backgroundColor: "#6FAE3E", color: "#FFFFFF" }}
            >
              <span>Explore Superfoods</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Background image decoration */}
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none">
            <Image
              src="/products/moringa_1.webp"
              alt="Moringa"
              fill
              sizes="50vw"
              className="object-contain object-right-bottom"
            />
          </div>
        </div>

        {/* Banner 2 */}
        <div
          className="relative rounded-3xl overflow-hidden border p-8 sm:p-10 flex flex-col justify-between min-h-[320px]"
          style={{ backgroundColor: "#F0E8D6", borderColor: "#E7DCC2" }}
        >
          <div className="relative z-10 max-w-sm">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 text-[#1E4620] bg-white/70 border border-[#D9CEB4]"
            >
              🌱 Weekly Farm Subscription
            </span>
            <h3
              className="text-2xl sm:text-3xl font-black leading-tight"
              style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
            >
              Curated Harvest Boxes For Your Family
            </h3>
            <p className="text-xs sm:text-sm mt-3 leading-relaxed" style={{ color: "#5F6C53" }}>
              Get seasonal leafy greens, root veggies, and fresh herbs hand-picked at dawn and delivered right on schedule every week.
            </p>
          </div>

          <div className="relative z-10 mt-8">
            <Link
              href="/farm-boxes"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold transition-transform hover:scale-105"
              style={{ backgroundColor: "#1E4620", color: "#FFFFFF" }}
            >
              <span>Subscribe to Farm Box</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Background image decoration */}
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-25 pointer-events-none">
            <Image
              src="/products/beetroot_1.webp"
              alt="Fresh Beetroot"
              fill
              sizes="50vw"
              className="object-contain object-right-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
