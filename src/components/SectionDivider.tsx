import React from "react";

interface SectionDividerProps {
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({ flip = false, className = "" }: SectionDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 sm:h-12 lg:h-16 preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="swoosh-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F7941D" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F7941D" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#2E8B1F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1B5E14" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Dynamic Curved Swoosh */}
        <path
          d="M0,0 C320,55 580,68 820,40 C1060,12 1280,48 1440,25 L1440,70 L0,70 Z"
          fill="url(#swoosh-gradient)"
          opacity="0.12"
        />
        <path
          d="M0,20 C360,65 720,10 1080,50 C1260,70 1380,40 1440,32 L1440,70 L0,70 Z"
          fill="url(#swoosh-gradient)"
          opacity="0.22"
        />
        <path
          d="M0,38 C280,68 620,24 940,54 C1200,78 1360,42 1440,46"
          stroke="url(#swoosh-gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
