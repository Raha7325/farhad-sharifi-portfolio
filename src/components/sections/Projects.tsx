"use client";

import { profile, type Project } from "@/content/profile";
import { Text, Token } from "@/components/ui/Text";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { isRealLink, cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useStory } from "@/components/providers/HorizontalStory";

/**
 * Abstract editorial preview — replaces stock screenshots with a
 * commissioned-feeling gradient plate. Swap for real imagery by replacing
 * this block with a <figure> once screenshots exist.
 */
function Preview({ project, index, compact }: { project: Project; index: number; compact?: boolean }) {
  return (
    <div
      className={cn(
        "group relative aspect-[4/3] overflow-hidden border border-line",
        compact ? "md:aspect-[16/10]" : "md:aspect-[16/10]",
      )}
      data-cursor
    >
      {/* Layered gradient plate */}
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        style={{
          background: [
            "radial-gradient(120% 90% at 8% 100%, color-mix(in oklab, var(--accent) 26%, transparent), transparent 55%)",
            "radial-gradient(90% 110% at 95% 10%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%)",
            "linear-gradient(160deg, var(--surface), var(--bg))",
          ].join(", "),
        }}
      />
      {/* Quiet blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] transition-opacity duration-700 group-hover:opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "11.5% 15%",
          maskImage: "radial-gradient(120% 120% at 20% 20%, black, transparent 85%)",
        }}
      />
      {/* Editorial caption inside the plate */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-9">
        <div className="flex items-start justify-between">
          <Token>{project.status}</Token>
          <span className="label-mono text-faint">Case {String(index + 1).padStart(2, "0")}</span>
        </div>
        <div>
          <p
            className={cn(
              "font-serif italic leading-[1.05] tracking-[-0.01em]",
              compact ? "text-[clamp(1.4rem,2.2vw,2rem)]" : "text-[clamp(1.8rem,3.5vw,3rem)]",
            )}
          >
            <Text>{project.title}</Text>
          </p>
          <p className={cn("mt-2 max-w-md text-sm leading-relaxed text-muted", compact && "text-xs")}>
            <Text>{project.tagline}</Text>
          </p>
        </div>
      </div>
      {/* Hover sheen */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-[color-mix(in_oklab,var(--accent)_14%,transparent)] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />
    </div>
  );
}

function ProjectLinks({ links }: { links: Project["links"] }) {
  const hasLive = isRealLink(links.live);
  const hasSource = isRealLink(links.source);
  // No invented links — omit the row entirely when none exist.
  if (!hasLive && !hasSource) return null;
  return (
    <div className="flex gap-5">
      {hasLive && (
        <a
          href={links.live}
          target="_blank"
          rel="noreferrer noopener"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          <span className="link-underline">Live demo<span className="link-underline-line" /></span>
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      )}
      {hasSource && (
        <a
          href={links.source}
          target="_blank"
          rel="noreferrer noopener"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <span className="link-underline">Source<span className="link-underline-line" /></span>
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      )}
    </div>
  );
}

/** Compact case card — horizontal chapter mode. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="flex h-full flex-col">
      <Preview project={project} index={index} compact />
      <div className="mt-5 flex flex-1 flex-col">
        <ProjectLinks links={project.links} />
        <h3 className="mt-3 text-xl font-medium tracking-tight md:text-[1.4rem] md:leading-tight">
          <Text>{project.title}</Text>
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          <Text>{project.problem}</Text>
        </p>
        <ul className="mt-4 space-y-2">
          {project.contributions.slice(0, 3).map((contribution, j) => (
            <li key={j} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
              <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
              <Text>{contribution}</Text>
            </li>
          ))}
        </ul>
        {project.impact ? (
          <p className="label-mono mt-4 text-accent">
            <Text>{project.impact}</Text>
          </p>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.stack.map((tech) => (
            <span key={tech} className="label-mono rounded-full border border-line px-2.5 py-0.5 text-[10px] text-muted">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Detailed editorial block — vertical mode. */
function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal speed="slow">
      <article className="border-b border-line py-16 first:pt-8 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8">
          {/* Preview */}
          <div className={cn("md:col-span-7", flipped && "md:order-2")}>
            <Preview project={project} index={index} />
          </div>

          {/* Case copy */}
          <div className={cn("md:col-span-5", flipped && "md:order-1")}>
            <ProjectLinks links={project.links} />

            <h3 className="mt-6 text-2xl font-medium tracking-tight md:text-[2rem] md:leading-tight">
              <Text>{project.title}</Text>
            </h3>

            <div className="mt-8 space-y-6">
              <div>
                <p className="label-mono mb-2 text-faint">Problem</p>
                <p className="text-sm leading-relaxed text-muted">
                  <Text>{project.problem}</Text>
                </p>
              </div>
              <div>
                <p className="label-mono mb-2 text-faint">Solution</p>
                <p className="text-sm leading-relaxed text-muted">
                  <Text>{project.solution}</Text>
                </p>
              </div>
              <div>
                <p className="label-mono mb-2 text-faint">Role</p>
                <p className="text-sm leading-relaxed text-muted">
                  <Text>{project.role}</Text>
                </p>
              </div>
              <div>
                <p className="label-mono mb-2 text-faint">Key contributions</p>
                <ul className="space-y-2">
                  {project.contributions.map((contribution, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <Text>{contribution}</Text>
                    </li>
                  ))}
                </ul>
              </div>
              {project.impact ? (
                <div>
                  <p className="label-mono mb-2 text-faint">Impact</p>
                  <p className="label-mono text-accent">
                    <Text>{project.impact}</Text>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="label-mono rounded-full border border-line px-3 py-1 text-muted"
                >
                  <Text>{tech}</Text>
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const { mode } = useStory();

  return (
    <section id="projects" data-panel className="py-28 md:py-40">
      <div className="shell w-full">
        <SectionHeader
          index="04"
          label="Projects"
          title={
            <>
              Selected <span className="font-serif italic font-normal">work</span>.
            </>
          }
        />

        {mode === "horizontal" ? (
          <div className="grid h-full grid-cols-3 items-stretch gap-8">
            {profile.projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="border-t border-line">
            {profile.projects.map((project, i) => (
              <ProjectBlock key={project.title} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
