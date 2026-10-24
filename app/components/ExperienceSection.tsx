import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    period: "Jun — Jul 2026",
    title: "Software Engineer Intern",
    place: "PT. Microdata Indonesia",
    body: "I built a PKL participant management information system from scratch as a full-stack developer. The system was used internally by the company and built with a fully TypeScript stack: Vite, React, Express, PostgreSQL, and MinIO.",
  },
  {
    period: "Feb — Apr 2022",
    title: "IT Support Intern",
    place: "Darmajaya Institute of Informatics and Business",
    body: "I handled hardware and software troubleshooting while supporting administrative work. It was an early introduction to how everyday systems fail, how people report problems, and how technical work often begins with listening carefully.",
  },
];


export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".experience__entry").forEach((entry) => {
          gsap.from(entry, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: entry, start: "top 88%", once: true },
          });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience" aria-labelledby="experience-title">
      <h2 id="experience-title" className="career-section-label">Experience</h2>
      <ol className="experience__list">
        {ITEMS.map((item) => (
          <li key={item.title} className="experience__entry">
            <p className="experience__period">{item.period}</p>
            <article className="experience__detail">
              <h3 className="experience__role">{item.title}</h3>
              <p className="experience__place">{item.place}</p>
              <p className="experience__description">{item.body}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
