import { skillGroups } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <Container>
        <SectionLabel index="03" label="Skills" />
        <Reveal delay={0.08} className="mt-6 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            The toolkit behind the work.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-t border-border">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={Math.min(i * 0.05, 0.3)} as="div">
              <div className="grid gap-4 py-6 md:grid-cols-[180px_1fr] md:items-baseline md:gap-8 md:py-7">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border-strong bg-bg-elevated px-3.5 py-1.5 text-sm text-text-secondary transition-colors duration-200 hover:border-accent/40 hover:text-text"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
