"use client";

import { profile } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Token } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { useStory } from "@/components/providers/HorizontalStory";

export function Expertise() {
  const { mode } = useStory();
  const compact = mode === "horizontal";

  return (
    <section id="expertise" data-panel className="py-28 md:py-40">
      <div className="shell w-full">
        <SectionHeader
          index="05"
          label="Skills"
          title={
            <>
              Where <span className="font-serif italic font-normal">judgment</span> lives.
            </>
          }
        />

        <div
          className={cn(
            compact
              ? "grid grid-cols-4 items-stretch gap-3"
              : "grid gap-6 md:grid-cols-3",
          )}
        >
          {profile.skills.map((category, i) => (
            <Reveal
              key={category.name}
              delay={compact ? 0.05 * i : 0.08 * i}
              className="h-full"
            >
              <div
                className={cn(
                  "group flex h-full flex-col border border-line transition-colors duration-500 hover:border-accent",
                  compact ? "p-5" : "p-7 md:p-8",
                )}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className={cn("label-mono text-muted transition-colors duration-300 group-hover:text-accent", compact && "text-[10px]")}>
                    {category.name}
                  </h3>
                  <span className="label-mono text-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <ul className={cn("mt-5 flex flex-1 flex-col", compact && "mt-3.5 space-y-1.5")}>
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "hairline-t flex items-baseline gap-3 leading-snug first:border-t-0 first:pt-0",
                        compact ? "py-1.5 text-xs" : "py-3 text-[15px]",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "shrink-0 rounded-full bg-faint transition-colors duration-300 group-hover:bg-accent",
                          compact ? "mt-1.5 h-1 w-1" : "mt-2 h-1 w-1",
                        )}
                      />
                      {/* Single-token items render as clearly marked placeholders */}
                      {/^\[[^\]]+\]$/.test(item.trim()) ? (
                        <Token>{item.trim()}</Token>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
