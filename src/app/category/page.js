"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, ShoppingCart, Check, Leaf } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

const CATEGORIES_DATA = [
  {
    id: "leafy-greens",
    name: "Leafy Greens",
    subtitle: "Spinach, Methi, Mint, Coriander & Superleaves",
    icon: "🥬",
    color: "#EAF4DA",
    items: [
      { id: "c1", name: "Organic Baby Spinach", price: 69, mrp: 89, unit: "250g", rating: 4.8, image: "/products/moringa_1.webp" },
      { id: "c2", name: "Farm Fresh Fenugreek (Methi)", price: 49, mrp: 65, unit: "250g", rating: 4.7, image: "/products/moringa_1.webp" },
      { id: "c3", name: "Aromatic Farm Coriander", price: 35, mrp: 45, unit: "150g", rating: 4.9, image: "/products/neem_1.webp" },
    ],
  },
  {
    id: "root-vegetables",
    name: "Root Vegetables",
    subtitle: "Beetroot, Carrots, Sweet Potatoes & Ginger",
    icon: "🥕",
    color: "#F0FDF4",
    items: [
      { id: "1", name: "Organic Beetroot", price: 299, mrp: 399, unit: "200g", rating: 4.7, image: "/products/beetroot_1.webp" },
      { id: "c5", name: "Crisp Orange Farm Carrots", price: 89, mrp: 110, unit: "500g", rating: 4.8, image: "/products/beetroot_1.webp" },
      { id: "c6", name: "Raw Himalayan Turmeric", price: 129, mrp: 160, unit: "250g", rating: 4.9, image: "/products/beetroot_1.webp" },
    ],
  },
  {
    id: "wellness-herbs",
    name: "Herbs & Superfoods",
    subtitle: "Moringa, Giloy, Gooseberry & Vitality",
    icon: "🌱",
    color: "#ECFDF5",
    items: [
      { id: "3", name: "Moringa Superleaf Powder", price: 399, mrp: 499, unit: "200g", rating: 4.7, image: "/products/moringa_1.webp" },
      { id: "6", name: "Giloy Immunity Extract Powder", price: 429, mrp: 549, unit: "200g", rating: 4.8, image: "/products/giloy_1.webp" },
      { id: "2", name: "Pure Gooseberry (Amla) Powder", price: 349, mrp: 449, unit: "200g", rating: 4.8, image: "/products/goosberry_1.webp" },
      { id: "5", name: "Everfit Daily Vitality Capsules", price: 499, mrp: 649, unit: "60 caps", rating: 4.6, image: "/products/everfit_1.webp" },
    ],
  },
  {
    id: "gourds-squash",
    name: "Gourds & Squash",
    subtitle: "Bottle Gourd, Ridge Gourd & Bitter Gourd",
    icon: "🥒",
    color: "#F3F4F6",
    items: [
      { id: "c11", name: "Fresh Bottle Gourd (Lauki)", price: 59, mrp: 79, unit: "1 pc (~800g)", rating: 4.6, image: "/products/neem_1.webp" },
      { id: "c12", name: "Tender Bitter Gourd (Karela)", price: 69, mrp: 89, unit: "500g", rating: 4.5, image: "/products/neem_1.webp" },
      { id: "c13", name: "Ridge Gourd (Torai)", price: 75, mrp: 95, unit: "500g", rating: 4.6, image: "/products/neem_1.webp" },
    ],
  },
];

export default function CategoryPage() {
  const { addToCart } = useCart();
  const [activeCat, setActiveCat] = useState(CATEGORIES_DATA[0].id);
  const [addedMap, setAddedMap] = useState({});

  const currentCategory = CATEGORIES_DATA.find((c) => c.id === activeCat) || CATEGORIES_DATA[0];

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
        <div className="mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
            Direct From The Fields
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1"
            style={{ color: "#1E4620" }}
          >
            Shop By Produce Category
          </h1>
          <p className="text-xs sm:text-sm mt-2 text-[#6B7280]">
            Browse our pesticide-free crops sorted by category. Harvested daily with 100% natural organic purity.
          </p>
        </div>

        {/* Category Pills Slider */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = cat.id === activeCat;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`p-5 rounded-3xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#1E4620] ring-2 ring-[#1E4620] shadow-md bg-[#F0FDF4]"
                    : "border-[#E5E7EB] bg-white hover:border-[#6FAE3E]"
                }`}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: "#1E4620" }}>
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#6B7280] line-clamp-1 mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Category Active Section */}
        <div className="rounded-3xl border p-8 sm:p-10 mb-16 bg-[#F9FAFB] border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCategory.icon}</span>
                <h2 className="text-2xl sm:text-3xl font-black" style={{ color: "#1E4620" }}>
                  {currentCategory.name}
                </h2>
              </div>
              <p className="text-xs text-[#6B7280] mt-1">{currentCategory.subtitle}</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-5 py-2.5 rounded-full transition-transform hover:scale-105"
              style={{ backgroundColor: "#1E4620" }}
            >
              <span>View Full Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory.items.map((item) => {
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
