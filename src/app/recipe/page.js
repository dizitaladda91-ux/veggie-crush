"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Flame, Users, Check, ShoppingBag, Leaf, ChefHat } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

const RECIPES = [
  {
    id: "moringa-smoothie",
    title: "Morning Vitality Moringa Green Smoothie",
    category: "Immunity & Energy",
    prepTime: "5 mins",
    servings: "2 glasses",
    calories: "140 kcal",
    image: "/products/moringa_1.webp",
    description: "A nutrient-rich alkaline superfood smoothie designed to awaken your metabolism and provide all-day stamina.",
    ingredients: [
      { name: "Organic Moringa Superleaf Powder", amount: "1 tbsp", productId: "3", price: 399, image: "/products/moringa_1.webp" },
      { name: "Pure Gooseberry (Amla) Powder", amount: "1 tsp", productId: "2", price: 349, image: "/products/goosberry_1.webp" },
      { name: "Farm Fresh Baby Spinach", amount: "1 cup", productId: "c1", price: 69, image: "/products/moringa_1.webp" },
      { name: "Fresh Mint Leaves", amount: "6-8 leaves", productId: "c3", price: 35, image: "/products/neem_1.webp" },
    ],
    instructions: [
      "Wash baby spinach and fresh mint leaves under cold water.",
      "Add 1 tbsp of cold-ground Moringa powder and 1 tsp of Gooseberry powder to the blender.",
      "Pour 1.5 cups of coconut water or chilled almond milk.",
      "Blend on high for 45-60 seconds until silky smooth.",
      "Serve fresh in chilled glasses with a squeeze of fresh lemon juice.",
    ],
  },
  {
    id: "beetroot-salad",
    title: "Roasted Beetroot & Citrus Salad",
    category: "Heart & Stamina",
    prepTime: "15 mins",
    servings: "3 servings",
    calories: "185 kcal",
    image: "/products/beetroot_1.webp",
    description: "Naturally high in dietary nitrates, this refreshing salad enhances nitric oxide production and blood flow.",
    ingredients: [
      { name: "Organic Beetroot", amount: "2 large roots", productId: "1", price: 299, image: "/products/beetroot_1.webp" },
      { name: "Organic Carrots", amount: "2 medium", productId: "c5", price: 89, image: "/products/beetroot_1.webp" },
      { name: "Fresh Coriander Herbs", amount: "Handful", productId: "c3", price: 35, image: "/products/neem_1.webp" },
    ],
    instructions: [
      "Steam or lightly roast peeled beetroot and carrot cubes until tender-crisp.",
      "Allow to cool to room temperature in a wooden mixing bowl.",
      "Toss with finely chopped fresh coriander, sea salt, roasted cumin, and cold-pressed olive oil.",
      "Garnish with toasted pumpkin seeds and crushed walnuts.",
    ],
  },
  {
    id: "giloy-elixir",
    title: "Ayurvedic Giloy & Turmeric Cleansing Brew",
    category: "Detox & Purification",
    prepTime: "10 mins",
    servings: "2 cups",
    calories: "45 kcal",
    image: "/products/giloy_1.webp",
    description: "An ancient balancing tonic made from pure giloy extract and raw roots to cleanse lymphatic pathways.",
    ingredients: [
      { name: "Giloy Immunity Extract Powder", amount: "1 tsp", productId: "6", price: 429, image: "/products/giloy_1.webp" },
      { name: "Neem Detox Powder", amount: "1/4 tsp", productId: "4", price: 389, image: "/products/neem_1.webp" },
      { name: "Everfit Daily Vitality Capsules", amount: "1 companion capsule", productId: "5", price: 499, image: "/products/everfit_1.webp" },
    ],
    instructions: [
      "Bring 2.5 cups of pure filtered water to a gentle rolling boil.",
      "Stir in Giloy extract powder and a pinch of neem detox powder.",
      "Simmer on low flame for 6 minutes until aromatic.",
      "Strain into cups, add raw honey when lukewarm, and drink before breakfast.",
    ],
  },
];

