import { useEffect, useRef, useState } from "react";
import { Bluetooth, Boxes, Sparkles, Users2 } from "lucide-react";
import { projects } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { WorkPanel } from "./WorkPanel";

const icons = {
  access: Bluetooth,
  crm: Users2,
  ai: Sparkles,
  inventory: Boxes,
} as const;

function WorkHeader() {
  return (
    <Container>
      <SectionLabel index="02" label="Selected Work" />
      <Reveal delay={0.08} className="mt-6 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Four systems, four different hard problems.
        </h2>
      </Reveal>
      <Reveal delay={0.14} className="mt-4 max-w-xl">
        <p className="text-base text-text-secondary sm:text-lg">
          Real, shipped software — spanning payments, access control, AI review pipelines, and
          multi-warehouse logistics. Specific client and product names stay confidential.
        </p>
      </Reveal>
    </Container>
  );
}

function StaticWorkList() {
  return (
    <section id="work" className="relative bg-bg-elevated/40 py-28 md:py-36">
      <WorkHeader />
      <div className="mt-16 space-y-16">
        {projects.map((project) => {
          const Icon = icons[project.icon];
          return (
            <Reveal key={project.index} as="div">
              <Container className="border-t border-border pt-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-text-tertiary">{project.index} / 04</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong text-accent-soft">
                    <Icon size={18} />
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  {project.category}
                </h3>
                <p className="mt-2 text-lg text-text-secondary">{project.tagline}</p>
                <ul className="mt-6 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border-strong px-3 py-1 font-mono text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Container>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ScrollDrivenWork() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActiveIndex(Math.min(projects.length - 1, Math.round(self.progress * (projects.length - 1))));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="relative bg-bg-elevated/40">
      <div className="pt-28 md:pt-36">
        <WorkHeader />

        <div className="mt-14 hidden items-center gap-2 px-6 md:flex md:px-10">
          {projects.map((project, i) => (
            <span
              key={project.index}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-8 bg-accent" : "w-4 bg-border-strong"
              }`}
            />
          ))}
        </div>

        <p className="mt-10 px-6 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary md:hidden">
          Swipe to explore →
        </p>
      </div>

      <div ref={pinRef} className="relative mt-10 h-[70vh] min-h-[560px] overflow-hidden md:h-screen md:min-h-0">
        <div
          ref={trackRef}
          className="flex h-full snap-x snap-mandatory gap-0 overflow-x-auto md:w-max md:snap-none md:overflow-visible"
        >
          {projects.map((project, i) => (
            <WorkPanel key={project.index} project={project} isActive={i === activeIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const reducedMotion = useReducedMotion();
  return reducedMotion ? <StaticWorkList /> : <ScrollDrivenWork />;
}
