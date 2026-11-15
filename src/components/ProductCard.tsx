"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Plus, ShoppingBag, Leaf, Star } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col justify-between rounded-2xl bg-white border border-brand-green/10 p-5 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-square w-full rounded-xl bg-brand-cream/60 overflow-hidden mb-4 flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-108"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
            {product.badge && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-green text-white font-badge shadow-sm">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-brand-orange text-white">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Leaf accent */}
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 grid place-items-center shadow-sm text-brand-leaf opacity-80 group-hover:opacity-100 transition-opacity">
            <Leaf size={14} />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex items-center gap-1 text-[#F0B429] mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} fill="#F0B429" color="#F0B429" />
          ))}
          <span className="text-[11px] font-bold text-brand-ink/60 ml-1">4.9</span>
        </div>

        <h3 className="text-lg font-bold text-brand-ink font-heading group-hover:text-brand-green transition-colors leading-snug">
          {product.name}
        </h3>

        <p className="text-xs font-tagline italic text-brand-orange mt-0.5 mb-2">
          {product.tagline}
        </p>

        <p className="text-xs text-brand-ink/75 font-body leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Benefits list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.benefits.map((b) => (
            <span
              key={b}
              className="text-[10px] font-semibold text-brand-green bg-brand-green/8 px-2 py-0.5 rounded-md"
            >
              • {b}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing & Add to Cart button */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-brand-ink font-heading">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-semibold">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] text-brand-leaf font-bold">
            {product.volume}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer ${
            added
              ? "bg-brand-green text-white scale-105"
              : "bg-brand-red text-white hover:bg-brand-green"
          }`}
          aria-label={`Add ${product.name} to Cart`}
        >
          {added ? (
            <>
              <Check size={14} className="text-brand-cream" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus size={14} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
