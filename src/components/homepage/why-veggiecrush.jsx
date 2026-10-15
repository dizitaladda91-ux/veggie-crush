"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sprout,
  SunMedium,
  Sparkles,
  Droplets,
  Scissors,
  Wind,
  Filter,
  PackageCheck,
  ShieldCheck,
  Leaf,
  ArrowRight,
} from "lucide-react";

const BELIEF_CARDS = [
  {
    icon: Sprout,
    graphicLabel: "[GRAPHIC: Real ingredients line icon]",
    graphicAlt: "Line icon representing 100% real vegetables, fruits, and herbs",
    title: "Real ingredients",
    text: "Each powder starts with real vegetables, fruits and herbs.",
  },
  {
    icon: Wind,
    graphicLabel: "[GRAPHIC: Gentle drying line icon]",
    graphicAlt: "Line icon representing gentle machine dehydrator drying",
    title: "Gentle drying",
    text: "We dry in a machine, so the powder is consistent and shelf-stable.",
  },
  {
    icon: Sparkles,
    graphicLabel: "[GRAPHIC: Easy every day line icon]",
    graphicAlt: "Line icon representing easy daily mixing into food and drinks",
    title: "Easy every day",
    text: "Fine powder that mixes into water, milk, curd, smoothies, soups and roti dough.",
  },
];

const TIMELINE_STEPS = [
  {
    num: "01",
    title: "Select",
    text: "We choose quality vegetables, fruits and herbs.",
    icon: Sprout,
    image: "/process/01-select.jpg",
    graphicAlt: "Farmer hand selecting fresh quality vegetables, fruits, and herbs from the soil",
  },
  {
    num: "02",
    title: "Wash",
    text: "Thorough cleaning before anything else.",
    icon: Droplets,
    image: "/process/02-wash.jpg",
    graphicAlt: "Clear filtered water stream washing freshly harvested vegetables",
  },
  {
    num: "03",
    title: "Cut",
    text: "Cut into small, even pieces.",
    icon: Scissors,
    image: "/process/03-cut.jpg",
    graphicAlt: "Chef knife cutting fresh beetroot on a wooden cutting board",
  },
  {
    num: "04",
    title: "Machine-Dry",
    text: "Dried in a machine dehydrator.",
    icon: SunMedium,
    image: null,
    graphicAlt: "Controlled machine dehydrator drying at precise temperatures",
  },
  {
    num: "05",
    title: "Grind & Sieve",
    text: "Ground fine and sieved for a smooth powder.",
    icon: Filter,
    image: "/process/05-grind-sieve.jpg",
    graphicAlt: "Fine vegetable and herb powder being sieved through an ultra-fine mesh",
  },
  {
    num: "06",
    title: "Pack",
    text: "Packed hygienically in a 200 g glass jar.",
    icon: PackageCheck,
    image: "/process/06-pack.png",
    graphicAlt: "VeggieCrush pure powder hygienically packed in an airtight 200 g glass jar",
  },
];

const PROMISES = [
  {
    title: "Pure",
    badgeLabel: "100% PURE",
    graphicAlt: "Graphic badge representing Pure single-ingredient powder",
    text: "Every single-ingredient powder is made from one ingredient only.",
  },
  {
    title: "Careful",
    badgeLabel: "CAREFUL PROCESS",
    graphicAlt: "Graphic badge representing Careful machine-drying and sieving",
    text: "Machine-dried and finely sieved for a smooth, consistent powder.",
  },
  {
    title: "Fresh",
    badgeLabel: "AIRTIGHT GLASS",
    graphicAlt: "Graphic badge representing Fresh 200g glass jar with tight lid",
    text: "Packed in a 200 g glass jar with a tight lid.",
  },
];

const PRODUCT_STRIP = [
  {
    name: "Beetroot",
    slug: "beetroot",
    image: "/products/beetroot_1.webp",
    alt: "VeggieCrush Beetroot Powder 200g glass jar",
  },
  {
    name: "Moringa",
    slug: "moringa",
    image: "/products/moringa-real.png",
    alt: "VeggieCrush Moringa Leaf Powder 200g glass jar",
  },
  {
    name: "Amla",
    slug: "gooseberry",
    image: "/products/goosberry_1.webp",
    alt: "VeggieCrush Amla (Gooseberry) Powder 200g glass jar",
  },
  {
    name: "Turmeric",
    slug: "turmeric",
    image: "/products/neem_1.webp",
    alt: "VeggieCrush Turmeric Powder 200g glass jar",
  },
  {
    name: "Giloy",
    slug: "giloy-powder",
    image: "/products/giloy_1.webp",
    alt: "VeggieCrush Giloy Powder 200g glass jar",
  },
  {
    name: "EverFit",
    slug: "everfit",
    image: "/products/everfit_1.webp",
    alt: "VeggieCrush EverFit Superfood Blend 200g glass jar",
  },
];

