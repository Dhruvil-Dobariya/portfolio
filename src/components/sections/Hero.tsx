import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import { gsap } from "@/lib/gsap";
import { scrollToId } from "@/lib/lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(orbARef.current, {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(orbBRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-24 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          ref={orbARef}
          className="absolute left-[8%] top-[12%] h-[380px] w-[380px] rounded-full opacity-25 blur-[110px]"
          style={{ background: "radial-gradient(closest-side, rgba(var(--accent-rgb),0.55), transparent 75%)" }}
        />
        <div
          ref={orbBRef}
          className="absolute bottom-[8%] right-[6%] h-[320px] w-[320px] rounded-full opacity-15 blur-[110px]"
          style={{ background: "radial-gradient(closest-side, rgba(var(--accent-rgb),0.4), transparent 75%)" }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div>
          <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
            <span className="animate-fade-up h-1.5 w-1.5 rounded-full bg-accent" />
            <span>
              {[...`${profile.name} — ${profile.role}`].map((char, i) => (
                <span
                  key={i}
                  className="animate-char-in"
                  style={{ animationDelay: `${80 + i * 28}ms`, whiteSpace: "pre" }}
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
        </div>

        <h1
          className="animate-fade-up mt-8 max-w-4xl text-balance text-[13vw] font-semibold leading-[0.98] tracking-[-0.03em] text-text sm:text-[9vw] md:text-[6.4vw] lg:text-[5.6rem]"
          style={{ animationDelay: "90ms" }}
        >
          Full-stack development,
          <br />
          <span className="text-text-secondary">shipped end to end.</span>
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg"
          style={{ animationDelay: "180ms" }}
        >
          {profile.summary}
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "260ms" }}
        >
          <Button onClick={() => scrollToId("work")}>
            See the work
            <ArrowRight size={16} />
          </Button>
          <Button variant="secondary" onClick={() => scrollToId("contact")}>
            Get in touch
          </Button>
        </div>

        <dl
          className="animate-fade-up mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8"
          style={{ animationDelay: "340ms" }}
        >
          <div>
            <dd className="text-2xl font-semibold text-text sm:text-3xl">{profile.yearsExperience}</dd>
            <dt className="mt-1 font-mono text-xs uppercase tracking-wider text-text-tertiary">
              Years experience
            </dt>
          </div>
          <div>
            <dd className="text-2xl font-semibold text-text sm:text-3xl">{profile.fullStackProjects}</dd>
            <dt className="mt-1 font-mono text-xs uppercase tracking-wider text-text-tertiary">
              Full-stack projects
            </dt>
          </div>
          <div>
            <dd className="text-2xl font-semibold text-text sm:text-3xl">{profile.mobileAppProjects}</dd>
            <dt className="mt-1 font-mono text-xs uppercase tracking-wider text-text-tertiary">
              Mobile apps shipped
            </dt>
          </div>
        </dl>
      </div>

      <button
        onClick={() => scrollToId("ethos")}
        aria-label="Scroll to next section"
        className="animate-fade-up absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-tertiary transition-colors hover:text-text-secondary sm:flex"
        style={{ animationDelay: "500ms" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}
