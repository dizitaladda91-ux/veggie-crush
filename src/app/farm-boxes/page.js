"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Sparkles, Truck, ArrowLeft, ArrowRight, Heart, Calendar, RefreshCw } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

const FARM_BOXES = [
  {
    id: "box-essential",
    name: "Essential Family Harvest Box",
    tagline: "Our most popular weekly box for families of 3-4",
    price: 699,
    mrp: 899,
    weight: "5-6 kg",
    itemsCount: "8-10 Produce Varieties",
    popular: true,
    image: "/homesection/veggiecrush.png",
    includes: [
      "Organic Farm Spinach & Methi (500g)",
      "Farm-Fresh Beetroot & Carrots (1kg)",
      "Zero-Chemical Tomatoes & Onions (1.5kg)",
      "Seasonal Gourds & Green Beans (1kg)",
      "Fresh Culinary Herbs (Coriander & Mint)",
      "Weekly Farm Recipe Card Included",
    ],
  },
  {
    id: "box-immunity",
    name: "Immunity & Superfood Box",
    tagline: "Ayurvedic superleaf wellness & antioxidant roots",
    price: 899,
    mrp: 1199,
    weight: "3-4 kg + Extracts",
    itemsCount: "6 Potent Superfoods",
    popular: false,
    image: "/products/moringa_1.webp",
    includes: [
      "Pure Cold-Ground Moringa Superleaf (200g)",
      "Fresh Giloy Herbal Stems (250g)",
      "Vitamin-C Rich Gooseberry (Amla) (500g)",
      "Organic Raw Turmeric & Ginger Roots (400g)",
      "Detoxifying Fresh Neem Twigs (150g)",
      "Immunity Smoothie Guide Included",
    ],
  },
  {
    id: "box-salad",
    name: "Gourmet Salad & Greens Box",
    tagline: "Crisp, washed greens & vibrant heirloom vegetables",
    price: 549,
    mrp: 699,
    weight: "2.5-3 kg",
    itemsCount: "7 Salad Varieties",
    popular: false,
    image: "/products/beetroot_1.webp",
    includes: [
      "Hydroponic Butterhead Lettuce (250g)",
      "Baby Rocket & Spinach Mix (300g)",
      "Organic Cherry Tomatoes (250g)",
      "Crunchy Rainbow Radishes (300g)",
      "English Cucumbers (500g)",
      "Fresh Italian Basil & Herb Dressing Packet",
    ],
  },
];

const HARVEST_SCHEDULE = [
  { day: "Every Monday 6:00 AM", title: "Hand-Picked at Dawn", desc: "Harvested only when naturally ripe to lock in peak vitamin & mineral potency." },
  { day: "10:00 AM - 1:00 PM", title: "Ozone Washed & Cold-Sorted", desc: "Cleaned with filtered ozone water, sorted by hand, and packed in eco-friendly boxes." },
  { day: "Same Evening Delivery", title: "Chilled Farm-to-Door Drop", desc: "Delivered directly to your door in temperature-controlled vans within 12 hours." },
];

