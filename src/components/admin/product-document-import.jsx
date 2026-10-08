"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, FileText, LoaderCircle, LockKeyhole, LogOut, Mail, Upload } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { isValidProductCode } from "@/lib/product-code";
import { MAX_DOCUMENT_UPLOAD_BYTES, readApiJson } from "@/lib/read-api-json";

const EDITABLE_FIELDS = [
  ["code", "Product code (SKU)"],
  ["name", "Product name"],
  ["shortName", "Short name"],
  ["slug", "Slug"],
  ["price", "Price (₹)"],
  ["mrp", "MRP (₹)"],
  ["size", "Size"],
  ["rating", "Rating"],
  ["reviewsCount", "Reviews"],
  ["keyBenefits", "Key benefits"],
];

function previewErrors(products) {
  const errors = [];
  const slugs = new Set();
  const codes = new Set();

  products.forEach(({ product, rowNumber }) => {
    const prefix = `Row ${rowNumber}`;
    if (!product.name.trim()) errors.push(`${prefix}: product name is required.`);
    if (!product.description.trim()) errors.push(`${prefix}: description is required.`);
    if (!product.size.trim()) errors.push(`${prefix}: size is required.`);
    if (!Number.isFinite(Number(product.price)) || Number(product.price) < 0) {
      errors.push(`${prefix}: enter a valid price.`);
    }
    if (!Number.isFinite(Number(product.mrp)) || Number(product.mrp) < Number(product.price)) {
      errors.push(`${prefix}: MRP must be at least the price.`);
    }
    if (!Number.isFinite(Number(product.rating)) || Number(product.rating) < 0 || Number(product.rating) > 5) {
      errors.push(`${prefix}: rating must be between 0 and 5.`);
    }
    if (!Number.isInteger(Number(product.reviewsCount)) || Number(product.reviewsCount) < 0) {
      errors.push(`${prefix}: reviews must be a non-negative whole number.`);
    }
    if (product.bestseller === null) errors.push(`${prefix}: set bestseller to Yes or No.`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug)) {
      errors.push(`${prefix}: slug must use lowercase letters, numbers, and hyphens.`);
    }
    if (slugs.has(product.slug)) errors.push(`${prefix}: slug is duplicated in this document.`);
    slugs.add(product.slug);
    if (!isValidProductCode(product.code)) {
      errors.push(`${prefix}: code must use up to 64 uppercase letters, numbers, hyphens, or underscores.`);
    }
    if (codes.has(product.code)) errors.push(`${prefix}: code is duplicated in this document.`);
    codes.add(product.code);
  });

  return errors;
}

