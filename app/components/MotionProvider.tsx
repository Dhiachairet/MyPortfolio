"use client";

import { MotionConfig } from "motion/react";

// Respect the visitor's reduced-motion setting across every animation
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
