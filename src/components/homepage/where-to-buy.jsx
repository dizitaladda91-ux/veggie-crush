"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Store, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";

const CHANNELS = [
  {
    name: "VeggieCrush Official Direct Store",
    badge: "Recommended · Best Freshness",
    featured: true,
    desc: "Order directly from our website for guaranteed freshest batch straight from our cleanroom facility.",
    perks: [
      "15% First-Time Buyer Discount (Code: WELCOME15)",
      "Guaranteed freshest lot (less than 7 days from harvest)",
      "Free pan-India shipping on orders over ₹499",
      "Free 'Ancient Superfood Kitchen' E-Book included",
    ],
    ctaText: "Shop Official Store Now",
    ctaLink: "/products",
  },
  {
    name: "Quick Commerce (10-30 Mins)",
    badge: "Instant Delivery",
    featured: false,
    desc: "Need your Beetroot or Moringa jar immediately for your morning routine? Find us on top quick commerce apps.",
    partners: ["Blinkit", "Zepto", "Swiggy Instamart"],
    availability: "Available in Delhi NCR, Mumbai, Bengaluru, Pune & Hyderabad.",
    ctaText: "Available On Apps",
    ctaLink: "/products",
  },
  {
    name: "Online Marketplaces",
    badge: "Prime & Supermart",
    featured: false,
    desc: "Order with your existing marketplace Prime subscriptions and loyalty reward coins.",
    partners: ["Amazon.in", "Flipkart Supermart"],
    availability: "Pan-India delivery coverage with 4.8+ Star customer rating.",
    ctaText: "Find on Amazon / Flipkart",
    ctaLink: "/products",
  },
];

export default function WhereToBuy() {
  const [pincode, setPincode] = useState("");
  const [pinResult, setPinResult] = useState(null);

  function handleCheckPin(e) {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setPinResult({ valid: false, message: "Please enter a valid 6-digit Indian PIN code." });
      return;
    }
    // Simulate real-time serviceability check
    setPinResult({
      valid: true,
      message: `Great news! Pincode ${pincode} is eligible for Express 24-48 Hour Farm-to-Door Delivery & Cash on Delivery.`,
    });
  }

  return (
    <section id="where-to-buy" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-[#F9FBF8] border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA] border border-[#D5E8C0]">
            <Store size={13} className="text-[#5C8E42]" />
            <span>09 · From Where You Can Get The Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#173719] leading-tight">
            Where to Buy VeggieCrush
          </h2>
          <p className="text-sm sm:text-base text-[#4A634E] mt-4 leading-relaxed">
            Order directly on our official store for exclusive savings and guaranteed freshest batches, or order via your favorite everyday apps.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          {CHANNELS.map((ch) => (
            <div
              key={ch.name}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between ${
                ch.featured
                  ? "bg-[#1E4620] text-white shadow-2xl border-2 border-[#6FAE3E]"
                  : "bg-white text-[#173719] border border-[#DCE8D8] shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                      ch.featured
                        ? "bg-[#A8D96A] text-[#173719]"
                        : "bg-[#EAF4DA] text-[#1E4620] border border-[#D5E8C0]"
                    }`}
                  >
                    {ch.badge}
                  </span>
                  {ch.featured && <Sparkles size={16} className="text-[#A8D96A]" />}
                </div>

                <h3 className={`text-xl sm:text-2xl font-black mb-3 ${ch.featured ? "text-white" : "text-[#173719]"}`}>
                  {ch.name}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${ch.featured ? "text-[#D3E8C8]" : "text-[#526955]"}`}>
                  {ch.desc}
                </p>

                {ch.perks ? (
                  <div className="space-y-2.5 mb-8">
                    {ch.perks.map((p) => (
                      <div key={p} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 size={15} className="text-[#A8D96A] shrink-0 mt-0.5" />
                        <span className="text-[#E6F3DF] font-medium">{p}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-8">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${ch.featured ? "text-[#A8D96A]" : "text-[#5C8E42]"}`}>
                      Partner Platforms:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ch.partners.map((partner) => (
                        <span
                          key={partner}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F4F8F2] border border-[#DCE8D8] text-[#173719]"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#6B856D] leading-relaxed">
                      {ch.availability}
                    </p>
                  </div>
                )}
              </div>

              <div>
                {ch.featured ? (
                  <Link
                    href={ch.ctaLink}
                    className="w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-[#A8D96A] text-[#173719] hover:bg-white transition-colors shadow-md"
                  >
                    <span>{ch.ctaText}</span>
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <Link
                    href="/products"
                    className="w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#DCE8D8] text-[#1E4620] hover:bg-[#F2F7EF] transition-colors"
                  >
                    <span>{ch.ctaText}</span>
                    <ExternalLink size={13} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pincode Check Box */}
        <div className="rounded-3xl p-8 sm:p-10 bg-white border border-[#DCE8D8] shadow-md max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF4DA] text-[#1E4620] grid place-items-center shrink-0">
              <MapPin size={20} className="text-[#366829]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#173719]">
                Check Pincode Serviceability &amp; Delivery Speed
              </h3>
              <p className="text-xs text-[#526955]">
                Enter your 6-digit Indian PIN code to check instant availability &amp; COD option.
              </p>
            </div>
          </div>

          <form onSubmit={handleCheckPin} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-Digit PIN Code (e.g. 110001)"
              className="flex-grow px-5 py-3.5 rounded-2xl border border-[#D2E4CC] text-sm text-[#173719] placeholder-[#8BA08E] focus:outline-none focus:border-[#1E4620]"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-2xl bg-[#1E4620] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#28572B] transition-colors shrink-0"
            >
              Check Availability
            </button>
          </form>

          {pinResult && (
            <div
              className={`mt-4 p-3.5 rounded-xl text-xs font-medium ${
                pinResult.valid
                  ? "bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]"
                  : "bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]"
              }`}
            >
              {pinResult.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
