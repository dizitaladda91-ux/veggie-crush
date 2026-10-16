"use client";

export default function PageTransition({ children }) {
  // Page flip animation removed as requested. Clean, standard instant page rendering.
  return <div className="w-full">{children}</div>;
}
