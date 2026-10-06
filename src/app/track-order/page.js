"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Truck, CheckCircle2, Clock, MapPin, PackageCheck, AlertCircle } from "lucide-react";

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleTrack(e) {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
      setOrderData({
        id: orderQuery.toUpperCase().startsWith("ORD-") ? orderQuery.toUpperCase() : `ORD-${orderQuery.slice(-6).toUpperCase()}`,
        status: "out_for_delivery",
        orderDate: "Today, 6:30 AM",
        deliveryEstimated: "Today by 6:00 PM",
        driverName: "Vikram R.",
        driverPhone: "+91 98765 43210",
        vanTemp: "4.2°C (Optimal Cold Chain)",
        items: [
          { name: "Organic Moringa Superleaf Powder", qty: 1, price: 399 },
          { name: "Organic Beetroot Powder", qty: 2, price: 598 },
        ],
        steps: [
          { title: "Order Confirmed & Payment Verified", time: "6:30 AM", done: true },
          { title: "Hand-Harvested from Soil", time: "8:00 AM", done: true },
          { title: "Ozone Washed & Cold-Sorted", time: "11:30 AM", done: true },
          { title: "Out for Delivery (Refrigerated Van)", time: "2:15 PM", done: true, current: true },
          { title: "Delivered to Doorstep", time: "Estimated 5:30 PM", done: false },
        ],
      });
    }, 600);
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <div className="mb-8">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
            Real-Time Fulfillment
          </span>
          <h1
            className="text-3xl sm:text-4xl font-black tracking-tight mt-1"
            style={{ color: "#1E4620" }}
          >
            Track Your Farm Delivery
          </h1>
          <p className="text-xs sm:text-sm mt-2 text-[#6B7280]">
            Enter your Order ID (from confirmation email or SMS) or phone number to see live harvest and delivery status.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleTrack} className="rounded-3xl border p-4 sm:p-5 mb-10 bg-[#F9FAFB] border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-[#E5E7EB]">
            <Search size={16} color="#7A8B6F" />
            <input
              type="text"
              required
              placeholder="e.g. ORD-67210 or 9876543210"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full text-xs sm:text-sm outline-none bg-transparent text-[#1E4620]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-2xl text-xs font-bold text-white transition-transform hover:scale-105 cursor-pointer disabled:opacity-50 shrink-0"
            style={{ backgroundColor: "#1E4620" }}
          >
            {loading ? "Locating Order..." : "Track Order"}
          </button>
        </form>

        {/* Results Timeline */}
        {searched && orderData && (
          <div className="rounded-3xl border p-6 sm:p-8 bg-white border-[#E5E7EB] shadow-sm mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E7EB] gap-3">
              <div>
                <span className="text-[11px] font-bold text-[#6FAE3E] uppercase tracking-wider">
                  Live Farm Dispatch Status
                </span>
                <h3 className="text-xl font-black mt-0.5" style={{ color: "#1E4620" }}>
                  Order {orderData.id}
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-xs font-bold text-[#1E4620]">
                <span className="w-2 h-2 rounded-full bg-[#6FAE3E] animate-pulse" />
                <span>Out for Delivery</span>
              </div>
            </div>

            {/* Van / Driver Info Strip */}
            <div className="my-6 p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-[#6B7280]">Expected Arrival</p>
                <p className="font-bold text-[#1E4620] mt-0.5">{orderData.deliveryEstimated}</p>
              </div>
              <div>
                <p className="text-[#6B7280]">Farm Driver</p>
                <p className="font-bold text-[#1E4620] mt-0.5">{orderData.driverName} ({orderData.driverPhone})</p>
              </div>
              <div>
                <p className="text-[#6B7280]">Van Temperature</p>
                <p className="font-bold text-[#1E4620] mt-0.5">{orderData.vanTemp}</p>
              </div>
            </div>

            {/* Milestone Steps */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
              {orderData.steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <span
                    className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 grid place-items-center ${
                      step.done
                        ? "bg-[#6FAE3E] border-[#6FAE3E] text-white"
                        : "bg-white border-[#D1D5DB]"
                    }`}
                  >
                    {step.done && <CheckCircle2 size={10} />}
                  </span>
                  <div>
                    <h4 className={`text-sm font-bold ${step.current ? "text-[#1E4620]" : step.done ? "text-[#1E4620]" : "text-[#9CA3AF]"}`}>
                      {step.title}
                    </h4>
                    <span className="text-xs text-[#6B7280]">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
