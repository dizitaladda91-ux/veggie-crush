"use client";

import { useState } from "react";
import { Star, CheckCircle, Quote, ThumbsUp, HeartHandshake, ShieldCheck } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    city: "Mumbai, MH",
    rating: 5,
    tag: "Beetroot Powder 200g",
    category: "Beetroot",
    title: "Unmatched earthy sweetness & energy boost",
    comment:
      "I add a spoonful of VeggieCrush Beetroot Powder to my pre-workout smoothie every morning. My stamina during HIIT workouts has visibly improved, and my blood reports showed optimal iron and hemoglobin levels!",
    time: "3 days ago",
    verified: true,
  },
  {
    id: 2,
    name: "Vikramaditya Mehta",
    city: "Delhi NCR",
    rating: 5,
    tag: "Moringa Superleaf 200g",
    category: "Moringa",
    title: "Best morning detox routine for the entire family",
    comment:
      "Commercial green powders taste like synthetic grass and chemicals. VeggieCrush Moringa smells like pure sun-dried drumstick leaves. My acidity and morning lethargy vanished within 2 weeks.",
    time: "1 week ago",
    verified: true,
  },
  {
    id: 3,
    name: "Pooja Kulkarni",
    city: "Pune, MH",
    rating: 5,
    tag: "Amla / Gooseberry 200g",
    category: "Amla",
    title: "Natural Vitamin C without artificial ascorbic acid!",
    comment:
      "Most Vitamin C tablets cause hyperacidity for me. Mixing half a teaspoon of pure VeggieCrush Amla powder in lukewarm water with raw honey has completely solved my seasonal colds and hair fall.",
    time: "2 weeks ago",
    verified: true,
  },
  {
    id: 4,
    name: "Siddharth Nambiar",
    city: "Bengaluru, KA",
    rating: 5,
    tag: "Neem Herbal Powder 200g",
    category: "Neem",
    title: "Cleared up stubborn skin breakouts naturally",
    comment:
      "The purity of this neem powder is phenomenal. You can immediately feel the potent bitter medicinal taste. I take a quarter teaspoon with warm water and also make a face mask. 10/10 purity.",
    time: "2 weeks ago",
    verified: true,
  },
  {
    id: 5,
    name: "Meenakshi Iyer",
    city: "Chennai, TN",
    rating: 5,
    tag: "Giloy Herbal Extract 200g",
    category: "Giloy",
    title: "Glass jar packaging protects freshness perfectly",
    comment:
      "The 200g heavy glass jar and airtight seal make all the difference. No moisture clumping even in humid coastal weather. Highly recommend VeggieCrush to anyone caring about clean nutrition.",
    time: "1 month ago",
    verified: true,
  },
  {
    id: 6,
    name: "Rajeshwar Rao",
    city: "Hyderabad, TS",
    rating: 5,
    tag: "Beetroot Powder 200g",
    category: "Beetroot",
    title: "My kids now eat vegetable rotis without fuss!",
    comment:
      "Kneading one spoon of beetroot powder into the whole-wheat chapati dough turns the rotis bright pink! My children love it and get pure vegetable nutrition without throwing tantrums.",
    time: "1 month ago",
    verified: true,
  },
];

const CATEGORIES = ["All Reviews", "Beetroot", "Moringa", "Amla", "Neem", "Giloy"];

export default function ConsumerReviews() {
  const [selectedCat, setSelectedCat] = useState("All Reviews");

  const filtered = selectedCat === "All Reviews"
    ? REVIEWS
    : REVIEWS.filter((r) => r.category === selectedCat);

  return (
    <section id="what-our-consumer-says" className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-white border-b border-[#E6EFE3]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 text-[#1E4620] bg-[#EAF4DA] border border-[#D5E8C0]">
            <HeartHandshake size={13} className="text-[#5C8E42]" />
            <span>04 · What Our Consumers Say</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#173719] leading-tight">
            Loved By Over 10,000+ Conscious Indian Families
          </h2>
          <p className="text-sm sm:text-base text-[#4A634E] mt-4 leading-relaxed">
            Real experiences from everyday people who made our pure farm powders their daily morning health ritual.
          </p>
        </div>

        {/* Rating summary bar */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#F8FAF6] border border-[#E1EBE0] mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-black text-[#173719]">4.9</div>
            <div>
              <div className="flex items-center gap-1 text-[#F0B429]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#F0B429" color="#F0B429" />
                ))}
              </div>
              <p className="text-xs text-[#526955] font-semibold mt-1">
                Based on 1,420+ Verified Customer Purchases
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-[#173719]">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#5C8E42]" />
              <span>100% Genuine Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#5C8E42]" />
              <span>Verified Buyer Orders</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp size={16} className="text-[#5C8E42]" />
              <span>98% Repeat Order Rate</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                selectedCat === cat
                  ? "bg-[#1E4620] text-white border-[#1E4620] shadow-sm"
                  : "bg-white text-[#4A634E] border-[#DCE8D8] hover:bg-[#F2F7EF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl border border-[#E3EDE0] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#F0B429]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F0B429" color="#F0B429" />
                    ))}
                  </div>
                  <Quote size={20} className="text-[#D3E3CE]" />
                </div>

                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F0F7ED] text-[#2F6627] border border-[#DCEBD6] mb-3">
                  {rev.tag}
                </span>

                <h4 className="text-sm font-bold text-[#173719] mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h4>
                <p className="text-xs text-[#4F6553] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EEF5EC] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#173719]">{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle size={13} className="text-[#5C8E42] shrink-0" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#7A937D]">{rev.city}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#8DA690]">{rev.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
