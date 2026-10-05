"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sun, CloudRain, Snowflake, Leaf, Check, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

const SEASONS = [
  {
    id: "winter",
    name: "Winter Harvest",
    icon: <Snowflake size={18} className="text-[#3B82F6]" />,
    period: "Nov — Feb",
    desc: "Sweet organic carrots, vibrant beetroot, leafy spinach, and immunity herbs.",
    highlight: "Naturally highest in sugar content and antioxidant density.",
    produce: [
      { id: "1", name: "Farm Fresh Beetroot", price: 299, mrp: 399, unit: "200g", rating: 4.7, image: "/products/beetroot_1.webp" },
      { id: "2", name: "Amla (Indian Gooseberry)", price: 349, mrp: 449, unit: "200g", rating: 4.8, image: "/products/goosberry_1.webp" },
      { id: "3", name: "Moringa Superleaf Powder", price: 399, mrp: 499, unit: "200g", rating: 4.7, image: "/products/moringa_1.webp" },
    ],
  },
  {
    id: "monsoon",
    name: "Monsoon Picks",
    icon: <CloudRain size={18} className="text-[#0D9488]" />,
    period: "Jul — Oct",
    desc: "Tender gourds, organic ginger, raw turmeric, and natural immunity balancers.",
    highlight: "Helps maintain gut health and high resistance during humid seasonal shifts.",
    produce: [
      { id: "6", name: "Giloy Immunity Extract Powder", price: 429, mrp: 549, unit: "200g", rating: 4.8, image: "/products/giloy_1.webp" },
      { id: "4", name: "Neem Detox Powder", price: 389, mrp: 499, unit: "200g", rating: 4.6, image: "/products/neem_1.webp" },
      { id: "5", name: "Everfit Daily Vitality Capsules", price: 499, mrp: 649, unit: "60 caps", rating: 4.6, image: "/products/everfit_1.webp" },
    ],
  },
  {
    id: "summer",
    name: "Summer Fresh",
    icon: <Sun size={18} className="text-[#F59E0B]" />,
    period: "Mar — Jun",
    desc: "Hydrating cucumbers, cooling gourds, fresh mint, and refreshing superleaves.",
    highlight: "Rich in electrolytes and cellular hydration to beat intense heat.",
    produce: [
      { id: "3", name: "Moringa Superleaf Powder", price: 399, mrp: 499, unit: "200g", rating: 4.7, image: "/products/moringa_1.webp" },
      { id: "2", name: "Pure Gooseberry (Amla) Powder", price: 349, mrp: 449, unit: "200g", rating: 4.8, image: "/products/goosberry_1.webp" },
      { id: "1", name: "Organic Beetroot", price: 299, mrp: 399, unit: "200g", rating: 4.7, image: "/products/beetroot_1.webp" },
    ],
  },
  {
    id: "yearround",
    name: "Year Round Staples",
    icon: <Leaf size={18} className="text-[#1E4620]" />,
    period: "All 12 Months",
    desc: "Always in stock: essential roots, onions, daily cooking herbs, and Ayurvedic extracts.",
    highlight: "Grown in climate-controlled greenhouse polyhouses.",
    produce: [
      { id: "5", name: "Everfit Daily Vitality Capsules", price: 499, mrp: 649, unit: "60 caps", rating: 4.6, image: "/products/everfit_1.webp" },
      { id: "6", name: "Giloy Immunity Extract Powder", price: 429, mrp: 549, unit: "200g", rating: 4.8, image: "/products/giloy_1.webp" },
      { id: "4", name: "Neem Detox Powder", price: 389, mrp: 499, unit: "200g", rating: 4.6, image: "/products/neem_1.webp" },
    ],
  },
];

export default function SeasonPage() {
  const { addToCart } = useCart();
  const [selectedSeason, setSelectedSeason] = useState(SEASONS[0].id);
  const [addedMap, setAddedMap] = useState({});

  const activeSeason = SEASONS.find((s) => s.id === selectedSeason) || SEASONS[0];

  function handleAdd(item) {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      mrp: item.mrp,
      unit: item.unit,
      image: item.image,
    }, true);

    setAddedMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
            Eating in Harmony with Nature
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Shop By Season
          </h1>
          <p className="text-xs sm:text-sm mt-2 text-[#6B7280]">
            Seasonal eating delivers up to 300% more phytonutrients and vitamins compared to artificially stored out-of-season produce.
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {SEASONS.map((season) => {
            const isSelected = season.id === selectedSeason;
            return (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.id)}
                className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#1E4620] ring-2 ring-[#1E4620] bg-[#F0FDF4] shadow-md"
                    : "border-[#E5E7EB] bg-white hover:border-[#6FAE3E]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-[#E5E7EB] grid place-items-center">
                    {season.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4DA] text-[#1E4620]">
                    {season.period}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: "#1E4620" }}>
                    {season.name}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">
                    {season.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Season Banner and Products */}
        <div className="rounded-3xl border p-8 sm:p-10 mb-16 bg-[#F9FAFB] border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6FAE3E]">Active Harvest Cycle</span>
                <span className="text-xs font-semibold text-[#6B7280]">({activeSeason.period})</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mt-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}>
                {activeSeason.name} Picks
              </h2>
              <p className="text-xs text-[#4B5443] mt-1 max-w-xl font-medium">
                💡 {activeSeason.highlight}
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: "#1E4620" }}
            >
              <span>Explore All Produce</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSeason.produce.map((item) => {
              const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);
              const isAdded = !!addedMap[item.id];

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border p-5 flex flex-col justify-between bg-white border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#F9FAFB] border border-[#E5E7EB]">
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full z-10 bg-[#D9483A]">
                        {discount}% OFF
                      </span>
                    )}
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-6"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1.5 text-xs font-bold text-[#1E4620]">
                      <Star size={12} fill="#F0B429" color="#F0B429" />
                      <span>{item.rating}</span>
                      <span className="text-[#6B7280] font-normal">• {item.unit}</span>
                    </div>

                    <h4 className="text-sm font-bold leading-snug" style={{ color: "#1E4620" }}>
                      {item.name}
                    </h4>

                    <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold" style={{ color: "#1E4620" }}>
                          ₹{item.price}
                        </span>
                        <span className="text-xs line-through text-[#9CA3AF]">
                          ₹{item.mrp}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className="px-4 py-2 rounded-full text-xs font-bold text-white flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer shadow-sm"
                        style={{ backgroundColor: isAdded ? "#1E4620" : "#6FAE3E" }}
                      >
                        {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
                        <span>{isAdded ? "Added!" : "Add"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
