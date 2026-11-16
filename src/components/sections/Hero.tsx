"use client";

import { profile } from "@/content/profile";
import { Text } from "@/components/ui/Text";
import { Magnetic } from "@/components/ui/Magnetic";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback } from "react";
import { EASE } from "@/components/motion/Reveal";
import { useStory } from "@/components/providers/HorizontalStory";

export function Hero() {
  const reduce = useReducedMotion();
  const { mode } = useStory();
  const horizontal = mode === "horizontal";

  /** Mouse-following accent glow, throttled to one CSS-variable write per frame. */
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
  }, []);

  const lift = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 34 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      data-panel
      onMouseMove={onMove}
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={
        {
          "--mx": "50%",
          "--my": "30%",
        } as React.CSSProperties
      }
    >
      {/* Ambient glow following the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(560px circle at var(--mx) var(--my), color-mix(in oklab, var(--accent) 13%, transparent), transparent 62%)",
          opacity: 0.85,
        }}
      />
      {/* Vertical hairlines — quiet Swiss grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, transparent calc(50% - 36rem), var(--line) calc(50% - 36rem), var(--line) calc(50% - 36rem + 1px), transparent calc(50% - 36rem + 1px), transparent calc(50% + 36rem), var(--line) calc(50% + 36rem), var(--line) calc(50% + 36rem + 1px), transparent calc(50% + 36rem + 1px))",
          opacity: 0.5,
        }}
      />

      {/* Top meta row */}
      <motion.div
        {...lift(0.5)}
        className="shell flex items-center pt-24 md:pt-32"
      >
        <span className="label-mono text-faint">Portfolio — 2026</span>
      </motion.div>

      {/* Headline block */}
      <div className="shell relative mt-auto">
        <motion.p {...lift(0.65)} className="label-mono mb-6 text-muted md:mb-8">
          {profile.title}
          <span className="mx-3 text-accent">·</span>
          {profile.location}
        </motion.p>

        <h1 className="display max-w-full">
          <motion.span
            {...lift(0.75)}
            className="block font-sans"
          >
            {profile.name.first}
          </motion.span>
          <motion.span
            {...lift(0.87)}
            className="block font-serif font-normal italic tracking-[-0.01em] text-accent"
          >
            <Text>{profile.name.last}</Text>
          </motion.span>
        </h1>

        <motion.p
          {...lift(1.05)}
          className="mt-8 max-w-md text-[15px] leading-relaxed text-muted md:mt-10 md:text-base"
        >
          <Text>{profile.statement}</Text>
        </motion.p>

        <motion.div {...lift(1.18)} className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
          <Magnetic>
            <a
              href="#projects"
              className="group/btn relative inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full bg-ink px-7 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent hover:text-accent-contrast"
            >
              View Projects
              <ArrowDown size={15} strokeWidth={2} className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-line px-7 text-sm font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Contact Me
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Bottom hairline row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="shell mt-16"
      >
        <div className="hairline-t flex items-center justify-between py-5">
          <span className="label-mono text-faint">{horizontal ? "Scroll — or use ← →" : "Scroll"}</span>
          <motion.span
            aria-hidden
            animate={
              reduce
                ? {}
                : horizontal
                  ? { x: [0, 5, 0] }
                  : { y: [0, 5, 0] }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-faint"
          >
            {horizontal ? (
              <ArrowRight size={14} strokeWidth={1.5} />
            ) : (
              <ArrowDown size={14} strokeWidth={1.5} />
            )}
          </motion.span>
          <span className="label-mono hidden text-faint sm:block">Technology · Leadership · Craft</span>
        </div>
      </motion.div>
    </section>
  );
}
