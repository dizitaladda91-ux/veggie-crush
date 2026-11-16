"use client";

import Image from "next/image";
import Link from "next/link";
import { Sprout, ShieldCheck, Heart, Truck, CheckCircle2, ArrowRight } from "lucide-react";

const STATS = [
  { value: "120+", label: "Organic Farm Acres", icon: Sprout, color: "text-[#1B5E14]" },
  { value: "12h", label: "Harvest to Doorstep", icon: Truck, color: "text-[#F7941D]" },
  { value: "10,000+", label: "Happy Families", icon: Heart, color: "text-[#B00D0D]" },
  { value: "0.0%", label: "Synthetic Pesticides", icon: ShieldCheck, color: "text-[#2E8B1F]" },
];

const TRUST_BADGES = [
  "NPOP Organic Certified",
  "FSSAI Central Food Safety",
  "Pure Heirloom Non-GMO",
  "NABL Accredited Lab Tested",
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-white border-b border-[#E8EFE5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-3 text-[#1B5E14] bg-[#FFFBF2] border border-[#F7941D]/35">
            <Sprout size={13} className="text-[#2E8B1F]" />
            <span>01 · Who We Are</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#1B5E14] leading-tight">
            Born From Clean Soil, Grown For <span className="text-[#B00D0D]">Honest Nutrition</span>
          </h2>
          <p className="text-sm sm:text-base font-body text-[#3B4D3C] mt-4 leading-relaxed">
            Pure VeggieCrush is India&apos;s direct-from-farm superfood brand. We replace chemically sprayed, stale store produce with 100% pure dehydrated vegetable and ancient herb powders in sustainable 200g glass jars.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14">
          {/* Left: Farm Image with Floating Pill */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#1B5E14]/15 shadow-xl bg-white">
              <Image
                src="/homesection/hero-veggiecrush2.png"
                alt="Pure VeggieCrush organic farms and honest roots"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(27,94,20,0.02) 0%, rgba(27,94,20,0.45) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#F7941D]/30 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-heading font-bold text-[#1B5E14]">100% Regenerative Indian Farms</p>
                  <p className="text-[11px] font-body text-[#B85D00] font-medium">Zero middle-agents · Direct dawn harvest</p>
                </div>
                <span className="text-[10px] font-heading uppercase font-black tracking-wider px-2.5 py-1 rounded-full bg-[#B00D0D] text-white">
                  Verified Pure
                </span>
              </div>
            </div>
          </div>

          {/* Right: The Brand Philosophy & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#1B5E14] mb-4">
              Real Vegetables. Ancient Roots. <span className="text-[#F7941D]">Zero Shortcuts.</span>
            </h3>
            <p className="text-sm sm:text-base font-body text-[#3B4D3C] leading-relaxed mb-4">
              Modern urban grocery vegetables undergo wax coating, chemical fumigation, and days of vitamin-depleting cold storage hibernation. We built VeggieCrush to give you back pure, unadulterated food.
            </p>
            <p className="text-sm sm:text-base font-body text-[#3B4D3C] leading-relaxed mb-6">
              From nutrient-dense Moringa and ruby Beetroots to wild-harvested Amla, Neem, and Giloy—every batch comes directly from our certified organic acres straight into low-temperature dehydrators.
            </p>

            {/* Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {TRUST_BADGES.map((badge) => (
                <div key={badge} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFBF2] border border-[#F7941D]/25">
                  <CheckCircle2 size={16} className="text-[#2E8B1F] shrink-0" />
                  <span className="text-xs font-heading font-bold text-[#1B5E14]">{badge}</span>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-heading font-bold text-white bg-[#1B5E14] hover:bg-[#B00D0D] transition-colors shadow-md"
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
                className="rounded-2xl p-5 sm:p-6 bg-[#FFFBF2] border border-[#F7941D]/25 text-center shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#F7941D]/30 mx-auto grid place-items-center mb-3 text-[#F7941D]">
                  <Icon size={20} />
                </div>
                <div className={`text-2xl sm:text-3xl font-heading font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-xs font-heading font-semibold text-[#5C7560] mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
