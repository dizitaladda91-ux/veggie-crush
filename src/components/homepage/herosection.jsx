"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sprout, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#E6EFE3]" style={{ backgroundColor: "#F7FAF5" }}>
      {/* Subtle organic light green ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, #E2F0DC 0%, rgba(247,250,245,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, #EAF4E4 0%, rgba(247,250,245,0) 70%)" }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Wix-style Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left lg:-translate-y-8">
            {/* Wix Eyebrow / Question */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide w-fit mb-5 border"
              style={{
                backgroundColor: "#EAF3E7",
                borderColor: "#D3E5CE",
                color: "#27552A",
              }}
            >
              <Sprout size={14} className="text-[#5C8E42]" />
              <span>Nature, Nothing Else</span>
            </motion.div>

            {/* Wix Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 text-[#173719]"
            >
              VeggieCrush: Nature, Nothing Else
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#4A634E] max-w-xl leading-relaxed mb-8 font-normal"
            >
              Fresh vegetables and herbs, machine-dried and ground into fine powders for your daily food, drinks and routine.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 mb-10"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: "#1E4620" }}
              >
                <span>Shop Products</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/combos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 border hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#CBDDC5",
                  color: "#1E4620",
                }}
              >
                <span>Shop Combos</span>
              </Link>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 border hover:-translate-y-0.5 bg-[#EAF4DA] border-[#CBDDC5] text-[#1E4620]"
              >
                <span>Order on WhatsApp</span>
              </a>
            </motion.div>

            {/* Botanical Trust Pill Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E1ECE0]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EAF3E7] text-[#2E6032] shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E4620]">Machine-Dried</h4>
                  <p className="text-[11px] text-[#5C7560]">Real plants & herbs</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EAF3E7] text-[#2E6032] shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E4620]">Fine Powder</h4>
                  <p className="text-[11px] text-[#5C7560]">Easy to mix</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EAF3E7] text-[#2E6032] shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E4620]">200 g Glass Jar</h4>
                  <p className="text-[11px] text-[#5C7560]">Nature, Nothing Else</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High Quality Botanical & Produce Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[480px] lg:max-w-none rounded-3xl overflow-hidden shadow-xl border border-[#DCEBD7] bg-white p-3">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F2F7F0]">
                <Image
                  src="/homesection/hero-veggiecrush2.png"
                  alt="Fresh farm harvest vegetables and botanical greens"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Floating Botanical Quality Card */}
                <div
                  className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl backdrop-blur-md border shadow-lg flex items-center justify-between"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.92)",
                    borderColor: "rgba(211, 232, 205, 0.8)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EAF3E7] flex items-center justify-center text-[#2C5F31]">
                      <Sprout size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1E4620]">Morning Garden Box</p>
                      <p className="text-[11px] text-[#637C66]">Spinach · Herbs · Carrots · Roots</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#EAF3E7] text-[#1E4620]">
                    Fresh Today
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}