import { Bluetooth, Boxes, Sparkles, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const icons = {
  access: Bluetooth,
  crm: Users2,
  ai: Sparkles,
  inventory: Boxes,
} as const;

export function WorkPanel({ project, isActive = true }: { project: Project; isActive?: boolean }) {
  const Icon = icons[project.icon];

  return (
    <article className="work-panel relative flex h-full w-[88vw] shrink-0 snap-center flex-col overflow-y-auto border-r border-border px-6 py-8 md:w-screen md:px-0 md:py-12">
      <motion.div
        className="mx-auto my-auto w-full max-w-3xl md:px-10"
        animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1 : 0.96 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-text-tertiary">{project.index} / 04</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong text-accent-soft">
            <Icon size={16} />
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-text sm:text-3xl md:text-4xl">
          {project.category}
        </h3>
        <p className="mt-2.5 text-base text-text-secondary sm:text-lg">{project.tagline}</p>

        <ul className="mt-6 space-y-2.5">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
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
      </motion.div>
    </article>
  );
}
