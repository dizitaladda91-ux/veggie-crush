"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Heart,
  LoaderCircle,
  LogOut,
  MapPin,
  Package,
  PackageCheck,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { useCart } from "@/components/cart/cart-provider";

const ACCOUNT_SECTIONS = [
  { id: "orders", label: "My orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "buy-again", label: "Buy again", icon: RefreshCw },
  { id: "addresses", label: "My addresses", icon: MapPin },
  { id: "profile", label: "Profile details", icon: UserRound },
];

const EMPTY_ADDRESS = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  label: "Home",
  isDefault: false,
};

function formatMoney(paise) {
  return `₹${((paise || 0) / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) return "Date unavailable";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function statusLabel(status) {
  return String(status || "PENDING").replaceAll("_", " ").toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusStyle(status) {
  if (status === "DELIVERED" || status === "CONFIRMED") return "bg-[#EEF7E9] text-[#376B26]";
  if (status === "CANCELLED") return "bg-red-50 text-red-700";
  if (status === "SHIPPED" || status === "OUT_FOR_DELIVERY" || status === "PROCESSING") {
    return "bg-blue-50 text-blue-700";
  }
  return "bg-amber-50 text-amber-700";
}

function ProductCard({ product, action, onAction, secondaryAction, onSecondaryAction }) {
  const image = product.images?.[0] || product.image;
  const discount = product.mrp > product.price && product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E7EBE4] bg-white transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] bg-[#F7F9F5]">
        {image ? (
          <Image src={image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain p-5" />
        ) : (
          <span className="grid h-full place-items-center text-4xl">🌱</span>
        )}
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#EAF4DA] px-2.5 py-1 text-[10px] font-extrabold text-[#315D28]">
            {discount}% OFF
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#243A21] hover:text-[#568D31]">
          {product.name}
        </Link>
        <p className="mt-1 text-xs text-[#778172]">{product.unit || "Farm selected"}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-black text-[#1E4620]">₹{product.price}</span>
          {discount > 0 && <span className="text-xs text-[#8A9187] line-through">₹{product.mrp}</span>}
        </div>
        <div className="mt-4 grid gap-2">
          <button type="button" onClick={onAction} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1E4620] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#2C5F31]">
            <ShoppingBag size={14} />
            {action}
          </button>
          {secondaryAction && (
            <button type="button" onClick={onSecondaryAction} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#DDE5D8] px-4 py-2.5 text-xs font-bold text-[#34582D] transition-colors hover:bg-[#F4F8F1]">
              {secondaryAction}
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function ProfileDetailsForm({ user, onSaved, refreshUser }) {
  const [profileForm, setProfileForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save your profile.");
      await refreshUser();
      onSaved("Your profile details have been updated.");
    } catch (saveError) {
      setError(saveError.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <form onSubmit={saveProfile} className="space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-[#1E4620]">Personal information</h3>
          <p className="mt-1 text-sm text-[#74806E]">Keep your contact details current for order updates.</p>
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-xs font-medium text-red-800">{error}</p>}
        <label className="block text-xs font-bold text-[#465342]">Full name
          <input required minLength={2} maxLength={100} autoComplete="name" value={profileForm.name} onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" />
        </label>
        <label className="block text-xs font-bold text-[#465342]">Email address
          <input type="email" readOnly value={user.email || ""} className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-[#E6EAE2] bg-[#F7F9F5] px-3.5 py-3 text-sm font-normal text-[#778172]" />
          <span className="mt-1.5 block text-[11px] font-normal text-[#879080]">Your account email is used for sign-in and can&apos;t be changed here.</span>
        </label>
        <label className="block text-xs font-bold text-[#465342]">Phone number
          <input type="tel" pattern="[0-9+() -]{7,20}" autoComplete="tel" value={profileForm.phone} onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3.5 py-3 text-sm font-normal text-[#1E3821] outline-none focus:border-[#6FAE3E] focus:ring-2 focus:ring-[#6FAE3E22]" placeholder="Add a contact number" />
        </label>
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#1E4620] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2C5F31] disabled:opacity-50">
          <Check size={16} />
          {saving ? "Saving profile..." : "Save profile"}
        </button>
      </form>

      <aside className="h-fit rounded-2xl bg-[#F5F8F2] p-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#47733A]">
          <ShieldCheck size={19} />
        </div>
        <h3 className="mt-3 text-sm font-extrabold text-[#284524]">Your account is protected</h3>
        <p className="mt-1.5 text-xs leading-5 text-[#6D7768]">Your personal details and order history are visible only after you sign in.</p>
        <div className="mt-4 border-t border-[#E2E9DE] pt-3 text-xs text-[#6D7768]">
          <span className="font-semibold text-[#43583D]">Member since</span>
          <p className="mt-1">{formatDate(user.createdAt)}</p>
        </div>
      </aside>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, href, linkLabel }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#DCE5D7] bg-white px-6 py-14 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#EEF6E8] text-[#4D7B38]">
        <Icon size={24} />
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-[#1E4620]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6D7768]">{description}</p>
      <Link href={href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1E4620] px-5 py-2.5 text-sm font-bold text-white">
        {linkLabel}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

function AccountPageSkeleton() {
  return (
    <main className="min-h-screen bg-[#F7F9F5] px-5 py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-36 rounded-3xl bg-white" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          <div className="h-80 rounded-3xl bg-white" />
          <div className="h-80 rounded-3xl bg-white" />
        </div>
      </div>
    </main>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, openAuthModal, logout, refreshUser } = useAuth();
  const { addToCart } = useCart();
  const [activeSection, setActiveSection] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState("");
  const [actionError, setActionError] = useState("");
  const [success, setSuccess] = useState("");
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [busyProductId, setBusyProductId] = useState("");

  const loadPortalData = useCallback(async () => {
    const [ordersResponse, wishlistResponse, purchasedResponse, addressesResponse] = await Promise.all([
      fetch("/api/orders"),
      fetch("/api/wishlist"),
      fetch("/api/orders/purchased-products"),
      fetch("/api/user/addresses"),
    ]);
    const responses = [
      [ordersResponse, "Unable to load your orders."],
      [wishlistResponse, "Unable to load your wishlist."],
      [purchasedResponse, "Unable to load your purchased products."],
      [addressesResponse, "Unable to load your saved addresses."],
    ];
    for (const [response, fallback] of responses) {
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || fallback);
      }
    }
    const [orderData, wishlistData, purchasedData, addressData] = await Promise.all(
      responses.map(([response]) => response.json()),
    );
    return {
      orders: orderData.orders || [],
      wishlist: wishlistData.wishlist || [],
      purchasedProducts: purchasedData.products || [],
      addresses: addressData.addresses || [],
    };
  }, []);

  function applyPortalData(data) {
    setOrders(data.orders);
    setWishlist(data.wishlist);
    setPurchasedProducts(data.purchasedProducts);
    setAddresses(data.addresses);
  }

  useEffect(() => {
    if (!user) return undefined;
    let active = true;
    loadPortalData()
      .then((data) => {
        if (active) applyPortalData(data);
      })
      .catch((error) => {
        if (active) setDataError(error.message || "Unable to load your account details.");
      })
      .finally(() => {
        if (active) setDataLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user, loadPortalData]);

  async function refreshPortalData() {
    setDataLoading(true);
    setDataError("");
    try {
      applyPortalData(await loadPortalData());
    } catch (error) {
      setDataError(error.message || "Unable to load your account details.");
    } finally {
      setDataLoading(false);
    }
  }

  const paidOrders = useMemo(
    () => orders.filter((order) => order.paymentStatus === "PAID" && order.status !== "CANCELLED"),
    [orders],
  );
  const totalPaid = useMemo(
    () => paidOrders.reduce((total, order) => total + (order.total || 0), 0),
    [paidOrders],
  );

  function notify(message) {
    setSuccess(message);
    setActionError("");
    window.setTimeout(() => setSuccess(""), 3000);
  }

  function addProductToCart(product, buyNow = false) {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      unit: product.unit || "Standard",
      image: product.images?.[0] || product.image || null,
    }, !buyNow);
    if (buyNow) router.push("/checkout");
    else notify(`${product.name} added to your basket.`);
  }

  async function toggleWishlist(product) {
    setBusyProductId(product.id);
    setActionError("");
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to update wishlist.");
      setWishlist((current) => current.filter((entry) => entry.id !== product.id));
      if (data.wishlisted) {
        notify(`${product.name} is back in your wishlist.`);
      } else {
        notify("Product removed from your wishlist.");
      }
    } catch (error) {
      setActionError(error.message || "Unable to update wishlist.");
    } finally {
      setBusyProductId("");
    }
  }

  async function saveAddress(event) {
    event.preventDefault();
    setSavingAddress(true);
    setActionError("");
    try {
      const response = await fetch("/api/user/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save this address.");
      setAddresses((current) => addressForm.isDefault
        ? [data.address, ...current.map((address) => ({ ...address, isDefault: false }))]
        : [data.address, ...current]);
      setAddressForm(EMPTY_ADDRESS);
      setShowAddressForm(false);
      notify("Delivery address saved.");
    } catch (error) {
      setActionError(error.message || "Unable to save this address.");
    } finally {
      setSavingAddress(false);
    }
  }

  async function deleteAddress(addressId) {
    setActionError("");
    try {
      const response = await fetch(`/api/user/addresses?id=${encodeURIComponent(addressId)}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to delete this address.");
      setAddresses((current) => current.filter((address) => address.id !== addressId));
      notify("Address removed.");
    } catch (error) {
      setActionError(error.message || "Unable to delete this address.");
    }
  }

  if (authLoading) return <AccountPageSkeleton />;

  if (!user) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#F7F9F5] px-5 py-12">
        <section className="w-full max-w-md rounded-3xl border border-[#E6EAE2] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#EEF6E8] text-[#315E29]">
            <UserRound size={28} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#6FAE3E]">Your VeggieCrush space</p>
          <h1 className="mt-2 text-2xl font-black text-[#1E4620]">Sign in to your account</h1>
          <p className="mt-2 text-sm leading-6 text-[#6D7768]">See your real orders, saved favourites, delivery addresses and profile details in one place.</p>
          <button type="button" onClick={openAuthModal} className="mt-6 w-full rounded-full bg-[#1E4620] px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2C5F31]">
            Sign in or create account
          </button>
          <Link href="/products" className="mt-4 inline-block text-sm font-semibold text-[#4D763B] hover:underline">Continue shopping</Link>
        </section>
      </main>
    );
  }

  const contentTitle = ACCOUNT_SECTIONS.find((section) => section.id === activeSection)?.label || "My account";

  return (
    <main className="min-h-screen bg-[#F7F9F5] px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 rounded-3xl border border-[#E6EAE2] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#EAF4DA] text-xl font-black uppercase text-[#1E4620]">
              {user.name?.trim()?.[0] || user.email?.[0] || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6FAE3E]">Customer account</p>
              <h1 className="mt-1 truncate text-xl font-black text-[#1E4620] sm:text-2xl">
                Welcome, {user.name?.split(" ")[0] || "back"}
              </h1>
              <p className="mt-0.5 truncate text-sm text-[#75806F]">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-[#DDE5D8] px-4 py-2.5 text-xs font-bold text-[#365C2D] transition-colors hover:bg-[#F5F9F1]">
              <ShoppingBag size={14} />
              Shop products
            </Link>
            <button type="button" onClick={() => logout()} aria-label="Sign out" title="Sign out" className="grid h-10 w-10 place-items-center rounded-full border border-[#F0D9D5] text-[#AD443A] transition-colors hover:bg-red-50">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E6EAE2] bg-white p-4">
            <p className="text-xs font-medium text-[#788274]">Paid orders</p>
            <p className="mt-1 text-2xl font-black text-[#1E4620]">{paidOrders.length}</p>
          </div>
          <div className="rounded-2xl border border-[#E6EAE2] bg-white p-4">
            <p className="text-xs font-medium text-[#788274]">Wishlist items</p>
            <p className="mt-1 text-2xl font-black text-[#1E4620]">{wishlist.length}</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-[#E6EAE2] bg-white p-4 sm:col-span-1">
            <p className="text-xs font-medium text-[#788274]">Lifetime spend</p>
            <p className="mt-1 text-2xl font-black text-[#1E4620]">{formatMoney(totalPaid)}</p>
          </div>
        </div>

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[245px_minmax(0,1fr)]">
          <nav aria-label="Account sections" className="flex gap-2 overflow-x-auto rounded-2xl border border-[#E6EAE2] bg-white p-2 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible">
            {ACCOUNT_SECTIONS.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;
              const count = section.id === "wishlist" ? wishlist.length : undefined;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => { setActiveSection(section.id); setActionError(""); setSuccess(""); }}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-left text-xs font-bold transition-colors lg:w-full ${active ? "bg-[#1E4620] text-white" : "text-[#52604C] hover:bg-[#F3F7EF] hover:text-[#1E4620]"}`}
                >
                  <Icon size={16} />
                  <span className="flex-1">{section.label}</span>
                  {count !== undefined && <span className={`rounded-full px-2 py-0.5 text-[10px] ${active ? "bg-white/15" : "bg-[#EEF3EA]"}`}>{count}</span>}
                </button>
              );
            })}
            <div className="hidden border-t border-[#EEF0EC] pt-2 lg:block">
              <Link href="/products" className="inline-flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold text-[#52604C] hover:bg-[#F3F7EF] hover:text-[#1E4620]">
                <ArrowRight size={16} />
                Browse products
              </Link>
            </div>
          </nav>

          <section className="min-w-0 rounded-3xl border border-[#E6EAE2] bg-white p-4 shadow-sm sm:p-6 lg:p-7">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF0EC] pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6FAE3E]">Account centre</p>
                <h2 className="mt-1 text-xl font-black text-[#1E4620]">{contentTitle}</h2>
              </div>
              <button type="button" onClick={refreshPortalData} disabled={dataLoading} aria-label="Refresh account data" className="inline-flex items-center gap-2 rounded-full border border-[#E0E6DC] px-3 py-2 text-xs font-bold text-[#4E6646] hover:bg-[#F6F9F3] disabled:opacity-50">
                <RefreshCw size={14} className={dataLoading ? "animate-spin" : ""} />
                Refresh
              </button>
            </header>

            {(actionError || dataError) && (
              <div role="alert" className="mt-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800">
                <X size={16} className="mt-0.5 shrink-0" />
                <span>{actionError || dataError}</span>
              </div>
            )}
            {success && (
              <div role="status" className="mt-5 flex items-start gap-2 rounded-2xl border border-[#DAE9CF] bg-[#F1F8EB] p-3.5 text-sm text-[#315D29]">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {dataLoading ? (
              <div role="status" className="flex min-h-56 items-center justify-center gap-3 text-sm font-semibold text-[#63705E]">
                <LoaderCircle size={19} className="animate-spin text-[#6FAE3E]" />
                Loading your account...
              </div>
            ) : (
              <div className="pt-5">
                {activeSection === "orders" && (
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <EmptyState icon={Package} title="Your first order is waiting" description="When you place an order, you can track its status and download your payment receipt here." href="/products" linkLabel="Explore products" />
                    ) : orders.map((order) => (
                      <article key={order.id} className="overflow-hidden rounded-2xl border border-[#E6EAE2]">
                        <header className="flex flex-col gap-3 bg-[#FAFBF9] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-extrabold text-[#1E4620]">VC-{order.id.slice(-8).toUpperCase()}</span>
                              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle(order.status)}`}>{statusLabel(order.status)}</span>
                              {order.paymentStatus !== "PAID" && <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800">Payment {statusLabel(order.paymentStatus)}</span>}
                            </div>
                            <p className="mt-1.5 text-xs text-[#778172]">Placed {formatDate(order.createdAt)}</p>
                          </div>
                          <div className="flex items-center justify-between gap-3 sm:justify-end">
                            <span className="text-base font-black text-[#1E4620]">{formatMoney(order.total)}</span>
                            {order.paymentStatus === "PAID" && order.status !== "CANCELLED" && (
                              <a href={`/api/orders/${order.id}/receipt`} className="inline-flex items-center gap-1.5 rounded-full border border-[#DDE5D8] px-3 py-2 text-[11px] font-bold text-[#426638] hover:bg-[#F2F7EE]">
                                <ArrowDownToLine size={13} />
                                Receipt
                              </a>
                            )}
                          </div>
                        </header>
                        <div className="divide-y divide-[#EEF0EC] px-4 sm:px-5">
                          {(order.items || []).map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-3 py-3">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#394635]">{item.name}</p>
                                <p className="mt-0.5 text-xs text-[#788274]">Quantity {item.quantity} · {formatMoney(item.unitPrice)} each</p>
                              </div>
                              <span className="shrink-0 text-sm font-bold text-[#1E4620]">{formatMoney(item.unitPrice * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                        {order.address && (
                          <div className="flex items-start gap-2 border-t border-[#EEF0EC] px-4 py-3 text-xs leading-5 text-[#788274] sm:px-5">
                            <MapPin size={14} className="mt-0.5 shrink-0 text-[#6FAE3E]" />
                            <span>{order.address.fullName} · {order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city}, {order.address.state} {order.address.pincode}</span>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}

                {activeSection === "wishlist" && (
                  wishlist.length === 0 ? (
                    <EmptyState icon={Heart} title="Save the good stuff" description="Tap the heart on a product you love and it will be ready for you here." href="/products" linkLabel="Discover products" />
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {wishlist.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          action={busyProductId === product.id ? "Updating..." : "Add to basket"}
                          onAction={() => addProductToCart(product)}
                          secondaryAction="Remove from wishlist"
                          onSecondaryAction={() => toggleWishlist(product)}
                        />
                      ))}
                    </div>
                  )
                )}

                {activeSection === "buy-again" && (
                  purchasedProducts.length === 0 ? (
                    <EmptyState icon={RefreshCw} title="Your past favourites will show up here" description="After your first successful order, you can quickly add those products to your basket again from this page." href="/products" linkLabel="Find your favourites" />
                  ) : (
                    <>
                      <p className="mb-4 text-sm text-[#74806E]">Products from your completed and paid orders, sorted by your most recent purchase.</p>
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {purchasedProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            action="Add to basket"
                            onAction={() => addProductToCart(product)}
                            secondaryAction="Buy again"
                            onSecondaryAction={() => addProductToCart(product, true)}
                          />
                        ))}
                      </div>
                    </>
                  )
                )}

                {activeSection === "addresses" && (
                  <div>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-[#74806E]">Manage the delivery addresses saved to your account.</p>
                      <button type="button" onClick={() => { setShowAddressForm((open) => !open); setActionError(""); }} className="inline-flex items-center gap-2 rounded-full bg-[#1E4620] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#2C5F31]">
                        {showAddressForm ? <X size={14} /> : <Plus size={14} />}
                        {showAddressForm ? "Cancel" : "Add address"}
                      </button>
                    </div>
                    {showAddressForm && (
                      <form onSubmit={saveAddress} className="mb-5 space-y-4 rounded-2xl border border-[#E6EAE2] bg-[#FAFBF9] p-4 sm:p-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="text-xs font-bold text-[#465342]">Full name *
                            <input required minLength={2} value={addressForm.fullName} onChange={(event) => setAddressForm((current) => ({ ...current, fullName: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#6FAE3E]" />
                          </label>
                          <label className="text-xs font-bold text-[#465342]">Phone *
                            <input required type="tel" pattern="[0-9+() -]{7,20}" value={addressForm.phone} onChange={(event) => setAddressForm((current) => ({ ...current, phone: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#6FAE3E]" />
                          </label>
                        </div>
                        <label className="block text-xs font-bold text-[#465342]">Street address *
                          <input required value={addressForm.line1} onChange={(event) => setAddressForm((current) => ({ ...current, line1: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#6FAE3E]" placeholder="House / flat number, street, area" />
                        </label>
                        <label className="block text-xs font-bold text-[#465342]">Apartment or landmark
                          <input value={addressForm.line2} onChange={(event) => setAddressForm((current) => ({ ...current, line2: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#6FAE3E]" />
                        </label>
                        <div className="grid gap-4 sm:grid-cols-3">
                          <label className="text-xs font-bold text-[#465342]">City *
                            <input required value={addressForm.city} onChange={(event) => setAddressForm((current) => ({ ...current, city: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#6FAE3E]" />
                          </label>
                          <label className="text-xs font-bold text-[#465342]">State *
                            <input required value={addressForm.state} onChange={(event) => setAddressForm((current) => ({ ...current, state: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#6FAE3E]" />
                          </label>
                          <label className="text-xs font-bold text-[#465342]">PIN code *
                            <input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={addressForm.pincode} onChange={(event) => setAddressForm((current) => ({ ...current, pincode: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[#DDE3D9] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#6FAE3E]" />
                          </label>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <label className="flex items-center gap-2 text-xs font-semibold text-[#52604C]">
                            <input type="checkbox" checked={addressForm.isDefault} onChange={(event) => setAddressForm((current) => ({ ...current, isDefault: event.target.checked }))} className="accent-[#1E4620]" />
                            Make this my default address
                          </label>
                          <button type="submit" disabled={savingAddress} className="rounded-full bg-[#1E4620] px-5 py-2.5 text-xs font-bold text-white disabled:opacity-50">
                            {savingAddress ? "Saving..." : "Save address"}
                          </button>
                        </div>
                      </form>
                    )}
                    {addresses.length === 0 ? (
                      <EmptyState icon={MapPin} title="No saved addresses yet" description="Add a delivery address here to make your next order quicker." href="/products" linkLabel="Browse products" />
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {addresses.map((address) => (
                          <article key={address.id} className="rounded-2xl border border-[#E6EAE2] p-4">
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F6EB] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#416537]">
                                <MapPin size={12} />
                                {address.label || "Address"}
                              </span>
                              {address.isDefault && <span className="rounded-full bg-[#EEF7E9] px-2 py-1 text-[10px] font-bold text-[#376B26]">Default</span>}
                            </div>
                            <h3 className="mt-3 text-sm font-bold text-[#263A23]">{address.fullName}</h3>
                            <p className="mt-1 text-xs leading-5 text-[#6D7768]">{address.line1}{address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} {address.pincode}</p>
                            <p className="mt-2 text-xs text-[#6D7768]">{address.phone}</p>
                            <button type="button" onClick={() => deleteAddress(address.id)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#A84A40] hover:underline">
                              <Trash2 size={13} />
                              Remove
                            </button>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeSection === "profile" && (
                  <ProfileDetailsForm user={user} onSaved={notify} refreshUser={refreshUser} />
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
