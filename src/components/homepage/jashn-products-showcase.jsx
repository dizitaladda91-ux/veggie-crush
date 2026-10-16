"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "single", label: "Pure Powders (5)" },
  { id: "blend", label: "Superfood Blend" },
  { id: "combos", label: "Curated Combos (6)" },
];

const CATALOG_ITEMS = [
  // 1. Beetroot
  {
    category: "single",
    name: "Beetroot Powder",
    tagline: "Nature's Ruby, Stamina & Energy",
    slug: "beetroot",
    tag: "Bestseller",
    size: "200 g Glass Jar",
    price: 299,
    mrp: 399,
    rating: 4.8,
    image: "/products/beetroot_1.webp",
    benefits: ["Dietary Nitrates", "Folate & Potassium", "Exercise Stamina"],
    desc: "Naturally rich in nitrates and antioxidants to support blood vessel function and endurance.",
  },
  // 2. Moringa
  {
    category: "single",
    name: "Moringa Leaf Powder",
    tagline: "Nature's Green Superfood",
    slug: "moringa",
    tag: "Vigour & Strength",
    size: "200 g Glass Jar",
    price: 399,
    mrp: 499,
    rating: 4.9,
    image: "/products/moringa-real.png",
    benefits: ["Plant Protein", "Essential Minerals", "Daily Vitality"],
    desc: "Nutrient-dense drumstick tree leaves gently machine-dried and sieved into a fine green powder.",
  },
  // 3. Amla
  {
    category: "single",
    name: "Amla Powder",
    tagline: "The Little Fruit with Amazing Nutrition",
    slug: "gooseberry",
    tag: "Natural Vitamin C",
    size: "200 g Glass Jar",
    price: 349,
    mrp: 449,
    rating: 4.8,
    image: "/products/goosberry_1.webp",
    benefits: ["Vitamin C", "Antioxidant Polyphenols", "Glowing Skin"],
    desc: "Indian gooseberries machine-dried at controlled low temperature to preserve vital nutrients.",
  },
  // 4. Turmeric
  {
    category: "single",
    name: "Golden Turmeric Powder",
    tagline: "India's Golden Spice",
    slug: "turmeric",
    tag: "Curcuminoids",
    size: "200 g Glass Jar",
    price: 299,
    mrp: 399,
    rating: 4.7,
    image: "/products/neem_1.webp",
    benefits: ["Curcuminoids", "Cellular Protection", "Joint Comfort"],
    desc: "Fresh rhizomes cleaned, sliced and finely ground with natural essential oils preserved.",
  },
  // 5. Giloy
  {
    category: "single",
    name: "Giloy Stem Powder",
    tagline: "Immunity & Vitality",
    slug: "giloy-powder",
    tag: "Traditional Guduchi",
    size: "200 g Glass Jar",
    price: 399,
    mrp: 499,
    rating: 4.8,
    image: "/products/giloy_1.webp",
    benefits: ["Antioxidant Compounds", "Vitality", "Immune Defense"],
    desc: "Traditional Indian climbing herb stems washed, machine-dried and ground into fine powder.",
  },
  // 6. EverFit
  {
    category: "blend",
    name: "EverFit Superfood Blend",
    tagline: "Your Daily Dose of Super Food",
    slug: "everfit",
    tag: "Multi-Nutrient",
    size: "200 g Glass Jar",
    price: 499,
    mrp: 649,
    rating: 4.9,
    image: "/products/everfit_1.webp",
    benefits: ["Core Nutrition", "Plant Protein & Healthy Fats", "Gut Health"],
    desc: "A nutrient-rich blend of sprouted ragi, flaxseeds, chia seeds, almonds, moringa, beetroot & amla.",
  },
  // 7. Daily Essentials Duo
  {
    category: "combos",
    name: "Daily Essentials Duo",
    tagline: "Beetroot + Moringa (400 g)",
    slug: "beetroot-moringa",
    tag: "Save 33%",
    size: "2 × 200 g Jars",
    price: 599,
    mrp: 898,
    rating: 4.9,
    image: "/products/beetroot_1.webp",
    benefits: ["Colourful Duo", "Smoothies & Roti", "Daily Vitality"],
    desc: "A colourful pair of beetroot and moringa for everyday food, smoothies and chapati dough.",
    isCombo: true,
  },
  // 8. Kitchen Trio
  {
    category: "combos",
    name: "Kitchen Trio",
    tagline: "Turmeric + Amla + Moringa (600 g)",
    slug: "turmeric-amla-moringa",
    tag: "Save 38%",
    size: "3 × 200 g Jars",
    price: 839,
    mrp: 1347,
    rating: 4.9,
    image: "/products/moringa-real.png",
    benefits: ["Cooking Staples", "Golden Milk", "Daily Nutrition"],
    desc: "Three kitchen favourites for daily cooking, morning drinks, curries and curd bowls.",
    isCombo: true,
  },
  // 9. Complete Box
  {
    category: "combos",
    name: "Complete VeggieCrush Box",
    tagline: "All 6 Products (1.2 kg)",
    slug: "complete-box",
    tag: "Save 45%",
    size: "6 × 200 g Jars",
    price: 1599,
    mrp: 2894,
    rating: 5.0,
    image: "/process/06-pack.png",
    benefits: ["Whole Range", "Perfect Gift", "Max Savings"],
    desc: "The complete VeggieCrush botanical pantry in one box. The ultimate gift of good health.",
    isCombo: true,
  },
];

