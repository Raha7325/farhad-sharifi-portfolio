"use client";

import { profile } from "@/content/profile";
import { Text } from "@/components/ui/Text";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function useClock(): { year: string; time: string } {
  const [clock, setClock] = useState<{ year: string; time: string }>({
    year: "",
    time: "",
  });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock({
        year: String(now.getFullYear()),
        time: new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now),
      });
    };
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);
  return clock;
}

export function Footer() {
  const { year, time } = useClock();

  return (
    <footer className="shell pb-10">
      <div className="hairline-t flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-7">
        <p className="label-mono text-faint">
          © {year} <Text>{profile.name.first}</Text>
          <span className="mx-2">·</span>
          <span className="text-muted">
            {profile.title === "Software Engineer | Technical Leader" ? "Software Engineer" : ""}
          </span>
        </p>

        <p className="label-mono text-faint">
          <Text>{profile.location}</Text>
          <span className="mx-2">·</span>
          <time suppressHydrationWarning>{time}</time>
        </p>

        <a
          href="#top"
          aria-label="Back to top"
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-accent hover:text-accent"
        >
          <ArrowUp
            size={15}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