export default function FarmBoxesPage() {
  const { addToCart } = useCart();
  const [billingCycle, setBillingCycle] = useState("weekly"); // "weekly" | "monthly"
  const [addedMap, setAddedMap] = useState({});

  function handleSubscribe(box) {
    const finalPrice = billingCycle === "monthly" ? Math.round(box.price * 3.6) : box.price;
    const finalMrp = billingCycle === "monthly" ? Math.round(box.mrp * 3.6) : box.mrp;
    const frequencyLabel = billingCycle === "monthly" ? "Monthly Subscription (4 Deliveries)" : "Weekly Farm Box";

    addToCart({
      id: `${box.id}-${billingCycle}`,
      name: `${box.name} (${frequencyLabel})`,
      price: finalPrice,
      mrp: finalMrp,
      unit: box.weight,
      image: box.image,
    }, true);

    setAddedMap((prev) => ({ ...prev, [box.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [box.id]: false }));
    }, 1800);
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA]">
            <Sparkles size={12} color="#6FAE3E" />
            Zero Compromise Nutrition
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Curated Farm Subscription Boxes
          </h1>
          <p className="text-xs sm:text-sm mt-3 text-[#6B7280]">
            Pesticide-free vegetables, cold-ground superfoods, and artisanal salad greens harvested at dawn and delivered right on your schedule.
          </p>

          {/* Frequency Toggle */}
          <div className="mt-8 inline-flex items-center rounded-full p-1 border bg-[#F9FAFB] border-[#E5E7EB]">
            <button
              onClick={() => setBillingCycle("weekly")}
              className="px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer"
              style={{
                backgroundColor: billingCycle === "weekly" ? "#1E4620" : "transparent",
                color: billingCycle === "weekly" ? "#FFFFFF" : "#1E4620",
              }}
            >
              Weekly Harvest Box
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className="px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              style={{
                backgroundColor: billingCycle === "monthly" ? "#1E4620" : "transparent",
                color: billingCycle === "monthly" ? "#FFFFFF" : "#1E4620",
              }}
            >
              <span>Monthly Bundle</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6FAE3E] text-white">Save 10%</span>
            </button>
          </div>
        </div>

        {/* Box Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {FARM_BOXES.map((box) => {
            const price = billingCycle === "monthly" ? Math.round(box.price * 3.6) : box.price;
            const mrp = billingCycle === "monthly" ? Math.round(box.mrp * 3.6) : box.mrp;
            const isAdded = !!addedMap[box.id];

            return (
              <div
                key={box.id}
                className={`relative rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  box.popular ? "border-[#6FAE3E] shadow-md ring-2 ring-[#6FAE3E22]" : "border-[#E5E7EB]"
                } bg-white`}
              >
                {box.popular && (
                  <div
                    className="absolute top-0 right-0 rounded-bl-2xl text-[10px] font-extrabold uppercase px-4 py-1.5 text-white tracking-widest z-10"
                    style={{ backgroundColor: "#1E4620" }}
                  >
                    Most Popular Box
                  </div>
                )}

                <div className="p-8 pb-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border bg-[#F9FAFB] border-[#E5E7EB]">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-contain p-4"
                    />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6FAE3E]">
                    {box.itemsCount} • {box.weight}
                  </span>
                  <h3 className="text-xl font-black mt-1 leading-snug" style={{ color: "#1E4620" }}>
                    {box.name}
                  </h3>
                  <p className="text-xs mt-1 text-[#6B7280]">
                    {box.tagline}
                  </p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-3xl font-black" style={{ color: "#1E4620" }}>
                      ₹{price}
                    </span>
                    <span className="text-sm line-through text-[#9CA3AF]">
                      ₹{mrp}
                    </span>
                    <span className="text-xs font-semibold text-[#6B7280]">
                      /{billingCycle === "monthly" ? "month (4 boxes)" : "delivery"}
                    </span>
                  </div>

                  {/* Included items */}
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1E4620" }}>
                      What&apos;s Inside This Week:
                    </p>
                    {box.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#4B5443]">
                        <span className="w-4 h-4 rounded-full bg-[#EAF4DA] flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} color="#1E4620" />
                        </span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 pt-4">
                  <button
                    onClick={() => handleSubscribe(box)}
                    className="w-full py-3.5 rounded-full text-xs font-bold text-white transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    style={{ backgroundColor: isAdded ? "#1E4620" : "#6FAE3E" }}
                  >
                    {isAdded ? <Check size={16} /> : <RefreshCw size={14} />}
                    <span>{isAdded ? "Added to Cart!" : "Subscribe to This Box"}</span>
                  </button>
                  <p className="text-[11px] text-center mt-2.5 text-[#9CA3AF]">
                    Pause, swap, or cancel anytime with 1 click.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works Strip */}
        <div className="rounded-3xl border p-8 sm:p-12 mb-20 bg-[#F9FAFB] border-[#E5E7EB]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
              Simple & Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}>
              How Farm Boxes Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HARVEST_SCHEDULE.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-start bg-white p-6 rounded-2xl border border-[#E5E7EB]">
                <span className="w-8 h-8 rounded-full bg-[#1E4620] text-white text-xs font-black grid place-items-center mb-4">
                  {idx + 1}
                </span>
                <span className="text-[11px] font-bold text-[#6FAE3E] uppercase tracking-wider">
                  {step.day}
                </span>
                <h3 className="text-base font-bold mt-1" style={{ color: "#1E4620" }}>
                  {step.title}
                </h3>
                <p className="text-xs mt-1.5 leading-relaxed text-[#6B7280]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t pt-10 border-[#E5E7EB]">
          <div className="flex flex-col items-center">
            <Truck size={28} color="#1E4620" className="mb-2" />
            <h4 className="text-sm font-bold" style={{ color: "#1E4620" }}>100% Free Farm Delivery</h4>
            <p className="text-xs text-[#6B7280] mt-1">All farm boxes ship completely free with refrigerated protection.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck size={28} color="#1E4620" className="mb-2" />
            <h4 className="text-sm font-bold" style={{ color: "#1E4620" }}>Zero Chemical Guarantee</h4>
            <p className="text-xs text-[#6B7280] mt-1">Third-party lab tested for zero synthetic pesticides and heavy metals.</p>
          </div>
          <div className="flex flex-col items-center">
            <Heart size={28} color="#1E4620" className="mb-2" />
            <h4 className="text-sm font-bold" style={{ color: "#1E4620" }}>Freshness Replacement Guarantee</h4>
            <p className="text-xs text-[#6B7280] mt-1">If any veggie isn&apos;t crisp and fresh, we replace it instantly no questions asked.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
