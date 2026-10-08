"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 0.48;

  return (
    <div className="w-full" style={{ perspective: 1800 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={shouldReduceMotion ? false : { rotateY: 82, opacity: 0.7 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { rotateY: -82, opacity: 0.7 }}
          transition={{ duration, ease: [0.45, 0, 0.55, 1] }}
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
