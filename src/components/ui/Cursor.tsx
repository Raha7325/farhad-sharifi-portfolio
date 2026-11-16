"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useCallback } from "react";

/** True only for fine pointers (mouse) that haven't requested reduced motion. */
function useIsDesktopFinePointer(): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => onStoreChange();
    fine.addEventListener("change", handler);
    reduce.addEventListener("change", handler);
    return () => {
      fine.removeEventListener("change", handler);
      reduce.removeEventListener("change", handler);
    };
  }, []);

  return useSyncExternalStore(
    subscribe,
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * A quiet ring that trails the native cursor and expands over
 * interactive elements. Desktop pointers only, honors reduced motion.
 */
export function Cursor() {
  const enabled = useIsDesktopFinePointer();
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 34, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 400, damping: 34, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent mix-blend-difference"
        animate={{
          scale: active ? 2 : 1,
          opacity: active ? 0.9 : 0.45,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
