import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, LockKeyhole, X } from "lucide-react";
import { projects } from "@/data/projects";
import { caseStories, type CaseStory } from "@/data/content";
import { profile } from "@/data/profile";
import { SectionHead } from "./SectionHead";

/** Splits "First sentence. Second sentence." so the second can be accented. */
function Title({ text }: { text: string }) {
  const cut = text.indexOf(". ");
  if (cut < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, cut + 1)} <em>{text.slice(cut + 2)}</em>
    </>
  );
}

function SystemSketch({ story, index }: { story: CaseStory; index: string }) {
  const Callout = story.callout.icon;
  return (
    <div className="sketch" aria-hidden="true">
      <div className="sketch-bar">
        <span className="sketch-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="label">system-{index}.sketch</span>
      </div>
      <div className="sketch-stage">
        <span className="sketch-orb" />
        <div className="sketch-flow">
          {story.sketch.map((node, i) => {
            const Icon = node.icon;
            return (
              <Fragment key={node.label}>
                {i > 0 && (
                  <span className="sketch-beam">
                    <i />
                  </span>
                )}
                <span className={`sketch-node${i === 1 ? " is-core" : ""}`}>
                  <span className="sketch-tile">
                    <Icon size={28} strokeWidth={1.6} />
                  </span>
                  <span className="sketch-name">{node.label}</span>
                </span>
              </Fragment>
            );
          })}
        </div>
        <div className="sketch-callout">
          <Callout size={17} />
          {story.callout.label}
        </div>
      </div>
    </div>
  );
}

function CaseStudy({ index, onClose }: { index: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const project = projects[index];
  const story = caseStories[index];
  const flow = story.sketch.map((node) => node.label);

  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    element?.showModal();
    return () => {
      element?.close();
      opener?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="case-dialog"
      aria-labelledby="case-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // A click on the ::backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="case-inner">
        <div className="case-top">
          <span className="label">
            <span className="label-index">Case {project.index}</span> · Engineering notes
          </span>
          <button className="icon-button" onClick={onClose} aria-label="Close case study" autoFocus>
            <X size={20} />
          </button>
        </div>
        <h2 id="case-title" className="display">
          {project.category}
        </h2>
        <p className="case-tagline">{project.tagline}</p>

        <div className="case-grid">
          <div className="case-block">
            <span className="label">The problem</span>
            <p>{story.problem}</p>
          </div>
          <div className="case-block case-outcome">
            <span className="label">The outcome</span>
            <p>{story.result}</p>
          </div>
        </div>

        <div className="case-flow">
          {flow.map((item, i) => (
            <span key={item}>
              {item}
              {i < flow.length - 1 && <ArrowRight size={16} />}
            </span>
          ))}
        </div>
        {story.footnote && <p className="case-footnote">{story.footnote}</p>}

        <h3>Engineering the solution</h3>
        <ul className="case-highlights">
          {project.highlights.map((item) => (
            <li key={item}>
              <ChevronRight size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="chips">
          {project.tech.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>

        <a className="btn btn-primary" href={`mailto:${profile.email}`}>
          Talk through the engineering <ArrowUpRight size={16} />
        </a>
      </div>
    </dialog>
  );
}

export function Work() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="work" className="section work">
      <div className="wrap">
        <SectionHead
          index="01"
          label="Selected work"
          aside={`${projects.length} production systems`}
          text="Real products, shipped to real users — payments, physical access, AI review pipelines, and multi-warehouse logistics."
        >
          Systems I’ve built, <em>end to end.</em>
        </SectionHead>

        <div className="showcase-stack">
          {projects.map((project, index) => {
            const story = caseStories[index];
            return (
              <article
                key={project.index}
                className="showcase spotlight"
                style={{ "--i": index } as CSSProperties}
              >
                <div className="showcase-copy">
                  <div className="showcase-top">
                    <span className="showcase-index">{project.index}</span>
                    <span className="label">{story.label}</span>
                  </div>
                  <h3 className="display">
                    <Title text={story.title} />
                  </h3>
                  <p className="showcase-summary">{story.summary}</p>
                  <ul className="impact">
                    {project.impact.map((item) => (
                      <li key={item}>
                        <Check size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="showcase-actions">
                    <button className="btn btn-primary" onClick={() => setSelected(index)} data-magnetic>
                      Read the case study <ArrowUpRight size={17} />
                    </button>
                    <div className="chips">
                      {story.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <SystemSketch story={story} index={project.index} />
              </article>
            );
          })}
        </div>

        <p className="footnote">
          <LockKeyhole size={15} /> Production work at SaaS Innova. Client names are confidential;
          visuals are illustrative.
        </p>
      </div>

      {selected !== null && <CaseStudy index={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
