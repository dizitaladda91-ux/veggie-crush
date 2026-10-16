"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import WishlistButton from "@/components/products/wishlist-button";
import { getCloudinaryImageUrl } from "@/lib/cloudinary-url";

export default function UnifiedProductCard({ product, className = "" }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  // Extract raw fields with fallbacks
  const isCombo = Boolean(
    product.isCombo ||
    product.kind === "combo" ||
    product.packSize ||
    (product.products && product.products.length > 0)
  );

  const id = product.id || product.slug || "product-item";
  const slug = product.slug || product.id;
  const name = product.name || "Pure Superfood Powder";
  const price = Number(product.bundlePrice ?? product.price ?? 0);
  const mrp = Number(product.mrp ?? Math.round(price * 1.3));
  const savings = mrp > price ? mrp - price : 0;
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  // Product Image
  const rawImage =
    (Array.isArray(product.images) && product.images[0]) ||
    product.image ||
    product.images ||
    "/products/beetroot_1.webp";

  const imageSrc =
    typeof rawImage === "string" && rawImage.startsWith("http")
      ? getCloudinaryImageUrl(rawImage, 800)
      : rawImage;

  // Pack Size / Unit
  const size =
    product.size ||
    product.unit ||
    (isCombo ? "Curated Bundle" : "200 g Glass Jar");

  // Tag Badge (Top Left)
  const tag =
    product.tag ||
    (discountPercent > 0
      ? `Save ${discountPercent}%`
      : product.isBestSeller
      ? "Most Loved"
      : "100% Pure");

  // Rating
  const rating = Number(product.rating || 4.8).toFixed(1);

  // Tagline (Eyebrow)
  const tagline =
    product.tagline ||
    product.category ||
    product.code ||
    (isCombo ? "Curated Combo" : "Pure Botanical");

  // Description
  const description =
    product.description ||
    product.desc ||
    (isCombo
      ? "Convenient daily combination of machine-dried botanical powders for pure nutrition."
      : "Machine-dried at controlled low temperatures and finely sieved for smooth daily mixing.");

  // Benefits Chips
  const benefits =
    Array.isArray(product.benefits) && product.benefits.length > 0
      ? product.benefits.slice(0, 3)
      : isCombo && Array.isArray(product.products)
      ? product.products.map((p) => p.shortName || p.name).slice(0, 3)
      : ["Machine-Dried", "Pure Powder", "No Fillers"];

  // Navigation Link
  const href = isCombo ? `/combos/${slug}` : `/products/${slug}`;

  // Cart Handler
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id,
      slug,
      name,
      price,
      mrp,
      size,
      unit: size,
      image: imageSrc,
      kind: isCombo ? "combo" : "single",
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article
      className={`group rounded-3xl border border-[#E6EFE3] bg-[#FAF7F2] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top Image Container */}
        <div className="relative aspect-[4/3] bg-gradient-to-b from-[#F2F7EF] to-[#E5EFE1] p-6 flex items-center justify-center overflow-hidden">
          <Link href={href} className="absolute inset-0 z-0">
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Top-Left Tag Badge */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-[#1B5E20] text-white shadow-sm">
              {tag}
            </span>
          </div>

          {/* Top-Right: Rating Pill + Wishlist */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1B5E20] text-xs font-bold shadow-xs">
              <Star size={12} fill="#E8871E" color="#E8871E" />
              <span>{rating}</span>
            </div>
            {product.id && (
              <WishlistButton
                productId={String(product.id)}
                className="h-8 w-8 rounded-full bg-white/90 shadow-xs"
              />
            )}
          </div>

          {/* Bottom-Left Pack Size Pill */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <span className="text-[11px] font-semibold text-[#5A735E] bg-white/80 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
              {size}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <span className="text-xs font-bold text-[#7CB342] uppercase tracking-wide">
            {tagline}
          </span>
          <Link href={href} className="block group/title">
            <h3
              className="text-xl sm:text-2xl font-bold text-[#1B5E20] mt-1 mb-2 group-hover/title:text-[#E8871E] transition-colors leading-snug line-clamp-1"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              {name}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-[#4E6652] leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>

          {/* Benefit Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {benefits.map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-[#DEEBD7] text-[#2F5234]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="p-6 pt-0 border-t border-[#E8EFE5] flex items-center justify-between mt-auto">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-extrabold text-[#1B5E20]">
              ₹{price}
            </span>
            {savings > 0 && (
              <span className="text-xs text-[#8A9B8C] line-through">
                ₹{mrp}
              </span>
            )}
          </div>
          {savings > 0 ? (
            <span className="text-[10px] text-[#E8871E] font-bold">
              Save ₹{savings}
            </span>
          ) : (
            <span className="text-[10px] text-[#7CB342] font-semibold">
              Pure Farm Direct
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={href}
            className="p-2.5 rounded-full text-xs font-bold text-[#1B5E20] hover:bg-[#EAF4DA] transition-colors"
            title="View details"
          >
            <ArrowRight size={17} />
          </Link>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
              justAdded
                ? "bg-[#7CB342] text-white"
                : "bg-[#1B5E20] hover:bg-[#E8871E] text-white"
            }`}
          >
            {justAdded ? (
              <>
                <Check size={13} strokeWidth={2.5} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
