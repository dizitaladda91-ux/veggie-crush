"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2, Sprout, Wind, Sparkles, PackageCheck } from "lucide-react";

export default function JashnAboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-white">
      {/* ══════════════════════════════════════════
          1. ABOUT SECTION (Jashn Realty about-infos 2-column layout)
      ══════════════════════════════════════════ */}
      <section className="w-full py-16 sm:py-24 px-6 lg:px-14 border-b border-[#E6EFE3]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Animated SlideInLeft (Content) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 flex flex-col justify-center text-left"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#1B5E20] mb-3">
                <Sprout size={14} className="text-[#7CB342]" />
                <span>ABOUT VEGGIECRUSH</span>
              </div>

              {/* Main Heading */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] mb-6 text-[#173719]"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                VeggieCrush: Nature, Nothing Else
              </h2>

              {/* Paragraphs */}
              <p className="text-base sm:text-lg text-[#334D37] leading-relaxed mb-4 font-normal">
                At VeggieCrush, we believe good health starts with simple, natural ingredients. We select quality vegetables, fruits and herbs, wash them, cut them into small pieces, dry them in a machine and grind them into fine, sieved powders.
              </p>

              <p className="text-sm sm:text-base text-[#526D56] leading-relaxed mb-6 font-normal">
                Each 200 g jar brings the goodness of the plant straight to your kitchen. Stir a spoonful into a smoothie, roti dough, soup, curd or juice, and make it part of your day. No artificial flavours, no synthetic colours, and zero added sugars.
              </p>

              {/* Experience More CTA link matching Jashn Realty "Experience More >>" */}
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#1B5E20] hover:text-[#E8871E] transition-colors group"
                >
                  <span>Experience Pure Powders</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Animated SlideInRight (Image with Jashn left-accent border line) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative"
            >
              {/* Jashn Realty border-left accent styling */}
              <div className="relative pl-0 sm:pl-6 sm:border-l-4 sm:border-[#7CB342]/40">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#DCEBD7] bg-[#F2F7F0]">
                  <Image
                    src="/homesection/hero-veggiecrush2.png"
                    alt="VeggieCrush real vegetable powders and fresh ingredients"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  {/* Floating quality stamp badge */}
                  <div className="absolute bottom-5 left-5 right-5 sm:right-auto px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#CBDDC5] shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF3E7] text-[#1B5E20] flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} className="text-[#7CB342]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1B5E20]">100% Machine-Dried &amp; Sieved</p>
                      <p className="text-[11px] text-[#556F59]">200 g Pure Glass Jars</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. OVERVIEW SECTION (Jashn Realty c-align overview)
      ══════════════════════════════════════════ */}
      <section className="w-full py-14 sm:py-20 px-6 lg:px-14 bg-[#FAF7F2] border-b border-[#E6EFE3]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-5 text-[#1B5E20]"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Overview
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-lg text-[#445E47] leading-relaxed font-normal"
          >
            VeggieCrush is a modern, transparent botanical food brand, known for purity, honesty, and nutrient preservation. Whether you are looking for daily stamina from Beetroot, vigour from Moringa, natural Vitamin C from Amla, joint comfort from Turmeric, or traditional vitality from Giloy, our pure machine-dried powders blend effortlessly into everyday cooking, smoothies, and warm milk routines.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. TRUSTED BY ACHIEVERS BAR (Jashn Realty Section 3)
      ══════════════════════════════════════════ */}
      <section className="w-full py-14 sm:py-16 px-6 lg:px-14 bg-white border-b border-[#E6EFE3]">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#7CB342]">
              CRAFTED FOR DAILY WELLNESS
            </span>
            <h3
              className="text-2xl sm:text-3xl font-extrabold mt-1 text-[#1B5E20]"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              Trusted by Achievers, Crafted for Dreamers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sprout,
                title: "Real Ingredients",
                desc: "Each powder starts with 100% real vegetables, fruits and herbs.",
              },
              {
                icon: Wind,
                title: "Machine-Dried",
                desc: "Controlled low-temperature dehydration preserves heat-sensitive nutrients.",
              },
              {
                icon: Sparkles,
                title: "Ultra-Fine Sieved",
                desc: "Smooth texture that dissolves effortlessly into water, smoothies and dough.",
              },
              {
                icon: PackageCheck,
                title: "200 g Glass Jar",
                desc: "Packed hygienically in airtight glass to keep freshness sealed.",
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6EFE3] hover:border-[#CBDDC5] hover:bg-[#F2F7EF] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#CBDDC5] text-[#1B5E20] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <Icon size={22} className="text-[#7CB342]" />
                  </div>
                  <h4
                    className="text-lg font-bold text-[#1B5E20] mb-2"
                    style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                  >
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#526D56] leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