export default function ProductDocumentImport({ onImported }) {
  const { user, loading: authLoading, login, logout } = useAuth();
  const inputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const rowErrors = previewErrors(products);

  async function handleAdminLogin(event) {
    event.preventDefault();
    setBusy(true);
    setAuthError("");
    try {
      const signedInUser = await login(credentials.email, credentials.password);
      if (signedInUser.role !== "ADMIN") {
        setAuthError("This account does not have the ADMIN role. Sign out and use an admin account.");
      }
    } catch (error) {
      setAuthError(error.message || "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setProducts([]);
    setErrors([]);
    setMessage("");
    setDocumentName(file.name);
    if (file.size > MAX_DOCUMENT_UPLOAD_BYTES) {
      setMessage("The document is too large. Choose a .docx file under 4 MB.");
      event.target.value = "";
      return;
    }

    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/products/import", {
        method: "POST",
        body: formData,
      });
      const result = await readApiJson(response);

      if (!response.ok) {
        throw new Error(result.error || "Could not read this document.");
      }

      setProducts(result.products || []);
      setErrors(result.errors || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  function updateProduct(index, field, value) {
    setProducts((current) => current.map((row, rowIndex) => {
      if (rowIndex !== index) return row;
      const product = {
        ...row.product,
        [field]: field === "code" ? value.toUpperCase() : value,
      };
      if (field === "name" && !row.product.slug) {
        product.slug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      return { ...row, product, errors: [] };
    }));
    setErrors([]);
    setMessage("");
  }

  async function confirmImport() {
    if (products.length === 0) return;
    if (rowErrors.length > 0) {
      setErrors(rowErrors);
      return;
    }
    if (!window.confirm(`Publish all ${products.length} reviewed products to the store?`)) return;

    setBusy(true);
    setErrors([]);
    setMessage("");
    try {
      const body = JSON.stringify({ products: products.map((row) => ({
        ...row.product,
        keyBenefits: Array.isArray(row.product.keyBenefits)
          ? row.product.keyBenefits
          : row.product.keyBenefits.split(/[|;,\n]/).map((benefit) => benefit.trim()).filter(Boolean),
        rowNumber: row.rowNumber,
      })) });
      if (new TextEncoder().encode(body).byteLength > 4 * 1024 * 1024) {
        setMessage("The reviewed product data is too large to publish in one request.");
        return;
      }

      const response = await fetch("/api/admin/products/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const result = await readApiJson(response);
      if (!response.ok) {
        setErrors(result.details || []);
        throw new Error(result.error || "The products could not be published.");
      }

      setMessage(`${result.count} products published to the store.`);
      setProducts([]);
      setDocumentName("");
      await onImported();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="lg:col-span-12 rounded-3xl border border-[#DCEBD7] bg-white p-6 sm:p-8 shadow-xs">
      {authLoading ? (
        <p className="flex items-center gap-2 text-sm font-semibold text-[#5D7361]">
          <LoaderCircle size={16} className="animate-spin" />
          Checking admin session…
        </p>
      ) : user?.role !== "ADMIN" ? (
        user ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6FAE3E]">
                <LockKeyhole size={15} />
                Admin access required
              </span>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                Signed in as {user.email}, but this account has the {user.role || "CUSTOMER"} role. Product imports are restricted to ADMIN accounts.
              </p>
              {authError && <p role="alert" className="mt-2 text-sm font-semibold text-red-700">{authError}</p>}
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-3 text-sm font-bold text-[#1E4620] hover:bg-[#F3F8F1]"
            >
              <LogOut size={16} />
              Sign out to switch account
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminLogin} className="mx-auto max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6FAE3E]">
              <LockKeyhole size={15} />
              Admin sign-in required
            </span>
            <h2 className="mt-2 text-xl font-black text-[#1E4620]">Sign in to import products</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              Use an existing account with the ADMIN role. Regular customer accounts cannot publish catalog products.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold text-[#4B5443]">
                Email
                <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3">
                  <Mail size={15} className="text-[#79947D]" />
                  <input
                    type="email"
                    autoComplete="username"
                    required
                    value={credentials.email}
                    onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
                    className="w-full bg-transparent py-3 text-sm font-normal text-[#1E2E1C] outline-none"
                  />
                </span>
              </label>
              <label className="text-xs font-semibold text-[#4B5443]">
                Password
                <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3">
                  <LockKeyhole size={15} className="text-[#79947D]" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    required
                    value={credentials.password}
                    onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
                    className="w-full bg-transparent py-3 text-sm font-normal text-[#1E2E1C] outline-none"
                  />
                </span>
              </label>
            </div>
            {authError && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{authError}</p>}
            <button
              type="submit"
              disabled={busy}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#1E4620] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? <LoaderCircle size={16} className="animate-spin" /> : <LockKeyhole size={16} />}
              {busy ? "Signing in…" : "Sign in as admin"}
            </button>
          </form>
        )
      ) : (
        <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6FAE3E]">
            <FileText size={15} />
            Bulk product import
          </span>
          <h2 className="mt-2 text-xl font-black text-[#1E4620]">
            Upload your product Word document
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6B7280]">
            Add one product per row in a Word table. Required columns: <strong>Name, Price, MRP, Size, Description.</strong>
            Optional: Code, Short Name, Slug, Key Benefits, Rating, Reviews, Bestseller. Check the preview, then confirm to publish the full list. DOCX files must be under 4 MB.
          </p>
        </div>

        <div className="shrink-0">
          <input
            ref={inputRef}
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E4620] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#2E6032] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? <LoaderCircle size={16} className="animate-spin" /> : <Upload size={16} />}
            {busy ? "Please wait…" : products.length ? "Choose another document" : "Choose .docx file"}
          </button>
        </div>
      </div>

      {documentName && products.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F3F8F1] px-4 py-3">
          <p className="text-sm font-semibold text-[#1E4620]">
            {documentName} · {products.length} product{products.length === 1 ? "" : "s"} found
          </p>
          <span className="text-xs font-medium text-[#5D7361]">Review or edit the fields before publishing</span>
        </div>
      )}

      {message && (
        <p className={`mt-4 flex items-center gap-2 text-sm font-semibold ${products.length ? "text-[#1E4620]" : "text-red-700"}`}>
          {products.length ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {message}
        </p>
      )}

      {products.length > 0 && (
        <div className="mt-5 space-y-4">
          {products.map((row, index) => (
            <article key={`${row.rowNumber}-${index}`} className="rounded-2xl border border-[#E5E7EB] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#1E4620]">
                    {row.product.code} · {row.product.name || `Product row ${row.rowNumber}`}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B7280]">Document row {row.rowNumber}</p>
                </div>
                <label className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#1E4620]">
                  Bestseller
                  <select
                    value={row.product.bestseller === null ? "" : String(row.product.bestseller)}
                    onChange={(event) => updateProduct(
                      index,
                      "bestseller",
                      event.target.value === "" ? null : event.target.value === "true",
                    )}
                    className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-1.5"
                  >
                    <option value="">Choose</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {EDITABLE_FIELDS.map(([field, label]) => (
                  <label key={field} className="text-xs font-semibold text-[#4B5443]">
                    {label}
                    <input
                      type={["price", "mrp", "rating", "reviewsCount"].includes(field) ? "number" : "text"}
                      min={["price", "mrp", "reviewsCount"].includes(field) ? "0" : undefined}
                      max={field === "rating" ? "5" : undefined}
                      step={field === "price" || field === "mrp" ? "0.01" : "1"}
                      value={field === "keyBenefits" && Array.isArray(row.product[field])
                        ? row.product[field].join(", ")
                        : row.product[field] ?? ""}
                      onChange={(event) => updateProduct(index, field, event.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 font-normal text-[#1E2E1C] outline-none focus:border-[#6FAE3E]"
                    />
                  </label>
                ))}
                <label className="text-xs font-semibold text-[#4B5443] sm:col-span-2 xl:col-span-3">
                  Description
                  <textarea
                    rows={2}
                    value={row.product.description}
                    onChange={(event) => updateProduct(index, "description", event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 font-normal text-[#1E2E1C] outline-none focus:border-[#6FAE3E]"
                  />
                </label>
              </div>
            </article>
          ))}

          <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#6B7280]">
              Existing products with the same slug will be updated; their current images are kept.
            </p>
            <button
              type="button"
              onClick={confirmImport}
              disabled={busy || rowErrors.length > 0}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E4620] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#2E6032] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? <LoaderCircle size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
              {busy ? "Publishing…" : `Confirm & publish ${products.length} products`}
            </button>
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div role="alert" className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-bold">Please fix these import issues:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {errors.map((error, index) => <li key={`${index}-${error}`}>{error}</li>)}
          </ul>
        </div>
      )}
        </>
      )}
    </section>
  );
}
