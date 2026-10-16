"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Users, Sprout, Sparkles, ShieldCheck } from "lucide-react";

const STATS = [
  {
    icon: Users,
    value: "10,000+",
    label: "Happy Kitchens",
    desc: "Families using our powders in daily smoothies & meals",
  },
  {
    icon: Sprout,
    value: "100%",
    label: "Real Plants",
    desc: "Machine-dried directly from fresh farm produce",
  },
  {
    icon: Sparkles,
    value: "6",
    label: "Pure Superfoods",
    desc: "Beetroot, Moringa, Amla, Turmeric, Giloy & EverFit",
  },
  {
    icon: ShieldCheck,
    value: "0%",
    label: "Zero Additives",
    desc: "No maltodextrin, artificial colour or preservatives",
  },
];

export default function JashnStatsBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full py-16 sm:py-20 px-6 lg:px-14 bg-[#142A19] text-white relative overflow-hidden">
      {/* Subtle organic ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #7CB342 0%, rgba(20,42,25,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, #BAEE8C 0%, rgba(20,42,25,0) 70%)" }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#BAEE8C]">
            OUR IMPACT &amp; INTEGRITY
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-2 text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Trusted by 10,000+ Customers
          </h2>
          <p className="text-sm sm:text-base text-[#C2D8C0] mt-3 font-normal leading-relaxed">
            From daily breakfast smoothies to wholesome roti dough, see why households across India trust VeggieCrush for simple, honest plant nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center flex flex-col items-center hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#7CB342]/20 border border-[#7CB342]/40 text-[#BAEE8C] flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3
                  className="text-4xl sm:text-5xl font-extrabold text-white mb-1.5"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                >
                  {stat.value}
                </h3>
                <h4 className="text-sm font-bold text-[#BAEE8C] uppercase tracking-wider mb-2">
                  {stat.label}
                </h4>
                <p className="text-xs text-[#B5CCB3] leading-relaxed max-w-[220px]">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
