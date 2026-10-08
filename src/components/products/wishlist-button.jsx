"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export default function WishlistButton({ productId, className = "" }) {
  const { user, loading: authLoading, openAuthModal } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !productId) {
      return;
    }

    let active = true;
    fetch(`/api/wishlist?productId=${encodeURIComponent(productId)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to check your wishlist.");
        if (active) setWishlisted(Boolean(data.wishlisted));
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Unable to check your wishlist.");
      });

    return () => {
      active = false;
    };
  }, [productId, user]);

  async function toggleWishlist() {
    if (!user) {
      openAuthModal();
      return;
    }

    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to update your wishlist.");
      setWishlisted(Boolean(data.wishlisted));
    } catch (requestError) {
      setError(requestError.message || "Unable to update your wishlist.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        title={error || (wishlisted ? "Remove from wishlist" : "Add to wishlist")}
        disabled={authLoading || busy}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleWishlist();
        }}
        className={`inline-grid place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#53604E] shadow-sm transition-all hover:border-[#E8C5C0] hover:text-[#D9483A] disabled:cursor-wait disabled:opacity-60 ${className}`}
      >
        <Heart size={18} fill={wishlisted ? "#D9483A" : "none"} color={wishlisted ? "#D9483A" : "currentColor"} />
      </button>
      {error && <span role="status" className="sr-only">{error}</span>}
    </span>
  );
}
