import { MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <Container>
        <SectionLabel index="01" label="Experience" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {experience.company}
            </h2>
            <div className="mt-3 flex items-center gap-1.5 text-sm text-text-secondary">
              <MapPin size={14} />
              {experience.location}
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary">
              {experience.summary}
            </p>
          </Reveal>

          <div className="relative space-y-10 border-l border-border pl-8">
            {experience.roles.map((role, i) => (
              <Reveal key={role.title} delay={0.1 + i * 0.08} className="relative">
                <span
                  className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg"
                  aria-hidden
                />
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary">
                  {role.period}
                </span>
                <h3 className="mt-2 text-xl font-medium text-text">{role.title}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
