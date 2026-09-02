"use client";

import { useEffect, useRef } from "react";
import { Leaf, Truck, Tag, Sprout, Star } from "lucide-react";

const ANNOUNCEMENTS = [
  { icon: <Truck size={13} />, text: "Free delivery on orders above ₹599" },
  { icon: <Leaf size={13} />, text: "100% Farm-fresh • Sourced daily" },
  { icon: <Tag size={13} />, text: "Use code FRESH10 — Get 10% off your first order" },
  { icon: <Sprout size={13} />, text: "New seasonal boxes now available" },
  { icon: <Star size={13} />, text: "4.8★ rated by 10,000+ happy customers" },
  { icon: <Truck size={13} />, text: "Same-day delivery in Bangalore & Pune" },
  { icon: <Leaf size={13} />, text: "Pesticide-free | Chemical-free | Certified organic" },
  { icon: <Tag size={13} />, text: "Refer a friend — Earn ₹100 store credit" },
];

export default function AnnouncementBar() {
  const trackRef = useRef(null);

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        background: "linear-gradient(90deg, #1E4620 0%, #2D6A30 40%, #6FAE3E 80%, #1E4620 100%)",
        height: "36px",
      }}
    >
      {/* Shimmer overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
        }}
      />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex items-center h-full whitespace-nowrap"
        style={{ animation: "ticker-scroll 32s linear infinite" }}
      >
        {/* Duplicate for seamless loop */}
        {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 text-[12px] font-semibold tracking-wide"
            style={{ color: "#E8F5D0" }}
          >
            <span style={{ color: "#A8D96A" }}>{item.icon}</span>
            {item.text}
            <span style={{ color: "#6FAE3E", opacity: 0.5, margin: "0 4px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
