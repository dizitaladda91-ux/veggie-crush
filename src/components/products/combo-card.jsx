"use client";

import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { getCloudinaryImageUrl } from "@/lib/cloudinary-url";

export default function ComboCard({ combo }) {
  const { addToCart } = useCart();
  const firstImage = combo.images?.[0];
  const secondImage = combo.images?.[1];
  const price = combo.bundlePrice ?? combo.price ?? 0;
  const detailsHref = combo.catalogProduct
    ? `/products/${combo.slug}`
    : `/combos/${combo.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={detailsHref} aria-label={`View details for ${combo.name}`} className="relative block aspect-square overflow-hidden bg-[#F9FAFB]">
        {firstImage ? (
          <>
            <Image
              src={getCloudinaryImageUrl(firstImage, 600)}
              alt={combo.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none ${secondImage ? "group-hover:opacity-0" : ""}`}
            />
            {secondImage && (
              <Image
                src={getCloudinaryImageUrl(secondImage, 600)}
                alt={`${combo.name} alternate view`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:scale-110 group-hover:opacity-100 motion-reduce:transition-none"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <ImageIcon size={32} aria-hidden="true" />
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={detailsHref} aria-label={`View details for ${combo.name}`} className="flex flex-1 flex-col">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#5C8E42]">{combo.code}</p>
          <h3 className="text-lg font-bold text-[#173719]">{combo.name}</h3>
          {combo.products?.length > 0 && (
            <p className="mt-2 text-sm text-[#667E6A]">
              Includes {combo.products.map((product) => product.shortName || product.name).join(", ")}
            </p>
          )}
          <p className="mt-auto pt-4 text-xl font-extrabold text-[#173719]">₹{price}</p>
        </Link>
        <button
          type="button"
          onClick={() => addToCart(combo.catalogProduct
            ? {
              id: combo.id,
              slug: combo.slug,
              name: combo.name,
              price,
              mrp: combo.mrp,
              unit: combo.size,
              image: firstImage || null,
            }
            : {
              id: combo.id,
              comboId: combo.id,
              kind: "combo",
              name: combo.name,
              price,
              image: firstImage || null,
            })}
          className="mt-4 rounded-full bg-[#1E4620] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2C5F31]"
        >
          {combo.catalogProduct ? "Add bundle to cart" : "Add combo to cart"}
        </button>
      </div>
    </article>
  );
}
