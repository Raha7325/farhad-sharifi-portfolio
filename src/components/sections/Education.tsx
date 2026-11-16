"use client";

import { profile } from "@/content/profile";
import { Text } from "@/components/ui/Text";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export function Education() {
  const { education } = profile;

  return (
    <section id="education" data-panel className="py-28 md:py-40">
      <div className="shell w-full">
        <SectionHeader
          index="06"
          label="Education"
          title={
            <>
              Grounded in <span className="font-serif italic font-normal">fundamentals</span>.
            </>
          }
        />

        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          {/* Degree */}
          <div className="md:col-span-5">
            <Reveal>
              <div className="border border-line p-7 md:p-8">
                <p className="label-mono text-faint">Degree</p>
                <h3 className="mt-4 text-xl font-medium tracking-tight md:text-2xl">
                  {education.degree}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  <Text>{education.school}</Text>
                </p>
                <p className="label-mono mt-5 text-accent">{education.period}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex items-center gap-4 border border-line px-7 py-5 md:px-8">
                <p className="label-mono text-faint">Languages</p>
                <p className="text-[15px] text-muted">
                  {education.languages.join(" · ")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Additional professional context */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="label-mono mb-6 text-faint">Additional information</p>
            </Reveal>
            <div className="border-t border-line">
              {education.highlights.map((highlight, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <div className="flex gap-4 border-b border-line py-6">
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    <p className="text-[15px] leading-relaxed text-muted">
                      <Text>{highlight}</Text>
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
