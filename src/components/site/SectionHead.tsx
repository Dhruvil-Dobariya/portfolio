import type { ReactNode } from "react";

export function SectionHead({
  index,
  label,
  aside,
  children,
  text,
}: {
  index: string;
  label: string;
  aside?: string;
  /** The heading itself; wrap words in <em> for the serif-italic accent. */
  children: ReactNode;
  text?: string;
}) {
  return (
    <div className="section-head">
      <div className="section-meta" data-reveal>
        <span className="label">
          <span className="label-index">({index})</span> {label}
        </span>
        {aside && <span className="label">{aside}</span>}
      </div>
      <div className="section-title" data-reveal>
        <h2 className="display">{children}</h2>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}
