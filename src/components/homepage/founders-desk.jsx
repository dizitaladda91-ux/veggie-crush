"use client";

import Image from "next/image";
import Link from "next/link";
import { PenTool, Quote, ShieldCheck, ArrowRight } from "lucide-react";

export default function FoundersDesk() {
  return (
    <section id="founders-desk" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-[#FFFBF2] border-b border-[#E8EFE5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-3 text-[#1B5E14] bg-white border border-[#F7941D]/35">
            <PenTool size={13} className="text-[#F7941D]" />
            <span>06 · Idea Behind It · Founder&apos;s Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#1B5E14] leading-tight">
            Why We Started <span className="text-[#B00D0D]">VeggieCrush</span>
          </h2>
          <p className="text-sm sm:text-base font-body text-[#3B4D3C] mt-4 leading-relaxed">
            A personal note on taking back our health from chemical fertilizers, wax coatings, and stale cold chains.
          </p>
        </div>

        {/* Letter Container */}
        <div className="relative rounded-3xl border-2 border-[#1B5E14]/15 bg-white p-8 sm:p-12 lg:p-16 shadow-lg overflow-hidden">
          {/* Subtle background ambient leaf pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFF5E6]/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F0F7EE]/70 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Founder Photo / Portrait Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-[#FFFBF2] shadow-2xl bg-[#FFFBF2]">
                <Image
                  src="/homesection/hero-veggiecrush.png"
                  alt="Pure VeggieCrush Founder on organic farm"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-top"
                />
              </div>

              <div className="mt-6">
                <h4 className="text-xl font-heading font-black text-[#1B5E14]">Anil Sharma &amp; Team</h4>
                <p className="text-xs font-heading font-bold text-[#B00D0D] tracking-wide uppercase mt-0.5">
                  Founders &amp; Chief Farm Advocates
                </p>
                <p className="text-xs font-body text-[#7A937D] mt-1">Pure VeggieCrush Organics India</p>
              </div>

              {/* Core Pledge Badge */}
              <div className="mt-5 p-4 rounded-2xl bg-[#FFF5E6] border border-[#F7941D]/35 text-left w-full max-w-sm shadow-xs">
                <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#B85D00] mb-1">
                  <ShieldCheck size={16} className="text-[#F7941D]" />
                  <span>The Founder&apos;s Zero-Compromise Pledge</span>
                </div>
                <p className="text-[11px] font-body text-[#526955] leading-relaxed">
                  &ldquo;If any ingredient or batch doesn&apos;t meet pure 100% lab residue-free standards, we discard it. We never sell what we wouldn&apos;t feed our own children.&rdquo;
                </p>
              </div>
            </div>

            {/* Right: The Inspiring Letter */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <Quote size={40} className="text-[#F7941D]/35 mb-4" />

              <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#1B5E14] mb-4 leading-snug">
                &ldquo;Real Food Doesn&apos;t Need a Chemistry Degree to Understand.&rdquo;
              </h3>

              <div className="space-y-4 text-sm sm:text-base font-body text-[#3B4D3C] leading-relaxed">
                <p>
                  A few years ago, walking through high-end grocery aisles in the city, I realized an uncomfortable truth: our daily fresh vegetables were coated with petroleum waxes for cosmetic shine, sprayed with synthetic systemic pesticides, and kept dormant in cold storages for weeks.
                </p>
                <p>
                  When we sought out daily health powders and supplements, things looked worse. Bottles claiming to be &quot;superfoods&quot; were loaded with 60% maltodextrin fillers, artificial sweeteners, flow agents, and synthetic colors.
                </p>
                <p>
                  That was the inception of <strong>Pure VeggieCrush</strong>. We asked: Why can&apos;t we take authentic vegetables and ancient Indian herbs—harvested at dawn from certified organic soil—gently machine-dry them without scorching, grind them fine, and put them in a pure 200g glass jar?
                </p>
                <p>
                  No preservatives. No maltodextrin. Just 100% of the plant. Today, with over 10,000 households trusting our jars every morning, our mission remains unaltered: to reconnect modern Indian families with unadulterated mother nature.
                </p>
              </div>

              {/* Hand-signed closing */}
              <div className="mt-8 pt-6 border-t border-[#E8EFE5] flex items-center justify-between">
                <div>
                  <p className="font-tagline italic text-xl sm:text-2xl text-[#1B5E14]">
                    In Health &amp; Living Soil,
                  </p>
                  <p className="text-xs font-heading font-bold text-[#F7941D] mt-0.5">The VeggieCrush Family</p>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#B00D0D] hover:text-[#1B5E14] transition-colors"
                >
                  <span>Read our full mission</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
