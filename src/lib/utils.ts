import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** A link is only rendered as <a> when the content value is a real URL. */
export function isRealLink(href: string): boolean {
  return /^(https?:\/\/|mailto:)/.test(href.trim());
}

const PLACEHOLDER_RE = /(\[[^\]]+\])/g;

/**
 * Splits a string into regular text and [PLACEHOLDER] tokens,
 * so tokens can be styled to stand out.
 */
export function splitPlaceholders(text: string): string[] {
  return text.split(PLACEHOLDER_RE).map((part) => part);
}

export function isPlaceholderToken(part: string): boolean {
  return part.startsWith("[") && part.endsWith("]");
}
