"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Package, MapPin, LogOut, CheckCircle2, ShieldCheck, Plus, ShoppingBag } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export default function AccountPage() {
  const { user, openAuthModal, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "addresses" | "profile"

  const MOCK_ORDERS = [
    {
      id: "ORD-94821",
      date: "Oct 02, 2026",
      status: "Delivered",
      total: 698,
      items: [
        { name: "Organic Beetroot Powder", qty: 1, price: 299 },
        { name: "Moringa Superleaf Powder", qty: 1, price: 399 },
      ],
    },
    {
      id: "ORD-91044",
      date: "Sep 24, 2026",
      status: "Delivered",
      total: 699,
      items: [
        { name: "Essential Family Harvest Box", qty: 1, price: 699 },
      ],
    },
  ];

  if (!user) {
    return (
      <main className="min-h-screen py-16 px-6 lg:px-10 flex items-center justify-center bg-white">
        <div className="max-w-md w-full rounded-3xl border p-8 text-center bg-[#F9FAFB] border-[#E5E7EB] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#EAF4DA] mx-auto flex items-center justify-center mb-4">
            <User size={30} color="#1E4620" />
          </div>
          <h1 className="text-2xl font-black mb-2" style={{ color: "#1E4620" }}>
            Sign In to Your Account
          </h1>
          <p className="text-xs text-[#6B7280] mb-6">
            Log in to view past farm orders, manage saved delivery addresses, and track real-time shipments.
          </p>
          <button
            onClick={openAuthModal}
            className="w-full py-3.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105 cursor-pointer shadow-sm"
            style={{ backgroundColor: "#1E4620" }}
          >
            Sign In with JWT
          </button>
          <Link href="/" className="block mt-4 text-xs font-semibold text-[#6B7280] hover:underline">
            ← Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-75 transition-opacity"
          style={{ color: "#1E4620" }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Profile Card Header */}
        <div className="rounded-3xl border p-6 sm:p-8 mb-8 bg-[#F9FAFB] border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#EAF4DA] text-2xl font-black grid place-items-center text-[#1E4620]">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black" style={{ color: "#1E4620" }}>
                  {user.name || "Valued Customer"}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4DA] text-[#1E4620]">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">{user.email}</p>
              {user.phone && <p className="text-xs text-[#6B7280]">{user.phone}</p>}
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E5E7EB] bg-white text-xs font-bold text-[#D9483A] hover:bg-red-50 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E5E7EB] mb-8 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "orders" ? "border-b-2 border-[#1E4620] text-[#1E4620]" : "text-[#6B7280] hover:text-[#1E4620]"
            }`}
          >
            <Package size={15} />
            <span>Order History</span>
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "addresses" ? "border-b-2 border-[#1E4620] text-[#1E4620]" : "text-[#6B7280] hover:text-[#1E4620]"
            }`}
          >
            <MapPin size={15} />
            <span>Saved Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "profile" ? "border-b-2 border-[#1E4620] text-[#1E4620]" : "text-[#6B7280] hover:text-[#1E4620]"
            }`}
          >
            <User size={15} />
            <span>Account Security</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {MOCK_ORDERS.map((ord) => (
              <div key={ord.id} className="rounded-3xl border p-6 bg-white border-[#E5E7EB] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E7EB] gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#1E4620]">{ord.id}</span>
                    <span className="text-xs text-[#6B7280] ml-3">Placed on {ord.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#1E4620] flex items-center gap-1">
                      <CheckCircle2 size={12} color="#6FAE3E" />
                      <span>{ord.status}</span>
                    </span>
                    <span className="text-sm font-extrabold text-[#1E4620]">₹{ord.total}</span>
                  </div>
                </div>

                <div className="pt-4 divide-y divide-[#E5E7EB]">
                  {ord.items.map((item, i) => (
                    <div key={i} className="py-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#4B5443]">{item.name} × {item.qty}</span>
                      <span className="font-bold text-[#1E4620]">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-3xl border p-6 bg-white border-[#E5E7EB] shadow-sm relative">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4DA] text-[#1E4620] uppercase tracking-wider">
                Default Home Address
              </span>
              <h4 className="text-sm font-bold mt-2" style={{ color: "#1E4620" }}>
                {user.name}
              </h4>
              <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                Flat 402, Green Meadows Enclave, Near Bio-diversity Park<br />
                Pune, Maharashtra - 411045
              </p>
              <p className="text-xs text-[#6B7280] mt-2">Phone: {user.phone || "+91 98765 43210"}</p>
            </div>

            <button className="rounded-3xl border-2 border-dashed border-[#E5E7EB] p-8 flex flex-col items-center justify-center text-[#6B7280] hover:border-[#6FAE3E] hover:text-[#1E4620] transition-colors cursor-pointer min-h-[160px]">
              <Plus size={24} className="mb-2" />
              <span className="text-xs font-bold">Add New Delivery Address</span>
            </button>
          </div>
        )}

        {/* Tab 3: Security */}
        {activeTab === "profile" && (
          <div className="rounded-3xl border p-6 sm:p-8 bg-white border-[#E5E7EB] shadow-sm max-w-xl">
            <div className="flex items-center gap-2 mb-4 text-[#1E4620]">
              <ShieldCheck size={20} color="#6FAE3E" />
              <h3 className="text-base font-bold">JWT Security & Authentication</h3>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
              Your account is secured with HTTP-only signed JSON Web Tokens (HS256) and bcrypt salted password hashing. Protected endpoints verify authorization on every request.
            </p>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280]">Account Role</span>
                <span className="font-bold text-[#1E4620] uppercase">{user.role || "Customer"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280]">Session Status</span>
                <span className="font-bold text-[#6FAE3E]">Active & Verified</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280]">Security Protocol</span>
                <span className="font-mono text-[11px] text-[#1E4620]">jose + bcryptjs</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
