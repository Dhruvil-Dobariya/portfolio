import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const sentence =
  "Most developers stop at the interface. I go further — designing the database schema, building the API that serves it, shipping the mobile app that consumes it, and shaping the screen people actually touch every day.";

const words = sentence.split(" ");

export function Ethos() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const targets = wordsRef.current.filter(Boolean);

      gsap.to(targets, {
        color: "#f2f2f4",
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          scrub: 0.4,
          pin: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section id="ethos" className="relative py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <p className="text-balance text-2xl font-medium leading-snug text-text sm:text-3xl md:text-4xl">
            {sentence}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="ethos" ref={sectionRef} className="relative flex min-h-screen items-center py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <p className="text-balance text-2xl font-medium leading-snug sm:text-3xl md:text-4xl">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="text-text-tertiary/25"
              style={{ transition: "none" }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
