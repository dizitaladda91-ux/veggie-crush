"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-screen max-w-md flex flex-col shadow-2xl border-l"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
            >
              {/* Header */}
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={20} color="#1E4620" />
                  <h2 className="text-lg font-black tracking-tight" style={{ color: "#1E4620" }}>
                    Your Basket
                  </h2>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: "#6FAE3E" }}
                  >
                    {itemCount}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="p-2 rounded-full hover:bg-[#F3F4F6] transition-colors"
                >
                  <X size={20} color="#1E4620" />
                </button>
              </div>

              {/* Free shipping milestone bar */}
              <div className="px-5 py-3 border-b text-xs" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
                <div className="flex items-center justify-between mb-1.5 font-semibold" style={{ color: "#1E4620" }}>
                  <span className="flex items-center gap-1.5">
                    <Truck size={14} color="#6FAE3E" />
                    {amountNeeded === 0 ? "You've unlocked FREE Farm Delivery! 🎉" : `Add ₹${amountNeeded} more for FREE delivery`}
                  </span>
                  <span>{shippingProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden bg-[#E5E7EB]">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${shippingProgress}%`,
                      backgroundColor: amountNeeded === 0 ? "#1E4620" : "#6FAE3E",
                    }}
                  />
                </div>
              </div>

              {/* Items List or Empty state */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: "#EAF4DA" }}
                    >
                      <ShoppingBag size={28} color="#1E4620" />
                    </div>
                    <h3 className="text-base font-bold mb-1" style={{ color: "#1E4620" }}>
                      Your cart is empty
                    </h3>
                    <p className="text-xs max-w-[220px] mb-6" style={{ color: "#6B7280" }}>
                      Looks like you haven&apos;t added any farm fresh vegetables or wellness herbs yet.
                    </p>
                    <button
                      onClick={closeCart}
                      className="rounded-full px-6 py-2.5 text-xs font-bold text-white transition-transform hover:scale-105"
                      style={{ backgroundColor: "#6FAE3E" }}
                    >
                      Explore Fresh Picks
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3.5 p-3 rounded-2xl border"
                      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-[#6B7280]">
                            🌱
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate" style={{ color: "#1E4620" }}>
                          {item.name}
                        </h4>
                        <p className="text-xs mb-2" style={{ color: "#6B7280" }}>
                          {item.unit || "Pack"}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-extrabold" style={{ color: "#1E4620" }}>
                            ₹{item.price * item.quantity}
                          </span>

                          {/* Quantity stepper */}
                          <div className="flex items-center gap-2 border rounded-full px-2 py-0.5" style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="text-[#1E4620] hover:opacity-70 p-0.5"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center" style={{ color: "#1E4620" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="text-[#1E4620] hover:opacity-70 p-0.5"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

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
                <div className="p-5 border-t space-y-3" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold" style={{ color: "#4B5443" }}>Subtotal</span>
                    <span className="text-lg font-extrabold" style={{ color: "#1E4620" }}>
                      ₹{subtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs" style={{ color: "#6B7280" }}>
                    <span>Shipping</span>
                    <span>{amountNeeded === 0 ? "FREE" : "₹49"}</span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: "#6FAE3E" }}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={16} />
                  </Link>

                  <div className="flex items-center justify-center gap-2 pt-1 text-[11px]" style={{ color: "#7A8B6F" }}>
                    <ShieldCheck size={14} color="#6FAE3E" />
                    <span>Guaranteed 100% Fresh & Safe Checkout</span>
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
