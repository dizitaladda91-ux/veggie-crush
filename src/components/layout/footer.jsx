import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.6 14.3 3.6c-2.3 0-3.9 1.4-3.9 4v2.3H7.7V13H10.4v8h3.1z" />
    </svg>
  );
}

function PinterestIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.48.02-3.55l.89-3.79s-.23-.46-.23-1.14c0-1.07.62-1.87 1.4-1.87.66 0 .98.5 1 .98 0 .67-.43 1.66-.65 2.58-.18.78.39 1.41 1.16 1.41 1.39 0 2.46-1.47 2.46-3.59 0-1.88-1.35-3.19-3.28-3.19-2.39 0-3.79 1.8-3.79 3.65 0 .72.28 1.5.63 1.92a.26.26 0 0 1 .06.25c-.07.28-.22.9-.25 1.03-.04.17-.14.21-.32.13-1.2-.56-1.95-2.31-1.95-3.72 0-3.03 2.2-5.81 6.35-5.81 3.33 0 5.92 2.38 5.92 5.56 0 3.32-2.09 5.98-5 5.98-.98 0-1.9-.51-2.21-1.11l-.6 2.3c-.22.84-.81 1.9-1.21 2.54A12 12 0 1 0 12 0z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFBF9] border-t border-[#E5E7EB] pt-16 pb-10 text-[#24321F]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* ── 4-COLUMN MAIN FOOTER ROW ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Brand & Logo (lg: 4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-5 inline-flex items-center transition-transform hover:scale-[1.02]">
              <Image
                src="/brand/veggiecrush-logo-transparent.png"
                alt="VeggieCrush — Farm to Door"
                width={358}
                height={149}
                className="h-[58px] w-[140px] object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6 max-w-sm">
              A neighbourhood farm-to-door studio. Harvested fresh every morning,
              hand-selected organic produce delivered across the city in three hours.
            </p>

            {/* Circular outline social icon buttons matching reference image */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#D1D5DB] flex items-center justify-center text-[#4B5563] hover:text-[#1E4620] hover:border-[#1E4620] hover:bg-[#F0FDF4] transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#D1D5DB] flex items-center justify-center text-[#4B5563] hover:text-[#1E4620] hover:border-[#1E4620] hover:bg-[#F0FDF4] transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-10 h-10 rounded-full border border-[#D1D5DB] flex items-center justify-center text-[#4B5563] hover:text-[#1E4620] hover:border-[#1E4620] hover:bg-[#F0FDF4] transition-all"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Links (lg: 2.5 cols) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-base font-bold text-[#1E2E1C] mb-4 tracking-tight">
              Shop
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#4B5563]">
              <li>
                <Link href="/farm-boxes" className="hover:text-[#1E4620] transition-colors">
                  Signature bouquets & boxes
                </Link>
              </li>
              <li>
                <Link href="/season" className="hover:text-[#1E4620] transition-colors">
                  By occasion & season
                </Link>
              </li>
              <li>
                <Link href="/farm-boxes" className="hover:text-[#1E4620] transition-colors">
                  Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/category" className="hover:text-[#1E4620] transition-colors">
                  Custom orders
                </Link>
              </li>
              <li>
                <Link href="/recipe" className="hover:text-[#1E4620] transition-colors">
                  Care guide & recipes
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#1E4620] transition-colors">
                  All produce items
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio / About (lg: 2.5 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold text-[#1E2E1C] mb-4 tracking-tight">
              Studio
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#4B5563]">
              <li>
                <Link href="/about" className="hover:text-[#1E4620] transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#1E4620] transition-colors">
                  Delivery zones
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#1E4620] transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#1E4620] transition-colors">
                  Weddings & events
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#1E4620] transition-colors">
                  Corporate orders
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#1E4620] font-semibold transition-colors">
                  Admin portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Visit or call (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold text-[#1E2E1C] mb-4 tracking-tight">
              Visit or call
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm text-[#4B5563]">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="text-[#6FAE3E] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  123 Maplewood Lane Apartment 4B, Springfield, IL 62704 USA
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={17} className="text-[#6FAE3E] shrink-0" />
                <a
                  href="tel:+1000555555"
                  className="hover:text-[#1E4620] font-medium transition-colors"
                >
                  +1 (000) 555-555
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={17} className="text-[#6FAE3E] shrink-0" />
                <a
                  href="mailto:contact@example.com"
                  className="hover:text-[#1E4620] font-medium transition-colors"
                >
                  contact@example.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Clock size={17} className="text-[#6FAE3E] shrink-0" />
                <span>Open daily, 8:00 – 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── SUB-FOOTER BOTTOM ROW ── */}
        <div className="border-t border-[#E5E7EB] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>© 2026 VeggieCrush. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#1E4620] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#1E4620] transition-colors">
              Terms of Service
            </Link>
            <Link href="/faqs" className="hover:text-[#1E4620] transition-colors">
              Data Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}