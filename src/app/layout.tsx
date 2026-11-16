import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/providers/Shell";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: "400",
});

const siteTitle = `${profile.name.first} ${profile.name.last} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: `%s — ${profile.name.first} ${profile.name.last}`,
  },
  description:
    "Portfolio of Farhad Sharifi — business-minded Software Engineer and Technical Leader with 8+ years of experience building scalable platforms, leading engineering teams, and shipping production-ready products.",
  keywords: [
    "CTO",
    "Chief Technology Officer",
    "Technical Team Lead",
    "Software Engineer",
    "Engineering Leadership",
    "Portfolio",
  ],
  openGraph: {
    title: siteTitle,
    description:
      "Portfolio of Farhad Sharifi — Software Engineer and Technical Leader building scalable platforms and production-ready products.",
    type: "website",
    siteName: `${profile.name.first} ${profile.name.last}`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Portfolio of Farhad Sharifi — Software Engineer and Technical Leader building scalable platforms and production-ready products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-svh font-sans">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
