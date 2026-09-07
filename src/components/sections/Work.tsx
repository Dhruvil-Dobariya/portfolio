import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bluetooth,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users2,
} from "lucide-react";
import { useState, type CSSProperties } from "react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const icons = {
  access: Bluetooth,
  crm: Users2,
  ai: Sparkles,
  inventory: Boxes,
} as const;

const accents = {
  access: "#6a5cff",
  crm: "#2dd4bf",
  ai: "#f59e0b",
  inventory: "#38bdf8",
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

export function Work() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const project = projects[index];
  const Icon = icons[project.icon];
  const accent = accents[project.icon];

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + projects.length) % projects.length);
  };

  return (
    <section
      id="work"
      className="relative flex min-h-[100svh] flex-col justify-center bg-bg-elevated/40 py-16 md:py-24"
      style={{ "--pa": accent } as CSSProperties}
    >
      <WorkHeader />

      <Container className="mt-14">
        <Reveal delay={0.18}>
          <div className="flex items-center justify-between">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-500"
              style={{ borderColor: "color-mix(in srgb, var(--pa) 40%, transparent)", color: accent }}
            >
              <Icon size={18} />
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-text-tertiary">{project.index} / 04</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(index - 1)}
                  aria-label="Previous project"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => go(index + 1)}
                  aria-label="Next project"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative mt-6 overflow-hidden rounded-2xl border bg-bg-elevated/60 p-6 transition-colors duration-500 sm:p-10"
            style={{ borderColor: "color-mix(in srgb, var(--pa) 25%, var(--border-strong))" }}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-[90px] transition-colors duration-500"
              style={{ background: accent }}
              aria-hidden
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-text sm:text-3xl md:text-4xl">
                  {project.category}
                </h3>
                <p className="mt-3 text-lg text-text-secondary">{project.tagline}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.impact.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: "color-mix(in srgb, var(--pa) 35%, transparent)",
                        color: accent,
                        backgroundColor: "color-mix(in srgb, var(--pa) 10%, transparent)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3 rounded-xl border border-border bg-bg/40 px-4 py-3 font-mono text-xs text-text-secondary">
                  {project.flow.map((stage, i) => (
                    <span key={stage} className="flex items-center gap-2">
                      <span className="rounded-md border border-border-strong bg-bg-elevated px-2.5 py-1.5 text-text-secondary">
                        {stage}
                      </span>
                      {i < project.flow.length - 1 && (
                        <ArrowRight size={13} className="shrink-0 text-text-tertiary" />
                      )}
                    </span>
                  ))}
                </div>

                <ul className="mt-6 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-text-secondary sm:text-base"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: accent }}
                      />
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
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-6 flex items-center justify-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.index}
              onClick={() => go(i)}
              aria-label={`Show project ${i + 1}`}
              className={cn(
                "h-[3px] rounded-full transition-all duration-500",
                i === index ? "w-8" : "w-4 bg-border-strong hover:bg-text-tertiary"
              )}
              style={i === index ? { background: accent } : undefined}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
