"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Check, Plus, ShoppingBag, Flame } from "lucide-react";
import { useCart } from "../cart/cart-provider";
import WishlistButton from "@/components/products/wishlist-button";

const BESTSELLER_PRODUCTS = [
  {
    id: "1",
    slug: "beetroot",
    name: "Beetroot Powder",
    price: 299,
    mrp: 399,
    unit: "200g Glass Jar",
    rating: 4.8,
    reviews: 248,
    badge: "Bestseller #1",
    benefit: "Natural Nitrates · Stamina & Blood Flow",
    images: ["/products/beetroot_1.webp", "/products/beetroot_2.webp"],
  },
  {
    id: "3",
    slug: "moringa",
    name: "Moringa Superleaf Powder",
    price: 399,
    mrp: 499,
    unit: "200g Glass Jar",
    rating: 4.9,
    reviews: 312,
    badge: "Immunity Hero",
    benefit: "90+ Nutrients · 46 Antioxidants",
    images: ["/products/moringa_1.webp", "/products/moringa_2.webp"],
  },
  {
    id: "2",
    slug: "gooseberry",
    name: "Amla / Gooseberry Powder",
    price: 349,
    mrp: 449,
    unit: "200g Glass Jar",
    rating: 4.8,
    reviews: 196,
    badge: "Vitamin C Rich",
    benefit: "20x More Vitamin C than Oranges",
    images: ["/products/goosberry_1.webp", "/products/goosberry_2.webp"],
  },
  {
    id: "4",
    slug: "neem",
    name: "Neem Herbal Powder",
    price: 389,
    mrp: 499,
    unit: "200g Glass Jar",
    rating: 4.7,
    reviews: 142,
    badge: "Pure Detox",
    benefit: "Ancient Blood Purifier & Clear Skin",
    images: ["/products/neem_1.webp", "/products/neem_2.webp"],
  },
  {
    id: "6",
    slug: "giloy-powder",
    name: "Giloy Herbal Extract",
    price: 429,
    mrp: 549,
    unit: "200g Glass Jar",
    rating: 4.8,
    reviews: 178,
    badge: "Ayurvedic Rasayana",
    benefit: "Deep Immunity & Vitality Support",
    images: ["/products/giloy_1.webp", "/products/giloy_2.webp"],
  },
  {
    id: "5",
    slug: "everfit",
    name: "EverFit Daily Vitality",
    price: 499,
    mrp: 649,
    unit: "60 Veg Capsules",
    rating: 4.7,
    reviews: 165,
    badge: "Daily Energy",
    benefit: "Full Spectrum Herbal Wellness",
    images: ["/products/everfit_1.webp", "/products/everfit_2.webp"],
  },
];

function BestsellerCard({ product }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      unit: product.unit,
      image: product.images?.[0] || null,
    }, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div
      className="group relative flex flex-col justify-between rounded-3xl border border-[#E8EFE5] bg-white overflow-hidden shadow-xs hover:border-[#1B5E14]/40 transition-colors"
    >
      {/* Top Image + Badges */}
      <div className="relative aspect-square w-full bg-[#FFFBF2] overflow-hidden flex items-center justify-center p-6 border-b border-[#E8EFE5]">
        <Link href={`/products/${product.slug}`} className="relative w-full h-full block">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain"
          />
        </Link>

        {/* Bestseller Badge with Crush Red & Pure Orange */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
          <span className="px-3 py-1 rounded-full text-[10px] font-heading font-black uppercase tracking-wider bg-[#B00D0D] text-white shadow-xs flex items-center gap-1">
            <Flame size={12} className="text-[#F7941D]" />
            {product.badge}
          </span>
          {discount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-heading font-black uppercase tracking-wider bg-[#FFF5E6] text-[#B85D00] border border-[#F7941D]/35">
              Save {discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <WishlistButton product={product} />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex text-[#F7941D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#F7941D" color="#F7941D" />
              ))}
            </div>
            <span className="text-[11px] font-heading font-bold text-[#1B5E14] ml-1">{product.rating}</span>
            <span className="text-[10px] font-body text-[#7A937D]">({product.reviews})</span>
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-base font-heading font-bold text-[#1B5E14] group-hover:text-[#B00D0D] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] font-body text-[#526955] font-medium mt-1">
            {product.benefit}
          </p>

          <span className="inline-block text-[11px] font-heading font-semibold text-[#B85D00] mt-1">
            {product.unit} · Airtight Glass Jar
          </span>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-5 pt-3 border-t border-[#F0F5ED] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-heading font-black text-[#B00D0D]">₹{product.price}</span>
              {product.mrp > product.price && (
                <span className="text-xs font-body text-[#9CA3AF] line-through font-semibold">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            <span className="text-[10px] font-heading font-bold text-[#2E8B1F]">In Stock · Dawn Fresh</span>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`px-4 py-2 rounded-full text-xs font-heading font-bold flex items-center gap-1.5 shadow-sm transition-colors ${
              added
                ? "bg-[#2E8B1F] text-white"
                : "bg-[#1B5E14] text-white hover:bg-[#B00D0D]"
            }`}
          >
            {added ? (
              <>
                <Check size={14} className="text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BestsellersSection() {
  return (
    <section id="our-bestsellers" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-white border-b border-[#E8EFE5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-3 text-[#B00D0D] bg-[#FFF1F0] border border-[#B00D0D]/30">
              <Flame size={13} className="text-[#B00D0D]" />
              <span>05 · Our Bestsellers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#1B5E14] leading-tight">
              India&apos;s Favorite <span className="text-[#B00D0D]">Pure Farm Superfoods</span>
            </h2>
            <p className="text-sm sm:text-base font-body text-[#3B4D3C] mt-2 max-w-xl">
              Freshly dehydrated 200g glass jar superfoods trusted by over 10,000 households for everyday morning wellness.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-heading font-bold text-[#1B5E14] bg-[#FFFBF2] border-2 border-[#1B5E14]/30 hover:bg-[#1B5E14] hover:text-white transition-colors shadow-xs shrink-0"
          >
            <ShoppingBag size={14} />
            <span>View All Products</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BESTSELLER_PRODUCTS.map((prod) => (
            <BestsellerCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
