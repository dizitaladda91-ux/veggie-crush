"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "/homesection/hero-veggiecrush2.png",
    alt: "VeggieCrush pure vegetable and herb powders in 200g glass jars",
    tag: "NATURE, NOTHING ELSE",
    title: "VeggieCrush: Nature, Nothing Else",
    subtitle:
      "Fresh vegetables and herbs, machine-dried and ground into fine powders for your daily food, drinks and routine.",
    trustBadge: "FSSAI Lic. No. 10024042000123",
    trustSub: "100% Machine-Dried & Sieved",
    ctaPrimary: { label: "Shop All Powders", href: "/products" },
    ctaSecondary: { label: "Shop Combos", href: "/combos" },
  },
  {
    id: 2,
    image: "/homesection/hero-veggiecrush.png",
    alt: "Farm fresh organic harvest carefully machine-dried",
    tag: "SIMPLE FOOD. CAREFULLY MADE.",
    title: "From Real Plants to Pure Jars",
    subtitle:
      "We select quality vegetables, fruits and herbs, wash them, cut them, dry them in a machine and grind them into fine powders.",
    trustBadge: "200 g Food-Grade Glass Jars",
    trustSub: "Zero Fillers, Preservatives or Additives",
    ctaPrimary: { label: "Explore Our Range", href: "/products" },
    ctaSecondary: { label: "How We Make It", href: "#process-section" },
  },
  {
    id: 3,
    image: "/homesection/banner.png",
    alt: "Daily wellness with VeggieCrush superfood blends",
    tag: "DAILY ESSENTIALS & COMBOS",
    title: "Start With One Spoon a Day",
    subtitle:
      "Stir a spoonful into a smoothie, roti dough, soup, curd or juice, and make pure plant nutrition part of your day.",
    trustBadge: "Save up to 45% on Combos",
    trustSub: "Custom Bundles Available",
    ctaPrimary: { label: "Shop Combo Packs", href: "/combos" },
    ctaSecondary: { label: "Order on WhatsApp", href: "https://wa.me/919876543210" },
  },
];

export default function JashnHeroSlider() {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden bg-[#142A19] min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
      {/* Background slide cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Jashn Realty Luxury Dark Gradient Overlays */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(15,35,18,0.92) 0%, rgba(15,35,18,0.78) 45%, rgba(15,35,18,0.4) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,35,18,0.4) 0%, transparent 40%, rgba(15,35,18,0.85) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Slide Content container (Jashn Realty slide-text-inner-wrapper style) */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-14 py-20 w-full">
        <div className="max-w-2xl text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Eyebrow / Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#7CB342]/20 border border-[#7CB342]/40 text-[#BAEE8C]">
                <Sparkles size={13} className="text-[#BAEE8C]" />
                <span>{slide.tag}</span>
              </div>

              {/* Main Heading (Luxury Serif) */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                {slide.title}
              </h1>

              {/* Sub-text */}
              <p className="text-base sm:text-lg text-[#D5E5D0] leading-relaxed font-normal max-w-xl">
                {slide.subtitle}
              </p>

              {/* Jashn Realty RERA-style Trust Badge Box */}
              <div className="inline-flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#7CB342] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-white tracking-wide">{slide.trustBadge}</p>
                  <p className="text-[#C1DEC0] text-[11px]">{slide.trustSub}</p>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={slide.ctaPrimary.href}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-[#E8871E] hover:bg-[#D47815] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>{slide.ctaPrimary.label}</span>
                  <ArrowRight size={16} />
                </Link>

                {slide.ctaSecondary.href.startsWith("http") ? (
                  <a
                    href={slide.ctaSecondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 transition-all"
                  >
                    <MessageCircle size={16} />
                    <span>{slide.ctaSecondary.label}</span>
                  </a>
                ) : (
                  <Link
                    href={slide.ctaSecondary.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 transition-all"
                  >
                    <span>{slide.ctaSecondary.label}</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation Dots (Jashn Realty swiper-pagination) */}
      <div className="absolute bottom-8 left-6 lg:left-14 z-30 flex items-center gap-2.5">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              current === idx ? "w-10 bg-[#BAEE8C]" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${s.id}`}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <div className="absolute bottom-8 right-6 lg:right-14 z-30 hidden sm:flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
