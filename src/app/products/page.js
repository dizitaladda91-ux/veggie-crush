"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Check, Filter, Search, ArrowLeft, Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import WishlistButton from "@/components/products/wishlist-button";
import ImageZoom from "@/components/products/image-zoom";
import { getCloudinaryImageUrl } from "@/lib/cloudinary-url";

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
const PRODUCTS_PER_PAGE = 6;
const API_PAGE_LIMIT = 50;

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [addedMap, setAddedMap] = useState({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/products?page=1&limit=${API_PAGE_LIMIT}`);
        if (!res.ok) throw new Error("Unable to load products");
        const data = await res.json();
        const totalPages = data.pagination?.totalPages || 1;
        const allProducts = [...(data.products || [])];
        for (let page = 2; page <= totalPages; page += 1) {
          const pageRes = await fetch(`/api/products?page=${page}&limit=${API_PAGE_LIMIT}`);
          if (!pageRes.ok) throw new Error("Unable to load all products");
          const pageData = await pageRes.json();
          allProducts.push(...(pageData.products || []));
        }
        if (!cancelled && allProducts.length > 0) {
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Unable to load products:", error);
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

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  function handleAdd(product) {
    addToCart({
      id: product.id,
      slug: product.slug,
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
            style={{ color: "#1E4620" }}
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
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs outline-none text-[#1E4620] w-full"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Filter size={14} color="#1E4620" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
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
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setCurrentPage(1);
              }}
              className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-white cursor-pointer"
              style={{ backgroundColor: "#6FAE3E" }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visibleProducts.map((product) => {
                const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
                const isAdded = !!addedMap[product.id];
                const badgeText = product.isBestSeller
                ? "MOST LOVED"
                : discount > 0
                ? `${discount}% OFF`
                : "100% ORGANIC";

                return (
                  <div
                  key={product.id}
                  className="group relative rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-sm"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                >
                  {/* Top Image Container with Floating Pill */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F9FAFB] sm:aspect-square">
                    {/* Floating Pill Badge matching reference "MOST LOVED" pill */}
                    <span
                      className="pointer-events-none absolute left-3.5 top-3.5 z-10 rounded-full border border-black/5 bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1E4620] shadow-sm backdrop-blur-sm"
                    >
                      {badgeText}
                    </span>

                    {product.images?.[0] ? (
                      <ImageZoom
                        src={getCloudinaryImageUrl(product.images[0], 1600)}
                        alt={product.name}
                        className="h-full w-full"
                      >
                        <Image
                          src={getCloudinaryImageUrl(product.images[0], 600)}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </ImageZoom>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🌱</div>
                    )}
                    <div className="absolute right-3 top-3 z-20">
                      <WishlistButton productId={product.id} className="h-10 w-10" />
                    </div>
                  </div>

                  {/* Bottom Details Section */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <Link
                      href={`/products/${product.slug}`}
                      aria-label={`View details for ${product.name}`}
                      className="flex flex-1 flex-col"
                    >
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-[#1E2E1C] group-hover:text-[#6FAE3E] transition-colors leading-snug mb-1">
                          {product.name}
                        </h3>

                        <p className="text-xs text-[#6B7280] font-normal leading-relaxed line-clamp-1 mb-5">
                          {product.description || (product.unit ? `100% Pure Organic · ${product.unit}` : "Farm-fresh daily harvest")}
                        </p>
                      </div>

                      <div className="mt-auto flex items-baseline gap-1.5 pt-2">
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
                    </Link>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        aria-label={`Add ${product.name} to cart`}
                        className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer shadow-sm ${
                          isAdded
                            ? "bg-[#1E4620] border-[#1E4620] text-white"
                            : "border-[#D1D5DB] text-[#1E4620] hover:border-[#1E4620] hover:bg-[#1E4620] hover:text-white bg-white"
                        }`}
                      >
                        {isAdded ? (
                          <Check size={18} strokeWidth={2.5} />
                        ) : (
                          <Plus size={20} strokeWidth={1.6} />
                        )}
                      </button>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>
            {totalPages > 1 && (
              <nav
                aria-label="Product pagination"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border px-4 py-2 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ borderColor: "#E5E7EB", color: "#1E4620" }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className="h-9 min-w-9 rounded-full border px-3 text-xs font-bold transition-colors"
                    style={{
                      backgroundColor: currentPage === page ? "#1E4620" : "#FFFFFF",
                      borderColor: currentPage === page ? "#1E4620" : "#E5E7EB",
                      color: currentPage === page ? "#FFFFFF" : "#1E4620",
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border px-4 py-2 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ borderColor: "#E5E7EB", color: "#1E4620" }}
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}
