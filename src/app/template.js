"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ perspective: 1400 }}>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: 20, rotateY: -2 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left center" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
