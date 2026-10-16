"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  Package,
} from "lucide-react";

export default function JashnContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    productInterest: "All Single-Ingredient Powders",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({
        name: "",
        phone: "",
        email: "",
        productInterest: "All Single-Ingredient Powders",
        message: "",
      });
    }, 4000);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail("");
    }, 4000);
  };

  return (
    <div className="w-full">
      {/* 1. GET IN TOUCH SECTION (Matching Jashn Realty Section 13) */}
      <section
        id="contact"
        className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2] border-t border-[#E8ECE2]"
      >
        <div className="max-w-[1360px] mx-auto">
          {/* Header */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold tracking-widest uppercase mb-3 border border-[#C8E6C9]">
              <Sparkles className="w-3.5 h-3.5 text-[#7CB342]" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B5E20] tracking-tight">
              Let&apos;s Connect For Pure Health
            </h2>
            <div className="w-16 h-1 bg-[#E8871E] mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sm sm:text-base text-gray-600">
              Have questions about our machine-dried powders, custom wellness bundles, or bulk kitchen orders?
              Our team is here to assist you every step of the way.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Connect & Details (Matching Jashn slideInLeft) */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8ECE2] space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B5E20]">
                    Direct Customer Support
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Talk to our botanical nutrition specialists or order directly on WhatsApp.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* WhatsApp Quick Link */}
                  <a
                    href="https://wa.me/919999999999?text=Hi%20VeggieCrush,%20I%20would%20like%20to%20know%20more%20about%20your%20machine-dried%20powders."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#E8F5E9]/60 hover:bg-[#E8F5E9] border border-[#C8E6C9] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider">
                        Instant WhatsApp Chat
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        +91 99999 99999
                      </p>
                      <p className="text-[11px] text-gray-500">Fastest response for order tracking &amp; combos</p>
                    </div>
                  </a>

                  {/* Email Support */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8ECE2]">
                    <div className="w-12 h-12 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center shadow-sm shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Email Support
                      </p>
                      <p className="text-sm font-bold text-[#1B5E20]">
                        care@veggiecrush.in
                      </p>
                      <p className="text-[11px] text-gray-500">Inquiries, partnerships &amp; bulk orders</p>
                    </div>
                  </div>

                  {/* Processing Facility */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8ECE2]">
                    <div className="w-12 h-12 rounded-xl bg-[#7CB342] text-white flex items-center justify-center shadow-sm shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Dehydration Facility
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        Hygienic Machine-Drying Unit
                      </p>
                      <p className="text-[11px] text-gray-500">India &bull; Temperature-controlled &amp; FSSAI compliant</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8ECE2]">
                    <div className="w-12 h-12 rounded-xl bg-[#E8871E] text-white flex items-center justify-center shadow-sm shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Working Hours
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        Mon – Sat: 9:00 AM – 7:00 PM IST
                      </p>
                      <p className="text-[11px] text-gray-500">Orders dispatched within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Assurance Badges */}
                <div className="pt-4 border-t border-[#E8ECE2] grid grid-cols-2 gap-3 text-xs text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
                    <span>100% Food Grade Glass Jars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#7CB342]" />
                    <span>Free Shipping on Combos</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Inquiry Form (Matching Jashn slideInRight) */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-[#E8ECE2] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7CB342]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                <h3 className="text-2xl font-serif font-bold text-[#1B5E20] mb-2">
                  Send Us an Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-8">
                  Whether you need personal wellness advice, ingredient breakdown, or express shipping details, we respond within 4 hours.
                </p>

                {formSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 text-center bg-[#E8F5E9] rounded-2xl border border-[#C8E6C9] space-y-3"
                  >
                    <CheckCircle className="w-12 h-12 text-[#1B5E20] mx-auto" />
                    <h4 className="text-xl font-bold text-[#1B5E20]">Thank You!</h4>
                    <p className="text-sm text-gray-600">
                      Your inquiry has been received. Our wellness team will reach out to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/10 transition-all bg-[#FAF7F2]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/10 transition-all bg-[#FAF7F2]/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="e.g. priya@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/10 transition-all bg-[#FAF7F2]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Product Interest
                        </label>
                        <select
                          value={formState.productInterest}
                          onChange={(e) => setFormState({ ...formState, productInterest: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/10 transition-all bg-[#FAF7F2]/50"
                        >
                          <option>All Single-Ingredient Powders</option>
                          <option>Beetroot Powder (200 g)</option>
                          <option>Moringa Leaf Powder (200 g)</option>
                          <option>Amla Powder (200 g)</option>
                          <option>Turmeric Powder (200 g)</option>
                          <option>Giloy Powder (200 g)</option>
                          <option>EverFit Daily Superfood Mix</option>
                          <option>Daily Wellness Duo Combo</option>
                          <option>Complete Kitchen Superfood Bundle</option>
                          <option>Bulk / Kitchen Supply</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Your Message / Question
                      </label>
                      <textarea
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us about how you plan to use our powders or ask any questions about machine drying, recipes, or delivery..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/10 transition-all bg-[#FAF7F2]/50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#1B5E20] hover:bg-[#144818] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#1B5E20]/20 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Send Inquiry</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[11px] text-center text-gray-500">
                      We respect your privacy. No spam or third-party sharing.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. NEWSLETTER / STAY CONNECTED BANNER (Matching Jashn Realty Section 14) */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-[#1B5E20] via-[#144818] to-[#0E3311] text-white relative overflow-hidden">
        {/* Subtle patterned overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#7CB342 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-3 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A5D6A7] text-xs font-bold tracking-widest uppercase border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#E8871E]" />
                Join The Clean Food Movement
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                Get 10% Off Your First Glass Jar Order
              </h3>
              <p className="text-xs sm:text-sm text-green-100/80 max-w-xl">
                Subscribe for seasonal harvesting notes, healthy smoothie recipes, and exclusive bundle drops.
                Zero spam, only natural goodness.
              </p>
            </motion.div>

            {/* Right Subscription Form */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              {newsletterSubscribed ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center space-y-1">
                  <div className="flex items-center justify-center gap-2 text-[#A5D6A7] font-bold text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>Welcome to the VeggieCrush family!</span>
                  </div>
                  <p className="text-xs text-green-100">
                    Use code <strong className="text-[#E8871E]">NATURE10</strong> at checkout for 10% off.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-[#E8871E] hover:bg-[#d47816] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
