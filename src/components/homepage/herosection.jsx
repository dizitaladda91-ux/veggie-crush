"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sprout, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#E8EFE5] bg-[#FFFBF2]">
      {/* Subtle organic logo-inspired ambient glow (warm orange & fresh green) */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, #FDE6C8 0%, rgba(255,251,242,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, #D8EDD2 0%, rgba(255,251,242,0) 70%)" }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Editorial Hook */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left lg:-translate-y-4">
            
            {/* Logo-Matched Tagline Pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-wide w-fit mb-5 border border-[#F7941D]/35 bg-[#FFF5E6] text-[#B85D00] shadow-xs"
            >
              <Sprout size={14} className="text-[#2E8B1F]" />
              <span className="font-tagline italic font-bold text-sm tracking-normal">Nature, Nothing Else.</span>
            </div>

            {/* Main Brand Heading with Logo-Matched Colors & Font */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.12] mb-5">
              <span className="text-[#1B5E14]">Pure Veggie</span>
              <span className="text-[#B00D0D]">Crush</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-tagline italic font-normal text-[#F7941D] mt-2">
                100% Cold-Crushed Farm Nutrition
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-body text-[#3B4D3C] max-w-xl leading-relaxed mb-8">
              Fresh vegetables and ancient herbs, machine-dried and ground into pure powders in airtight 200g glass jars for your daily food, smoothies, and wellness rituals.
            </p>

            {/* CTA Buttons in Logo Colors */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              {/* Primary: Crush Red */}
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-heading font-bold text-white bg-[#B00D0D] hover:bg-[#8F0A0A] shadow-md transition-colors"
              >
                <span>Shop Products</span>
                <ArrowRight size={16} />
              </Link>

              {/* Secondary: Veggie Green outline */}
              <Link
                href="/combos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-heading font-bold border-2 border-[#1B5E14] text-[#1B5E14] bg-white hover:bg-[#1B5E14] hover:text-white transition-colors"
              >
                <span>Shop Combos</span>
              </Link>

              {/* WhatsApp: Leaf Green */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-heading font-bold text-white bg-[#2E8B1F] hover:bg-[#1B5E14] transition-colors shadow-sm"
              >
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Botanical Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E8EFE5]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F0F7EE] text-[#1B5E14] border border-[#1B5E14]/15 shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-[#1B5E14]">Machine-Dried</h4>
                  <p className="text-[11px] font-body text-[#5C7560]">Real plants &amp; herbs</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FFF5E6] text-[#F7941D] border border-[#F7941D]/25 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-[#B85D00]">Fine Powder</h4>
                  <p className="text-[11px] font-body text-[#5C7560]">300-mesh instant mix</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FFF1F0] text-[#B00D0D] border border-[#B00D0D]/20 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-[#B00D0D]">200g Glass Jar</h4>
                  <p className="text-[11px] font-body text-[#5C7560]">Zero plastic leaching</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Botanical & Produce Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[480px] lg:max-w-none rounded-3xl overflow-hidden shadow-xl border-2 border-[#1B5E14]/15 bg-white p-3">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F6FAF4]">
                <Image
                  src="/homesection/hero-veggiecrush2.png"
                  alt="Pure VeggieCrush farm fresh vegetables and clean powder roots"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />

                {/* Floating Botanical Quality Card */}
                <div
                  className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl backdrop-blur-md border border-[#F7941D]/30 shadow-lg flex items-center justify-between bg-white/95"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF5E6] flex items-center justify-center text-[#F7941D] border border-[#F7941D]/30">
                      <Sprout size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-heading font-bold text-[#1B5E14]">Daily Garden Box</p>
                      <p className="text-[11px] font-body text-[#637C66]">Beetroot · Moringa · Amla · Herbs</p>
                    </div>
                  </div>
                  <span className="text-xs font-heading font-bold px-3 py-1.5 rounded-full bg-[#B00D0D] text-white">
                    Fresh Today
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
