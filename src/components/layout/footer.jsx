import Link from "next/link";
import { Leaf, ShieldCheck } from "lucide-react";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.6 14.3 3.6c-2.3 0-3.9 1.4-3.9 4v2.3H7.7V13H10.4v8h3.1z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21l-6.6 7.6L22.3 21h-6.4l-5-6.5L4.9 21H2.8l7-8.1L2 3h6.5l4.6 6 5.8-6zm-1.1 16.1h1.2L7.3 4.8H6l11.8 14.3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2a3 3 0 00-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 002.4 7.2 31 31 0 002 12a31 31 0 00.4 4.8 3 3 0 002.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 002.1-2.1A31 31 0 0022 12a31 31 0 00-.4-4.8zM10 15.2V8.8L15.6 12 10 15.2z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.9 8.4H3.6V20h3.3V8.4zM5.3 3.4a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM20.4 20h-3.3v-6c0-1.4 0-3.2-2-3.2s-2.3 1.6-2.3 3.1V20H9.5V8.4h3.2v1.6h.05c.45-.85 1.55-1.75 3.2-1.75 3.4 0 4.05 2.25 4.05 5.2V20z" />
    </svg>
  );
}

const CATEGORIES = [
  { label: "Leafy Greens", href: "/category" },
  { label: "Root Vegetables", href: "/category" },
  { label: "Herbs & Spices", href: "/category" },
];

const LINK_GROUPS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Farms", href: "/about" },
      { label: "Certifications", href: "/about" },
      { label: "Farm Journal", href: "/blog" },
      { label: "Admin Portal", href: "/admin" },
    ],
  },
  {
    title: "Orders",
    links: [
      { label: "Track Order", href: "/track-order" },
      { label: "Farm Boxes", href: "/farm-boxes" },
      { label: "Account Details", href: "/account" },
      { label: "Delivery Options", href: "/faqs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Data Security", href: "/privacy-policy" },
      { label: "Recipes", href: "/recipe" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Profile", href: "/account" },
      { label: "Order History", href: "/account" },
      { label: "Seasonal Harvest", href: "/season" },
      { label: "Help Center", href: "/faqs" },
    ],
  },
];

const SOCIALS = [FacebookIcon, XIcon, InstagramIcon, YoutubeIcon, LinkedinIcon];

export default function Footer() {
  return (
    <footer className="w-full px-6 lg:px-10 pb-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl px-8 lg:px-12 py-10 lg:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
          style={{ background: "linear-gradient(120deg, #2A5A2E 0%, #6FAE3E 100%)" }}
        >
          <Leaf
            size={180}
            color="#ffffff"
            strokeWidth={0.6}
            className="absolute -right-8 -bottom-10 opacity-15 rotate-12"
          />

          <div className="relative z-10 max-w-md">
            <h2
              className="text-3xl lg:text-4xl font-extrabold text-white mb-2"
            >
              Subscribe to our newsletter
            </h2>
            <p className="text-sm text-white/85">
              Get farm-fresh drops, seasonal picks, and offers straight to your inbox.
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto lg:min-w-[420px]">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
                style={{ backgroundColor: "#FFFFFF", color: "#24321F" }}
              />
              <button
                className="px-6 py-3 rounded-full text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: "#1E4620" }}
              >
                Subscribe
              </button>
            </div>
            <label className="flex items-center gap-2 mt-3 text-xs text-white/80">
              <input type="checkbox" className="accent-[#1E4620]" />
              I agree to have my data processed per the{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
        </div>

        <div
          className="rounded-3xl px-8 lg:px-12 py-10 lg:py-12 border"
          style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div>
              <h3 className="text-sm font-bold mb-4" style={{ color: "#1E4620" }}>
                Categories
              </h3>
              <ul className="space-y-2">
                {CATEGORIES.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm hover:underline hover:text-[#1E4620] transition-colors" style={{ color: "#4B5443" }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold mb-4" style={{ color: "#1E4620" }}>
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm hover:underline hover:text-[#1E4620] transition-colors" style={{ color: "#4B5443" }}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col items-start gap-3">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2 border"
                style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
              >
                <ShieldCheck size={20} color="#1E4620" />
                <span className="text-xs font-semibold" style={{ color: "#1E4620" }}>
                  Trust
                  <br />
                  Verified
                </span>
              </div>
              <div
                className="w-16 h-16 rounded-lg border grid place-items-center text-[9px] text-center font-semibold"
                style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF", color: "#4B5443" }}
              >
                QR
                <br />
                Code
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl mt-3 px-8 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: "#1E4620" }}
        >
          <p className="text-xs text-white/80">
            Copyright © 2026 <span className="font-bold">VEGGIECRUSH</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full grid place-items-center"
                style={{ backgroundColor: "#2A5A2E" }}
              >
                <Icon width={14} height={14} className="text-white" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: "#2A5A2E" }}>
              Mastercard
            </span>
            <span className="px-3 py-1.5 rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: "#2A5A2E" }}>
              VISA
            </span>
            <span className="px-3 py-1.5 rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: "#2A5A2E" }}>
              256-Bit SSL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}