export default function JashnProductsShowcase() {
  const [selectedCat, setSelectedCat] = useState("all");
  const shouldReduceMotion = useReducedMotion();
  const { addItem, openCart } = useCart();

  const filteredItems =
    selectedCat === "all"
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === selectedCat);

  const handleAddToCart = (item) => {
    addItem({
      id: item.slug,
      name: item.name,
      price: item.price,
      size: item.size,
      image: item.image,
    });
    openCart();
  };

  return (
    <section className="w-full py-16 sm:py-24 px-6 lg:px-14 bg-white border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header (Jashn Realty project-captions style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#7CB342] mb-2">
              <Sparkles size={14} />
              <span>NATURE, NOTHING ELSE</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173719] tracking-tight"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              VeggieCrush Range &amp; Combos
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#526D56] max-w-md font-normal leading-relaxed">
            Machine-dried vegetable, fruit and herb powders in airtight 200 g glass jars.
          </p>
        </div>

        {/* Category Tabs (Jashn Realty filter tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                selectedCat === cat.id
                  ? "bg-[#1B5E20] text-white shadow-sm"
                  : "bg-[#F3F6F2] text-[#3E5C43] hover:bg-[#E5EFE2]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid (Jashn Realty Landmark Projects Card Layout) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.name}
                layout
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="group rounded-3xl border border-[#E6EFE3] bg-[#FAF7F2] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] bg-gradient-to-b from-[#F2F7EF] to-[#E5EFE1] p-6 flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tag badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-[#1B5E20] text-white shadow-sm">
                        {item.tag}
                      </span>
                    </div>

                    {/* Rating pill */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1B5E20] text-xs font-bold shadow-xs">
                      <Star size={12} fill="#E8871E" color="#E8871E" />
                      <span>{item.rating}</span>
                    </div>

                    {/* Pack size pill */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[11px] font-semibold text-[#5A735E] bg-white/80 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                        {item.size}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <span className="text-xs font-bold text-[#7CB342] uppercase tracking-wide">
                      {item.tagline}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-[#1B5E20] mt-1 mb-2 group-hover:text-[#E8871E] transition-colors"
                      style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E6652] leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* Benefit badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.benefits.map((b) => (
                        <span
                          key={b}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-[#DEEBD7] text-[#2F5234]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Buttons */}
                <div className="p-6 pt-0 border-t border-[#E8EFE5] flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#1B5E20]">
                        ₹{item.price}
                      </span>
                      <span className="text-xs text-[#8A9B8C] line-through">
                        ₹{item.mrp}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#E8871E] font-bold">
                      Save ₹{item.mrp - item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={item.isCombo ? "/combos" : `/products/${item.slug}`}
                      className="p-2.5 rounded-full text-xs font-bold text-[#1B5E20] hover:bg-[#EAF4DA] transition-colors"
                      title="View details"
                    >
                      <ArrowRight size={17} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#1B5E20] hover:bg-[#E8871E] transition-all cursor-pointer shadow-sm"
                    >
                      <ShoppingBag size={13} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-[#1B5E20] bg-transparent border-2 border-[#1B5E20] hover:bg-[#1B5E20] hover:text-white transition-all shadow-sm"
          >
            <span>Experience All Products &amp; Combos</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
