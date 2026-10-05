"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderComplete, setOrderComplete] = useState(null);

  const deliveryFee = subtotal >= 599 || subtotal === 0 ? 0 : 49;
  const grandTotal = subtotal + deliveryFee;

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCheckout(e) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.line1 || !formData.city || !formData.pincode) {
      setError("Please fill in all mandatory shipping address fields.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on backend
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress: formData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initiate order");

      const { orderId, razorpayOrderId, amount, currency, key } = data;

      // 2. Check if Razorpay SDK is loaded, or handle mock development flow
      if (typeof window !== "undefined" && window.Razorpay && key && !key.includes("mock") && !key.includes("placeholder")) {
        const options = {
          key,
          amount,
          currency,
          name: "VeggieCrush",
          description: "Fresh Farm Produce & Wellness Order",
          order_id: razorpayOrderId,
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#1E4620" },
          handler: async function (response) {
            try {
              const verifyRes = await fetch("/api/checkout/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok) {
                clearCart();
                setOrderComplete({ orderId, ...verifyData.order });
              } else {
                setError(verifyData.error || "Payment verification failed.");
              }
            } catch {
              setError("Payment verification encountered an issue.");
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Dev / Test simulation mode
        const verifyRes = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            razorpay_order_id: razorpayOrderId || "mock_order",
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: "mock_signature",
          }),
        });

        const verifyData = await verifyRes.json();
        clearCart();
        setOrderComplete({ orderId, ...verifyData.order });
      }
    } catch (err) {
      setError(err.message || "An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen py-16 px-6 lg:px-10 flex items-center justify-center" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-md w-full rounded-3xl border p-8 text-center shadow-xl" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: "#EAF4DA" }}>
            <CheckCircle2 size={36} color="#6FAE3E" />
          </div>
          <h1 className="text-2xl font-black mb-2" style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}>
            Order Confirmed!
          </h1>
          <p className="text-xs text-[#7A8B6F] mb-6">
            Thank you for ordering with VeggieCrush. Your farm-fresh produce is being packed at the farm.
          </p>
          <div className="rounded-2xl p-4 text-left text-xs space-y-2 mb-6" style={{ backgroundColor: "#F9FAFB" }}>
            <div className="flex justify-between font-semibold" style={{ color: "#1E4620" }}>
              <span>Order Reference:</span>
              <span className="font-mono">{orderComplete.orderId?.slice(-8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between" style={{ color: "#4B5443" }}>
              <span>Delivery Status:</span>
              <span className="font-bold text-[#6FAE3E]">Harvest Scheduled</span>
            </div>
          </div>
          <Link
            href="/"
            className="w-full inline-block rounded-full py-3.5 text-xs font-bold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#1E4620" }}
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Return to Farm Store</span>
        </Link>

        <h1
          className="text-3xl sm:text-4xl font-black mb-8 tracking-tight"
          style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
        >
          Secure Checkout
        </h1>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping Form */}
          <div className="lg:col-span-7 rounded-3xl border p-6 sm:p-8 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#1E4620" }}>
              <Truck size={18} color="#6FAE3E" />
              <span>1. Delivery Address</span>
            </h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5443" }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs rounded-xl border p-3 outline-none"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5443" }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full text-xs rounded-xl border p-3 outline-none"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5443" }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="For order receipt & tracking updates"
                  className="w-full text-xs rounded-xl border p-3 outline-none"
                  style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5443" }}>Address Line 1 (House No, Building, Street) *</label>
                <input
                  type="text"
                  required
                  name="line1"
                  value={formData.line1}
                  onChange={handleChange}
                  placeholder="Flat / House No., Apartment, Street"
                  className="w-full text-xs rounded-xl border p-3 outline-none"
                  style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5443" }}>City *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full text-xs rounded-xl border p-3 outline-none"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5443" }}>State *</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full text-xs rounded-xl border p-3 outline-none"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#4B5443" }}>Pincode *</label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6 digits"
                    className="w-full text-xs rounded-xl border p-3 outline-none"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full mt-6 rounded-full py-4 text-xs font-bold text-white transition-transform hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#6FAE3E" }}
              >
                {loading ? "Processing Secure Order..." : `Pay ₹${grandTotal} & Place Order`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 rounded-3xl border p-6 sm:p-7 shadow-sm" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
            <h2 className="text-base font-bold mb-4" style={{ color: "#1E4620" }}>
              Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
            </h2>

            <div className="divide-y divide-[#E5E7EB] max-h-80 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border bg-white" style={{ borderColor: "#E5E7EB" }}>
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="48px" className="object-contain p-1" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs">🌱</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: "#1E4620" }}>{item.name}</p>
                    <p className="text-[11px]" style={{ color: "#6B7280" }}>Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-extrabold" style={{ color: "#1E4620" }}>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-xs" style={{ borderColor: "#E5E7EB" }}>
              <div className="flex justify-between" style={{ color: "#4B5443" }}>
                <span>Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between" style={{ color: "#4B5443" }}>
                <span>Farm Delivery</span>
                <span className="font-bold">{deliveryFee === 0 ? "FREE" : "₹49"}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-black" style={{ borderColor: "#E5E7EB", color: "#1E4620" }}>
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px]" style={{ color: "#7A8B6F" }}>
              <ShieldCheck size={14} color="#6FAE3E" />
              <span>100% Encrypted & Safe Payments</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
