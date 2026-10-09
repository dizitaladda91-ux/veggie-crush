"use client";

import { useEffect, useState } from "react";

const vegetableItems = [
  { emoji: "🥬", left: "8%", drift: "-40px", delay: 0, duration: 2.4, size: 42 },
  { emoji: "🍅", left: "18%", drift: "30px", delay: 200, duration: 2.7, size: 36 },
  { emoji: "🥕", left: "29%", drift: "-28px", delay: 400, duration: 2.5, size: 44 },
  { emoji: "🥦", left: "42%", drift: "24px", delay: 120, duration: 2.8, size: 40 },
  { emoji: "🌶️", left: "55%", drift: "-35px", delay: 300, duration: 2.6, size: 38 },
  { emoji: "🥑", left: "68%", drift: "26px", delay: 150, duration: 2.9, size: 42 },
  { emoji: "🍋", left: "81%", drift: "-30px", delay: 260, duration: 2.7, size: 34 },
  { emoji: "🫑", left: "90%", drift: "22px", delay: 500, duration: 2.5, size: 36 },
];

export default function WelcomeLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#1b2f1d]/35 backdrop-blur-[8px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(216,247,190,0.44),_rgba(27,47,29,0.12)_38%,_rgba(10,18,15,0.14)_100%)]" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center px-6 text-center sm:px-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-center sm:gap-8 md:gap-10">
          <div className="text-left text-[#F7FFF5] drop-shadow-[0_10px_30px_rgba(36,68,31,0.35)]">
            <p className="welcome-word welcome-word-left text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl md:text-7xl">
              Welcome
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-[#DDECD8] sm:text-base">
              to the freshness
            </p>
          </div>

          <div className="hidden h-20 w-px bg-white/40 sm:block" aria-hidden="true" />

          <div className="text-center text-[#F7FFF5] drop-shadow-[0_12px_36px_rgba(34,65,32,0.42)] sm:text-right">
            <p className="welcome-word welcome-word-right text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl md:text-7xl">
              VeggieCrush
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-[#DDECD8] sm:text-base">
              Store
            </p>
          </div>
        </div>

        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ECF9E4] shadow-[0_18px_45px_rgba(36,68,31,0.2)] backdrop-blur-sm sm:text-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-[#B6EA6F] shadow-[0_0_12px_rgba(182,234,111,0.8)]" />
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
