"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

export default function ComboDetailActionButton({ combo, image }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart({
      id: combo.id,
      comboId: combo.id,
      kind: "combo",
      name: combo.name,
      price: combo.bundlePrice,
      image: image || null,
    }, true);

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1E4620] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#2C5F31]"
    >
      {added ? <Check size={18} /> : <ShoppingBag size={18} />}
      {added ? "Added to Basket!" : "Add combo to cart"}
    </button>
  );
}
