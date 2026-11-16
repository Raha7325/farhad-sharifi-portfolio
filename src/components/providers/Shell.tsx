"use client";

import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import type { ReactNode } from "react";

/** Client-side shell: theme + smooth scroll + cursor. Content ships RSC-first. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SmoothScroll>{children}</SmoothScroll>
      <Cursor />
    </ThemeProvider>
  );
}
