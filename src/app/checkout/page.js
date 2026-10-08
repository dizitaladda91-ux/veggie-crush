"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, CheckCircle2, LockKeyhole, MapPin, PackageCheck, ShieldCheck, UserRound, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { useCart } from "@/components/cart/cart-provider";

let razorpayScriptPromise;

function loadRazorpayScript() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const loaded = Boolean(window.Razorpay);
        if (!loaded) razorpayScriptPromise = null;
        resolve(loaded);
      };
      script.onerror = () => {
        razorpayScriptPromise = null;
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  return razorpayScriptPromise;
}

const CHECKOUT_STEPS = [
  { id: "address", label: "Delivery address", icon: MapPin },
  { id: "account", label: "Your account", icon: UserRound },
  { id: "payment", label: "Payment", icon: LockKeyhole },
];

function formatRupees(paise) {
  return `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user, loading: authLoading, register, openAuthModal } = useAuth();
  const [stage, setStage] = useState("address");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderComplete, setOrderComplete] = useState(null);

  const checkoutAddress = {
    ...formData,
    fullName: formData.fullName || user?.name || "",
    email: formData.email || user?.email || "",
    phone: formData.phone || user?.phone || "",
  };
  const activeStage = stage === "account" && user ? "payment" : stage;
  const deliveryFee = subtotal >= 599 || subtotal === 0 ? 0 : 49;
  const grandTotal = subtotal + deliveryFee;

  function handleChange(event) {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }

  function handleAddressContinue(event) {
    event.preventDefault();
    setError("");
    if (!user && authLoading) {
      setError("Checking your account. Please try again in a moment.");
      return;
    }
    setStage(user ? "payment" : "account");
  }

  async function handleCreateAccount(event) {
    event.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Your password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password,
      });
      setPassword("");
      setConfirmPassword("");
      setStage("payment");
    } catch (accountError) {
      setError(accountError.message || "Could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout() {
    if (!user) {
      setError("Create an account or sign in before placing your order.");
      openAuthModal();
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty. Add a product before checking out.");
      return;
    }

    setError("");
    setLoading(true);
    let paymentModalOpen = false;
    try {
      if (!(await loadRazorpayScript())) {
        throw new Error("Secure payment could not be loaded. Check your connection and try again.");
      }

      const orderResponse = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shippingAddress: checkoutAddress }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.error || "Could not start your order.");

      const checkout = new window.Razorpay({
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "VeggieCrush",
        description: "Farm-fresh order",
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: checkoutAddress.fullName,
          email: checkoutAddress.email,
          contact: checkoutAddress.phone,
        },
        notes: { orderId: orderData.orderId },
        theme: { color: "#1E4620" },
        modal: {
          ondismiss: () => {
            paymentModalOpen = false;
            setLoading(false);
          },
        },
        handler: async (paymentResponse) => {
          setLoading(true);
          try {
            const verifyResponse = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderData.orderId,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            });
            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }
            clearCart();
            setOrderComplete(verifyData.order);
          } catch (verificationError) {
            setError(verificationError.message || "Payment verification failed. Please contact support if money was deducted.");
          } finally {
            paymentModalOpen = false;
            setLoading(false);
          }
        },
      });

      checkout.on("payment.failed", (event) => {
        paymentModalOpen = false;
        setError(event.error?.description || "Your payment could not be completed. Please try again.");
        setLoading(false);
      });
      checkout.open();
      paymentModalOpen = true;
    } catch (checkoutError) {
      setError(checkoutError.message || "An error occurred while starting your secure checkout.");
    } finally {
      if (!paymentModalOpen) setLoading(false);
    }
  }

  if (orderComplete) {
    const orderReference = orderComplete.id?.slice(-8).toUpperCase();
    const receiptUrl = `/api/orders/${orderComplete.id}/receipt`;
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7FAF5] px-5 py-14">
        <section className="w-full max-w-xl rounded-[32px] border border-[#E5E7EB] bg-white p-7 text-center shadow-lg sm:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#EAF4DA]">
            <CheckCircle2 size={34} className="text-[#43852B]" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#6FAE3E]">Payment received</p>
          <h1 className="mt-2 text-3xl font-black text-[#1E4620]">Your order is confirmed</h1>
          <p className="mt-3 text-sm leading-6 text-[#687364]">
            Thank you, {orderComplete.address?.fullName || user?.name || "there"}. We&apos;re preparing your order with care.
          </p>

          <div className="mt-7 rounded-2xl bg-[#F8FAF6] p-5 text-left">
            <div className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3">
              <span className="text-xs font-semibold text-[#6B7280]">Order reference</span>
              <span className="font-mono text-sm font-bold text-[#1E4620]">VC-{orderReference}</span>
            </div>
            <div className="flex items-center justify-between gap-3 pt-3">
              <span className="text-xs font-semibold text-[#6B7280]">Paid securely</span>
              <span className="text-sm font-extrabold text-[#1E4620]">
                {formatRupees(orderComplete.total || 0)}
              </span>
            </div>
            {orderComplete.razorpayPaymentId && (
              <p className="mt-2 break-all text-[11px] text-[#7A8B6F]">
                Payment ID: {orderComplete.razorpayPaymentId}
              </p>
            )}
          </div>

          <a
            href={receiptUrl}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1E4620] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2C5F31]"
          >
            <PackageCheck size={17} />
            Download payment receipt (PDF)
          </a>
          <Link
            href="/products"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#DCE6D8] px-6 py-3.5 text-sm font-bold text-[#1E4620] transition-colors hover:bg-[#F5F9F1]"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  const visibleSteps = user
    ? CHECKOUT_STEPS.filter((step) => step.id !== "account")
    : CHECKOUT_STEPS;
  const stepOrder = visibleSteps.map((step) => step.id);
  const currentStepIndex = stepOrder.indexOf(activeStage);

  return (
    <main className="min-h-screen bg-[#F7FAF5] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#41613A] transition-colors hover:text-[#1E4620]">
          <ArrowLeft size={16} />
          Back to shopping
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FAE3E]">VeggieCrush checkout</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1E4620] sm:text-4xl">A few steps to your door</h1>
            <p className="mt-2 text-sm text-[#687364]">Review your items and delivery details before secure payment.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#45613C]">
            <ShieldCheck size={17} className="text-[#6FAE3E]" />
            Secure checkout powered by Razorpay
          </div>
        </div>

        <ol aria-label="Checkout progress" className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
          {visibleSteps.map((step, index) => {
            const Icon = step.icon;
            const complete = index < currentStepIndex;
            const active = step.id === activeStage;
            return (
              <li key={step.id} className={`flex items-center gap-2 border-r border-[#E5E7EB] px-3 py-4 last:border-r-0 sm:gap-3 sm:px-5 ${active ? "bg-[#F0F7E8]" : ""}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${complete || active ? "bg-[#1E4620] text-white" : "bg-[#F0F1EE] text-[#879080]"}`}>
                  {complete ? <Check size={15} /> : <Icon size={15} />}
                </span>
                <span className={`text-[11px] font-bold leading-4 sm:text-sm ${active ? "text-[#1E4620]" : "text-[#687364]"}`}>
                  <span className="hidden sm:inline">{index + 1}. </span>{step.label}
                </span>
              </li>
            );
          })}
        </ol>

        {error && (
          <div role="alert" className="mt-6 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {items.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-[#E5E7EB] bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-[#1E4620]">Your basket is empty</h2>
            <p className="mt-2 text-sm text-[#687364]">Add something fresh before continuing to checkout.</p>
            <Link href="/products" className="mt-5 inline-flex rounded-full bg-[#1E4620] px-6 py-3 text-sm font-bold text-white">
              Browse products
            </Link>
          </section>
        ) : (
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-7">
              {activeStage === "address" && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-extrabold text-[#1E4620]">Where should we deliver?</h2>
                    <p className="mt-1 text-sm text-[#687364]">Enter the address where you&apos;d like your order delivered.</p>
                  </div>
                  <form onSubmit={handleAddressContinue} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-xs font-bold text-[#465342]">
                        Full name *
                        <input autoComplete="name" required name="fullName" value={formData.fullName || user?.name || ""} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="Name for delivery" />
                      </label>
                      <label className="block text-xs font-bold text-[#465342]">
                        Mobile number *
                        <input autoComplete="tel" required type="tel" pattern="[0-9+() -]{7,20}" name="phone" value={formData.phone || user?.phone || ""} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="For delivery updates" />
                      </label>
                    </div>
                    <label className="block text-xs font-bold text-[#465342]">
                      Email address *
                      <input autoComplete="email" required type="email" name="email" value={formData.email || user?.email || ""} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="For your account and order updates" />
                    </label>
                    <label className="block text-xs font-bold text-[#465342]">
                      Flat, house no. and street *
                      <input autoComplete="address-line1" required name="line1" value={formData.line1} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="House / flat number, street, area" />
                    </label>
                    <label className="block text-xs font-bold text-[#465342]">
                      Apartment, landmark (optional)
                      <input autoComplete="address-line2" name="line2" value={formData.line2} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="Apartment, suite or nearby landmark" />
                    </label>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <label className="block text-xs font-bold text-[#465342]">
                        City *
                        <input autoComplete="address-level2" required name="city" value={formData.city} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" />
                      </label>
                      <label className="block text-xs font-bold text-[#465342]">
                        State *
                        <input autoComplete="address-level1" required name="state" value={formData.state} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" />
                      </label>
                      <label className="block text-xs font-bold text-[#465342]">
                        PIN code *
                        <input autoComplete="postal-code" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} name="pincode" value={formData.pincode} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="6 digits" />
                      </label>
                    </div>
                    <button type="submit" disabled={authLoading} className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#1E4620] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2C5F31] disabled:opacity-50">
                      {user ? "Continue to payment" : "Continue to account"}
                    </button>
                  </form>
                </>
              )}

              {activeStage === "account" && !user && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-extrabold text-[#1E4620]">Create your VeggieCrush account</h2>
                    <p className="mt-1 text-sm leading-6 text-[#687364]">Your delivery details are saved. Create a password to securely place and track this order.</p>
                  </div>
                  <div className="mb-5 rounded-2xl bg-[#F7FAF5] p-4 text-sm text-[#465342]">
                    <p className="font-bold text-[#1E4620]">{formData.fullName}</p>
                    <p className="mt-1">{formData.email} · {formData.phone}</p>
                    <p className="mt-1">{formData.line1}{formData.line2 ? `, ${formData.line2}` : ""}, {formData.city}, {formData.state} {formData.pincode}</p>
                    <button type="button" onClick={() => setStage("address")} className="mt-3 text-xs font-bold text-[#3D782B] underline underline-offset-2">Edit delivery details</button>
                  </div>
                  <form onSubmit={handleCreateAccount} className="space-y-4">
                    <label className="block text-xs font-bold text-[#465342]">
                      Create password
                      <input required minLength={6} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="At least 6 characters" />
                    </label>
                    <label className="block text-xs font-bold text-[#465342]">
                      Confirm password
                      <input required minLength={6} type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="Enter your password again" />
                    </label>
                    <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-full bg-[#1E4620] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2C5F31] disabled:opacity-50">
                      {loading ? "Creating your account..." : "Create account & continue"}
                    </button>
                  </form>
                  <div className="mt-5 border-t border-[#E5E7EB] pt-4 text-center">
                    <p className="text-sm text-[#687364]">Already have an account?</p>
                    <button type="button" onClick={openAuthModal} className="mt-1 text-sm font-bold text-[#3D782B] underline underline-offset-2">
                      Sign in and continue with this address
                    </button>
                  </div>
                </>
              )}

              {activeStage === "payment" && (
                <>
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#1E4620]">Review & pay securely</h2>
                      <p className="mt-1 text-sm text-[#687364]">Confirm the delivery details, then complete payment with Razorpay.</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F0F7E8] px-3 py-1.5 text-xs font-bold text-[#376B26]">
                      <CheckCircle2 size={14} /> Account ready
                    </span>
                  </div>
                  <div className="rounded-2xl border border-[#E5E7EB] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <MapPin size={18} className="mt-0.5 shrink-0 text-[#6FAE3E]" />
                        <div className="text-sm leading-6 text-[#465342]">
                          <p className="font-bold text-[#1E4620]">{checkoutAddress.fullName}</p>
                          <p>{checkoutAddress.line1}{checkoutAddress.line2 ? `, ${checkoutAddress.line2}` : ""}</p>
                          <p>{checkoutAddress.city}, {checkoutAddress.state} {checkoutAddress.pincode}</p>
                          <p>{checkoutAddress.phone} · {checkoutAddress.email}</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => setStage("address")} className="shrink-0 text-xs font-bold text-[#3D782B] underline underline-offset-2">Edit</button>
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl bg-[#F7FAF5] p-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#1E4620]">
                      <LockKeyhole size={16} className="text-[#6FAE3E]" />
                      Payments handled securely by Razorpay
                    </div>
                    <p className="mt-1 pl-6 text-xs leading-5 text-[#687364]">Choose from the payment methods available at the secure payment window. Your card details are never stored by VeggieCrush.</p>
                  </div>
                  <button type="button" onClick={handleCheckout} disabled={loading || !user} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6FAE3E] px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-[#568D31] disabled:cursor-wait disabled:opacity-60">
                    <LockKeyhole size={17} />
                    {loading ? "Connecting to secure payment..." : `Pay ₹${grandTotal} with Razorpay`}
                  </button>
                  <p className="mt-3 text-center text-[11px] leading-5 text-[#7A8B6F]">By continuing, you confirm your order and delivery information is correct.</p>
                </>
              )}
            </section>

            <aside className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-extrabold text-[#1E4620]">Order summary</h2>
              <div className="mt-4 max-h-72 divide-y divide-[#EEF0EC] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#FAFBF9]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill sizes="56px" className="object-contain p-1" />
                      ) : (
                        <span className="grid h-full place-items-center text-xl">🌱</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs font-bold leading-5 text-[#273A25]">{item.name}</p>
                      <p className="mt-0.5 text-[11px] text-[#7A8B6F]">Qty {item.quantity}{item.unit ? ` · ${item.unit}` : ""}</p>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-[#1E4620]">₹{(item.price || 0) * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-3 border-t border-[#E5E7EB] pt-4 text-sm">
                <div className="flex justify-between text-[#687364]"><span>Subtotal</span><span className="font-semibold text-[#273A25]">₹{subtotal}</span></div>
                <div className="flex justify-between text-[#687364]"><span>Delivery</span><span className="font-semibold text-[#273A25]">{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span></div>
                <div className="flex justify-between border-t border-[#E5E7EB] pt-3 text-base font-black text-[#1E4620]"><span>Total</span><span>₹{grandTotal}</span></div>
              </div>
              {subtotal < 599 && subtotal > 0 && (
                <p className="mt-4 rounded-xl bg-[#F7FAF5] p-3 text-xs leading-5 text-[#55704D]">
                  Add ₹{599 - subtotal} more for free delivery.
                </p>
              )}
              <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#EEF0EC] pt-4 text-[11px] font-medium text-[#7A8B6F]">
                <ShieldCheck size={15} className="text-[#6FAE3E]" />
                Safe & encrypted payment
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
