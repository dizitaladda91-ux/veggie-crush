"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingBag, Leaf, PhoneCall } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#our-bestsellers" },
  { label: "Why Us", href: "#who-we-are" },
  { label: "How We Make", href: "#manufacturing-process" },
  { label: "Reviews", href: "#what-our-consumer-says" },
  { label: "Offers", href: "#current-offers" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full ${
        scrolled
          ? "bg-white shadow-md py-1.5 border-b border-brand-green/10"
          : "bg-white py-2 sm:py-2.5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Left - Prominent & Large */}
        <Link href="/" className="flex items-center gap-2 group py-1">
          <div className="relative h-16 w-48 sm:h-20 sm:w-64 md:h-24 md:w-72">
            <Image
              src="/images/logo.png"
              alt="Pure VeggieCrush Logo - Nature, Nothing Else"
              fill
              priority
              sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, 300px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-brand-ink hover:text-brand-green flex items-center gap-1 group py-1 transition-colors"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-brand-green hover:text-brand-red flex items-center gap-1.5 transition-colors"
          >
            <PhoneCall size={14} className="text-brand-orange" />
            <span>Support</span>
          </a>
          <Link
            href="#our-bestsellers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-brand-red hover:bg-brand-green shadow-sm transition-colors"
          >
            <ShoppingBag size={14} />
            <span>Order Now</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="#our-bestsellers"
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white bg-brand-red hover:bg-brand-green"
          >
            Order
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-brand-green hover:bg-brand-cream"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-brand-green/10 px-6 py-5 shadow-xl">
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-brand-ink hover:text-brand-green py-2 border-b border-gray-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <Leaf size={14} className="text-brand-leaf opacity-60" />
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="#our-bestsellers"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-lg text-sm font-bold text-white bg-brand-red hover:bg-brand-green flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag size={16} />
                <span>Order Pure Crushes Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
