"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "./auth-context";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const [tab, setTab] = useState("login"); // "login" | "register"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isAuthModalOpen) return null;

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (tab === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
        setSuccess("Account created successfully!");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} color="#1E4620" />
          </button>

          {/* Heading */}
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "#6FAE3E" }}>
              VeggieCrush Account
            </span>
            <h2 className="text-2xl font-black mt-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}>
              {tab === "login" ? "Welcome Back!" : "Join the Farm Family"}
            </h2>
            <p className="text-xs mt-1" style={{ color: "#7A8B6F" }}>
              {tab === "login"
                ? "Sign in to track orders and manage saved addresses."
                : "Create an account for personalized wellness recommendations."}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex rounded-full p-1 border mb-6" style={{ backgroundColor: "#F3F4F6", borderColor: "#E5E7EB" }}>
            <button
              onClick={() => { setTab("login"); setError(""); }}
              className="flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer"
              style={{
                backgroundColor: tab === "login" ? "#1E4620" : "transparent",
                color: tab === "login" ? "#FFFFFF" : "#1E4620",
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab("register"); setError(""); }}
              className="flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer"
              style={{
                backgroundColor: tab === "register" ? "#1E4620" : "transparent",
                color: tab === "register" ? "#FFFFFF" : "#1E4620",
              }}
            >
              Register
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
              <CheckCircle size={15} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === "register" && (
              <>
                <div>
                  <label className="block text-[11px] font-bold mb-1" style={{ color: "#4B5443" }}>Full Name</label>
                  <div className="flex items-center gap-2 rounded-xl border px-3 py-2.5 bg-white" style={{ borderColor: "#E5E7EB" }}>
                    <User size={15} color="#7A8B6F" />
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Priya Patel"
                      className="w-full text-xs outline-none text-[#1E4620]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1" style={{ color: "#4B5443" }}>Phone Number</label>
                  <div className="flex items-center gap-2 rounded-xl border px-3 py-2.5 bg-white" style={{ borderColor: "#E5E7EB" }}>
                    <Phone size={15} color="#7A8B6F" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full text-xs outline-none text-[#1E4620]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold mb-1" style={{ color: "#4B5443" }}>Email Address</label>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2.5 bg-white" style={{ borderColor: "#E5E7EB" }}>
                <Mail size={15} color="#7A8B6F" />
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full text-xs outline-none text-[#1E4620]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold mb-1" style={{ color: "#4B5443" }}>Password</label>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2.5 bg-white" style={{ borderColor: "#E5E7EB" }}>
                <Lock size={15} color="#7A8B6F" />
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full text-xs outline-none text-[#1E4620]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 rounded-full py-3.5 text-xs font-bold text-white transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: "#6FAE3E" }}
            >
              {loading
                ? "Securing credentials..."
                : tab === "login"
                ? "Sign In With JWT"
                : "Create Secure Account"}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
