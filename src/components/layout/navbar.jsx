"use client";

import { useState } from "react";
import { Search, User, Truck, ShoppingBag, ChevronDown, Leaf } from "lucide-react";
import { useCart } from "../cart/cart-provider";



const NAV_LINKS = [
  { label: "All Products", href: "/products" },
  {
    label: "Shop By Category",
    href: "/category",
    dropdown: [
      "Leafy Greens",
      "Root Vegetables",
      "Peppers & Chillies",
      "Gourds & Squash",
      "Onion & Garlic",
      "Herbs",
    ],
  },
  {
    label: "Shop By Season",
    href: "/season",
    dropdown: ["Monsoon Picks", "Winter Harvest", "Summer Fresh", "Year Round"],
  },
  { label: "Farm Boxes", href: "/farm-boxes" },
  { label: "Shop By Recipe", href: "/recipe" },
];

function SproutTick() {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      className="absolute -bottom-[9px] left-1/2 -translate-x-1/2"
      aria-hidden="true"
    >
      <path
        d="M9 9V3"
        stroke="#6FAE3E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 4c0-2.2-1.6-3.4-3.6-3.2C5.6 3 6.9 4.6 9 4.6"
        fill="#6FAE3E"
      />
      <path
        d="M9 5.2c0-2.2 1.7-3.3 3.7-3 -.2 2.1-1.5 3.6-3.7 3.6"
        fill="#8DC552"
      />
    </svg>
  );
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { itemCount } = useCart();
  const active = "All Products";

  return (
    <header
      style={{ backgroundColor: "#FBF7EC", fontFamily: "Inter, sans-serif" }}
      className="w-full border-b border-[#E7DCC2] relative z-30"
    >
      {/* Top row: logo · search · icons */}
      <div className="flex items-center gap-6 px-6 lg:px-10 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="grid place-items-center w-11 h-11 rounded-full border-2"
            style={{ borderColor: "#6FAE3E", backgroundColor: "#F0E8D6" }}
          >
            <Leaf size={20} color="#1E4620" strokeWidth={2.2} />
          </span>
          <span
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
            className="leading-none"
          >
            <span className="block text-xl font-extrabold tracking-tight">
              Veggie
              <span style={{ color: "#6FAE3E" }}>Crush</span>
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#7A8B6F] uppercase mt-0.5">
              Farm to Door
            </span>
          </span>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
          <div
            className="flex items-center gap-3 rounded-full px-5 py-3 border"
            style={{ backgroundColor: "#F0E8D6", borderColor: "#E7DCC2" }}
          >
            <input
              type="text"
              placeholder="Search carrots, kale, farm boxes..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#8B8064]"
              style={{ color: "#24321F" }}
            />
            <button aria-label="Search" className="shrink-0">
              <Search size={18} color="#1E4620" />
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 shrink-0 ml-auto">
          <button aria-label="Account" className="flex flex-col items-center gap-0.5 group">
            <User size={20} color="#24321F" className="group-hover:opacity-70" />
          </button>
          <button aria-label="Track delivery" className="flex flex-col items-center gap-0.5 group">
            <Truck size={20} color="#24321F" className="group-hover:opacity-70" />
          </button>
          <button aria-label="Cart" className="relative flex flex-col items-center gap-0.5 group">
            <ShoppingBag size={20} color="#24321F" className="group-hover:opacity-70" />
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-[10px] font-bold text-white rounded-full w-4 h-4 grid place-items-center"
                style={{ backgroundColor: "#D9483A" }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom row: nav links */}
      <nav className="border-t border-[#E7DCC2]">
        <ul className="flex items-center gap-8 px-6 lg:px-10 py-3 max-w-[1440px] mx-auto text-sm font-semibold ">
          {NAV_LINKS.map((link) => {
            const isActive = link.label === active;
            const isOpen = openDropdown === link.label;
            return (
              <li
                key={link.label}
                className="relative shrink-0"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 pb-3 transition-colors"
                  style={{ color: isActive ? "#1E4620" : "#4B5443" }}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={14}
                      className="transition-transform"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  )}
                </a>
                {isActive && <SproutTick />}

                {link.dropdown && isOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 min-w-[220px] z-50 rounded-xl border shadow-lg py-2 animate-[fadeIn_0.15s_ease-out]"
                    style={{ backgroundColor: "#FBF7EC", borderColor: "#E7DCC2" }}
                  >
                    {link.dropdown.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium hover:bg-[#F0E8D6]"
                        style={{ color: "#3A4433" }}
                      >
                        <Leaf size={12} color="#6FAE3E" />
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}