"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Copy, 
  Check, 
  Timer, 
  ShieldCheck, 
  ArrowRight,
  Gift
} from "lucide-react";

export default function CurrentOffers() {
  const [copiedCode, setCopiedCode] = useState(null);
  
  // Real countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleCopy(code) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  }

  const OFFERS = [
    {
      badge: "First Order Special",
      title: "Flat 15% Instant Discount",
      code: "WELCOME15",
      desc: "Valid on all 200g single-ingredient jars & wellness supplements.",
    },
    {
      badge: "Family Bundle Saver",
      title: "Buy Any 2 Jars, Get Extra 10% Off",
      code: "VEGGIE10",
      desc: "Stackable with site discounts. Auto-applies at cart checkout.",
    },
    {
      badge: "Free Delivery",
      title: "Free Express Pan-India Shipping",
      code: "FREE499",
      desc: "On all orders above ₹499. Temperature-safe bubble packaging.",
    },
    {
      badge: "Bonus Gift",
      title: "Free 'Ancient Kitchen' E-Book",
      code: "INCLUDED",
      desc: "Worth ₹299. 45 doctor-curated smoothies, rotis & detox recipes.",
    },
  ];

  return (
    <section id="current-offers" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-[#FFFBF2] border-b border-[#E8EFE5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-3 text-[#B00D0D] bg-white border border-[#B00D0D]/25">
            <Gift size={13} className="text-[#B00D0D]" />
            <span>10 · Abhi Purchase Karne Se Kya Offer Hai</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#1B5E14] leading-tight">
            Exclusive Launch Offers <span className="text-[#B00D0D]">When You Order Today</span>
          </h2>
          <p className="text-sm sm:text-base font-body text-[#3B4D3C] mt-4 leading-relaxed">
            Order directly from today&apos;s fresh farm batch and unlock these limited-time discounts and free bonuses.
          </p>
        </div>

        {/* Live Urgency Countdown Bar in Veggie Green & Crush Red */}
        <div className="max-w-2xl mx-auto mb-12 p-5 sm:p-6 rounded-3xl bg-[#1B5E14] text-white shadow-xl border-2 border-[#F7941D]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F7941D] grid place-items-center text-white shrink-0 shadow-sm">
              <Timer size={20} />
            </div>
            <div>
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-[#F7941D]">
                Today&apos;s Harvest Batch Offer Ends In:
              </p>
              <p className="text-xs font-body text-[#E0EEDD]">Orders placed before timer expires ship tomorrow morning at dawn.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-base sm:text-lg font-black bg-black/25 px-4 py-2 rounded-2xl border border-white/10 shrink-0">
            <span className="bg-[#B00D0D] text-white px-2.5 py-1 rounded-lg">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span className="text-[#F7941D]">:</span>
            <span className="bg-[#B00D0D] text-white px-2.5 py-1 rounded-lg">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span className="text-[#F7941D]">:</span>
            <span className="bg-[#B00D0D] text-white px-2.5 py-1 rounded-lg text-[#F7941D]">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* 4 Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {OFFERS.map((offer) => (
            <div
              key={offer.title}
              className="rounded-3xl border border-[#E8EFE5] bg-white p-6 flex flex-col justify-between shadow-xs hover:border-[#F7941D]/40 transition-colors"
            >
              <div>
                <span className="inline-block text-[10px] font-heading font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFF5E6] text-[#B85D00] border border-[#F7941D]/35 mb-3">
                  {offer.badge}
                </span>
                <h4 className="text-base font-heading font-black text-[#1B5E14] mb-2 leading-snug">
                  {offer.title}
                </h4>
                <p className="text-xs font-body text-[#526955] leading-relaxed mb-4">
                  {offer.desc}
                </p>
              </div>

              {/* Coupon Box */}
              <div className="pt-4 border-t border-[#F0F5ED] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-heading uppercase font-bold text-[#7A937D]">Coupon Code:</span>
                  <p className="font-heading font-black text-sm text-[#B00D0D] tracking-wider">
                    {offer.code}
                  </p>
                </div>

                {offer.code !== "INCLUDED" && (
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="p-2 rounded-xl bg-[#FFF1F0] border border-[#B00D0D]/30 text-[#B00D0D] hover:bg-[#B00D0D] hover:text-white transition-colors flex items-center gap-1 text-[11px] font-heading font-bold"
                    aria-label={`Copy code ${offer.code}`}
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check size={13} className="text-[#2E8B1F]" />
                        <span className="text-[#2E8B1F]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Big Conversion Call-to-Action Bar */}
        <div className="rounded-3xl p-8 sm:p-10 bg-white border-2 border-[#F7941D]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF5E6] text-[#F7941D] border border-[#F7941D]/35 grid place-items-center shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-black text-[#1B5E14]">
                100% Pure Harvest Guarantee
              </h3>
              <p className="text-xs sm:text-sm font-body text-[#526955] mt-0.5">
                If our powders aren&apos;t the freshest, most potent you&apos;ve ever tasted, we refund 100% of your money. No questions asked.
              </p>
            </div>
          </div>

          <Link
            href="#our-bestsellers"
            className="px-8 py-4 rounded-full text-xs font-heading font-black uppercase tracking-wider text-white bg-[#B00D0D] hover:bg-[#8F0A0A] transition-colors shadow-xl flex items-center gap-2 shrink-0"
          >
            <span>Claim Offer &amp; Shop Bestsellers</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
