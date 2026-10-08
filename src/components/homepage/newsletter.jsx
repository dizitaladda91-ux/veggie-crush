"use client";

import { useState } from "react";
import { Mail, Check, ArrowRight, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [agreed, setAgreed] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim() && agreed) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <section className="w-full py-16 sm:py-20 px-6 lg:px-12 border-b border-[#E6EFE3]" style={{ backgroundColor: "#F7FAF5" }}>
      <div className="max-w-[1000px] mx-auto text-center">
        
        {/* Wix-style Eyebrow */}
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#556F59] mb-3">
          Everything You Need to Know About Organic Living and More. No Spam, We Promise.
        </p>

        {/* Wix H2 Heading */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6"
          style={{ color: "#173719" }}
        >
          Subscribe now and get 15% off your first harvest
        </h2>

        {/* Form Container */}
        <div className="max-w-xl mx-auto mt-8">
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-[#1E4620] bg-[#EAF4DA] px-6 py-4 rounded-full text-sm font-bold border border-[#CBDDC5]">
              <Check size={18} className="text-[#5C8E42]" />
              <span>Thank you! Your 15% discount code (VEGGIE15) has been sent to your email.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-full bg-white border border-[#CBDDC5] shadow-sm focus-within:ring-2 focus-within:ring-[#6FAE3E44]">
                <div className="pl-4 pr-2 text-[#7A8B6F] hidden sm:block">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent px-4 sm:px-0 py-3 text-sm text-[#1E4620] outline-none placeholder:text-[#8D9F91]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold text-white transition-all shadow-sm hover:shadow-md hover:bg-[#2C5F31] cursor-pointer"
                  style={{ backgroundColor: "#1E4620" }}
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Wix-style Checkbox */}
              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#5D7361]">
                <input
                  type="checkbox"
                  id="newsletter-check"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded border-[#CBDDC5] text-[#1E4620] focus:ring-[#6FAE3E] cursor-pointer"
                />
                <label htmlFor="newsletter-check" className="cursor-pointer select-none">
                  Yes, subscribe me to your seasonal harvest newsletter. *
                </label>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
