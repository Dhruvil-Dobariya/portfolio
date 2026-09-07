import { Cable, Code2, Database, LayoutGrid, Server, ShieldCheck, Workflow, Wrench } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons: Record<string, typeof Code2> = {
  Languages: Code2,
  Frontend: LayoutGrid,
  Backend: Server,
  Databases: Database,
  Integrations: Cable,
  Security: ShieldCheck,
  Tools: Wrench,
  Practices: Workflow,
};

export function Skills() {
  return (
    <section
      id="skills"
      className="relative flex min-h-[100svh] flex-col justify-center py-16 md:py-24"
    >
      <Container>
        <SectionLabel index="03" label="Skills" />
        <Reveal delay={0.08} className="mt-6 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            The toolkit behind the work.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-t border-border">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.label] ?? Code2;
            return (
              <Reveal key={group.label} delay={Math.min(i * 0.05, 0.3)} as="div">
                <div className="grid gap-4 py-6 md:grid-cols-[180px_1fr] md:items-baseline md:gap-8 md:py-7">
                  <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                    <Icon size={14} className="text-accent-soft" />
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border-strong bg-bg-elevated px-3.5 py-1.5 text-sm text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-bg-elevated-2 hover:text-text"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