export default function RecipePage() {
  const { addToCart } = useCart();
  const [activeRecipe, setActiveRecipe] = useState(RECIPES[0]);
  const [bundleAdded, setBundleAdded] = useState(false);

  function handleAddAllIngredients() {
    activeRecipe.ingredients.forEach((ing) => {
      addToCart({
        id: ing.productId,
        name: ing.name,
        price: ing.price,
        mrp: Math.round(ing.price * 1.25),
        unit: ing.amount,
        image: ing.image,
      }, false);
    });

    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  }

  function handleAddSingle(ing) {
    addToCart({
      id: ing.productId,
      name: ing.name,
      price: ing.price,
      mrp: Math.round(ing.price * 1.25),
      unit: ing.amount,
      image: ing.image,
    }, true);
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
            Farm-to-Kitchen Wellness
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Shop By Recipe
          </h1>
          <p className="text-xs sm:text-sm mt-2 text-[#6B7280]">
            Wholesome organic recipes curated by Ayurvedic nutritionists. Add all farm-fresh ingredients to your basket with 1 click.
          </p>
        </div>

        {/* Recipe Picker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {RECIPES.map((recipe) => {
            const isSelected = recipe.id === activeRecipe.id;
            return (
              <button
                key={recipe.id}
                onClick={() => { setActiveRecipe(recipe); setBundleAdded(false); }}
                className={`rounded-3xl border p-6 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#1E4620] ring-2 ring-[#1E4620] bg-[#F0FDF4] shadow-md"
                    : "border-[#E5E7EB] bg-white hover:border-[#6FAE3E]"
                }`}
              >
                <div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-[#F9FAFB] border border-[#E5E7EB]">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6FAE3E]">
                    {recipe.category}
                  </span>
                  <h3 className="text-base font-bold mt-1 leading-snug" style={{ color: "#1E4620" }}>
                    {recipe.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {recipe.prepTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={12} />
                    {recipe.calories}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recipe Active Details */}
        <div className="rounded-3xl border p-8 sm:p-12 mb-16 bg-[#F9FAFB] border-[#E5E7EB]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Recipe Info & Instructions */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6FAE3E]">
                {activeRecipe.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}>
                {activeRecipe.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5443] mt-2 leading-relaxed">
                {activeRecipe.description}
              </p>

              {/* Meta stats */}
              <div className="flex items-center gap-6 mt-6 py-3 border-y border-[#E5E7EB] text-xs font-semibold text-[#1E4620]">
                <div className="flex items-center gap-1.5">
                  <Clock size={15} color="#6FAE3E" />
                  <span>Prep: {activeRecipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={15} color="#6FAE3E" />
                  <span>Serves: {activeRecipe.servings}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame size={15} color="#6FAE3E" />
                  <span>{activeRecipe.calories}</span>
                </div>
              </div>

              {/* Step by Step instructions */}
              <div className="mt-8">
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#1E4620" }}>
                  <ChefHat size={16} color="#6FAE3E" />
                  <span>Step-by-Step Directions</span>
                </h4>
                <div className="space-y-3">
                  {activeRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#4B5443] leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-[#1E4620] text-white text-[11px] font-bold grid place-items-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Ingredients & Add to Cart Bundle */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold" style={{ color: "#1E4620" }}>
                  Fresh Ingredients ({activeRecipe.ingredients.length})
                </h4>
                <span className="text-xs text-[#6FAE3E] font-bold">100% Organic</span>
              </div>

              <div className="divide-y divide-[#E5E7EB] mb-6">
                {activeRecipe.ingredients.map((ing) => (
                  <div key={ing.name} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] relative shrink-0">
                        <Image src={ing.image} alt={ing.name} fill sizes="40px" className="object-contain p-1" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1E4620]">{ing.name}</p>
                        <p className="text-[11px] text-[#6B7280]">Qty: {ing.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#1E4620]">₹{ing.price}</span>
                      <button
                        onClick={() => handleAddSingle(ing)}
                        className="p-1.5 rounded-full bg-[#EAF4DA] hover:bg-[#6FAE3E] hover:text-white text-[#1E4620] transition-colors cursor-pointer"
                        title="Add to cart"
                      >
                        <ShoppingBag size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddAllIngredients}
                className="w-full py-4 rounded-full text-xs font-bold text-white transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                style={{ backgroundColor: bundleAdded ? "#1E4620" : "#6FAE3E" }}
              >
                {bundleAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
                <span>{bundleAdded ? "All Ingredients Added to Basket!" : "Add All Recipe Ingredients to Cart"}</span>
              </button>
              <p className="text-[11px] text-center mt-2.5 text-[#9CA3AF]">
                Items added directly to your slide-over basket.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
