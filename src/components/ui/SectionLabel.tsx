import { Reveal } from "./Reveal";

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <Reveal className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
      <span className="text-accent-soft">{index}</span>
      <span className="h-px w-8 bg-border-strong" aria-hidden />
      <span>{label}</span>
    </Reveal>
  );
}
