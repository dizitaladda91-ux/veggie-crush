"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "./cart-provider";

const FREE_SHIPPING_THRESHOLD = 599;

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          className="w-screen max-w-md flex flex-col shadow-2xl border-l bg-white border-[#E5E7EB]"
        >
          {/* Header */}
          <div className="p-5 border-b flex items-center justify-between border-[#E5E7EB]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={20} color="#1E4620" />
              <h2 className="text-lg font-black tracking-tight text-[#1E4620]">
                Your Basket
              </h2>
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EAF4DA] text-[#1E4620]"
              >
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 border-b border-[#E5E7EB] bg-[#F7FAF5]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <div className="flex items-center gap-1.5 text-[#1E4620]">
                <Truck size={14} />
                <span>
                  {amountNeeded === 0 ? (
                    <strong className="text-[#6FAE3E]">Congratulations! Free Shipping Unlocked!</strong>
                  ) : (
                    <>Add <strong>₹{amountNeeded}</strong> more for free delivery</>
                  )}
                </span>
              </div>
              <span className="text-[#5C7560] font-bold">{shippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-[#E2EBE0]">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${shippingProgress}%`,
                  backgroundColor: amountNeeded === 0 ? "#6FAE3E" : "#D97706",
                }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#F2F7F0] text-[#1E4620]"
                >
                  <ShoppingBag size={32} />
                </div>
                <h3 className="text-base font-bold text-[#1E4620] mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#5C7560] max-w-xs mx-auto mb-6">
                  Experience pure nutrition. Explore our cold-crushed superfood powders today.
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: "#1E4620" }}
                >
                  <span>Explore Products</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm"
                >
                  {/* Item Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F7FAF5] flex-shrink-0 border border-[#E5E7EB]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        VeggieCrush
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-sm font-bold text-[#1E4620] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#5C7560]">
                        ₹{item.price} {item.unit ? `· ${item.unit}` : ""}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#CBDDC5] rounded-full overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="px-2.5 py-1 text-xs text-gray-600 hover:bg-[#F2F7F0] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1E4620] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-2.5 py-1 text-xs text-gray-600 hover:bg-[#F2F7F0] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#1E4620]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="text-[#9CA3AF] hover:text-[#D9483A] p-2 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t space-y-3 bg-[#F9FAFB] border-[#E5E7EB]">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[#4B5443]">Subtotal</span>
                <span className="text-lg font-extrabold text-[#1E4620]">
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span>Shipping</span>
                <span>{amountNeeded === 0 ? "FREE" : "₹49"}</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white shadow-md bg-[#6FAE3E]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Link>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#7A8B6F]">
                <ShieldCheck size={14} color="#6FAE3E" />
                <span>Guaranteed 100% Fresh &amp; Safe Checkout</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
