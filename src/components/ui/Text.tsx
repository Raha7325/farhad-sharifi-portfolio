import { cn, isPlaceholderToken, splitPlaceholders } from "@/lib/utils";
import type { ElementType } from "react";

/**
 * Renders inline text while highlighting [Bracketed] placeholder
 * tokens, so unfilled content is unmissable and easy to swap.
 */
export function Text({
  children,
  className,
  as: Tag,
}: {
  children: string;
  className?: string;
  as?: ElementType;
}) {
  const parts = splitPlaceholders(children);
  const inner = parts.map((part, i) =>
    isPlaceholderToken(part) ? (
      <span key={i} className="ph">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

  if (Tag) {
    return <Tag className={className}>{inner}</Tag>;
  }
  return <span className={className}>{inner}</span>;
}

/** Standalone placeholder chip — for single tokens in structural positions. */
export function Token({ children, className }: { children: string; className?: string }) {
  return <span className={cn("ph", className)}>{children}</span>;
}
