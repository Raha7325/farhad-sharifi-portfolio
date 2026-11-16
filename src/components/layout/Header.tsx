"use client";

import { cn } from "@/lib/utils";
import { profile } from "@/content/profile";
import { NAV_SECTIONS } from "@/content/profile";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { EASE } from "@/components/motion/Reveal";
import { useStory } from "@/components/providers/HorizontalStory";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

export function Header() {
  const scrolled = useScrolled();
  const { activeId: active } = useStory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-bg/75 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
          {/* Wordmark */}
          <a href="#top" className="group flex items-baseline gap-2" aria-label="Back to top">
            <span className="text-[15px] font-semibold tracking-tight">
              {profile.name.first}
            </span>
            <span className="label-mono text-muted transition-colors duration-300 group-hover:text-accent">
              {profile.title === "Software Engineer | Technical Leader" ? "Software Engineer" : ""}
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "label-mono relative pb-1 transition-colors duration-300 hover:text-ink",
                  active === s.id ? "text-ink" : "text-faint",
                )}
              >
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
            >
              {open ? <X size={15} strokeWidth={1.75} /> : <Menu size={15} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-bg pb-16 [box-shadow:inset_0_1px_0_0_var(--line)] md:hidden"
          >
            <nav aria-label="Sections" className="shell flex flex-col gap-2">
              {NAV_SECTIONS.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.06 * i + 0.1, ease: EASE }}
                  className="hairline-t flex items-baseline justify-between py-4"
                >
                  <span className="font-serif text-[2.6rem] leading-none tracking-tight">
                    {s.label}
                  </span>
                  <span className="label-mono text-faint">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
