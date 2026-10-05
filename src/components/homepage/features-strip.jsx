"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Leaf, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: <Truck size={24} color="#1E4620" strokeWidth={1.8} />,
    title: "Farm to Door in 12h",
    description: "Harvested at dawn and delivered fresh to your kitchen.",
  },
  {
    icon: <ShieldCheck size={24} color="#1E4620" strokeWidth={1.8} />,
    title: "100% Secure Checkout",
    description: "Encrypted payments via UPI, Cards, NetBanking & COD.",
  },
  {
    icon: <Leaf size={24} color="#1E4620" strokeWidth={1.8} />,
    title: "Zero Chemical Pesticides",
    description: "Naturally grown, certified organic superfoods & herbs.",
  },
  {
    icon: <Headphones size={24} color="#1E4620" strokeWidth={1.8} />,
    title: "Dedicated Farm Support",
    description: "Questions? Our farm team is always here to assist.",
  },
];

export default function FeaturesStrip() {
  return (
    <section className="w-full border-y" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform hover:scale-105"
                style={{ backgroundColor: "#EAF4DA", borderColor: "#C8E2A7" }}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight" style={{ color: "#1E4620" }}>
                  {feature.title}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "#7A8B6F" }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
