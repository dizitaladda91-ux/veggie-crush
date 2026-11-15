"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Leaf } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus({ type: "success", text: data.message });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err: any) {
      setStatus({ type: "error", text: err.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="w-full py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-green/20 text-xs font-bold text-brand-green uppercase tracking-wider mb-3">
            <Leaf size={13} className="text-brand-leaf" />
            <span>We Are Here For You</span>
          </div>

          {/* Big heading: first word brand-green, second word brand-red */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-3">
            <span className="text-brand-green">Contact</span>{" "}
            <span className="text-brand-red">Our Farm</span>
          </h2>

          <p className="text-2xl font-tagline italic text-brand-orange mb-3">
            Nature, Nothing Else.
          </p>

          <p className="text-sm sm:text-base text-brand-ink/75 font-body leading-relaxed">
            Have questions regarding our organic cultivation, batch testing, or bulk subscriptions? Send us a message or chat directly on WhatsApp.
          </p>
        </div>

        {/* 2 Column Layout: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl bg-brand-cream p-8 sm:p-10 border border-brand-green/15 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-green font-heading mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-body">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-brand-ink mb-1.5">
                  Your Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Satyam Sharma"
                  className="w-full px-4 py-3 rounded-lg border border-brand-green/20 bg-white text-sm text-brand-ink placeholder-gray-400 focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-brand-ink mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg border border-brand-green/20 bg-white text-sm text-brand-ink placeholder-gray-400 focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-brand-ink mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="satyam@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-brand-green/20 bg-white text-sm text-brand-ink placeholder-gray-400 focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-brand-ink mb-1.5">
                  Your Message or Question *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you need or ask about our seasonal harvests..."
                  className="w-full px-4 py-3 rounded-lg border border-brand-green/20 bg-white text-sm text-brand-ink placeholder-gray-400 focus:outline-none focus:border-brand-green resize-none"
                />
              </div>

              {status && (
                <div
                  className={`p-3.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                    status.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{status.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg text-sm font-bold text-white bg-brand-red hover:bg-brand-green transition-colors duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Send size={15} />
                <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
              </button>
            </form>
          </div>

          {/* Right: Address & Direct WhatsApp & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Details Card */}
            <div className="rounded-2xl bg-white p-7 border border-brand-green/15 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-brand-green font-heading">
                Direct Farm Contact
              </h3>

              <div className="flex items-start gap-3.5 text-sm font-body text-brand-ink/80">
                <MapPin size={20} className="text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-ink">Pure VeggieCrush Organic Farms</p>
                  <p className="text-xs text-brand-ink/70 mt-0.5 leading-relaxed">
                    Plot 42, Green Agro Hub, Near Bio-Fertilizer Zone, Pune - Nashik Agro Corridor, Maharashtra 410501
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-sm font-body text-brand-ink/80">
                <Phone size={18} className="text-brand-orange shrink-0" />
                <div>
                  <p className="text-xs text-brand-ink/60">Call / Customer Desk:</p>
                  <a href="tel:+919876543210" className="font-bold text-brand-green hover:underline">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-sm font-body text-brand-ink/80">
                <Mail size={18} className="text-brand-orange shrink-0" />
                <div>
                  <p className="text-xs text-brand-ink/60">Email Inquiries:</p>
                  <a href="mailto:care@veggiecrush.in" className="font-bold text-brand-green hover:underline">
                    care@veggiecrush.in
                  </a>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-3">
                <a
                  href="https://wa.me/919876543210?text=Hi%20Pure%20VeggieCrush!%20I%20have%20an%20inquiry%20regarding%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare size={16} />
                  <span>Chat with Us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="rounded-2xl overflow-hidden border border-brand-green/15 shadow-sm bg-brand-cream/80 p-5 text-center flex flex-col items-center justify-center min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green grid place-items-center mb-3">
                <MapPin size={24} className="text-brand-green" />
              </div>
              <h4 className="text-sm font-bold text-brand-green font-heading">
                120-Acre Farm &amp; Processing Unit Map
              </h4>
              <p className="text-xs text-brand-ink/60 font-body max-w-xs mt-1 mb-3">
                Certified NPOP Organic Zone · Visitors Welcome By Prior Appointment Every Saturday
              </p>
              <span className="px-3 py-1 rounded-md bg-white border border-brand-green/20 text-[11px] font-bold text-brand-green">
                Geo: 18.5204° N, 73.8567° E
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
