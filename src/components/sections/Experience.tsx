"use client";

import { profile } from "@/content/profile";
import { Text } from "@/components/ui/Text";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE } from "@/components/motion/Reveal";
import { useStory } from "@/components/providers/HorizontalStory";

/** Compact role list — one row per position. */
function RoleRow({
  index,
  role,
  company,
  period,
  active,
  onSelect,
}: {
  index: number;
  role: string;
  company: string;
  period: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "group hairline-t flex w-full cursor-pointer items-baseline justify-between gap-6 py-4 text-left transition-all duration-300 hover:pl-2",
        active && "pl-2",
      )}
    >
      <span className="flex items-baseline gap-4">
        <span
          aria-hidden
          className={cn(
            "label-mono text-faint transition-colors duration-300",
            active ? "text-accent" : "group-hover:text-accent",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span
            className={cn(
              "block text-[15px] font-medium tracking-tight transition-colors duration-300",
              active ? "text-ink" : "text-muted group-hover:text-ink",
            )}
          >
            {role}
          </span>
          <span className="mt-0.5 block text-xs text-faint">{company}</span>
        </span>
      </span>
      <span
        className={cn(
          "label-mono text-xs transition-colors duration-300",
          active ? "text-accent" : "text-faint",
        )}
      >
        {period}
      </span>
    </button>
  );
}

function RoleDetail({ entry }: { entry: (typeof profile.experience)[number] }) {
  return (
    <div>
      <p className="label-mono text-accent">{entry.period}</p>
      <h3 className="mt-3 text-xl font-medium tracking-tight md:text-2xl">{entry.role}</h3>
      <p className="mt-1.5 text-[15px] text-muted">
        <Text>{entry.company}</Text>
      </p>

      <p className="mt-5 text-[15px] leading-relaxed text-muted">
        <Text>{entry.summary}</Text>
      </p>

      <ul className="mt-5 space-y-2.5">
        {entry.highlights.map((highlight, j) => (
          <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span
              aria-hidden
              className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent"
            />
            <Text>{highlight}</Text>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {entry.stack.map((tech) => (
          <span key={tech} className="label-mono rounded-full border border-line px-3 py-1 text-muted">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Horizontal chapter — selectable role list + detail panel. */
function ExperiencePanel() {
  const [selected, setSelected] = useState(0);
  const entry = profile.experience[selected];

  return (
    <section id="experience" data-panel className="py-28 md:py-40">
      <div className="shell w-full">
        <SectionHeader
          index="03"
          label="Experience"
          title={
            <>
              A record of <span className="font-serif italic font-normal">building</span>.
            </>
          }
        />

        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-10">
          {/* Role selector */}
          <div className="border-t border-line md:col-span-5" role="tablist" aria-label="Positions">
            {profile.experience.map((e, i) => (
              <RoleRow
                key={`${e.company}-${i}`}
                index={i}
                role={e.role}
                company={e.company}
                period={e.period}
                active={i === selected}
                onSelect={() => setSelected(i)}
              />
            ))}
          </div>

          {/* Detail */}
          <div className="border-t border-line pt-6 md:col-span-7 md:border-t-0 md:pt-0" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <RoleDetail entry={entry} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Vertical layout — the classic stacked editorial list. */
function ExperienceList() {
  return (
    <section id="experience" data-panel className="py-28 md:py-40">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Experience"
          title={
            <>
              A record of <span className="font-serif italic font-normal">building</span>.
            </>
          }
        />

        <div className="border-t border-line">
          {profile.experience.map((entry, i) => (
            <Reveal key={`${entry.company}-${i}`} delay={0.05 * i}>
              <article className="group relative grid gap-6 border-b border-line py-10 transition-colors duration-500 hover:bg-surface md:grid-cols-12 md:gap-8 md:py-14">
                {/* Period */}
                <div className="md:col-span-3">
                  <p className="label-mono text-muted transition-colors duration-300 group-hover:text-accent">
                    {entry.period}
                  </p>
                </div>

                {/* Role & company */}
                <div className="md:col-span-4">
                  <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                    {entry.role}
                  </h3>
                  <p className="mt-2 text-[15px] text-muted">
                    <Text>{entry.company}</Text>
                  </p>
                </div>

                {/* Summary & highlights */}
                <div className="md:col-span-5">
                  <p className="text-[15px] leading-relaxed text-muted">
                    <Text>{entry.summary}</Text>
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {entry.highlights.map((highlight, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span
                          aria-hidden
                          className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        <Text>{highlight}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const { mode } = useStory();
  return mode === "horizontal" ? <ExperiencePanel /> : <ExperienceList />;
}
