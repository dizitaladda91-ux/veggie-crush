"use client";

import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import WishlistButton from "@/components/products/wishlist-button";
import { getCloudinaryImageUrl } from "@/lib/cloudinary-url";

export default function NewArrivalProductCard({ product }) {
  const { addToCart } = useCart();
  const firstImage = product.images?.[0];
  const secondImage = product.images?.[1];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm transition hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-[#F9FAFB]">
        {firstImage ? (
          <Image
            src={getCloudinaryImageUrl(firstImage, 600)}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-300 ${secondImage ? "group-hover:opacity-0" : ""}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <ImageIcon size={32} aria-hidden="true" />
          </div>
        )}
        {secondImage && (
          <Image
            src={getCloudinaryImageUrl(secondImage, 600)}
            alt={`${product.name} alternate view`}
            fill
            unoptimized
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <WishlistButton productId={product.id} className="absolute right-3 top-3 z-10 h-10 w-10" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View details for ${product.name}`}
          className="flex flex-1 flex-col"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#5C8E42]">Single product</p>
          <h3 className="text-lg font-semibold text-[#173719]">{product.name}</h3>
          <p className="mt-1 text-sm text-[#667E6A]">{product.size}</p>
          <p className="mt-auto pt-4 text-xl font-semibold text-[#173719]">₹{product.price}</p>
        </Link>
        <button
          type="button"
          onClick={() => addToCart({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            unit: product.size,
            image: firstImage || null,
          })}
          className="mt-4 rounded-full bg-[#1E4620] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2C5F31]"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
