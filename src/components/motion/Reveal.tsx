"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useStory } from "@/components/providers/HorizontalStory";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  /** Extra motion style variations: none | line (slower, more cinematic) */
  speed?: "default" | "slow";
};

/**
 * The site's one reveal primitive — scrolls into view, staggers via `delay`.
 * Honors prefers-reduced-motion by appearing without translation.
 * In horizontal story mode the viewport margin opens up, because panels
 * arrive by translation rather than vertical scrolling.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  speed = "default",
}: RevealProps) {
  const reduce = useReducedMotion();
  const { mode } = useStory();
  const duration = speed === "slow" ? 1.1 : 0.8;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once,
        margin: mode === "horizontal" ? "0px" : "-12% 0px -8% 0px",
      }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Small stagger helper for importing in lists. */
export { EASE };
