"use client";

import Link from "next/link";
import { 
  Sparkles, 
  Leaf, 
  Wind, 
  PackageCheck, 
  Coffee, 
  Utensils, 
  GlassWater, 
  ArrowRight
} from "lucide-react";

const PILLARS = [
  {
    icon: Leaf,
    title: "100% Single-Ingredient",
    badge: "Pure Formula",
    badgeColor: "text-[#B00D0D] bg-[#FFF1F0] border-[#B00D0D]/30",
    iconBg: "bg-[#FFF1F0] text-[#B00D0D]",
    desc: "No maltodextrin, zero added sugars, no artificial colors or synthetic starch. Every jar has only ONE ingredient: pure farm produce.",
  },
  {
    icon: Wind,
    title: "Low-Heat Dehydration",
    badge: "Enzyme Active",
    badgeColor: "text-[#B85D00] bg-[#FFF5E6] border-[#F7941D]/35",
    iconBg: "bg-[#FFF5E6] text-[#F7941D]",
    desc: "Our closed-loop dehydrators protect heat-sensitive Vitamin C, chlorophyll, natural nitrates, and vital micronutrients below 48°C.",
  },
  {
    icon: Sparkles,
    title: "Ultra-Fine Micro Sieving",
    badge: "Instant Mix",
    badgeColor: "text-[#1B5E14] bg-[#F0F7EE] border-[#1B5E14]/25",
    iconBg: "bg-[#F0F7EE] text-[#1B5E14]",
    desc: "Sieved down to 300-mesh fine powder. Dissolves seamlessly into smoothies, warm water, curd, dal, soups, and daily roti dough.",
  },
  {
    icon: PackageCheck,
    title: "Airtight 200g Glass Jars",
    badge: "Zero Plastic Leaching",
    badgeColor: "text-[#2E8B1F] bg-[#ECFDF5] border-[#2E8B1F]/30",
    iconBg: "bg-[#ECFDF5] text-[#2E8B1F]",
    desc: "Sealed in UV-resistant recyclable glass jars with tamper-proof inner freshness seals to keep every spoonful crunchy and potent.",
  },
];

const DAILY_USES = [
  { icon: GlassWater, label: "Morning Detox", desc: "1 spoon Moringa or Amla in lukewarm water" },
  { icon: Utensils, label: "Roti & Dals", desc: "Knead Beetroot or Spinach powder directly into dough" },
  { icon: Coffee, label: "Golden Elixirs / Smoothies", desc: "Blend with almond milk, bananas or daily curd" },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-[#FFFBF2] border-b border-[#E8EFE5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-3 text-[#1B5E14] bg-white border border-[#F7941D]/35">
            <Sparkles size={13} className="text-[#F7941D]" />
            <span>02 · What We Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#1B5E14] leading-tight">
            Transforming Fresh Farm Harvest Into <span className="text-[#B00D0D]">Daily Nutrition</span>
          </h2>
          <p className="text-sm sm:text-base font-body text-[#3B4D3C] mt-4 leading-relaxed">
            We bridge the gap between busy urban lifestyles and authentic farm vitality by gently dehydrating pure produce into nutrient-packed, ready-to-mix powders.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-3xl p-7 bg-white border border-[#E8EFE5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl grid place-items-center ${pillar.iconBg}`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-heading font-bold tracking-wide uppercase px-2.5 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#1B5E14] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-[#4E6251] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* How to use in daily life strip */}
        <div className="rounded-3xl p-8 lg:p-10 bg-[#1B5E14] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border-2 border-[#F7941D]/30">
          <div className="max-w-xl">
            <span className="text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-[#F7941D]">
              EFFORTLESS DAILY HABIT
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black mt-2 text-white">
              One Spoonful a Day. Endless Health Benefits.
            </h3>
            <p className="text-xs sm:text-sm font-body text-[#E6F4E2] mt-2 leading-relaxed">
              No juicing cleanup, no rotting produce in your fridge crisper drawer. Just pure plant goodness whenever you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            {DAILY_USES.map((use) => {
              const Icon = use.icon;
              return (
                <div key={use.label} className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <Icon size={18} className="text-[#F7941D] mb-2" />
                  <p className="text-xs font-heading font-bold text-white">{use.label}</p>
                  <p className="text-[11px] font-body text-[#D1E8CC] mt-0.5 leading-snug">{use.desc}</p>
                </div>
              );
            })}
          </div>

          <Link
            href="/products"
            className="px-6 py-3.5 rounded-full text-xs font-heading font-bold text-white bg-[#B00D0D] hover:bg-[#8F0A0A] transition-colors shrink-0 flex items-center gap-1.5 shadow-md"
          >
            <span>Explore Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
