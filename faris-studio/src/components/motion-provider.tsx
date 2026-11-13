"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotionPreference } from "@/lib/motion-preference";

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPreference();
  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
