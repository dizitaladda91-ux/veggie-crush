import Image from "next/image";
import Link from "next/link";
import { Leaf, Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-brand-green text-white pt-16 pb-12 border-t border-brand-leaf/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="#home" className="inline-block">
              <div className="relative h-14 w-48 bg-white/95 rounded-xl px-2 py-1 shadow-inner">
                <Image
                  src="/images/logo.png"
                  alt="Pure VeggieCrush"
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-xl font-tagline italic text-brand-orange">
              Nature, Nothing Else.
            </p>

            <p className="text-xs sm:text-sm text-brand-cream/80 font-body leading-relaxed max-w-sm">
              India&apos;s clean-label vegetable and botanical crush brand. Cold-processed, low-temperature dehydrated, and packaged in airtight 200g glass jars for zero chemical leaching.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-orange text-white grid place-items-center transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-body text-brand-cream/80">
              <li>
                <Link href="#home" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Leaf size={12} className="text-brand-orange" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Leaf size={12} className="text-brand-orange" />
                  <span>Farm Products</span>
                </Link>
              </li>
              <li>
                <Link href="#why-us" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Leaf size={12} className="text-brand-orange" />
                  <span>Why Choose Us</span>
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Leaf size={12} className="text-brand-orange" />
                  <span>About Our Farm</span>
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Leaf size={12} className="text-brand-orange" />
                  <span>Contact Desk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Direct Links (Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange font-heading">
              Our Certified Crushes
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-body text-brand-cream/80">
              <li>Beetroot Power Crush (Stamina &amp; Flow)</li>
              <li>Pure Moringa Superleaf Crush (Detox &amp; Energy)</li>
              <li>Wild Amla Vitamin-C Crush (Immunity &amp; Collagen)</li>
              <li>Giloy Immunity Herbal Crush (Cellular Health)</li>
              <li>Fresh Bitter Neem Crush (Blood Cleanser)</li>
              <li>EverFit Vitality Daily Blend (Full Spectrum)</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-brand-cream/70">
          <p>© {currentYear} Pure VeggieCrush™. All rights reserved. Registered Indian Trademark.</p>
          <div className="flex items-center gap-6">
            <span>NPOP Organic Certified</span>
            <span>FSSAI Central Compliant</span>
            <span>100% Eco-Glass Packaged</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
