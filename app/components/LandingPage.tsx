import { useEffect, useState } from "react";
import { LoadingScreen, LOADING_EXIT_MS } from "./LoadingScreen";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { SkillsSection } from "./SkillsSection";
import { ExperienceSection } from "./ExperienceSection";
import { ActivitiesSection } from "./ActivitiesSection";
import { ProjectsSection } from "./ProjectsSection";
import { ConnectSection } from "./ConnectSection";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import type { Project } from "./ProjectsSection";

interface LandingPageProps {
  projects: Project[];
}

export function LandingPage({ projects }: LandingPageProps) {
  const [introPhase, setIntroPhase] = useState<"showing" | "exiting" | "done">("showing");
  // Continue the CSS animation already painted by the static hydration fallback.
  const [loaderElapsedMs] = useState(() => {
    if (typeof document === "undefined") return 0;
    const stroke = document.querySelector(".portfolio-loader__stroke");
    const elapsed = stroke?.getAnimations()[0]?.currentTime;
    return typeof elapsed === "number" ? Math.min(elapsed, 1000) : 0;
  });
  const introComplete = introPhase === "done";

  useSmoothScroll(introComplete);

  useEffect(() => {
    if (introPhase === "done") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const skipMotion = () => {
      if (motion.matches) setIntroPhase("done");
    };
    if (motion.matches) {
      setIntroPhase("done");
      return;
    }

    motion.addEventListener("change", skipMotion);
    const timer = window.setTimeout(() => setIntroPhase(introPhase === "showing" ? "exiting" : "done"), introPhase === "showing" ? 1000 : LOADING_EXIT_MS);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener("change", skipMotion);
    };
  }, [introPhase]);

  return (
    <>
      {!introComplete && <LoadingScreen exiting={introPhase === "exiting"} elapsedMs={loaderElapsedMs} />}
      <main
        inert={!introComplete}
        aria-hidden={!introComplete || undefined}
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <HeroSection ready={introComplete} />
        <AboutSection />
        <ExperienceSection />
        <ActivitiesSection />
        <SkillsSection />
        <ProjectsSection projects={projects} />
        <ConnectSection />
      </main>
    </>
  );
}
