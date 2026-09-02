"use client";

import Image from "next/image";
import { ArrowRight, Sprout, Star, ShieldCheck, Truck } from "lucide-react";

const TRUST_BADGES = [
  { icon: <Star size={13} fill="#F0B429" color="#F0B429" />, label: "4.8★ Rated" },
  { icon: <Truck size={13} color="#6FAE3E" />, label: "Free delivery ₹599+" },
  { icon: <ShieldCheck size={13} color="#6FAE3E" />, label: "Certified Organic" },
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#FBF7EC" }}>
      {/* ── Background image container ── */}
      <div className="relative h-[500px] sm:h-[580px] lg:h-[680px] xl:h-[740px]">
        <Image
          src="/homesection/veggiecrush.png"
          alt="Fresh vegetables and greens"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Multi-layer gradient for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(20,38,18,0.82) 0%, rgba(20,38,18,0.60) 38%, rgba(20,38,18,0.15) 70%, rgba(20,38,18,0.05) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(to top, #FBF7EC 0%, transparent 100%)",
          }}
        />

        {/* Decorative orbs */}
        <div
          className="absolute -left-24 top-1/3 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(111,174,62,0.25)" }}
        />
        <div
          className="absolute right-0 top-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(30,70,32,0.3)" }}
        />

        {/* ── Content ── */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 lg:px-16 xl:px-24 max-w-[1440px] w-full mx-auto">
            <div className="max-w-2xl">

              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase"
                  style={{
                    backgroundColor: "rgba(111,174,62,0.20)",
                    color: "#C8F090",
                    border: "1px solid rgba(111,174,62,0.35)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC552] animate-pulse" />
                  Fresh. Healthy. Straight from the Farm.
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-[2.8rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Baloo 2', cursive", color: "#FFFFFF" }}
              >
                Your daily dose
                <br />
                of{" "}
                <span
                  className="relative inline-block"
                  style={{ color: "#A8D96A" }}
                >
                  fresh goodness
                  {/* Underline squiggle */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 10"
                    preserveAspectRatio="none"
                    style={{ height: "8px" }}
                    aria-hidden="true"
                  >
                    <path
                      d="M0,6 C50,0 100,10 150,5 C200,0 250,10 300,5"
                      stroke="#6FAE3E"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Sub-copy */}
              <p
                className="mt-7 max-w-lg text-[15px] leading-relaxed"
                style={{ color: "rgba(232,245,196,0.85)" }}
              >
                Discover farm-picked vegetables, wellness herbs, and curated boxes — delivered with care from our farms to your kitchen.
              </p>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
                  style={{
                    backgroundColor: "#6FAE3E",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(111,174,62,0.40)",
                  }}
                >
                  <Sprout size={16} />
                  Shop Fresh Picks
                  <ArrowRight size={16} />
                </a>

                <a
                  href="/farm-boxes"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#E8F5C5",
                    border: "1px solid rgba(255,255,255,0.22)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Explore Farm Boxes
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.10)",
                      color: "#E8F5C5",
                      border: "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {badge.icon}
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Floating stat card ── */}
        <div className="absolute bottom-12 right-6 lg:right-16 hidden sm:block">
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
            style={{
              backgroundColor: "rgba(251,247,236,0.92)",
              boxShadow: "0 8px 32px rgba(30,70,32,0.18)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(111,174,62,0.25)",
            }}
          >
            <span
              className="grid place-items-center w-10 h-10 rounded-xl shrink-0"
              style={{ backgroundColor: "#EAF4DA" }}
            >
              <Sprout size={20} color="#1E4620" />
            </span>
            <div>
              <p className="text-[11px] font-semibold" style={{ color: "#7A8B6F" }}>
                Delivered fresh today
              </p>
              <p className="text-base font-extrabold" style={{ color: "#1E4620" }}>
                10,000+ orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}