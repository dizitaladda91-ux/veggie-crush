"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, Package } from "lucide-react";

const BOXES = [
  {
    title: "Weekly Kitchen Veggie Box",
    frequency: "Delivered Every Monday & Thursday",
    price: 599,
    mrp: 750,
    tag: "MOST POPULAR",
    image: "/products/beetroot_1.webp",
    description: "Everything a family needs for daily wholesome home-cooked meals.",
    features: [
      "5kg fresh seasonal vegetables (potatoes, tomatoes, onions, gourds)",
      "2 bunches fresh leafy greens (spinach, methi, coriander)",
      "Fresh lemon, green chillies & organic ginger pack",
      "Free doorstep delivery included",
    ],
  },
  {
    title: "Vedic Immunity & Wellness Box",
    frequency: "Delivered Weekly or Bi-weekly",
    price: 899,
    mrp: 1199,
    tag: "WELLNESS ESSENTIAL",
    image: "/products/moringa_1.webp",
    description: "Ancient Ayurvedic phytonutrients to power up whole-family immunity.",
    features: [
      "Fresh raw turmeric roots, amla & ginger",
      "Cold-ground moringa leaf powder (200g)",
      "Pure giloy stem cuts & wild tulsi leaves",
      "Weekly Ayurvedic seasonal wellness guide",
    ],
  },
  {
    title: "Exotic Greens & Microgreens Box",
    frequency: "Delivered Fresh Every Saturday",
    price: 499,
    mrp: 650,
    tag: "CHEF'S CHOICE",
    image: "/categories/leafy-greens.jpg",
    description: "Crisp salad staples, gourmet leaves, and living hydroponic microgreens.",
    features: [
      "Hydroponic baby spinach & curly kale (300g)",
      "Sweet cherry tomatoes & crisp English cucumbers",
      "Live sunflower & radish microgreens tray",
      "Farm-made herb vinaigrette recipe card",
    ],
  },
];

export default function SubscriptionBoxes() {
  return (
    <section className="w-full py-16 sm:py-24 px-6 lg:px-12 border-b border-[#E6EFE3]" style={{ backgroundColor: "#F7FAF5" }}>
      <div className="max-w-[1440px] mx-auto">
        
        {/* Wix-style Editorial Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase px-3.5 py-1 rounded-full mb-3" style={{ backgroundColor: "#EAF3E7", color: "#2E5D31" }}>
            <Package size={12} className="text-[#5C8E42]" />
            <span>FARM SUBSCRIPTIONS</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
            style={{ color: "#173719" }}
          >
            Shop Our Farm Subscription Boxes
          </h2>
          <p className="text-base text-[#556F59] mt-3">
            ...and look forward to pure, pesticide-free harvest delivered to your door every single week.
          </p>
        </div>

        {/* 3 Subscription Box Cards matching Wix layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BOXES.map((box, idx) => (
            <motion.div
              key={box.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: idx === 0 ? "#85B66B" : "#E2ECE0",
              }}
            >
              {/* Floating Tag */}
              <div className="p-7 pb-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: idx === 0 ? "#EAF4DA" : "#F3F6F2",
                      color: "#1E4620",
                    }}
                  >
                    {box.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-[#667E6A]">
                    {box.frequency}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#173719] mb-2 leading-snug">
                  {box.title}
                </h3>
                <p className="text-xs text-[#5D7361] leading-relaxed line-clamp-2">
                  {box.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="px-7 py-4 bg-[#F8FAF7] border-y border-[#EDF3EB] flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#173719]">
                    ₹{box.price}
                  </span>
                  <span className="text-xs text-[#7A907E]">
                    / week
                  </span>
                </div>
                <span className="text-xs line-through text-[#99ACA0]">
                  ₹{box.mrp}
                </span>
              </div>

              {/* Features List */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <ul className="space-y-3 mb-8">
                  {box.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#314B35]">
                      <Check size={15} className="text-[#5C8E42] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/farm-boxes"
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                    idx === 0
                      ? "bg-[#1E4620] text-white hover:bg-[#2C5F31] hover:shadow-md"
                      : "bg-[#EAF3E7] text-[#1E4620] hover:bg-[#1E4620] hover:text-white"
                  }`}
                >
                  <span>Subscribe to Box</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
