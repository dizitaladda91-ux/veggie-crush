"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_TARGETS = "main h1, main h2, main h3, main p, main img, main article";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 0.68;

  useEffect(() => {
    if (
      shouldReduceMotion ||
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const observed = new WeakSet();
    const siblingIndexes = new WeakMap();
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.dataset.scrollVisible = "true";
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    });

    function observeElement(element) {
      if (
        observed.has(element) ||
        (element.closest("article") && element.tagName !== "ARTICLE") ||
        element.getAttribute("aria-hidden") === "true" ||
        element.dataset.scrollRevealIgnore === "true"
      ) {
        return;
      }

      observed.add(element);
      element.dataset.scrollReveal = element.tagName === "IMG" ? "image" : "text";
      const parent = element.parentElement;
      const siblingIndex = siblingIndexes.get(parent) || 0;
      siblingIndexes.set(parent, siblingIndex + 1);
      element.style.setProperty(
        "--scroll-reveal-delay",
        `${Math.min(siblingIndex * 70, 280)}ms`,
      );
      revealObserver.observe(element);
    }

    function observeRevealTargets(root) {
      if (root.nodeType === Node.ELEMENT_NODE && root.matches(REVEAL_TARGETS)) {
        observeElement(root);
      }
      root.querySelectorAll?.(REVEAL_TARGETS).forEach(observeElement);
    }

    observeRevealTargets(document);
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observeRevealTargets(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [pathname, shouldReduceMotion]);

  return (
    <div className="w-full" style={{ perspective: 1800 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={shouldReduceMotion ? false : { rotateY: 18, x: 14, opacity: 0.88 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={shouldReduceMotion ? undefined : {
            rotateY: -18,
            x: -14,
            opacity: 0.88,
            transition: { duration: 0.58, ease: [0.4, 0, 0.2, 1] },
          }}
          transition={{ duration, ease: [0.22, 0.61, 0.36, 1] }}
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: shouldReduceMotion ? "auto" : "transform, opacity",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
