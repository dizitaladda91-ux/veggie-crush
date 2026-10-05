"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";

const FAQ_SECTIONS = [
  {
    category: "Produce Purity & Sourcing",
    questions: [
      {
        q: "Are VeggieCrush vegetables truly 100% organic and pesticide-free?",
        a: "Yes. All our produce is cultivated on certified organic farms using regenerative organic methods (Jeevamrutha, cow dung compost, neem-oil sprays). We perform regular multi-residue gas chromatography tests through NABL-accredited laboratories to verify zero synthetic chemical residues.",
      },
      {
        q: "How soon after harvesting do I receive my vegetables?",
        a: "Our farmers harvest crops at dawn (between 5:30 AM and 7:30 AM). Produce is washed with food-grade ozone water, sorted by hand, and delivered to your doorstep in refrigerated vans within 12 hours of being cut from the plant.",
      },
    ],
  },
  {
    category: "Delivery & Cold-Chain Logistics",
    questions: [
      {
        q: "What is your delivery fee and free shipping policy?",
        a: "Orders above ₹599 and all weekly/monthly Farm Subscription Boxes enjoy 100% FREE delivery. For individual orders under ₹599, a nominal ₹49 cold-chain logistics fee applies.",
      },
      {
        q: "Which cities do you currently deliver to?",
        a: "We currently operate full same-day and next-day cold chain delivery across Bangalore, Pune, Mumbai, Hyderabad, and Delhi NCR. We are expanding to other metro regions soon.",
      },
    ],
  },
  {
    category: "Farm Boxes & Subscriptions",
    questions: [
      {
        q: "Can I pause, skip, or cancel my Farm Box subscription?",
        a: "Absolutely. You have 100% flexibility. You can pause, skip a delivery week, or cancel anytime with a single click from your account dashboard with zero penalties or lock-in periods.",
      },
      {
        q: "Can I customize what goes into my weekly harvest box?",
        a: "Yes. Every Sunday morning before dawn harvest, we email and WhatsApp you this week's harvest preview. You can swap up to 2 items for other seasonal vegetables or superfood powders.",
      },
    ],
  },
  {
    category: "Freshness Guarantee & Returns",
    questions: [
      {
        q: "What if I receive a damaged or wilted item?",
        a: "We stand behind our produce with a 100% Freshness Guarantee. If any vegetable or herbal product does not meet your expectations, simply share a quick photo via WhatsApp within 24 hours of delivery and we will either replace it or credit your account instantly.",
      },
    ],
  },
];

export default function FAQsPage() {
  const [openMap, setOpenMap] = useState({});

  function toggle(idxKey) {
    setOpenMap((prev) => ({ ...prev, [idxKey]: !prev[idxKey] }));
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
            Help & Knowledge Base
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm mt-2 text-[#6B7280]">
            Everything you need to know about our organic certification, dawn harvest logistics, and farm subscriptions.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-8 mb-16">
          {FAQ_SECTIONS.map((section, sIdx) => (
            <div key={section.category} className="rounded-3xl border p-6 sm:p-8 bg-[#F9FAFB] border-[#E5E7EB]">
              <h2 className="text-base sm:text-lg font-black mb-4 flex items-center gap-2" style={{ color: "#1E4620" }}>
                <HelpCircle size={18} color="#6FAE3E" />
                <span>{section.category}</span>
              </h2>

              <div className="divide-y divide-[#E5E7EB]">
                {section.questions.map((faq, qIdx) => {
                  const key = `${sIdx}-${qIdx}`;
                  const isOpen = !!openMap[key];

                  return (
                    <div key={qIdx} className="py-4">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm cursor-pointer"
                        style={{ color: "#1E4620" }}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          color="#6FAE3E"
                        />
                      </button>

                      {isOpen && (
                        <p className="text-xs sm:text-sm text-[#4B5443] mt-3 leading-relaxed">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? Help card */}
        <div className="rounded-3xl border p-8 bg-white border-[#E5E7EB] shadow-sm text-center">
          <h3 className="text-xl font-bold mb-2" style={{ color: "#1E4620" }}>
            Still have questions? We&apos;re here for you.
          </h3>
          <p className="text-xs text-[#6B7280] mb-6">
            Our farm agronomists and customer care team are available Monday through Saturday, 8:00 AM – 7:00 PM.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#1E4620]">
            <a href="mailto:support@veggiecrush.com" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] hover:bg-[#EAF4DA] transition-colors">
              <Mail size={14} color="#6FAE3E" />
              <span>support@veggiecrush.com</span>
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] hover:bg-[#EAF4DA] transition-colors">
              <Phone size={14} color="#6FAE3E" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
