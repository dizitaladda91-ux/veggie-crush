"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sprout, CheckCircle2, ArrowRight } from "lucide-react";

export default function FromSeedToTable() {
  return (
    <section className="w-full py-16 sm:py-24 px-6 lg:px-12 border-b border-[#E6EFE3]" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Lush Farm Photo matching Wix template editorial photography */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-[#DCEBD7] shadow-lg bg-[#F2F7F0]">
              <Image
                src="/homesection/banner.png"
                alt="Organic farm harvesting in the morning"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(30,70,32,0.02) 0%, rgba(30,70,32,0.3) 100%)",
                }}
              />
              {/* Floating Leaf badge */}
              <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#D2E4CC] shadow-md flex items-center gap-2 text-xs font-bold text-[#1E4620]">
                <Sprout size={16} className="text-[#5C8E42]" />
                <span>Regenerative Organic Soils · Zero Toxins</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Wix-style Editorial Philosophy Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Wix Eyebrow / Heading */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit mb-4" style={{ backgroundColor: "#EAF3E7", color: "#2E5D31" }}>
              <span>OUR BOTANICAL PHILOSOPHY</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6"
              style={{ color: "#173719" }}
            >
              From Seed to Table
            </h2>

            <p className="text-base text-[#465F4A] leading-relaxed mb-6 font-normal">
              At VeggieCrush, we believe the food you eat should come with a heartbeat of the soil, not a chemical footprint. We partner directly with smallholder farmers who restore soil ecology with bio-compost, harvest exclusively at peak seasonal ripeness, and never touch synthetic pesticides.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#5C8E42] mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-[#2C4930]">
                  Dawn harvest, sorted, ozone-washed, and delivered to your kitchen in under 12 hours.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#5C8E42] mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-[#2C4930]">
                  Zero cold-storage holding rooms — keeping 100% of vital phytonutrients alive.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#5C8E42] mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-[#2C4930]">
                  Fair, transparent income directly deposited into our farming families’ accounts.
                </span>
              </div>
            </div>

            <div>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: "#1E4620" }}
              >
                <span>Shop Fresh Produce</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