export default function WhyVeggieCrush() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-veggiecrush-heading"
      className="relative w-full py-12 sm:py-20 px-6 lg:px-12 border-b border-[#E6EFE3] overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Background Subtle Leaf Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1B5E20 1px, transparent 1px), radial-gradient(#7CB342 1px, #FAF7F2 1px)`,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
        aria-hidden="true"
      />

      {/* Ambient subtle glow */}
      <div
        className="pointer-events-none absolute top-1/4 -right-48 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, #E0EED6 0%, rgba(250,247,242,0) 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1360px] mx-auto space-y-14 sm:space-y-20">

        {/* ══════════════════════════════════════════
            BLOCK 1: HEADER
        ══════════════════════════════════════════ */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase px-3.5 py-1 rounded-full mb-4 border"
            style={{
              backgroundColor: "#EAF3E7",
              borderColor: "#D3E5CE",
              color: "#1B5E20",
            }}
          >
            <Leaf size={12} className="text-[#7CB342]" />
            <span>WHY VEGGIECRUSH</span>
          </div>

          {/* Heading */}
          <h2
            id="why-veggiecrush-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
            style={{
              color: "#1B5E20",
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            Simple food. Carefully made.
          </h2>

          {/* Sub-text */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal"
            style={{
              color: "#3F5642",
              fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif",
            }}
          >
            We take one ingredient, a vegetable, fruit or herb, and turn it into a fine powder you can use every day. No complicated labels. Just nature, nothing else.
          </p>

          {/* [GRAPHIC: hero image of the 4 jars with fresh veggies behind them] */}
          <div className="mt-8 relative max-w-3xl mx-auto">
            <div
              className="relative rounded-[24px] overflow-hidden border border-[#DCEBD7] shadow-lg bg-gradient-to-br from-white via-[#F7FAF4] to-[#EEF5E8] p-5 sm:p-7"
              role="img"
              aria-label="Hero image of the 4 jars with fresh veggies behind them"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Left: Fresh farm produce photography */}
                <div className="md:col-span-7 grid grid-cols-3 gap-2.5">
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#D2E4CC] shadow-sm bg-white">
                    <Image
                      src="/process/01-select.jpg"
                      alt="Hand selecting fresh green vegetable plant from soil"
                      fill
                      sizes="(max-width: 768px) 30vw, 150px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-white/95 text-[#1B5E20] shadow-xs">
                      01 Select
                    </span>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#D2E4CC] shadow-sm bg-white">
                    <Image
                      src="/process/02-wash.jpg"
                      alt="Water stream thoroughly washing fresh carrot"
                      fill
                      sizes="(max-width: 768px) 30vw, 150px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-white/95 text-[#1B5E20] shadow-xs">
                      02 Wash
                    </span>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#D2E4CC] shadow-sm bg-white">
                    <Image
                      src="/process/03-cut.jpg"
                      alt="Fresh ruby red beetroot being sliced with a knife"
                      fill
                      sizes="(max-width: 768px) 30vw, 150px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-white/95 text-[#1B5E20] shadow-xs">
                      03 Cut
                    </span>
                  </div>
                </div>

                {/* Right: The real VeggieCrush glass jar */}
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-2">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-xl hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/process/06-pack.png"
                      alt="VeggieCrush pure powder 200g glass jar with golden lid"
                      fill
                      sizes="(max-width: 768px) 130px, 160px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#1B5E20] mt-1.5">
                    Pure 200 g Glass Jar
                  </span>
                  <span className="text-[10px] text-[#556F59]">
                    Nature, Nothing Else
                  </span>
                </div>
              </div>

              {/* Tag indicator */}
              <div className="mt-4 pt-3 border-t border-[#E3EFE0] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6A856E]">
                <span className="font-semibold text-[#1B5E20]">
                  [GRAPHIC: hero image of the 4 jars with fresh veggies behind them]
                </span>
                <span className="text-[10px] font-medium bg-[#EAF3E7] px-2 py-0.5 rounded-md text-[#2C5228]">
                  From Fresh Plant to Pure Powder
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BLOCK 2: WHAT WE BELIEVE (3 cards in a row)
        ══════════════════════════════════════════ */}
        <div>
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#7CB342]">
              [GRAPHIC: 3 matching line icons]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BELIEF_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-white rounded-[20px] p-7 sm:p-8 border border-[#E6EFE3] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(27,94,32,0.07)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left"
                >
                  {/* Icon on top & Graphic mark */}
                  <div className="flex items-center justify-between w-full mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#F2F7EF] text-[#1B5E20] border border-[#DEEBD7]"
                      role="img"
                      aria-label={card.graphicAlt}
                    >
                      <Icon size={22} className="text-[#7CB342]" />
                    </div>
                    <span className="text-[10px] font-medium text-[#7A937D] bg-[#F4F7F2] px-2 py-0.5 rounded-md border border-[#E5EDE2]">
                      {card.graphicLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-2.5"
                    style={{
                      color: "#1B5E20",
                      fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Copy */}
                  <p
                    className="text-sm leading-relaxed text-[#4A634E]"
                    style={{ fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif" }}
                  >
                    {card.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BLOCK 3: FROM FRESH TO JAR (Timeline with Real Photography)
        ══════════════════════════════════════════ */}
        <div className="bg-white rounded-[24px] p-6 sm:p-10 lg:p-12 border border-[#E6EFE3] shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7CB342]">
              THE 6-STEP PROCESS
            </span>
            <h3
              className="text-2xl sm:text-3xl font-extrabold mt-1"
              style={{
                color: "#1B5E20",
                fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              From Fresh to Jar
            </h3>
            <p className="text-xs text-[#7A937D] mt-2">
              [GRAPHIC: 6 matching step icons, connected by a dotted line with a leaf at the end]
            </p>
          </div>

          {/* Desktop Timeline (Horizontal) */}
          <div className="hidden lg:block relative">
            {/* Connecting dotted line with leaf at end */}
            <div
              className="absolute top-10 left-12 right-12 border-t-2 border-dashed border-[#CBDDC5] z-0"
              aria-hidden="true"
            />
            <div
              className="absolute top-8 right-6 w-5 h-5 rounded-full bg-[#EAF3E7] border border-[#CBDDC5] flex items-center justify-center text-[#7CB342] z-10"
              title="A leaf at the end"
              aria-label="Leaf connecting the end of the timeline"
            >
              <Leaf size={12} />
            </div>

            <div className="grid grid-cols-6 gap-3 relative z-10">
              {TIMELINE_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="flex flex-col items-center text-center px-1"
                  >
                    {/* Step Visual Node */}
                    <div
                      className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#7CB342] shadow-sm mb-3 bg-[#F2F7EF] flex items-center justify-center group hover:scale-105 transition-transform"
                      role="img"
                      aria-label={step.graphicAlt}
                    >
                      {step.image ? (
                        <Image
                          src={step.image}
                          alt={step.graphicAlt}
                          fill
                          sizes="80px"
                          className={step.num === "06" ? "object-contain p-1" : "object-cover"}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EAF4DA] to-[#DDECD0]">
                          <Icon size={24} className="text-[#1B5E20]" />
                        </div>
                      )}
                      {/* Step Number Tag */}
                      <span className="absolute -bottom-1 -right-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#1B5E20] text-white shadow-xs z-10">
                        {step.num}
                      </span>
                    </div>

                    <h4
                      className="text-sm font-bold text-[#1B5E20] mb-1"
                      style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                    >
                      {step.title}
                    </h4>

                    <p className="text-[11px] text-[#526D56] leading-relaxed">
                      {step.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile & Tablet Timeline (Vertical) */}
          <div className="lg:hidden relative pl-6 border-l-2 border-dashed border-[#CBDDC5] ml-4 space-y-5">
            {TIMELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="relative flex items-center gap-3.5"
                >
                  {/* Step bullet node */}
                  <div
                    className="absolute -left-[35px] top-3 w-8 h-8 rounded-full bg-white border-2 border-[#7CB342] flex items-center justify-center text-[11px] font-bold text-[#1B5E20] shadow-sm z-10"
                    role="img"
                    aria-label={step.graphicAlt}
                  >
                    {step.num}
                  </div>

                  <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E6EFE3] w-full flex items-center gap-3">
                    {/* Visual thumbnail */}
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#CBDDC5] bg-[#F2F7EF]">
                      {step.image ? (
                        <Image
                          src={step.image}
                          alt={step.graphicAlt}
                          fill
                          sizes="56px"
                          className={step.num === "06" ? "object-contain p-0.5" : "object-cover"}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#EAF4DA]">
                          <Icon size={18} className="text-[#1B5E20]" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#1B5E20]">{step.title}</h4>
                      <p className="text-xs text-[#526D56] leading-relaxed mt-0.5">{step.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[#1B5E20]">
              <Leaf size={14} className="text-[#7CB342]" />
              <span>Complete: Nature, Nothing Else.</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BLOCK 4: OUR PROMISE (3 columns)
        ══════════════════════════════════════════ */}
        <div>
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7CB342]">
              WHAT GUIDES US
            </span>
            <h3
              className="text-2xl sm:text-3xl font-extrabold mt-1 text-[#1B5E20]"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              Our Promise
            </h3>
            <p className="text-xs text-[#7A937D] mt-1">[GRAPHIC: 3 round badges]</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROMISES.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.35 }}
                className="bg-white rounded-[20px] p-7 sm:p-8 border border-[#E6EFE3] shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow"
              >
                {/* Round Badge Graphic Placeholder */}
                <div
                  className="w-16 h-16 rounded-full border-2 border-[#7CB342] bg-[#F2F7EF] flex flex-col items-center justify-center p-2 mb-4 text-[#1B5E20] shadow-sm"
                  role="img"
                  aria-label={item.graphicAlt}
                >
                  <ShieldCheck size={20} className="text-[#7CB342] mb-0.5" />
                  <span className="text-[8px] font-extrabold tracking-wider">{item.badgeLabel}</span>
                </div>

                {/* Big Heading */}
                <h4
                  className="text-2xl sm:text-3xl font-extrabold mb-3 text-[#1B5E20]"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                >
                  {item.title}
                </h4>

                {/* Short Text */}
                <p
                  className="text-sm leading-relaxed text-[#4A634E]"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif" }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BLOCK 5: PRODUCT STRIP (6 product jars)
        ══════════════════════════════════════════ */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-6 sm:p-8 border border-[#E6EFE3]">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7CB342]">
              DISCOVER THE RANGE
            </span>
            <h3
              className="text-xl sm:text-2xl font-extrabold mt-1 text-[#1B5E20]"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              Pure Powders &amp; Blends (200 g)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {PRODUCT_STRIP.map((product) => (
              <Link
                key={product.name}
                href={`/products/${product.slug}`}
                className="group flex flex-col items-center text-center p-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2F7EF] border border-[#E6EFE3] hover:border-[#CBDDC5] transition-all duration-200"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1B5E20] group-hover:text-[#E8871E] transition-colors">
                  {product.name}
                </span>
                <span className="text-[10px] text-[#6F8672] mt-0.5">200 g Jar</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BLOCK 6: CTA
        ══════════════════════════════════════════ */}
        <div className="text-center max-w-2xl mx-auto pt-2">
          {/* Heading */}
          <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6"
            style={{
              color: "#1B5E20",
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            Start with one spoon a day.
          </h3>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            {/* Orange Button */}
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: "#E8871E" }}
            >
              <span>Shop All Powders</span>
              <ArrowRight size={16} />
            </Link>

            {/* Outlined Button */}
            <Link
              href="/combos"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 border-2 hover:-translate-y-0.5"
              style={{
                borderColor: "#1B5E20",
                color: "#1B5E20",
                backgroundColor: "transparent",
              }}
            >
              <span>Shop Combos</span>
            </Link>
          </div>

          {/* Small print */}
          <p
            className="text-[11px] sm:text-xs leading-relaxed text-[#7A8B6F] max-w-xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif" }}
          >
            This product is a food supplement and is not intended to diagnose, treat, cure or prevent any disease.
          </p>
        </div>

      </div>
    </section>
  );
}
