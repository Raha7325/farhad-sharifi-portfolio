"use client";

import { profile } from "@/content/profile";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { isRealLink } from "@/lib/utils";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

type SocialLike = { label: string; handle: string; href: string };

function SocialLink({ social }: { social: SocialLike }) {
  if (!isRealLink(social.href)) {
    return (
      <span className="label-mono flex items-baseline justify-between gap-6 border-b border-line py-5 text-muted">
        <span>{social.label}</span>
        <span className="ph">{social.handle}</span>
      </span>
    );
  }
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center justify-between gap-6 border-b border-line py-5 text-muted transition-colors duration-300 hover:text-accent"
    >
      <span className="label-mono">{social.label}</span>
      <span className="inline-flex items-center gap-1 text-sm">
        {social.handle}
        <ArrowUpRight
          size={13}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
}

/** tel: href without spaces — safe for dialers. */
function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function Contact() {
  const email = profile.email.trim();
  const hasEmail = isRealLink(email) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailHref = hasEmail ? `mailto:${email}` : undefined;
  const phone = "phone" in profile ? (profile.phone as string) : undefined;
  const phoneHref = phone ? telHref(phone) : undefined;

  return (
    <section id="contact" data-panel className="pb-28 pt-24 md:pb-40 md:pt-32">
      {/* Oversized closing statement */}
      <Reveal speed="slow" className="shell w-full">
        <p className="label-mono mb-8 text-accent">07 — Contact</p>
        <h2 className="display-md max-w-4xl">
          <Text>{"Let's build something that outlasts the hype."}</Text>
        </h2>
      </Reveal>

      <div className="shell w-full mt-10 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-10">
        {/* Email & phone — the direct channels */}
        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <p className="label-mono mb-6 text-faint">Direct channels</p>
            <div className="flex flex-col gap-6">
              {emailHref ? (
                <Magnetic strength={0.12}>
                  <a
                    href={emailHref}
                    className="link-underline group inline-flex items-center gap-4 font-serif text-[clamp(1.6rem,4.5vw,3.4rem)] italic leading-tight tracking-[-0.01em] text-ink transition-colors duration-300 hover:text-accent"
                    aria-label="Send an email"
                  >
                    <Mail
                      size={28}
                      strokeWidth={1.5}
                      className="shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                    {email}
                    <span className="link-underline-line" />
                  </a>
                </Magnetic>
              ) : (
                <p className="font-serif text-[clamp(1.6rem,4.5vw,3.4rem)] italic leading-tight tracking-[-0.01em]">
                  <Text>{profile.email}</Text>
                </p>
              )}

              {phoneHref ? (
                <Magnetic strength={0.12}>
                  <a
                    href={phoneHref}
                    className="link-underline group inline-flex items-center gap-4 font-serif text-[clamp(1.3rem,3.2vw,2.2rem)] italic leading-tight tracking-[-0.01em] text-ink transition-colors duration-300 hover:text-accent"
                    aria-label="Make a phone call"
                  >
                    <Phone
                      size={22}
                      strokeWidth={1.5}
                      className="shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                    {phone}
                    <span className="link-underline-line" />
                  </a>
                </Magnetic>
              ) : null}
            </div>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">
              <Text>
                {
                  "Whether it's a role, an advisory conversation, or a new venture — click to email, or tap to call. The inbox and the phone are both open."
                }
              </Text>
            </p>
          </Reveal>
        </div>

        {/* Social index */}
        <div className="md:col-span-5">
          <Reveal delay={0.18}>
            <p className="label-mono mb-4 text-faint">Elsewhere</p>
          </Reveal>
          <div className="border-t border-line">
            {[profile.socials.linkedin, profile.socials.github].map((social, i) => (
              <Reveal key={social.label} delay={0.22 + 0.06 * i}>
                <SocialLink social={social} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
