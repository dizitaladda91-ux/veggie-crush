"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Ananya Sharma",
    city: "Mumbai",
    rating: 5,
    title: "Best quality Moringa powder ever!",
    comment:
      "You can immediately smell and feel the freshness of the moringa and beetroot. Unlike store-bought supplements, VeggieCrush herbs taste truly organic and potent.",
    product: "Moringa Superleaf Powder",
  },
  {
    name: "Vikram Mehta",
    city: "Delhi NCR",
    rating: 5,
    title: "Farm delivery is always on time",
    comment:
      "We subscribed to their weekly box and our family has noticed a huge difference in energy and digestion. The cold-chain delivery keeps everything pristine.",
    product: "Everfit Vitality Capsules",
  },
  {
    name: "Pooja Kulkarni",
    city: "Pune",
    rating: 5,
    title: "Unmatched purity and taste",
    comment:
      "Giloy powder and gooseberry extracts are now a staple in our morning smoothie routine. Transparent farm origins give me complete peace of mind.",
    product: "Giloy Herbal Powder",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-16 px-6 lg:px-10 border-t" style={{ backgroundColor: "#F7F2E4", borderColor: "#E7DCC2" }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#6FAE3E" }}>
            Real Experiences
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black mt-1 tracking-tight"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Loved By Over 10,000+ Families
          </h2>
          <p className="text-xs sm:text-sm mt-2" style={{ color: "#7A8B6F" }}>
            Read why health-conscious individuals trust VeggieCrush for their daily organic nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="rounded-3xl border p-6 sm:p-7 flex flex-col justify-between"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E7DCC2" }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F0B429" color="#F0B429" />
                    ))}
                  </div>
                  <Quote size={20} color="#D9CBA6" />
                </div>

                <h3 className="text-sm font-bold mb-2" style={{ color: "#1E4620" }}>
                  &ldquo;{rev.title}&rdquo;
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#5F6C53" }}>
                  {rev.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: "#F0E8D6" }}>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold" style={{ color: "#1E4620" }}>
                      {rev.name}
                    </span>
                    <CheckCircle size={12} color="#6FAE3E" fill="#EAF4DA" />
                  </div>
                  <span className="text-[11px]" style={{ color: "#8B8064" }}>
                    Verified Buyer • {rev.city}
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: "#F0E8D6", color: "#1E4620" }}>
                  {rev.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
