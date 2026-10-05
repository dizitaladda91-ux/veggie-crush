import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | VeggieCrush",
  description: "VeggieCrush privacy policy, data encryption, and personal information handling guidelines.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6FAE3E]">
            Legal & Security
          </span>
          <h1
            className="text-3xl sm:text-4xl font-black tracking-tight mt-1"
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
          >
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Last updated: October 2026 • Effective for all VeggieCrush users
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none text-[#4B5443] space-y-8 text-xs sm:text-sm leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#1E4620] flex items-center gap-3">
            <ShieldCheck size={24} className="shrink-0" color="#6FAE3E" />
            <span>
              Your trust is our priority. We never sell, rent, or monetize your personal health preferences or contact details with third-party advertising brokers.
            </span>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold mb-2" style={{ color: "#1E4620" }}>
              1. Information We Collect
            </h2>
            <p>
              When you purchase or create an account on VeggieCrush, we collect:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Contact Information</strong>: Full name, delivery address, phone number, and email address to fulfill morning deliveries.</li>
              <li><strong>Authentication Data</strong>: Passwords securely hashed with bcrypt algorithms; authentication tokens issued via cryptographically signed JWTs.</li>
              <li><strong>Order History</strong>: Items purchased, subscription schedules, and preferred delivery instructions.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold mb-2" style={{ color: "#1E4620" }}>
              2. Payment Security
            </h2>
            <p>
              All online payments (UPI, Credit/Debit Cards, NetBanking) are processed via PCI-DSS Level 1 certified payment gateways. VeggieCrush does not store or process complete credit card numbers, CVVs, or UPI PINs on its servers.
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold mb-2" style={{ color: "#1E4620" }}>
              3. How We Use Your Data
            </h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Fulfilling harvest picking and same-day delivery schedules.</li>
              <li>Sending live WhatsApp/SMS order status and driver ETA notifications.</li>
              <li>Recommending seasonal harvest boxes based on your previous preferences.</li>
              <li>Preventing fraudulent transactions and unauthorized account access.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold mb-2" style={{ color: "#1E4620" }}>
              4. Cookies & Session Storage
            </h2>
            <p>
              We use secure, HTTP-only cookies strictly necessary for maintaining your active user session, shopping basket contents, and checkout flow.
            </p>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold mb-2" style={{ color: "#1E4620" }}>
              5. Contact Us Regarding Your Privacy
            </h2>
            <p>
              If you have any questions or wish to request data deletion, contact our Data Protection Officer at <strong>privacy@veggiecrush.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
