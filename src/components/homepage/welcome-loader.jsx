"use client";

import { useEffect, useState } from "react";

const vegetableItems = [
  { emoji: "🥬", left: "10%", drift: "-28px", delay: 0, duration: 1.9, size: 38 },
  { emoji: "🍅", left: "24%", drift: "24px", delay: 180, duration: 2.1, size: 32 },
  { emoji: "🥕", left: "40%", drift: "-22px", delay: 260, duration: 2.0, size: 40 },
  { emoji: "🥦", left: "58%", drift: "18px", delay: 120, duration: 2.2, size: 36 },
  { emoji: "🌶️", left: "72%", drift: "-20px", delay: 300, duration: 2.1, size: 34 },
  { emoji: "🥑", left: "86%", drift: "20px", delay: 240, duration: 2.3, size: 38 },
];

export default function WelcomeLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#142a1c]/55 backdrop-blur-[6px]" style={{ WebkitBackdropFilter: "blur(6px)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(186,238,140,0.12),_rgba(18,37,23,0.12)_38%,_rgba(8,15,11,0.32)_100%)]" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center px-6 text-center sm:px-10">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-center sm:gap-8 md:gap-10">
          <div className="text-left text-[#F5FFF2] drop-shadow-[0_10px_30px_rgba(36,68,31,0.55)]">
            <p className="welcome-word welcome-word-left text-[3rem] font-black uppercase tracking-[-0.08em] sm:text-[4.2rem] md:text-[7rem]" style={{ letterSpacing: "-0.06em" }}>
              Welcome
            </p>
            <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#DDECD8] sm:text-sm">
              to the freshness
            </p>
          </div>

          <div className="hidden h-16 w-px bg-white/45 sm:block" aria-hidden="true" />

          <div className="text-center text-[#F5FFF2] drop-shadow-[0_12px_36px_rgba(34,65,32,0.62)] sm:text-right">
            <p className="welcome-word welcome-word-right text-[3rem] font-black uppercase tracking-[-0.08em] sm:text-[4.2rem] md:text-[7rem]" style={{ letterSpacing: "-0.06em", fontStyle: "italic" }}>
              VeggieCrush
            </p>
            <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#DDECD8] sm:text-sm">
              Store
            </p>
          </div>
        </div>

        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#ECF9E4] shadow-[0_18px_45px_rgba(36,68,31,0.2)] backdrop-blur-md sm:text-xs">
          <span className="h-2.5 w-2.5 rounded-full bg-[#B6EA6F] shadow-[0_0_12px_rgba(182,234,111,0.9)]" />
          Fresh from farm to kitchen
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {vegetableItems.map((item) => (
          <span
            key={`${item.emoji}-${item.left}`}
            className="welcome-veg"
            style={{
              left: item.left,
              top: "-12%",
              animationDelay: `${item.delay}ms`,
              animationDuration: `${item.duration}s`,
              fontSize: `${item.size}px`,
              ["--drift-x"]: item.drift,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
