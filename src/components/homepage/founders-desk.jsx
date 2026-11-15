"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, Quote, Sparkles, CheckCircle2, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";

export default function FoundersDesk() {
  return (
    <section id="founders-desk" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-white border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA] border border-[#D5E8C0]">
            <PenTool size={13} className="text-[#5C8E42]" />
            <span>06 · Idea Behind It · Founder&apos;s Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#173719] leading-tight">
            Why We Started VeggieCrush
          </h2>
          <p className="text-sm sm:text-base text-[#4A634E] mt-4 leading-relaxed">
            A personal note on taking back our health from chemical fertilizers, wax coatings, and stale cold chains.
          </p>
        </div>

        {/* Letter Container */}
        <div className="relative rounded-3xl border border-[#DCE8D8] bg-[#FDFEFC] p-8 sm:p-12 lg:p-16 shadow-xl overflow-hidden">
          {/* Subtle background ambient leaf pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAF4DA]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F2F8ED]/60 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Founder Photo / Portrait Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 flex flex-col items-center text-center"
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#EAF3E7]">
                <Image
                  src="/homesection/hero-veggiecrush.png"
                  alt="VeggieCrush Founder on organic farm"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-top"
                />
              </div>

              <div className="mt-6">
                <h4 className="text-xl font-black text-[#173719]">Satyam &amp; Team</h4>
                <p className="text-xs font-bold text-[#5C8E42] tracking-wide uppercase mt-0.5">
                  Founders &amp; Chief Farm Advocates
                </p>
                <p className="text-xs text-[#7A937D] mt-1">VeggieCrush Organics India</p>
              </div>

              {/* Core Pledge Badge */}
              <div className="mt-5 p-4 rounded-2xl bg-[#F0F7ED] border border-[#DCEBD6] text-left w-full max-w-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E4620] mb-1">
                  <ShieldCheck size={16} className="text-[#5C8E42]" />
                  <span>The Founder&apos;s Zero-Compromise Pledge</span>
                </div>
                <p className="text-[11px] text-[#526955] leading-relaxed">
                  &ldquo;If any ingredient or batch doesn&apos;t meet pure 100% lab residue-free standards, we discard it. We never sell what we wouldn&apos;t feed our own children.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Right: The Inspiring Letter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <Quote size={40} className="text-[#C5DCBD] mb-4" />

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#173719] mb-4 leading-snug">
                &ldquo;Real Food Doesn&apos;t Need a Chemistry Degree to Understand.&rdquo;
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#465F4A] leading-relaxed">
                <p>
                  A few years ago, walking through high-end grocery aisles in the city, I realized an uncomfortable truth: our daily fresh vegetables were coated with petroleum waxes for cosmetic shine, sprayed with synthetic systemic pesticides, and kept dormant in cold storages for weeks.
                </p>
                <p>
                  When we sought out daily health powders and supplements, things looked worse. Bottles claiming to be &quot;superfoods&quot; were loaded with 60% maltodextrin fillers, artificial sweeteners, flow agents, and synthetic colors.
                </p>
                <p>
                  That was the inception of <strong>VeggieCrush</strong>. We asked: Why can&apos;t we take authentic vegetables and ancient Indian herbs—harvested at dawn from certified organic soil—gently machine-dry them without scorching, grind them fine, and put them in a pure 200g glass jar?
                </p>
                <p>
                  No preservatives. No maltodextrin. Just 100% of the plant. Today, with over 10,000 households trusting our jars every morning, our mission remains unaltered: to reconnect modern Indian families with unadulterated mother nature.
                </p>
              </div>

              {/* Hand-signed closing */}
              <div className="mt-8 pt-6 border-t border-[#E3EDE0] flex items-center justify-between">
                <div>
                  <p className="font-serif italic text-lg sm:text-xl text-[#1E4620]">
                    In Health &amp; Living Soil,
                  </p>
                  <p className="text-xs font-bold text-[#67826A] mt-0.5">The VeggieCrush Family</p>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E4620] hover:text-[#5C8E42] transition-colors"
                >
                  <span>Read our full mission</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
