"use client";

import Image from "next/image";
import Link from "next/link";
import { Sprout, ShieldCheck, Heart, Truck, Award, CheckCircle2, ArrowRight } from "lucide-react";

const STATS = [
  { value: "120+", label: "Organic Farm Acres", icon: Sprout },
  { value: "12h", label: "Harvest to Doorstep", icon: Truck },
  { value: "10,000+", label: "Happy Families", icon: Heart },
  { value: "0.0%", label: "Synthetic Pesticides", icon: ShieldCheck },
];

const TRUST_BADGES = [
  "NPOP Organic Certified",
  "FSSAI Central Food Safety",
  "Pure Heirloom Non-GMO",
  "NABL Accredited Lab Tested",
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-[#F9FBF8] border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA] border border-[#D5E8C0]">
            <Sprout size={13} className="text-[#5C8E42]" />
            <span>01 · Who We Are</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#173719] leading-tight">
            Born From Clean Soil, Grown For Honest Nutrition
          </h2>
          <p className="text-sm sm:text-base text-[#4A634E] mt-4 leading-relaxed">
            VeggieCrush is India&apos;s direct-from-farm superfood brand. We replace chemically sprayed, stale store produce with pure, dehydrated vegetable and ancient herb powders in sustainable 200g glass jars.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14">
          {/* Left: Farm Image with Floating Pill */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#DCEBD7] shadow-xl bg-white">
              <Image
                src="/homesection/hero-veggiecrush2.png"
                alt="VeggieCrush organic farms and honest roots"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(23,55,25,0.02) 0%, rgba(23,55,25,0.4) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D2E4CC] shadow-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#173719]">100% Regenerative Indian Farms</p>
                  <p className="text-[11px] text-[#5C8E42] font-medium">No middle-agents · Direct dawn harvest</p>
                </div>
                <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full bg-[#1E4620] text-white">
                  Verified Pure
                </span>
              </div>
            </div>
          </div>

          {/* Right: The Brand Philosophy & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#173719] mb-4">
              Real Vegetables. Ancient Roots. Zero Shortcuts.
            </h3>
            <p className="text-sm sm:text-base text-[#465F4A] leading-relaxed mb-4">
              Modern urban grocery vegetables undergo wax coating, chemical fumigation, and days of vitamin-depleting cold hibernation. We built VeggieCrush to give you back pure, unadulterated food.
            </p>
            <p className="text-sm sm:text-base text-[#465F4A] leading-relaxed mb-6">
              From nutrient-dense Moringa and ruby Beetroots to wild-harvested Amla, Neem, and Giloy—every batch comes directly from our certified organic acres straight into low-temperature dehydrators.
            </p>

            {/* Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {TRUST_BADGES.map((badge) => (
                <div key={badge} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E3EDE0]">
                  <CheckCircle2 size={16} className="text-[#5C8E42] shrink-0" />
                  <span className="text-xs font-semibold text-[#173719]">{badge}</span>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-[#1E4620] hover:bg-[#28572B] transition-colors shadow-md"
              >
                <span>Read Full Brand Journey</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl p-5 sm:p-6 bg-white border border-[#E2EBE0] text-center shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F0F7ED] border border-[#D8E8D2] mx-auto grid place-items-center mb-3">
                  <Icon size={20} className="text-[#5C8E42]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#173719]">{stat.value}</div>
                <div className="text-xs font-semibold text-[#667E68] mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
