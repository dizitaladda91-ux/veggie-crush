"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Heart, Check, Eye, Plus, Image as ImageIcon } from "lucide-react";
import { useCart } from "../cart/cart-provider";

const FALLBACK_PRODUCTS = [
  {
    id: "1",
    slug: "beetroot",
    name: "Beetroot",
    price: 299,
    mrp: 399,
    unit: "200g",
    rating: 4.7,
    reviews: 128,
    description: "Naturally rich in nitrates and antioxidants, beetroot supports stamina, heart health, and better blood flow throughout the day.",
    images: ["/products/beetroot_1.webp", "/products/beetroot_2.webp", "/products/beetroot_3.webp", "/products/beetroot_4.webp"],
  },
  {
    id: "2",
    slug: "gooseberry",
    name: "Gooseberry",
    price: 349,
    mrp: 449,
    unit: "200g",
    rating: 4.8,
    reviews: 94,
    description: "Packed with Vitamin C and natural antioxidants, gooseberry helps support immunity, digestion, and everyday vitality.",
    images: ["/products/goosberry_1.webp", "/products/goosberry_2.webp", "/products/goosberry_3.webp", "/products/goosberry_4.webp"],
  },
  {
    id: "3",
    slug: "moringa",
    name: "Moringa",
    price: 399,
    mrp: 499,
    unit: "200g",
    rating: 4.7,
    reviews: 143,
    description: "Moringa is a nutrient-dense superleaf known for supporting immunity, energy, and balanced daily wellness.",
    images: ["/products/moringa_1.webp", "/products/moringa_2.webp", "/products/moringa_3.webp", "/products/moringa_4.webp"],
  },
  {
    id: "4",
    slug: "neem",
    name: "Neem",
    price: 389,
    mrp: 499,
    unit: "200g",
    rating: 4.6,
    reviews: 68,
    description: "Neem is traditionally valued for its natural cleansing support, skin wellness, and daily balance.",
    images: ["/products/neem_1.webp", "/products/neem_2.webp", "/products/neem_3.webp", "/products/neem_4.webp"],
  },
  {
    id: "5",
    slug: "everfit",
    name: "Everfit",
    price: 499,
    mrp: 649,
    unit: "60 capsules",
    rating: 4.6,
    reviews: 72,
    description: "Everfit is a wellness-support formula designed to promote everyday vitality, better balance, and a natural daily health routine.",
    images: ["/products/everfit_1.webp", "/products/everfit_2.webp", "/products/everfit_3.webp", "/products/everfit_4.webp"],
  },
  {
    id: "6",
    slug: "giloy-powder",
    name: "Giloy Powder",
    price: 429,
    mrp: 549,
    unit: "200g",
    rating: 4.8,
    reviews: 101,
    description: "Giloy powder is traditionally used to support immunity, vitality, and overall balance with a pure herbal profile.",
    images: ["/products/giloy_1.webp", "/products/giloy_2.webp", "/products/giloy_3.webp", "/products/giloy_4.webp"],
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const productSlug = product.slug || product.name.toLowerCase().replace(/\s+/g, "-");

  function handleAdd() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      unit: product.unit,
      image: product.images?.[0] || null,
    }, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  // Determine pill text: "MOST LOVED" if top rated / bestseller, or "25% OFF" or "FARM FRESH"
  const badgeText = product.isBestSeller
    ? "MOST LOVED"
    : discount > 0
    ? `${discount}% OFF`
    : "100% ORGANIC";

  return (
    <Link href={`/products/${productSlug}`} className="block h-full">
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group relative rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
      >
        {/* Top Image Container with Floating Pill */}
        <div
          className="relative aspect-square flex items-center justify-center overflow-hidden bg-[#F9FAFB]"
        >
          {/* Floating Pill Badge matching reference "MOST LOVED" pill */}
          <span
            className="absolute top-3.5 left-3.5 text-[10px] font-bold tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full z-10 bg-white/95 text-[#1E4620] shadow-sm border border-black/5 backdrop-blur-sm"
          >
            {badgeText}
          </span>

          <motion.button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted((w) => !w); }}
            whileTap={{ scale: 0.85 }}
            aria-label="Toggle wishlist"
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full grid place-items-center z-10 bg-white/90 hover:bg-white text-gray-600 shadow-sm transition-all"
          >
            <Heart
              size={15}
              fill={wishlisted ? "#D9483A" : "none"}
              color={wishlisted ? "#D9483A" : "#6B7280"}
            />
          </motion.button>

          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="relative z-[1] h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-108"
            />
          ) : (
            <div className="relative z-[1] mx-8 flex h-[calc(100%-4rem)] w-full items-center justify-center border-2 border-dashed rounded-2xl" style={{ borderColor: "#E5E7EB", color: "#9CA3AF" }}>
              <ImageIcon size={30} strokeWidth={1.5} aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Bottom Details Section */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-[#1E2E1C] group-hover:text-[#6FAE3E] transition-colors leading-snug mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-[#6B7280] font-normal leading-relaxed line-clamp-1 mb-4">
              {product.description || (product.unit ? `100% Pure Organic · ${product.unit}` : "Farm-fresh daily harvest")}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 mt-auto">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#1E2E1C]">
                ₹{product.price}
              </span>
              {product.unit && (
                <span className="text-xs text-[#6B7280] font-normal">
                  / {product.unit}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs line-through text-[#9CA3AF] ml-1.5 font-medium">
                  ₹{product.mrp}
                </span>
              )}
            </div>

            {/* Circular outline button with '+' icon (Exact match to reference image button) */}
            <motion.button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(); }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Add ${product.name} to cart`}
              className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer shadow-sm ${
                added
                  ? "bg-[#1E4620] border-[#1E4620] text-white"
                  : "border-[#D1D5DB] text-[#1E4620] hover:border-[#1E4620] hover:bg-[#1E4620] hover:text-white bg-white"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Check size={18} strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="plus"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  >
                    <Plus size={20} strokeWidth={1.6} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function ProductSkeleton() {
  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-sm"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
    >
      <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#F3F4F6" }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, #FFFFFF88, transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: "#F3F4F6" }} />
        <div className="h-3 w-1/2 rounded-full" style={{ backgroundColor: "#F3F4F6" }} />
        <div className="h-4 w-1/3 rounded-full" style={{ backgroundColor: "#F3F4F6" }} />
      </div>
    </div>
  );
}

export default function TopSellingProducts() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        const res = await fetch("/api/products/top-selling", { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        if (!cancelled) {
          const fetched = Array.isArray(data.products) && data.products.length > 0
            ? data.products
            : FALLBACK_PRODUCTS;
          setProducts(fetched);
        }
      } catch {
        // silently fall back to hardcoded products — no error shown to user
        if (!cancelled) setProducts(FALLBACK_PRODUCTS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();
    return () => { cancelled = true; };
  }, []);

  return (
    <section style={{ backgroundColor: "#FFFFFF" }} className="relative w-full px-6 lg:px-10 py-16 overflow-hidden">
      <motion.div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ backgroundColor: "#6FAE3E14" }}
        animate={{ y: [0, 24, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full pointer-events-none"
        style={{ backgroundColor: "#D9483A0f" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.25em] mb-2" style={{ color: "#6FAE3E" }}>
              CUSTOMER FAVOURITES
            </p>
            <h2
              style={{ color: "#1E4620" }}
              className="text-3xl lg:text-4xl font-extrabold"
            >
              Top Selling Products
            </h2>
            <motion.div
              className="h-1 rounded-full mt-3"
              style={{ backgroundColor: "#6FAE3E" }}
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          <motion.a
            href="/products"
            whileHover={{ x: 4 }}
            className="text-sm font-semibold hidden sm:block"
            style={{ color: "#1E4620" }}
          >
            View All →
          </motion.a>
        </motion.div>


        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)}
        </motion.div>
      </div>
    </section>
  );
}