"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Check, Filter, Search, ArrowLeft } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

const FALLBACK_PRODUCTS = [
  {
    id: "1",
    slug: "beetroot",
    name: "Organic Beetroot Powder",
    category: "Roots",
    price: 299,
    mrp: 399,
    unit: "200g",
    rating: 4.7,
    reviews: 128,
    isBestSeller: true,
    description: "Naturally rich in nitrates and antioxidants, beetroot supports stamina, heart health, and circulation.",
    images: ["/products/beetroot_1.webp"],
  },
  {
    id: "2",
    slug: "gooseberry",
    name: "Pure Gooseberry (Amla) Powder",
    category: "Immunity",
    price: 349,
    mrp: 449,
    unit: "200g",
    rating: 4.8,
    reviews: 94,
    isBestSeller: true,
    description: "Packed with natural Vitamin C, amla supports glowing skin, immunity, and digestive health.",
    images: ["/products/goosberry_1.webp"],
  },
  {
    id: "3",
    slug: "moringa",
    name: "Moringa Superleaf Powder",
    category: "Wellness",
    price: 399,
    mrp: 499,
    unit: "200g",
    rating: 4.7,
    reviews: 143,
    isBestSeller: true,
    description: "Nutrient-dense superleaf providing daily vitality, plant protein, and essential minerals.",
    images: ["/products/moringa_1.webp"],
  },
  {
    id: "4",
    slug: "neem",
    name: "Neem Detox Powder",
    category: "Wellness",
    price: 389,
    mrp: 499,
    unit: "200g",
    rating: 4.6,
    reviews: 68,
    isBestSeller: false,
    description: "Traditional Ayurvedic cleanser supporting clear skin, balanced gut, and internal purification.",
    images: ["/products/neem_1.webp"],
  },
  {
    id: "5",
    slug: "everfit",
    name: "Everfit Daily Vitality Capsules",
    category: "Immunity",
    price: 499,
    mrp: 649,
    unit: "60 capsules",
    rating: 4.6,
    reviews: 72,
    isBestSeller: true,
    description: "Potent daily vitality capsules crafted for active professionals and holistic well-being.",
    images: ["/products/everfit_1.webp"],
  },
  {
    id: "6",
    slug: "giloy-powder",
    name: "Giloy Immunity Extract Powder",
    category: "Immunity",
    price: 429,
    mrp: 549,
    unit: "200g",
    rating: 4.8,
    reviews: 101,
    isBestSeller: true,
    description: "Ayurvedic rejuvenating herb traditionally renowned for boosting white blood cell immunity.",
    images: ["/products/giloy_1.webp"],
  },
];

const CATEGORIES = ["All", "Wellness", "Immunity", "Roots"];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [addedMap, setAddedMap] = useState({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch {
        // fallback
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchCategory =
          selectedCategory === "All" ||
          p.category?.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchCategory && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  function handleAdd(product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      unit: product.unit,
      image: product.images?.[0] || null,
    }, true);

    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-3 hover:opacity-75 transition-opacity"
            style={{ color: "#1E4620" }}
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Farm-Fresh Shop & Wellness
          </h1>
          <p className="text-xs sm:text-sm mt-2" style={{ color: "#7A8B6F" }}>
            Explore certified organic vegetables, superfoods, and daily vitality powders delivered straight from our farm.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div
          className="rounded-3xl border p-4 sm:p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: selectedCategory === cat ? "#1E4620" : "#FFFFFF",
                  color: selectedCategory === cat ? "#FFFFFF" : "#1E4620",
                  border: "1px solid #E5E7EB",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 border bg-white flex-1 md:w-64"
              style={{ borderColor: "#E5E7EB" }}
            >
              <Search size={14} color="#7A8B6F" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs outline-none text-[#1E4620] w-full"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Filter size={14} color="#1E4620" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full px-3 py-2 text-xs font-semibold bg-white border border-[#E5E7EB] text-[#1E4620] outline-none cursor-pointer"
              >
                <option value="popular">Best Sellers</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-base font-bold" style={{ color: "#1E4620" }}>
              No products found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-white cursor-pointer"
              style={{ backgroundColor: "#6FAE3E" }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
              const isAdded = !!addedMap[product.id];

              return (
                <div
                  key={product.id}
                  className="rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-sm"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                >
                  <Link href={`/products/${product.slug}`} className="block relative aspect-square p-8" style={{ backgroundColor: "#F9FAFB" }}>
                    {discount > 0 && (
                      <span
                        className="absolute top-4 left-4 text-[10px] font-bold text-white px-3 py-1 rounded-full z-10"
                        style={{ backgroundColor: "#D9483A" }}
                      >
                        {discount}% OFF
                      </span>
                    )}

                    {product.isBestSeller && (
                      <span
                        className="absolute top-4 right-4 text-[10px] font-bold text-white px-3 py-1 rounded-full z-10"
                        style={{ backgroundColor: "#1E4620" }}
                      >
                        Bestseller
                      </span>
                    )}

                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-6 transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🌱</div>
                    )}
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star size={13} fill="#F0B429" color="#F0B429" />
                        <span className="text-xs font-bold" style={{ color: "#1E4620" }}>
                          {product.rating}
                        </span>
                        <span className="text-xs" style={{ color: "#6B7280" }}>
                          ({product.reviews} reviews)
                        </span>
                      </div>

                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-base font-extrabold hover:underline" style={{ color: "#1E4620" }}>
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs mt-1.5 line-clamp-2" style={{ color: "#7A8B6F" }}>
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: "#F3F4F6" }}>
                      <div>
                        <span className="text-lg font-black" style={{ color: "#1E4620" }}>
                          ₹{product.price}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-xs line-through ml-2" style={{ color: "#6B7280" }}>
                            ₹{product.mrp}
                          </span>
                        )}
                        <span className="block text-[11px]" style={{ color: "#6B7280" }}>
                          {product.unit}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white transition-all hover:scale-105 cursor-pointer shadow-sm"
                        style={{ backgroundColor: isAdded ? "#1E4620" : "#6FAE3E" }}
                      >
                        {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
                        <span>{isAdded ? "Added!" : "Add to Cart"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
