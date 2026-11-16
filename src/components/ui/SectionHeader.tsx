import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

/**
 * Editorial section opener: mono index label + large display heading.
 */
export function SectionHeader({
  index,
  label,
  title,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("section-header mb-14 md:mb-20", className)} speed="slow">
      <div className="mb-7 flex items-baseline justify-between gap-10 border-b border-line pb-5">
        <p className="label-mono text-accent">
          {index} — {label}
        </p>
        <p className="label-mono text-faint">§ {index}</p>
      </div>
      <h2 className="display-md max-w-4xl">{title}</h2>
    </Reveal>
  );
}
