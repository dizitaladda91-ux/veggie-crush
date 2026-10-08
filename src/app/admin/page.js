"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  Plus,
  Package,
  Layers,
  Upload,
  Trash2,
  ExternalLink,
  Check,
  AlertCircle,
  Search,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Tag,
  Eye,
  RefreshCw,
  ShoppingBag,
  ShieldCheck,
  Lock,
  LogOut,
} from "lucide-react";
import ProductDocumentImport from "@/components/admin/product-document-import";
import { useAuth } from "@/components/auth/auth-context";

const PRESET_IMAGES = [
  { label: "Moringa Superleaf", url: "/products/moringa_1.webp" },
  { label: "Organic Beetroot", url: "/products/beetroot_1.webp" },
  { label: "Pure Gooseberry", url: "/products/goosberry_1.webp" },
  { label: "Organic Neem", url: "/products/neem_1.webp" },
  { label: "Giloy Immunity", url: "/products/giloy_1.webp" },
  { label: "Everfit Vitality", url: "/products/everfit_1.webp" },
  { label: "Leafy Greens Banner", url: "/categories/leafy-greens.jpg" },
  { label: "Root Vegetables Banner", url: "/categories/root-vegetables.jpg" },
  { label: "Herbs Banner", url: "/categories/herbs-superfoods.jpg" },
  { label: "Gourds & Squash Banner", url: "/categories/gourds-squash.jpg" },
];

const INITIAL_CATEGORIES = [
  "Leafy Greens",
  "Root Vegetables",
  "Herbs & Superfoods",
  "Gourds & Squash",
  "VeggieCrush Wellness",
];

