"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ComboCard from "@/components/products/combo-card";
import NewArrivalProductCard from "@/components/products/new-arrival-product-card";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function NewArrivals({ products, combos, error }) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.08 },
      };
  const arrivalCards = [
    ...products.map((product) => ({ kind: "single", item: product })),
    ...[2, 3, 4].flatMap((packSize) =>
      combos
        .filter((combo) => combo.packSize === packSize)
        .map((combo) => ({ kind: "combo", item: combo })),
    ),
  ];

  return (
    <section className="relative w-full overflow-hidden border-b border-[#E6EFE3] bg-[#F8FAF6] px-6 py-16 sm:py-20 lg:px-12">
      <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-[#EAF3E7] opacity-70 blur-3xl" />
      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#EAF3E7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2E5D31]">
              <Sparkles size={13} aria-hidden="true" />
              Fresh daily harvest
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-[#173719] sm:text-4xl">
              New Arrivals
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#556F59]">
              Fresh single products and a selection of double, triple, and quad combos.
            </p>
          </div>
          <Link
            href="/combos"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[#CBDDC5] bg-white px-5 py-2.5 text-sm font-semibold text-[#1E4620] transition hover:border-[#1E4620] hover:bg-[#1E4620] hover:text-white sm:self-auto"
          >
            Shop all products & combos
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>

        {error ? (
          <p role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            {error}
          </p>
        ) : (
          <motion.div
            {...motionProps}
            className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          >
            {arrivalCards.map(({ kind, item }) => (
              <motion.div
                key={`${kind}-${item.id}`}
                variants={shouldReduceMotion ? undefined : cardVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="rounded-3xl focus-within:ring-2 focus-within:ring-[#6FAE3E] focus-within:ring-offset-4"
              >
                {kind === "single"
                  ? <NewArrivalProductCard product={item} />
                  : <ComboCard combo={item} />}
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
