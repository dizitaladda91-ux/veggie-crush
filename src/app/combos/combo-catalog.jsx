"use client";

import { useState } from "react";
import ComboCard from "@/components/products/combo-card";
import NewArrivalProductCard from "@/components/products/new-arrival-product-card";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "single", label: "Single Products" },
  { id: "2", label: "Double Combos" },
  { id: "3", label: "Triple Combos" },
  { id: "4", label: "Quad Combos" },
];

export default function ComboCatalog({ products, combos }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const visibleProducts = selectedFilter === "all" || selectedFilter === "single"
    ? products
    : [];
  const visibleCombos = selectedFilter === "single"
    ? []
    : selectedFilter === "all"
      ? combos
      : combos.filter((combo) => String(combo.packSize) === selectedFilter);
  const itemCount = visibleProducts.length + visibleCombos.length;

  return (
    <>
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2" role="group" aria-label="Filter catalog by product type">
          {FILTERS.map((filter) => {
            const count = filter.id === "all"
              ? products.length + combos.length
              : filter.id === "single"
                ? products.length
                : combos.filter((combo) => String(combo.packSize) === filter.id).length;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                aria-pressed={selectedFilter === filter.id}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  selectedFilter === filter.id
                    ? "border-[#1E4620] bg-[#1E4620] text-white"
                    : "border-[#CBDDC5] bg-white text-[#1E4620] hover:border-[#1E4620]"
                }`}
              >
                {filter.label} <span className="ml-1 opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {itemCount ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <NewArrivalProductCard key={product.id} product={product} />
          ))}
          {visibleCombos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-[#E5EBE2] bg-[#F8FAF6] p-5 text-sm text-[#667E6A]">
          No {FILTERS.find((filter) => filter.id === selectedFilter)?.label.toLowerCase()} are available right now.
        </p>
      )}
    </>
  );
}