export default function AdminPortal() {
  const { user, loading: authLoading, openAuthModal, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("products"); // 'products' | 'add' | 'categories'
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState("All");

  // Form states
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "Leafy Greens",
    price: "",
    mrp: "",
    unit: "250g",
    stock: "50",
    description: "",
    imageUrl: "/products/moringa_1.webp",
    isBestSeller: false,
    isActive: true,
  });
  const price = Number(form.price);
  const mrp = form.mrp ? Number(form.mrp) : price;
  const discountPercent = Number.isFinite(price) && Number.isFinite(mrp) && mrp > 0
    ? Math.max(0, Math.round(((mrp - price) / mrp) * 100))
    : 0;

  // Category modal
  const [newCatName, setNewCatName] = useState("");
  const [creatingCat, setCreatingCat] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products?limit=100");
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.categories) {
        const catNames = data.categories.map((c) => c.name);
        const combined = Array.from(new Set([...INITIAL_CATEGORIES, ...catNames]));
        setCategories(combined);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  }

  // Handle image upload to /api/upload
  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setForm((prev) => ({ ...prev, imageUrl: json.url }));
        showToast("Image uploaded successfully!");
      } else {
        showToast(json.error || "Failed to upload image", "error");
      }
    } catch (err) {
      showToast("Upload failed: " + err.message, "error");
    } finally {
      setUploading(false);
    }
  }

  // Auto-fill slug from name if empty
  function handleNameChange(e) {
    const name = e.target.value;
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === "" || prev.slug === generatedSlug ? generatedSlug : prev.slug,
    }));
  }

  async function handleCreateProduct(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.description.trim()) {
      showToast("Please enter product name, price, and description", "error");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: form.description,
        price: parseFloat(form.price),
        mrp: form.mrp ? parseFloat(form.mrp) : parseFloat(form.price),
        unit: form.unit,
        stock: parseInt(form.stock || "50", 10),
        category: form.category,
        images: [form.imageUrl],
        isBestSeller: form.isBestSeller,
        isActive: form.isActive,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.product) {
        showToast(`Product "${form.name}" added successfully!`);
        // Reset form
        setForm({
          name: "",
          slug: "",
          category: form.category,
          price: "",
          mrp: "",
          unit: "250g",
          stock: "50",
          description: "",
          imageUrl: "/products/moringa_1.webp",
          isBestSeller: false,
          isActive: true,
        });
        // Refresh products list
        await fetchProducts();
        setActiveTab("products");
      } else {
        showToast(data.error || "Failed to save product", "error");
      }
    } catch (err) {
      showToast("Error adding product: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteProduct(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Product "${name}" deleted`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        showToast(data.error || "Failed to delete product", "error");
      }
    } catch (err) {
      showToast("Delete failed: " + err.message, "error");
    }
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      setCreatingCat(true);
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Category "${newCatName}" created!`);
        setCategories((prev) => Array.from(new Set([...prev, newCatName.trim()])));
        setForm((prev) => ({ ...prev, category: newCatName.trim() }));
        setNewCatName("");
      } else {
        showToast(data.error || "Failed to create category", "error");
      }
    } catch (err) {
      showToast("Error creating category: " + err.message, "error");
    } finally {
      setCreatingCat(false);
    }
  }

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory =
      selectedCatFilter === "All" || p.category === selectedCatFilter;
    return matchesSearch && matchesCategory;
  });

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#F7FAF5] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw size={28} className="animate-spin text-[#6FAE3E]" />
          <p className="text-sm font-semibold text-[#1E4620]">Verifying administrator credentials...</p>
        </div>
      </main>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <main className="min-h-screen bg-[#F7FAF5] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#DCEBD7] p-8 sm:p-10 text-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF3E7] text-[#1E4620] mx-auto flex items-center justify-center mb-5 border border-[#CBDDC5]">
            <Lock size={28} />
          </div>

          <span className="text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#EAF3E7] text-[#2E6032]">
            ADMIN ACCESS ONLY
          </span>

          <h1 className="text-2xl font-black text-[#173719] mt-3 mb-2">
            Admin Portal
          </h1>

          <p className="text-xs text-[#5D7361] leading-relaxed mb-6">
            This management console requires Administrator privileges. Please sign in with your admin credentials to add products, edit catalog, and manage inventory.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={openAuthModal}
              className="w-full py-3.5 px-6 rounded-full text-xs font-bold text-white shadow-sm transition-all hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
              style={{ backgroundColor: "#1E4620" }}
            >
              <ShieldCheck size={16} />
              <span>Sign In as Admin</span>
            </button>

            <Link
              href="/"
              className="w-full py-3 px-6 rounded-full text-xs font-semibold text-[#5D7361] hover:text-[#1E4620] hover:bg-[#F3F6F2] transition-colors"
            >
              Return to Store Homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#1E2E1C]">
      {/* Toast alert */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-bold text-white transition-all transform animate-bounce ${
            toast.type === "error" ? "bg-red-600" : "bg-[#1E4620]"
          }`}
        >
          {toast.type === "error" ? <AlertCircle size={16} /> : <Check size={16} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-xs">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="w-10 h-10 rounded-xl bg-[#EAF4DA] border border-[#6FAE3E] grid place-items-center shadow-xs">
                <Leaf size={18} color="#1E4620" />
              </span>
              <div>
                <span className="block text-base font-black tracking-tight leading-none text-[#1E4620]">
                  Veggie<span className="text-[#6FAE3E]">Crush</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#6B7280]">
                  Admin Portal
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#F0FDF4] text-[#1E4620] border border-[#DCFCE7]">
              <span className="w-2 h-2 rounded-full bg-[#6FAE3E] animate-pulse" />
              Live Catalog Management
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#EAF4DA] text-[#1E4620]">
              <ShieldCheck size={14} className="text-[#6FAE3E]" />
              <span>{user?.email || "Admin"}</span>
            </span>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#1E4620] bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Store</span>
            </Link>

            <button
              onClick={logout}
              title="Log out"
              className="p-2 rounded-full border border-[#E5E7EB] hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
            </button>

            <button
              onClick={() => setActiveTab("add")}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold text-white transition-transform hover:scale-105 cursor-pointer shadow-sm"
              style={{ backgroundColor: "#1E4620" }}
            >
              <Plus size={15} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* Body Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                Total Products
              </span>
              <h3 className="text-2xl font-black mt-1 text-[#1E4620]">{products.length}</h3>
              <span className="text-[11px] text-[#6FAE3E] font-medium">● In store catalog</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4DA] grid place-items-center text-[#1E4620]">
              <Package size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                Active Categories
              </span>
              <h3 className="text-2xl font-black mt-1 text-[#1E4620]">{categories.length}</h3>
              <span className="text-[11px] text-[#6FAE3E] font-medium">● Sorted produce</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] grid place-items-center text-[#1E4620]">
              <Layers size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                Bestseller Items
              </span>
              <h3 className="text-2xl font-black mt-1 text-[#1E4620]">
                {products.filter((p) => p.isBestSeller).length}
              </h3>
              <span className="text-[11px] text-[#D9483A] font-medium">★ Most Loved</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 grid place-items-center text-amber-700">
              <Sparkles size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                Storage Mode
              </span>
              <h3 className="text-2xl font-black mt-1 text-[#1E4620]">MongoDB</h3>
              <span className="text-[11px] text-[#6FAE3E] font-medium">Prisma Connected</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] grid place-items-center text-[#1E4620]">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 mb-6 border-b border-[#E5E7EB] pb-3">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "products"
                ? "bg-[#1E4620] text-white shadow-sm"
                : "bg-white text-[#6B7280] hover:text-[#1E4620] border border-[#E5E7EB]"
            }`}
          >
            <Package size={14} />
            <span>Manage Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "add"
                ? "bg-[#1E4620] text-white shadow-sm"
                : "bg-white text-[#6B7280] hover:text-[#1E4620] border border-[#E5E7EB]"
            }`}
          >
            <Plus size={14} />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "categories"
                ? "bg-[#1E4620] text-white shadow-sm"
                : "bg-white text-[#6B7280] hover:text-[#1E4620] border border-[#E5E7EB]"
            }`}
          >
            <Layers size={14} />
            <span>Categories</span>
          </button>
        </div>

        {/* ═════════════════════════════════════════════
            TAB 1: PRODUCTS LIST TABLE / GRID
        ═════════════════════════════════════════════ */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-3xl border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full md:w-80 px-4 py-2.5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <Search size={16} color="#7A8B6F" />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-xs outline-none w-full text-[#1E4620]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setSelectedCatFilter("All")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                    selectedCatFilter === "All"
                      ? "bg-[#1E4620] text-white"
                      : "bg-[#F3F4F6] text-[#4B5443] hover:bg-[#E5E7EB]"
                  }`}
                >
                  All ({products.length})
                </button>
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCatFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                      selectedCatFilter === cat
                        ? "bg-[#1E4620] text-white"
                        : "bg-[#F3F4F6] text-[#4B5443] hover:bg-[#E5E7EB]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}

                <button
                  onClick={fetchProducts}
                  title="Refresh list"
                  className="p-2 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] cursor-pointer text-[#1E4620]"
                >
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#6B7280] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-4 px-6">Product</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Price / MRP</th>
                      <th className="py-4 px-4">Unit</th>
                      <th className="py-4 px-4">Badge</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#6B7280]">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw size={16} className="animate-spin text-[#1E4620]" />
                            <span>Loading catalog...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#6B7280]">
                          <Package size={32} className="mx-auto mb-2 opacity-30 text-[#1E4620]" />
                          <p className="font-bold text-sm text-[#1E4620]">No products found</p>
                          <p className="text-xs mt-1">Try resetting the filter or click &ldquo;Add New Product&rdquo; above.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => {
                        const discount =
                          p.mrp && p.price && p.mrp > p.price
                            ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
                            : 0;

                        return (
                          <tr key={p.id} className="hover:bg-[#F9FAFB] transition-colors">
                            {/* Product Info */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] overflow-hidden relative shrink-0">
                                  {p.images?.[0] ? (
                                    <Image
                                      src={p.images[0]}
                                      alt={p.name}
                                      fill
                                      className="object-contain p-1"
                                    />
                                  ) : (
                                    <span className="grid place-items-center w-full h-full text-base">🌱</span>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-bold text-sm text-[#1E4620] line-clamp-1">{p.name}</h4>
                                  <span className="text-[11px] text-[#6B7280] font-mono">
                                    /{p.slug}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-4 px-4">
                              <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EAF4DA] text-[#1E4620]">
                                {p.category || "General"}
                              </span>
                            </td>

                            {/* Price / MRP */}
                            <td className="py-4 px-4">
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-black text-sm text-[#1E4620]">₹{p.price}</span>
                                {p.mrp > p.price && (
                                  <span className="text-[11px] line-through text-[#9CA3AF]">
                                    ₹{p.mrp}
                                  </span>
                                )}
                              </div>
                              {discount > 0 && (
                                <span className="text-[10px] font-bold text-[#D9483A]">
                                  {discount}% OFF
                                </span>
                              )}
                            </td>

                            {/* Unit */}
                            <td className="py-4 px-4 text-[#4B5443] font-medium">
                              {p.unit || "Pack"}
                            </td>

                            {/* Badge */}
                            <td className="py-4 px-4">
                              {p.isBestSeller ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                  <Sparkles size={10} />
                                  MOST LOVED
                                </span>
                              ) : (
                                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F0FDF4] text-[#1E4620]">
                                  100% ORGANIC
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/products/${p.slug}`}
                                  target="_blank"
                                  title="View on Store"
                                  className="p-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[#4B5443] transition-colors"
                                >
                                  <ExternalLink size={13} />
                                </Link>

                                <button
                                  onClick={() => handleDeleteProduct(p.id, p.name)}
                                  title="Delete Product"
                                  className="p-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════
            TAB 2: ADD NEW PRODUCT FORM
        ═════════════════════════════════════════════ */}
        {activeTab === "add" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <ProductDocumentImport
              onImported={async () => {
                await fetchProducts();
                showToast("Products imported and published successfully!");
                setActiveTab("products");
              }}
            />

            {/* Form Column */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5E7EB] shadow-xs">
              <div className="mb-6 pb-4 border-b border-[#E5E7EB]">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FAE3E]">
                  Inventory Management
                </span>
                <h2 className="text-2xl font-black text-[#1E4620] mt-1">
                  Add Fresh Produce to Store
                </h2>
                <p className="text-xs text-[#6B7280] mt-1">
                  Fill in the details below. Once created, the item will immediately be available across your store catalog.
                </p>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-6">
                {/* Product Name & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E4620] mb-1.5">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Organic Baby Spinach"
                      value={form.name}
                      onChange={handleNameChange}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E4620] mb-1.5">
                      URL Slug (Auto-generated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. organic-baby-spinach"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Category & Unit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E4620] mb-1.5">
                      Category *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white transition-colors"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setActiveTab("categories")}
                        title="Add new category"
                        className="px-3 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] text-xs font-bold hover:bg-[#E5E7EB] cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E4620] mb-1.5">
                      Unit / Quantity Weight *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 250g, 500g, 1 kg, 1 pc"
                      value={form.unit}
                      onChange={(e) => setForm({ ...form, unit: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Price, MRP & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E4620] mb-1.5">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="any"
                      placeholder="e.g. 69"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white font-bold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E4620] mb-1.5">
                      MRP (₹ Original Price)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      placeholder="e.g. 89"
                      value={form.mrp}
                      onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E4620] mb-1.5">
                      Available Stock
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 50"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-[#1E4620] mb-1.5">
                    Description & Health Highlights *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter short farm description, e.g. Naturally rich in iron and chlorophyll, tender organic leaves picked fresh at dawn."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white leading-relaxed transition-colors"
                  />
                </div>

                {/* Image Upload & Presets */}
                <div>
                  <label className="block text-xs font-bold text-[#1E4620] mb-2">
                    Product Image (Upload or Pick Preset) *
                  </label>

                  {/* Upload button area */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl border-2 border-dashed border-[#6FAE3E] bg-[#F0FDF4] hover:bg-[#EAF4DA] text-xs font-bold text-[#1E4620] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload size={15} />
                      <span>{uploading ? "Uploading Image..." : "Upload Photo From Device"}</span>
                    </button>

                    <span className="text-xs text-[#9CA3AF]">or enter URL:</span>

                    <input
                      type="text"
                      placeholder="e.g. /products/moringa_1.webp or https://..."
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      className="flex-1 w-full px-4 py-2.5 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none font-mono"
                    />
                  </div>

                  {/* Preset chips */}
                  <div>
                    <span className="block text-[11px] font-bold text-[#6B7280] mb-2 uppercase tracking-wider">
                      Quick Preset Images:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setForm({ ...form, imageUrl: preset.url })}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                            form.imageUrl === preset.url
                              ? "bg-[#1E4620] text-white border-[#1E4620]"
                              : "bg-white text-[#4B5443] border-[#E5E7EB] hover:border-[#6FAE3E]"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="pt-2 flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isBestSeller}
                      onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })}
                      className="w-4 h-4 rounded text-[#1E4620] accent-[#1E4620]"
                    />
                    <span className="text-xs font-bold text-[#1E4620]">
                      Mark as &ldquo;MOST LOVED&rdquo; / Bestseller Badge
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-[#1E4620] accent-[#1E4620]"
                    />
                    <span className="text-xs font-bold text-[#1E4620]">
                      Published & Visible in Store
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-[#E5E7EB]">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full text-xs font-bold text-white transition-all hover:scale-[1.01] cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: "#1E4620" }}
                  >
                    {submitting ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />
                        <span>Saving to Store Database...</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Publish Product to VeggieCrush</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Column (Matches the exact card design requested by user!) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#6FAE3E] mb-2">
                  Live Customer Card Preview
                </span>
                <p className="text-xs text-[#6B7280] mb-4">
                  This is how your item will appear on the Homepage and Category pages:
                </p>

                {/* Preview of the Reference Card */}
                <div
                  className="rounded-3xl border overflow-hidden flex flex-col justify-between shadow-xl bg-white border-[#E5E7EB] transition-all"
                >
                  {/* Top Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#F9FAFB]">
                    <span className="absolute top-3.5 left-3.5 text-[10px] font-bold tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full z-10 bg-white/95 text-[#1E4620] shadow-sm border border-black/5 backdrop-blur-sm">
                      {form.isBestSeller
                        ? "MOST LOVED"
                        : discountPercent > 0
                        ? `${discountPercent}% OFF`
                        : "100% ORGANIC"}
                    </span>

                    {form.imageUrl ? (
                      <Image
                        src={form.imageUrl}
                        alt={form.name || "Preview"}
                        fill
                        className="object-contain p-6"
                      />
                    ) : (
                      <span className="grid place-items-center w-full h-full text-4xl">🌱</span>
                    )}
                  </div>

                  {/* Bottom Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-[#1E2E1C] leading-snug mb-1">
                        {form.name || "Product Name"}
                      </h3>
                      <p className="text-xs text-[#6B7280] font-normal leading-relaxed line-clamp-1 mb-5">
                        {form.description || `Harvest fresh at dawn · ${form.unit || "250g"}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-auto">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold tracking-tight text-[#1E2E1C]">
                          ₹{form.price || "0"}
                        </span>
                        <span className="text-xs text-[#6B7280] font-normal">
                          / {form.unit || "unit"}
                        </span>
                        {discountPercent > 0 && form.mrp && (
                          <span className="text-xs line-through text-[#9CA3AF] ml-1 font-medium">
                            ₹{form.mrp}
                          </span>
                        )}
                      </div>

                      <div className="w-11 h-11 rounded-full border border-[#D1D5DB] flex items-center justify-center text-[#1E4620] bg-white shadow-xs">
                        <Plus size={20} strokeWidth={1.6} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-[#EAF4DA] border border-[#DCFCE7] text-[11px] text-[#1E4620]">
                  💡 <strong>Tip:</strong> The circular outline button with <strong>+</strong> matches the modern card aesthetic you requested.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════
            TAB 3: CATEGORIES MANAGEMENT
        ═════════════════════════════════════════════ */}
        {activeTab === "categories" && (
          <div className="max-w-2xl bg-white p-6 sm:p-10 rounded-3xl border border-[#E5E7EB] shadow-xs">
            <div className="mb-6 pb-4 border-b border-[#E5E7EB]">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FAE3E]">
                Category Hub
              </span>
              <h2 className="text-2xl font-black text-[#1E4620] mt-1">
                Store Categories
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Organize your crops and wellness powders into clear buyer categories.
              </p>
            </div>

            {/* Create category input */}
            <form onSubmit={handleAddCategory} className="flex gap-3 mb-8">
              <input
                type="text"
                required
                placeholder="New category name (e.g. Exotic Microgreens)..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-xs outline-none focus:border-[#1E4620] focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={creatingCat}
                className="px-6 py-3 rounded-2xl text-xs font-bold text-white transition-transform hover:scale-105 cursor-pointer shadow-sm"
                style={{ backgroundColor: "#1E4620" }}
              >
                {creatingCat ? "Creating..." : "Add Category"}
              </button>
            </form>

            {/* Categories list */}
            <div className="space-y-3">
              {categories.map((cat, idx) => (
                <div
                  key={cat}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#EAF4DA] text-[#1E4620] font-black text-xs grid place-items-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#1E4620]">{cat}</h4>
                      <span className="text-[11px] text-[#6B7280]">
                        {products.filter((p) => p.category === cat).length} Products assigned
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/category`}
                    className="text-xs font-semibold text-[#6FAE3E] hover:underline flex items-center gap-1"
                  >
                    <span>View Category</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
