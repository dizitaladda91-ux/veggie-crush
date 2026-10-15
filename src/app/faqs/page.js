"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";

const FAQ_SECTIONS = [
  {
    category: "Purity & Sourcing",
    questions: [
      {
        q: "What is VeggieCrush powder made of?",
        a: "Each single-origin jar contains exactly 100% of that single ingredient—pure beetroot, moringa leaves, amla, turmeric rhizomes, or giloy stems. No preservatives, no added sugars, no artificial colours, and zero fillers. EverFit is our proprietary multi-ingredient superfood blend, with every single ingredient transparently declared on the pack.",
      },
      {
        q: "How are the powders made?",
        a: "We follow a disciplined 7-step process: Select fresh quality vegetables & herbs → Wash thoroughly → Cut into small pieces → Machine-Dry at controlled temperatures → Grind → Sieve for smooth dissolution → Pack hygienically into airtight glass jars.",
      },
      {
        q: "What is the pack size?",
        a: "All VeggieCrush individual products and combos come in premium, reusable 200 g glass jars.",
      },
    ],
  },
  {
    category: "Usage & Daily Routine",
    questions: [
      {
        q: "How much should I take?",
        a: "Take 1–2 teaspoons a day (or ½–1 teaspoon for Turmeric, and 1–2 tablespoons for EverFit). If you are new to a herb or superfood, start with less and increase gradually.",
      },
      {
        q: "How do I use it?",
        a: "Mix it easily into plain water, morning smoothies, milk or plant milk, curd/yoghurt, fresh fruit juices, soups, dal, or knead it directly into your roti and chapati dough.",
      },
      {
        q: "How should I store it?",
        a: "Keep the jar closed tightly in a cool, dry place away from direct sunlight. Always use a clean, dry spoon. Best before 12 months from packing date; once opened, consume within 60 to 90 days for peak freshness.",
      },
    ],
  },
  {
    category: "Safety & Special Uses",
    questions: [
      {
        q: "Can I use it on my skin?",
        a: "VeggieCrush powders are certified food products, not cosmetics. If you choose to try one on your skin for a DIY mask, please do a 24-hour patch test on your forearm first and avoid broken skin. Note that turmeric and beetroot naturally stain skin temporarily.",
      },
      {
        q: "Can children, pregnant women or people on medication use it?",
        a: "While everyday foods like beetroot, amla, and moringa are gentle, please check with your doctor before using concentrated herbs like Giloy or superfood blends if you are pregnant, nursing, on regular medication, or managing a medical condition.",
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
            style={{ color: "#1E4620" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm mt-2 text-[#6B7280]">
            Everything you need to know about our pure vegetable &amp; herb powders, daily routines, storage, and natural processing.
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
