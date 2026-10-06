"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Truck, ShoppingBag, ChevronDown, Leaf, X, Menu, LogOut } from "lucide-react";
import { useCart } from "../cart/cart-provider";
import { useAuth } from "../auth/auth-context";

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

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const active = "All Products";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="w-full sticky top-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: scrolled
          ? "0 4px 24px rgba(30,70,32,0.08), 0 1px 0 #E5E7EB"
          : "0 1px 0 #E5E7EB",
      }}
    >
      {/* ══════════════════════════════════════════
          TOP ROW — 3-column grid: left | CENTER LOGO | right
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-3 items-center px-5 lg:px-10 py-3 max-w-[1440px] mx-auto">

        {/* ── LEFT: Mobile hamburger + search (desktop) ── */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            className="md:hidden shrink-0 p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen
              ? <X size={20} color="#1E4620" />
              : <Menu size={20} color="#1E4620" />
            }
          </button>

          {/* Desktop: search bar */}
          <div className="hidden md:flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 border transition-all duration-200 focus-within:ring-2 focus-within:ring-[#6FAE3E44]"
            style={{ backgroundColor: "#F3F4F6", borderColor: "#E5E7EB" }}
          >
            <Search size={15} color="#6FAE3E" className="shrink-0" />
            <input
              type="text"
              placeholder="Search vegetables, herbs…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#9CA3AF] min-w-0"
              style={{ color: "#24321F" }}
            />
            <span
              className="shrink-0 hidden lg:flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md border font-medium"
              style={{ color: "#6B7280", borderColor: "#E5E7EB", backgroundColor: "#E5E7EB" }}
            >
              ⌘K
            </span>
          </div>
        </div>

        {/* ── CENTER: Logo (always centered) ── */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span
              className="grid place-items-center w-10 h-10 rounded-xl border-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
              style={{
                borderColor: "#6FAE3E",
                backgroundColor: "#EAF4DA",
                boxShadow: "0 2px 8px rgba(111,174,62,0.20)",
              }}
            >
              <Leaf size={18} color="#1E4620" strokeWidth={2.3} />
            </span>
            <span
              style={{ color: "#1E4620" }}
              className="leading-none"
            >
              <span className="block text-[19px] font-extrabold tracking-tight">
                Veggie<span style={{ color: "#6FAE3E" }}>Crush</span>
              </span>
              <span
                className="block text-[9px] font-bold tracking-[0.22em] uppercase mt-0.5"
                style={{ color: "#7A8B6F" }}
              >
                Farm to Door
              </span>
            </span>
          </Link>
        </div>

        {/* ── RIGHT: Icons ── */}
        <div className="flex items-center justify-end gap-1">
          {/* Mobile search */}
          <button
            aria-label="Search"
            className="md:hidden p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={19} color="#24321F" />
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-1.5 pl-2">
              <Link
                href="/account"
                className="text-xs font-bold px-2.5 py-1 rounded-full text-[#1E4620] bg-[#EAF4DA] hover:bg-[#6FAE3E] hover:text-white transition-colors"
                title="View your account"
              >
                {user.name?.split(" ")[0] || "Account"}
              </Link>
              <button
                onClick={logout}
                title="Log out"
                className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#7A8B6F] hover:text-[#D9483A] transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              aria-label="Sign In"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#F3F4F6] transition-colors group cursor-pointer text-xs font-bold text-[#1E4620]"
            >
              <User size={16} color="#1E4620" />
              <span>Sign In</span>
            </button>
          )}

          <Link
            href="/track-order"
            aria-label="Track delivery"
            className="hidden sm:flex items-center p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors group"
            title="Track your order"
          >
            <Truck size={19} color="#24321F" className="group-hover:opacity-70 transition-opacity" />
          </Link>

          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative flex items-center p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors group cursor-pointer"
          >
            <ShoppingBag size={19} color="#24321F" className="group-hover:opacity-70 transition-opacity" />
            {itemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 text-[10px] font-bold text-white rounded-full w-4 h-4 grid place-items-center"
                style={{ backgroundColor: "#D9483A" }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 border"
            style={{ backgroundColor: "#F3F4F6", borderColor: "#E5E7EB" }}
          >
            <Search size={15} color="#6FAE3E" />
            <input
              autoFocus
              type="text"
              placeholder="Search vegetables, herbs…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#9CA3AF]"
              style={{ color: "#24321F" }}
            />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          NAV LINKS ROW — centered navigation
      ══════════════════════════════════════════ */}
      <nav
        className="border-t hidden md:block"
        style={{ borderColor: "#E5E7EB", backgroundColor: "#FAFAFA" }}
      >
        <ul className="flex items-center justify-center gap-1 px-5 lg:px-10 max-w-[1440px] mx-auto text-[13px] font-semibold relative">
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
                  className="flex items-center gap-1 px-3 py-3 transition-all duration-150 rounded-md hover:text-[#1E4620]"
                  style={{ color: isActive ? "#1E4620" : "#4B5443" }}
                >
                  {isActive && (
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-0.5"
                      style={{ backgroundColor: "#6FAE3E" }}
                    />
                  )}
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={13}
                      className="transition-transform duration-200"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        color: "#7A8B6F",
                      }}
                    />
                  )}
                </a>

                {/* Active underline */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ backgroundColor: "#6FAE3E" }}
                  />
                )}

                {/* Dropdown */}
                {link.dropdown && isOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 min-w-[210px] z-50 rounded-2xl border py-2 overflow-hidden"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E5E7EB",
                      boxShadow: "0 16px 48px rgba(30,70,32,0.14), 0 2px 8px rgba(30,70,32,0.07)",
                    }}
                  >
                    {link.dropdown.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-[#F3F4F6]"
                        style={{ color: "#3A4433" }}
                      >
                        <span
                          className="grid place-items-center w-5 h-5 rounded-full shrink-0"
                          style={{ backgroundColor: "#EAF4DA" }}
                        >
                          <Leaf size={10} color="#6FAE3E" />
                        </span>
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            );
          })}

          {/* Fresh stock badge — absolute right */}
          <li className="absolute right-5 lg:right-10 top-1/2 -translate-y-1/2">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide px-3 py-1 rounded-full"
              style={{ backgroundColor: "#EAF4DA", color: "#3A6B22" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6FAE3E] animate-pulse" />
              Fresh stock today
            </span>
          </li>
        </ul>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
        >
          <ul className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#EAF4DA]"
                  style={{ color: "#24321F" }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Leaf size={13} color="#6FAE3E" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}