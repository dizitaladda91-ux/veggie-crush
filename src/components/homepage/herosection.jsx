"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sprout } from "lucide-react";



const SLIDES = [
  {
    eyebrow: "FRESH. HEALTHY. DELICIOUS.",
    heading: ["Veggie", "Crush"],
    body: "Your one-stop shop for farm-fresh vegetables delivered fresh to your home.",
    cta: "Shop Fresh Picks",
    imageLabel: "Hero image — crate of mixed vegetables",
  },
  {
    eyebrow: "PICKED THIS MORNING",
    heading: ["Farm", "Boxes"],
    body: "Curated weekly boxes packed straight from the field to your doorstep.",
    cta: "Build Your Box",
    imageLabel: "Hero image — weekly farm box",
  },
  {
    eyebrow: "NO PESTICIDES. EVER.",
    heading: ["100%", "Organic"],
    body: "Certified organic greens, roots, and herbs grown without shortcuts.",
    cta: "See Certifications",
    imageLabel: "Hero image — leafy greens close-up",
  },
];

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((i) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <section
      style={{ backgroundColor: "#FBF7EC", fontFamily: "Inter, sans-serif" }}
      className="w-full px-6 lg:px-10 py-10 lg:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Text side */}
        <div key={index + "-text"} className="animate-[fadeIn_0.4s_ease-out]">
          <p
            className="text-xs font-bold tracking-[0.25em] mb-3"
            style={{ color: "#6FAE3E" }}
          >
            {slide.eyebrow}
          </p>
          <h1
            style={{ fontFamily: "'Baloo 2', cursive", color: "#1E4620" }}
            className="leading-[0.95] mb-5"
          >
            <span className="block text-6xl lg:text-7xl font-extrabold">
              {slide.heading[0]}
            </span>
            <span
              className="block text-6xl lg:text-7xl font-extrabold"
              style={{ color: "#6FAE3E" }}
            >
              {slide.heading[1]}
            </span>
          </h1>
          <div
            className="w-16 h-1 rounded-full mb-5"
            style={{ backgroundColor: "#6FAE3E" }}
          />
          <p className="text-base max-w-md mb-8" style={{ color: "#4B5443" }}>
            {slide.body}
          </p>
          <button
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: "#1E4620" }}
          >
            <Sprout size={16} />
            {slide.cta}
          </button>
        </div>

        {/* Image / carousel side */}
        <div className="relative">
          <div
            className="relative w-full aspect-[4/3] rounded-3xl border-2 border-dashed flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#F0E8D6", borderColor: "#D8CBA8" }}
          >
            <Image
              src="/homesection/veggiecrush.png"
              alt="Fresh vegetables arranged in a Veggie Crush crate"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Prev / next arrows */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full grid place-items-center bg-white/80 hover:bg-white transition-colors shadow-sm"
            >
              <ChevronLeft size={18} color="#1E4620" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full grid place-items-center bg-white/80 hover:bg-white transition-colors shadow-sm"
            >
              <ChevronRight size={18} color="#1E4620" />
            </button>

            {/* Dot navigation — sits inside the bottom of the image frame */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {SLIDES.map((_, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={isActive}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: isActive ? "22px" : "8px",
                      height: "8px",
                      backgroundColor: isActive ? "#1E4620" : "#D8CBA8",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}