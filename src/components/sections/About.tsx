"use client";

import { profile } from "@/content/profile";
import { Text } from "@/components/ui/Text";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section id="about" data-panel className="py-28 md:py-40">
      <div className="shell w-full">
        <SectionHeader
          index="02"
          label="About"
          title={
            <>
              Leadership with <span className="font-serif italic font-normal">an engineer&apos;s</span>{" "}
              hands.
            </>
          }
        />

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* Intro copy */}
          <div className="md:col-span-7">
            <div className="space-y-7 text-[15px] leading-[1.85] text-muted md:text-[17px]">
              {profile.about.map((para, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p>
                    <Text>{para}</Text>
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25} className="about-quote mt-12">
              <blockquote className="flex gap-4 border-l-2 border-accent pl-6">
                <div>
                  <p className="font-serif text-xl italic leading-snug md:text-2xl">
                    &ldquo;The CTO&apos;s real product is the team that keeps shipping without
                    them in the room.&rdquo;
                  </p>
                  <footer className="label-mono mt-4 text-faint">
                    Working principle — <Text>{profile.name.first}</Text>
                  </footer>
                </div>
              </blockquote>
            </Reveal>
          </div>

          {/* Values grid */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="label-mono mb-6 text-faint">Operating principles</p>
            </Reveal>
            <div className="border-t border-line">
              {profile.values.map((value, i) => (
                <Reveal key={value.title} delay={0.06 * i}>
                  <div className="group border-b border-line py-6 transition-all duration-500 hover:pl-2">
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="text-[15px] font-medium md:text-base">{value.title}</h3>
                      <span className="label-mono text-faint transition-colors duration-300 group-hover:text-accent">
                        0{i + 1}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      <Text>{value.body}</Text>
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
