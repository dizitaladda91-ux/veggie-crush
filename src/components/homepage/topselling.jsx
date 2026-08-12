"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Heart, Check, Eye, Image as ImageIcon } from "lucide-react";
import { useCart } from "../cart/cart-provider";

const FALLBACK_PRODUCTS = [
  { id: "1", name: "Vine Tomatoes", price: 49, mrp: 65, unit: "500g", rating: 4.6, reviews: 128 },
  { id: "2", name: "Farm Carrots", price: 39, mrp: 50, unit: "500g", rating: 4.8, reviews: 94 },
  { id: "3", name: "Broccoli Florets", price: 79, mrp: 99, unit: "300g", rating: 4.5, reviews: 61 },
  { id: "4", name: "Baby Spinach", price: 35, mrp: 45, unit: "200g", rating: 4.7, reviews: 143 },
  { id: "5", name: "Green Chillies", price: 19, mrp: 25, unit: "150g", rating: 4.3, reviews: 52 },
  { id: "6", name: "Garlic Bulbs", price: 45, mrp: 60, unit: "250g", rating: 4.9, reviews: 187 },
  { id: "7", name: "Sweet Corn", price: 55, mrp: 70, unit: "3 pcs", rating: 4.4, reviews: 76 },
  { id: "8", name: "Red Onions", price: 29, mrp: 38, unit: "1kg", rating: 4.6, reviews: 210 },
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

  function handleAdd() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      unit: product.unit,
      image: product.images?.[0] || null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative rounded-3xl overflow-hidden border"
      style={{ backgroundColor: "#FBF7EC", borderColor: "#E7DCC2" }}
    >
      <div
        className="relative aspect-square flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#F0E8D6" }}
      >
        <motion.div
          className="absolute -right-10 -top-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: "#6FAE3E22" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {discount > 0 && (
          <motion.span
            initial={{ scale: 0, rotate: -8 }}
            animate={{ scale: 1, rotate: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.2 }}
            className="absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full z-10"
            style={{ backgroundColor: "#D9483A" }}
          >
            {discount}% OFF
          </motion.span>
        )}

        <motion.button
          onClick={() => setWishlisted((w) => !w)}
          whileTap={{ scale: 0.8 }}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full grid place-items-center z-10 backdrop-blur-sm"
          style={{ backgroundColor: "#FBF7ECcc" }}
        >
          <Heart
            size={15}
            fill={wishlisted ? "#D9483A" : "none"}
            color={wishlisted ? "#D9483A" : "#4B5443"}
          />
        </motion.button>

        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="relative z-[1] h-full w-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="relative z-[1] mx-8 flex h-[calc(100%-4rem)] w-full items-center justify-center border-2 border-dashed rounded-2xl" style={{ borderColor: "#D8CBA8", color: "#8B8064" }}>
            <ImageIcon size={30} strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}

        <motion.div
          initial={{ y: "100%" }}
          whileHover={{ y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-2.5"
          style={{ backgroundColor: "#1E4620dd" }}
        >
          <Eye size={13} color="#ffffff" />
          <span className="text-[11px] font-semibold text-white">Quick View</span>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold mb-1" style={{ color: "#1E4620" }}>
          {product.name}
        </h3>
        <p className="text-xs mb-2" style={{ color: "#8B8064" }}>
          {product.unit}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <Star size={13} fill="#F0B429" color="#F0B429" />
          <span className="text-xs font-semibold" style={{ color: "#4B5443" }}>
            {product.rating}
          </span>
          <span className="text-xs" style={{ color: "#8B8064" }}>
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold" style={{ color: "#1E4620" }}>
              ₹{product.price}
            </span>
            {discount > 0 && (
              <span className="text-xs line-through" style={{ color: "#B7AE8D" }}>
                ₹{product.mrp}
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.88 }}
            aria-label={`Add ${product.name} to cart`}
            className="relative w-9 h-9 rounded-full grid place-items-center text-white shrink-0 overflow-hidden"
            style={{ backgroundColor: added ? "#1E4620" : "#6FAE3E" }}
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
                  <Check size={15} />
                </motion.span>
              ) : (
                <motion.span
                  key="cart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <ShoppingCart size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductSkeleton() {
  return (
    <div
      className="rounded-3xl overflow-hidden border"
      style={{ backgroundColor: "#FBF7EC", borderColor: "#E7DCC2" }}
    >
      <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#F0E8D6" }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, #FBF7EC66, transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: "#F0E8D6" }} />
        <div className="h-3 w-1/2 rounded-full" style={{ backgroundColor: "#F0E8D6" }} />
        <div className="h-4 w-1/3 rounded-full" style={{ backgroundColor: "#F0E8D6" }} />
      </div>
    </div>
  );
}

export default function TopSellingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products/top-selling");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        if (!cancelled) setProducts(data.products);
      } catch (err) {
        if (!cancelled) {
          setError(true);
          setProducts(FALLBACK_PRODUCTS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section style={{ backgroundColor: "#FBF7EC" }} className="relative w-full px-6 lg:px-10 py-16 overflow-hidden">
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
              style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
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

        {error && (
          <p className="text-xs mb-4" style={{ color: "#D9483A" }}>
            Live inventory unavailable — showing cached picks.
          </p>
        )}

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