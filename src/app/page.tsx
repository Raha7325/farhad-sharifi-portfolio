import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { StoryProvider, StoryStage } from "@/components/providers/HorizontalStory";

export default function Home() {
  return (
    <StoryProvider>
      <Header />
      <main>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Farhad Sharifi",
              jobTitle: "Software Engineer | Technical Leader",
              email: "faradidev@gmail.com",
              sameAs: ["https://github.com/faraadi", "https://www.linkedin.com/in/farhad-sharifi/"],
              knowsAbout: [
                "Technology Leadership",
                "Architecture",
                "Platform Engineering",
                "Microservices",
                "AI-Driven Engineering",
              ],
            }),
          }}
        />

        {/* Chapter order must match SECTIONS in src/content/profile.ts 1:1. */}
        <StoryStage>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Expertise />
          <Education />
          <Contact />
        </StoryStage>
      </main>
      <Footer />
    </StoryProvider>
  );
}
