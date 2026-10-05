"use client";

import { useState } from "react";
import { Mail, Check, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <section className="w-full py-14 px-6 lg:px-10 border-t" style={{ backgroundColor: "#1E4620" }}>
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A8D96A]">
            Join The VeggieCrush Club
          </span>
          <h2
            className="text-2xl sm:text-3xl font-black text-white mt-1 leading-snug"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            Get ₹100 OFF Your First Farm Order
          </h2>
          <p className="text-xs sm:text-sm text-[#D7E8BD] mt-2">
            Subscribe for seasonal harvest alerts, healthy smoothie recipes, and member-only farm discounts.
          </p>
        </div>

        <div className="w-full max-w-md">
          {subscribed ? (
            <div className="flex items-center gap-2 text-white bg-[#2E5830] px-5 py-3 rounded-full text-xs font-bold border border-[#447647]">
              <Check size={16} color="#A8D96A" />
              <span>Thank you! Check your inbox for your ₹100 discount coupon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center rounded-full bg-white p-1.5 shadow-lg border border-[#3E7042]">
              <div className="pl-3.5 pr-2 text-[#7A8B6F]">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent text-xs text-[#1E4620] outline-none placeholder:text-[#A89B7D]"
              />
              <button
                type="submit"
                className="shrink-0 flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: "#6FAE3E" }}
              >
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
