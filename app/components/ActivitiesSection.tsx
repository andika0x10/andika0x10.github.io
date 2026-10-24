import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACTIVITIES = [
  {
    period: "Jul 2025",
    title: "PesawaranCTF",
    result: "3rd",
    meta: "Team: RPLXploit",
    body: "I competed with RPLXploit and placed 3rd at PesawaranCTF, a Capture The Flag competition focused on cybersecurity problem solving, speed, and strategy.",
    href: "https://lampungcorner.com/adu-strategi-dan-kecepatan-ctf-2025-pesawaran-cetak-talenta-muda-keamanan-siber/",
  },
];


export function ActivitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".activities__feature").forEach((feature) => {
          gsap.from(feature, {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: feature, start: "top 88%", once: true },
          });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="activities" ref={sectionRef} className="activities" aria-labelledby="activities-title">
      <h2 id="activities-title" className="career-section-label">Activities</h2>
      <div className="activities__features">
        {ACTIVITIES.map((item) => (
          <article key={item.title} className="activities__feature">
            <div className="activities__result">
              <p className="activities__rank">{item.result}</p>
              <p className="activities__result-label">Place</p>
            </div>
            <div className="activities__detail">
              <p className="activities__context">Capture the flag <span aria-hidden="true">/</span> {item.period}</p>
              <h3 className="activities__title">{item.title}</h3>
              <p className="activities__team">{item.meta}</p>
              <p className="activities__description">{item.body}</p>
              <a className="activities__link" href={item.href} target="_blank" rel="noopener noreferrer">
                Read the article <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
