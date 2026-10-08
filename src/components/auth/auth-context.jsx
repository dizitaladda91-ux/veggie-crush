"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");
  const [authSessionId, setAuthSessionId] = useState(0);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (active) setUser(data.user || null);
        } else if (active) {
          setUser(null);
        }
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const login = useCallback(async (email, password, { closeModal = true } = {}) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    setUser(data.user);
    if (closeModal) setIsAuthModalOpen(false);
    return data.user;
  }, []);

  const register = useCallback(async (formData, { closeModal = true } = {}) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Registration failed");
    }

    setUser(data.user);
    if (closeModal) setIsAuthModalOpen(false);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const openAuthModal = useCallback((tab = "login") => {
    setAuthModalTab(tab === "register" ? "register" : "login");
    setAuthSessionId((current) => current + 1);
    setIsAuthModalOpen(true);
  }, []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthModalOpen,
      authModalTab,
      setAuthModalTab,
      authSessionId,
      openAuthModal,
      closeAuthModal,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, loading, isAuthModalOpen, authModalTab, authSessionId, openAuthModal, closeAuthModal, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
