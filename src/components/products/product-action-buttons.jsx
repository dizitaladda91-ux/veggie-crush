"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Zap, Check, Minus, Plus } from "lucide-react";
import { useCart } from "../cart/cart-provider";

export default function ProductActionButtons({ product, mainVariant, image }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
      quantity,
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
      quantity,
    }, false);

    router.push("/checkout");
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#4B5443]">Quantity</span>
        <div className="flex items-center gap-4 rounded-full border border-[#E5E7EB] px-2 py-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity === 1}
            className="grid h-8 w-8 place-items-center rounded-full text-[#1E4620] transition-colors hover:bg-[#EAF4DA] disabled:opacity-40"
          >
            <Minus size={15} />
          </button>
          <span aria-live="polite" className="min-w-5 text-center text-sm font-bold text-[#1E4620]">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => Math.min(99, value + 1))}
            disabled={quantity === 99}
            className="grid h-8 w-8 place-items-center rounded-full text-[#1E4620] transition-colors hover:bg-[#EAF4DA] disabled:opacity-40"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex-1 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
        style={{ backgroundColor: added ? "#1E4620" : "#6FAE3E" }}
      >
        {added ? <Check size={18} /> : <ShoppingBag size={18} />}
        <span>{added ? "Added to Basket!" : `Add ${quantity > 1 ? `${quantity} to` : "to"} Cart`}</span>
      </button>

      <button
        type="button"
        onClick={handleBuyNow}
        className="flex-1 flex items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] cursor-pointer"
        style={{ borderColor: "#1E4620", color: "#1E4620", backgroundColor: "#FFFFFF" }}
      >
        <Zap size={18} fill="#1E4620" color="#1E4620" />
        <span>Buy Now</span>
      </button>
      </div>
      <p className="text-center text-xs text-[#7A8B6F]">
        Secure checkout · Delivery details collected at checkout
      </p>
    </div>
  );
}
