"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Zap, Check } from "lucide-react";
import { useCart } from "../cart/cart-provider";

export default function ProductActionButtons({ product, mainVariant, image }) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const price = mainVariant ? mainVariant.price / 100 : product.startingAt;
  const mrp = mainVariant ? mainVariant.mrp / 100 : product.startingAt;

  function handleAddToCart() {
    addToCart({
      id: product.id,
      slug: product.slug,
      variantId: mainVariant?.id,
      name: product.name,
      price,
      mrp,
      unit: mainVariant?.label || "Standard",
      image,
    }, true);

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addToCart({
      id: product.id,
      slug: product.slug,
      variantId: mainVariant?.id,
      name: product.name,
      price,
      mrp,
      unit: mainVariant?.label || "Standard",
      image,
    }, false);

    router.push("/checkout");
  }

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        onClick={handleAddToCart}
        className="flex-1 flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
        style={{ backgroundColor: added ? "#1E4620" : "#6FAE3E" }}
      >
        {added ? <Check size={18} /> : <ShoppingBag size={18} />}
        <span>{added ? "Added to Basket!" : "Add to Cart"}</span>
      </button>

      <button
        onClick={handleBuyNow}
        className="flex-1 flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] cursor-pointer"
        style={{ borderColor: "#1E4620", color: "#1E4620", backgroundColor: "#FFFFFF" }}
      >
        <Zap size={18} fill="#1E4620" color="#1E4620" />
        <span>Buy Now</span>
      </button>
    </div>
  );
}
