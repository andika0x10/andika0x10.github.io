import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroSection({ ready = true }: { ready?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-reveal]", {
          y: 20,
          opacity: 0,
          duration: 0.65,
          stagger: 0.075,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="top" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__identity" data-hero-reveal>
          <p className="hero__name">Andika Dinata</p>
          <p className="hero__location">Bandar Lampung, Indonesia</p>
        </div>

        <div className="hero__roles">
          <h1 id="hero-title" className="hero__title">
            <span data-hero-reveal>Vulnerability</span>{" "}
            <span className="hero__researcher" data-hero-reveal>Researcher</span>
          </h1>
          <p className="hero__secondary" data-hero-reveal>
            <span className="hero__ampersand">&amp;</span> Software Engineer
          </p>
        </div>

        <p className="hero__description" data-hero-reveal>
          I research how systems fail<br />
          and build software with that understanding.
        </p>

        <nav className="hero__actions" aria-label="Explore my work" data-hero-reveal>
          <a className="hero__link" href="#projects">
            View projects <span aria-hidden="true">↗</span>
          </a>
          <a className="hero__link" href="#connect">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </section>
  );
}
