"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type Lenis from "lenis";
import { SECTIONS } from "@/content/profile";
import { cn } from "@/lib/utils";

type StoryMode = "horizontal" | "vertical";

type StoryContextValue = {
  mode: StoryMode;
  activeId: string;
  /** Called by the stage when the active panel changes. */
  reportActive: (id: string) => void;
  scrollToSection: (id: string) => void;
};

const StoryContext = createContext<StoryContextValue>({
  mode: "vertical",
  activeId: "top",
  reportActive: () => {},
  scrollToSection: () => {},
});

/** Access the story mode / active section from anywhere inside <StoryProvider>. */
export function useStory() {
  return useContext(StoryContext);
}

declare global {
  interface Window {
    /** Set by SmoothScroll when the smooth scroller is active. */
    __lenis?: Lenis;
    /** Set by StoryProvider so anchor clicks can be routed per mode. */
    __storyNav?: { scrollToSection(id: string): void };
  }
}

/**
 * Horizontal storytelling experience.
 *
 * Native vertical scroll stays the single driver — the runway is
 * `count × 100vh`, so one viewport of scrolling maps to exactly one panel.
 * Wheel, trackpad, touch, and keyboard all work without any scroll
 * hijacking. Mobile, tablet, coarse pointers, and reduced-motion users
 * get the standard vertical layout instead.
 */
export function StoryProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<StoryMode>("vertical");
  const [activeId, setActiveId] = useState<string>("top");
  const modeRef = useRef<StoryMode>("vertical");

  /* Mode detection — desktop-class pointer, wide viewport, motion allowed. */
  useEffect(() => {
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const recompute = () => {
      const next: StoryMode =
        desktop.matches && !reduce.matches ? "horizontal" : "vertical";
      modeRef.current = next;
      setMode(next);
    };
    recompute();
    desktop.addEventListener("change", recompute);
    reduce.addEventListener("change", recompute);
    return () => {
      desktop.removeEventListener("change", recompute);
      reduce.removeEventListener("change", recompute);
    };
  }, []);

  /* Vertical mode scroll spy — panels live in normal flow again. */
  useEffect(() => {
    if (mode !== "vertical") return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  /* Anchor routing that works in both modes. */
  const scrollToSection = useCallback((id: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const lenis = window.__lenis;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (modeRef.current === "horizontal") {
      const y = idx * window.innerHeight;
      if (lenis) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, []);

  const reportActive = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  /* Expose nav to SmoothScroll's anchor interception. */
  useEffect(() => {
    window.__storyNav = { scrollToSection };
    return () => {
      delete window.__storyNav;
    };
  }, [scrollToSection]);

  return (
    <StoryContext.Provider value={{ mode, activeId, reportActive, scrollToSection }}>
      {children}
    </StoryContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Stage — renders panels either as a horizontal film strip (desktop)
   or stacked in normal document flow (mobile / tablet / reduced motion).
   ───────────────────────────────────────────────────────────────────── */

export function StoryStage({ children }: { children: ReactNode }) {
  const { mode, activeId, reportActive, scrollToSection } = useStory();
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  /* Scroll → translate driver. Imperative style writes keep this at
     one composited transform per frame with zero React re-renders. */
  useEffect(() => {
    if (mode !== "horizontal") return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const vh = window.innerHeight;
      const maxScroll = (SECTIONS.length - 1) * vh;
      const y = Math.min(Math.max(window.scrollY, 0), maxScroll);
      const t = maxScroll > 0 ? y / maxScroll : 0;
      track.style.transform = `translate3d(${(-t * (SECTIONS.length - 1) * 100).toFixed(3)}vw, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${t.toFixed(4)})`;

      const idx = Math.round(t * (SECTIONS.length - 1));
      if (idx !== activeIndexRef.current) {
        activeIndexRef.current = idx;
        const id = SECTIONS[idx]?.id;
        if (id) reportActive(id);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mode, reportActive]);

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);

  if (mode !== "horizontal") {
    return <div data-story="vertical">{children}</div>;
  }

  return (
    <>
      {/* Runway: one viewport of scroll per panel. */}
      <div data-story="horizontal" style={{ height: `${SECTIONS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div ref={trackRef} className="flex h-full will-change-transform">
            {children}
          </div>
        </div>
      </div>

      {/* Chapter rail — direct navigation + active feedback. */}
      <nav
        aria-label="Chapters"
        className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        {SECTIONS.map((s) => {
          const active = SECTIONS.indexOf(s) === activeIndex;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToSection(s.id)}
              aria-current={active ? "true" : undefined}
              className="group flex cursor-pointer items-center gap-3"
            >
              <span
                className={cn(
                  "label-mono text-[10px] transition-opacity duration-300",
                  active
                    ? "text-ink opacity-100"
                    : "text-faint opacity-0 group-hover:opacity-100",
                )}
              >
                {s.label}
              </span>
              <span
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  active
                    ? "scale-125 bg-accent"
                    : "bg-line group-hover:bg-muted",
                )}
              />
            </button>
          );
        })}
      </nav>

      {/* Progress hairline under the header. */}
      <div aria-hidden className="fixed inset-x-0 top-16 z-40 h-px md:top-[4.5rem]">
        <div
          ref={barRef}
          className="h-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </>
  );
}
