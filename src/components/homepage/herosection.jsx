"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const banners = [
  {
    src: "/homesection/hero-banner-1.jpg",
    alt: "VeggieCrush natural superfood powders and product jars",
  },
  {
    src: "/homesection/hero-banner-2.jpg",
    alt: "VeggieCrush superfood blends with fresh ingredients",
  },
];

export default function HeroSection() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [rotationEnabled, setRotationEnabled] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  const showBanner = (index) => {
    setActiveBanner((index + banners.length) % banners.length);
  };

  useEffect(() => {
    if (!rotationEnabled || isInteracting) return;

    const intervalId = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [rotationEnabled, isInteracting]);

  return (
    <section
      aria-label="VeggieCrush hero banners"
      aria-roledescription="carousel"
      className="w-full overflow-hidden border-b border-[#E8EFE5]"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsInteracting(false);
        }
      }}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FFFBF2]">
        {banners.map((banner, index) => (
          <div
            key={banner.src}
            role="img"
            aria-label={banner.alt}
            aria-hidden={activeBanner !== index}
            className={`absolute inset-0 bg-no-repeat transition-opacity duration-500 ${
              activeBanner === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url("${banner.src}")`,
              backgroundPosition: "center",
              backgroundSize: "90% 90%",
            }}
          />
        ))}

        <Link
          href="/products"
          aria-label="Explore the VeggieCrush product range"
          className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#1B5E14]"
        >
          <span className="sr-only">Explore the VeggieCrush product range</span>
        </Link>

        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full bg-white/90 p-1.5 shadow-md sm:bottom-5 sm:right-5">
          <button
            type="button"
            onClick={() => setRotationEnabled((enabled) => !enabled)}
            aria-label={rotationEnabled ? "Pause banner rotation" : "Resume banner rotation"}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#1B5E14] hover:bg-[#F0F7EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B5E14]"
          >
            {rotationEnabled ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button
            type="button"
            onClick={() => showBanner(activeBanner - 1)}
            aria-label="Show previous banner"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#1B5E14] hover:bg-[#F0F7EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B5E14]"
          >
            <ArrowLeft size={16} />
          </button>
          {banners.map((banner, index) => (
            <button
              key={banner.src}
              type="button"
              onClick={() => showBanner(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={activeBanner === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${
                activeBanner === index ? "w-6 bg-[#1B5E14]" : "w-2.5 bg-[#9AA99A]"
              }`}
            />
          ))}
          <button
            type="button"
            onClick={() => showBanner(activeBanner + 1)}
            aria-label="Show next banner"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#1B5E14] hover:bg-[#F0F7EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B5E14]"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
