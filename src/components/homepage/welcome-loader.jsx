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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-8">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-12">
          <div className="flex flex-col items-center justify-center text-center text-[#F5FFF2] drop-shadow-[0_10px_30px_rgba(36,68,31,0.55)]">
            <p
              className="welcome-word welcome-word-left px-2 text-[clamp(2.2rem,7.5vw,3.4rem)] font-extrabold uppercase leading-[1.1] tracking-[-0.02em] md:text-[clamp(2.6rem,4.2vw,4.5rem)]"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif",
              }}
            >
              Welcome
            </p>
            <p
              className="mt-2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#DDECD8] sm:text-xs md:text-sm"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif",
              }}
            >
              to the freshness
            </p>
          </div>

          <div className="h-px w-16 bg-white/35 md:h-16 md:w-px md:bg-white/45" aria-hidden="true" />

          <div className="flex flex-col items-center justify-center text-center text-[#F5FFF2] drop-shadow-[0_12px_36px_rgba(34,65,32,0.62)]">
            <p
              className="welcome-word welcome-word-right px-3 text-[clamp(2.2rem,7.5vw,3.4rem)] font-bold italic leading-[1.1] tracking-[-0.01em] md:text-[clamp(2.6rem,4.4vw,4.6rem)]"
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              VeggieCrush
            </p>
            <p
              className="mt-2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#DDECD8] sm:text-xs md:text-sm"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif",
              }}
            >
              Store
            </p>
          </div>
        </div>

        <div
          className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#ECF9E4] shadow-[0_18px_45px_rgba(36,68,31,0.2)] backdrop-blur-md sm:text-xs"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Manrope', sans-serif",
          }}
        >
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
