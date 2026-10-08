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
      className="w-full overflow-hidden relative border-b"
      style={{
        backgroundColor: "#EAF3E7",
        borderColor: "#DCE8D9",
        height: "36px",
      }}
    >
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
            className="inline-flex items-center gap-2 px-8 text-[12px] font-medium tracking-wide"
            style={{ color: "#1E4620" }}
          >
            <span style={{ color: "#5C8E42" }}>{item.icon}</span>
            {item.text}
            <span style={{ color: "#7CA964", opacity: 0.7, margin: "0 6px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
