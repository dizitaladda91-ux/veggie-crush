"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Phone, AlertCircle, CheckCircle, Eye, EyeOff, Leaf, ShieldCheck, PackageCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";

export default function AuthModal() {
  const { isAuthModalOpen, authSessionId } = useAuth();
  return isAuthModalOpen ? <AuthDialog key={authSessionId} /> : null;
}

function AuthDialog() {
  const router = useRouter();
  const { authModalTab: tab, setAuthModalTab, closeAuthModal, login, register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function selectTab(nextTab) {
    setAuthModalTab(nextTab);
    setError("");
    setSuccess("");
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (tab === "register" && formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match. Please check and try again.");
      return;
    }

    setLoading(true);

    try {
      if (tab === "login") {
        const loggedUser = await login(formData.email, formData.password, { closeModal: false });
        if (loggedUser?.role === "ADMIN") {
          setSuccess("Welcome back! Opening your administrator portal...");
          setTimeout(() => {
            closeAuthModal();
            router.push("/admin");
          }, 900);
        } else {
          setSuccess("You’re signed in. Your account is ready.");
          setTimeout(closeAuthModal, 900);
        }
      } else {
        await register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
        }, { closeModal: false });
        setSuccess("Your account is ready. Welcome to VeggieCrush!");
        setTimeout(closeAuthModal, 1100);
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
          className="relative z-10 my-auto grid w-full max-w-4xl overflow-hidden rounded-[28px] border border-[#E1E9DD] bg-white shadow-2xl md:grid-cols-[0.88fr_1.12fr]"
        >
          <button
            onClick={closeAuthModal}
            disabled={loading}
            className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#315431] shadow-sm transition hover:bg-white disabled:opacity-50 md:right-4 md:top-4"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#173D22] p-9 text-white md:flex">
            <div className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full bg-[#7FAE54]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#A9C981]/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#C9E5A8]">
                <Leaf size={24} />
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#C9E5A8]">Your VeggieCrush space</p>
              <h2 className="mt-3 max-w-xs text-3xl font-black leading-tight">
                Fresh picks. A simpler way to shop.
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
                Sign in to keep your favourites, orders and delivery details together.
              </p>
            </div>
            <div className="relative space-y-3">
              {[
                [PackageCheck, "Track orders and find receipts"],
                [ShieldCheck, "Keep your details in one place"],
                [Leaf, "Save products for your next visit"],
              ].map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-3">
                  <Icon size={17} className="shrink-0 text-[#C9E5A8]" />
                  <span className="text-xs font-medium text-white/90">{label}</span>
                </div>
              ))}
            </div>
          </aside>

          <section className="max-h-[92vh] overflow-y-auto p-5 sm:p-8 md:p-10">
            <div className="mb-6 pr-10 md:pr-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6FAE3E]">
                VeggieCrush Account
              </span>
              <h1 id="auth-title" className="mt-1 text-2xl font-black text-[#1E4620] sm:text-3xl">
                {tab === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#74806E]">
                {tab === "login"
                  ? "Sign in to see your orders, wishlist and saved addresses."
                  : "A few details and your VeggieCrush account is ready."}
              </p>
            </div>

            <div className="mb-6 flex rounded-full border border-[#E3E9DF] bg-[#F5F8F2] p-1" role="tablist" aria-label="Account access">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "login"}
                onClick={() => selectTab("login")}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${tab === "login" ? "bg-[#1E4620] text-white shadow-sm" : "text-[#52634B] hover:text-[#1E4620]"}`}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "register"}
                onClick={() => selectTab("register")}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${tab === "register" ? "bg-[#1E4620] text-white shadow-sm" : "text-[#52634B] hover:text-[#1E4620]"}`}
              >
                Create account
              </button>
            </div>

            {error && (
              <div role="alert" className="mb-4 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800">
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div role="status" aria-live="polite" className="mb-4 flex items-start gap-2.5 rounded-2xl border border-green-200 bg-green-50 p-3.5 text-sm text-green-800">
                <CheckCircle size={17} className="mt-0.5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "register" && (
                <>
                  <label className="block text-xs font-bold text-[#465342]">
                    Full name
                    <span className="relative mt-1.5 block">
                      <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82907B]" />
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-[#DDE5D8] bg-white py-3 pl-10 pr-3.5 text-sm font-normal text-[#1E3821] outline-none transition focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]"
                      />
                    </span>
                  </label>

                  <label className="block text-xs font-bold text-[#465342]">
                    Phone number <span className="font-normal text-[#899283]">(optional)</span>
                    <span className="relative mt-1.5 block">
                      <Phone size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82907B]" />
                      <input
                        type="tel"
                        autoComplete="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your contact number"
                        className="w-full rounded-xl border border-[#DDE5D8] bg-white py-3 pl-10 pr-3.5 text-sm font-normal text-[#1E3821] outline-none transition focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]"
                      />
                    </span>
                  </label>
                </>
              )}

              <label className="block text-xs font-bold text-[#465342]">
                {tab === "login" ? "Email address or admin ID" : "Email address"}
                <span className="relative mt-1.5 block">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82907B]" />
                  <input
                    type={tab === "login" ? "text" : "email"}
                    required
                    autoComplete="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={tab === "login" ? "name@example.com" : "you@example.com"}
                    className="w-full rounded-xl border border-[#DDE5D8] bg-white py-3 pl-10 pr-3.5 text-sm font-normal text-[#1E3821] outline-none transition focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]"
                  />
                </span>
              </label>

              <label className="block text-xs font-bold text-[#465342]">
                Password
                <span className="relative mt-1.5 block">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82907B]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={tab === "register" ? 6 : undefined}
                    autoComplete={tab === "login" ? "current-password" : "new-password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={tab === "register" ? "At least 6 characters" : "Enter your password"}
                    className="w-full rounded-xl border border-[#DDE5D8] bg-white py-3 pl-10 pr-12 text-sm font-normal text-[#1E3821] outline-none transition focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[#74806E] transition hover:bg-[#F2F6EF] hover:text-[#1E4620]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>

              {tab === "register" && (
                <label className="block text-xs font-bold text-[#465342]">
                  Confirm password
                  <span className="relative mt-1.5 block">
                    <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82907B]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Enter the same password again"
                      className="w-full rounded-xl border border-[#DDE5D8] bg-white py-3 pl-10 pr-3.5 text-sm font-normal text-[#1E3821] outline-none transition focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]"
                    />
                  </span>
                </label>
              )}

              <button
                type="submit"
                disabled={loading || Boolean(success)}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1E4620] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#2C5F31] disabled:cursor-wait disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : tab === "login"
                    ? "Sign in to your account"
                    : "Create my account"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            <p className="mt-5 text-center text-[11px] leading-5 text-[#899283]">
              Your account details are used to manage your orders and delivery information.
            </p>
          </section>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
