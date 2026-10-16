"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Sparkles, CheckCircle2, ShieldCheck, X } from "lucide-react";

export default function JashnExperienceSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full py-16 sm:py-24 px-6 lg:px-14 bg-[#FAF7F2] border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#1B5E20] mb-3">
            <Sparkles size={14} className="text-[#7CB342]" />
            <span>TRANSPARENT BOTANICAL HARVEST</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173719] tracking-tight leading-tight"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Experience the Purity of Real Plants
          </h2>
          <p className="text-base sm:text-lg text-[#526D56] mt-4 font-normal leading-relaxed">
            Take a visual tour into how fresh vegetables, fruits and herbs are washed, sliced, gently machine-dried at controlled low temperatures, and finely sieved into your daily powder.
          </p>
        </div>

        {/* Video / Visual Stage Container (Jashn Realty jashn_elevate_video_v2) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-[#CBDDC5] shadow-2xl bg-black"
        >
          {isPlaying ? (
            <div className="relative aspect-[16/9] w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="VeggieCrush Purity Journey"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
              <Image
                src="/process/04-machine-dry.jpg"
                alt="VeggieCrush stainless steel machine dehydrator in action"
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700 opacity-90"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

              {/* Pulsing Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/30 animate-ping" />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1B5E20] hover:bg-[#E8871E] text-white flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
                    <Play size={26} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs sm:text-sm font-bold backdrop-blur-md bg-black/40 p-3 sm:p-4 rounded-2xl border border-white/20">
                <span>Watch: The 6-Step Gentle Drying &amp; Sieving Process</span>
                <span className="text-[11px] text-[#BAEE8C]">Duration: 1 min</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* 3 Key Highlights Below Video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
          {[
            {
              title: "Controlled Low Temperature",
              desc: "Gentle dehydration prevents scorching and protects sensitive plant vitamins.",
            },
            {
              title: "Fine Sieved Texture",
              desc: "Silky, clump-free consistency that blends smoothly in hot or cold recipes.",
            },
            {
              title: "Airtight Glass Jars",
              desc: "Reusable, UV-protected 200 g jars locking in freshness without plastics.",
            },
          ].map((item, idx) => (
            <div key={item.title} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E6EFE3]">
              <CheckCircle2 size={18} className="text-[#7CB342] mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#1B5E20]">{item.title}</h4>
                <p className="text-xs text-[#5A735E] mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
