"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Minus, Plus, X, ZoomIn } from "lucide-react";

const MIN_ZOOM = 1;
const DEFAULT_MAX_ZOOM = 6;
const ZOOM_STEP = 0.5;

export default function ImageZoom({
  src,
  alt,
  children,
  className = "",
  initialZoom = MIN_ZOOM,
  maxZoom = DEFAULT_MAX_ZOOM,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "+" || event.key === "=") {
        setZoom((current) => Math.min(maxZoom, current + ZOOM_STEP));
      }
      if (event.key === "-") {
        setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP));
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, maxZoom]);

  function closeViewer() {
    setIsOpen(false);
    setZoom(initialZoom);
  }

  return (
    <>
      {src ? (
        <button
          type="button"
          onClick={() => {
            setZoom(initialZoom);
            setIsOpen(true);
          }}
          aria-label={`Zoom image: ${alt}`}
          className={`relative block cursor-zoom-in ${className}`}
        >
          {children}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm">
            <ZoomIn size={14} aria-hidden="true" />
            Zoom
          </span>
        </button>
      ) : children}

      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex flex-col bg-black/95 text-white"
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed image: ${alt}`}
        >
          <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-white/15 px-4 py-3 sm:px-6">
            <p className="min-w-0 truncate text-sm font-medium">{alt}</p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP))}
                disabled={zoom === MIN_ZOOM}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:opacity-40"
              >
                <Minus size={18} />
              </button>
              <span className="min-w-12 text-center text-xs font-semibold tabular-nums">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => setZoom((current) => Math.min(maxZoom, current + ZOOM_STEP))}
                disabled={zoom === maxZoom}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:opacity-40"
              >
                <Plus size={18} />
              </button>
              <button
                type="button"
                aria-label="Close zoomed image"
                onClick={closeViewer}
                className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <X size={19} />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <div className="flex min-h-full min-w-full items-center justify-center p-4 sm:p-6">
              <div
                className="relative shrink-0 transition-[width,height] duration-200 ease-out"
                style={{
                  width: `min(${90 * zoom}vw, ${90 * zoom}vh)`,
                  height: `min(${78 * zoom}vh, ${78 * zoom}vw)`,
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
