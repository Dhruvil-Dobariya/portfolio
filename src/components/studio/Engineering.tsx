import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  Fingerprint,
  GitBranch,
  Globe2,
  Layers3,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  Workflow,
} from "lucide-react";
import { skillGroups } from "@/data/skills";
import "./engineering.css";

const principles = [
  {
    title: "Start with the person.",
    label: "EXPERIENCE",
    description:
      "A complex system should feel simple to use. I connect thoughtful web interfaces and mobile experiences to the services behind them.",
    icon: Globe2,
    detail: "WEB + MOBILE",
    nodes: ["React", "React Native"],
  },
  {
    title: "Make the connections count.",
    label: "ARCHITECTURE",
    description:
      "Shape the schema, define the API, and make the business rules explicit. Authentication, payments, and real-time events belong to the same picture.",
    icon: GitBranch,
    detail: "APIS + BUSINESS LOGIC",
    nodes: ["NestJS", "GraphQL"],
  },
  {
    title: "Expect the real world.",
    label: "PRODUCTION",
    description:
      "Validate transactions. Handle retries. Trace the issue from the screen to the database. Reliability lives in the paths that don’t go as planned.",
    icon: ShieldCheck,
    detail: "RELIABILITY + SECURITY",
    nodes: ["Validation", "Authorization"],
  },
  {
    title: "Follow through.",
    label: "REFINEMENT",
    description:
      "Profile the endpoint, inspect the heap, and rethink the expensive query. Shipping is a milestone; understanding production behavior is part of the work.",
    icon: Workflow,
    detail: "PERFORMANCE + MAINTAINABILITY",
    nodes: ["Profiling", "Query optimization"],
  },
];

export function Engineering({ paused }: { paused: boolean }) {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const rows =
      section.current?.querySelectorAll<HTMLElement>(
        ".engineering-principle",
      ) ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (!window.matchMedia("(min-width: 851px)").matches || paused) return;
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length)
          setActive(
            Number(
              visible[visible.length - 1].target.getAttribute("data-step"),
            ),
          );
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: 0 },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [paused]);
  const CurrentIcon = principles[active].icon;
  return (
    <section id="about" className="engineering-section" ref={section}>
      <div className="wrap">
        <div className="section-label" data-reveal>
          <span className="eyebrow">02 / THE WAY I BUILD</span>
          <span className="eyebrow">THINK IN SYSTEMS. CARE ABOUT PEOPLE.</span>
        </div>
        <div className="engineering-heading" data-reveal>
          <h2>
            The interface is
            <br />
            only the beginning<span>.</span>
          </h2>
          <p>
            I’m Dhruvil, a full-stack engineer in Surat, India. I like working
            where the layers meet—from shaping the data to the screen someone
            uses every day.
          </p>
        </div>
        <div className="engineering-layout">
          <div className="engineering-visual">
            <div className="system-topline">
              <span className="eyebrow">A PRODUCT, NOT ISOLATED PARTS</span>
              <Layers3 size={18} />
            </div>
            <div
              className={`system-drawing system-step-${active}`}
              aria-hidden="true"
            >
              <div className="system-clients">
                <div>
                  <Globe2 size={24} />
                  <span>Web</span>
                </div>
                <span>+</span>
                <div>
                  <Smartphone size={24} />
                  <span>Mobile</span>
                </div>
              </div>
              <div className="system-path path-one">
                <span />
                <ArrowDown size={14} />
              </div>
              <div className="system-api">
                <Fingerprint size={21} />
                <span>Secure API boundary</span>
                <Braces size={21} />
              </div>
              <div className="system-path path-two">
                <span />
                <ArrowDown size={14} />
              </div>
              <div className="system-logic">
                <Server size={23} />
                <div>
                  <span>THE ENGINE</span>
                  <strong>Business logic</strong>
                </div>
                <Radio size={19} />
              </div>
              <div className="system-branches">
                <i />
                <i />
              </div>
              <div className="system-foundations">
                <div>
                  <Database size={22} />
                  <span>Data</span>
                </div>
                <div>
                  <GitBranch size={22} />
                  <span>Integrations</span>
                </div>
              </div>
              <span className="system-coordinate">
                X: END TO END / Y: EVERY DETAIL
              </span>
            </div>
            <div className="system-caption" aria-live="polite">
              <CurrentIcon size={21} />
              <div>
                <span>{principles[active].detail}</span>
                <strong>{principles[active].nodes.join(" / ")}</strong>
              </div>
              <span>0{active + 1}</span>
            </div>
            <div
              className="system-steps"
              aria-label="Explore engineering principles"
            >
              {principles.map((principle, index) => (
                <button
                  key={principle.label}
                  aria-label={`Show ${principle.label.toLowerCase()} principle`}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                >
                  <span>0{index + 1}</span>
                  <i />
                </button>
              ))}
            </div>
          </div>
          <div className="engineering-principles">
            {principles.map((principle, index) => (
              <article
                className={`engineering-principle${active === index ? " active" : ""}`}
                data-step={index}
                key={principle.title}
                data-reveal
              >
                <span className="eyebrow">
                  <span>0{index + 1}</span> {principle.label}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="build-process" data-reveal>
          <span className="eyebrow">A DELIBERATE PROCESS</span>
          <ol>
            {["Understand", "Design", "Build", "Test", "Optimize", "Ship"].map(
              (stage, index) => (
                <li key={stage}>
                  {stage}
                  {index < 5 ? <ArrowRight size={13} /> : <Check size={14} />}
                </li>
              ),
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  {
    name: "Interface",
    label: "THE HUMAN LAYER",
    copy: "Fast, considered experiences across screens.",
    description:
      "Component systems, typed state, and responsive interfaces—on the web and in your hand.",
    groups: ["Languages", "Frontend"],
    icon: Code2,
    visual: "01",
  },
  {
    name: "Backend & data",
    label: "THE STRUCTURAL LAYER",
    copy: "A dependable foundation for the product.",
    description:
      "APIs, business logic, and relational data that fit together. Clear boundaries and queries designed with care.",
    groups: ["Backend", "Databases"],
    icon: Database,
    visual: "02",
  },
  {
    name: "Connections",
    label: "THE CONNECTED LAYER",
    copy: "Where software meets the wider world.",
    description:
      "From secure identity and payments to live communication and physical access. Integrations that belong to the product.",
    groups: ["Integrations", "Security"],
    icon: GitBranch,
    visual: "03",
  },
  {
    name: "Workflow",
    label: "THE DELIVERY LAYER",
    copy: "Good software takes a good process.",
    description:
      "Review, test, trace, and improve. A practical toolkit for collaborating and resolving the details that matter in production.",
    groups: ["Tools", "Practices"],
    icon: Terminal,
    visual: "04",
  },
];

export function Capabilities() {
  const [active, setActive] = useState(0);
  const current = capabilities[active];
  const Icon = current.icon;
  const change = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key))
      next = (index + 1) % capabilities.length;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key))
      next = (index + capabilities.length - 1) % capabilities.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = capabilities.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`capability-${next}`)?.focus();
  };
  return (
    <section id="stack" className="capabilities-section">
      <div className="wrap">
        <div className="section-label" data-reveal>
          <span className="eyebrow">04 / THE TOOLKIT</span>
          <span className="eyebrow">TOOLS FOLLOW THE PROBLEM.</span>
        </div>
        <div className="section-heading" data-reveal>
          <h2>
            Different disciplines.
            <br />
            <span className="muted">One connected stack.</span>
          </h2>
          <p>
            The tools change. The goal stays the same:
            <br />
            software that works well, at every layer.
          </p>
        </div>
        <div className="capabilities-layout" data-reveal>
          <div
            role="tablist"
            aria-label="Technology categories"
            className="capability-tabs"
          >
            {capabilities.map((category, index) => (
              <button
                key={category.name}
                role="tab"
                id={`capability-${index}`}
                aria-selected={active === index}
                aria-controls="capability-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => change(event, index)}
              >
                <span>0{index + 1}</span>
                <strong>{category.name}</strong>
                <ArrowUpRight size={19} />
              </button>
            ))}
          </div>
          <div
            id="capability-panel"
            role="tabpanel"
            aria-labelledby={`capability-${active}`}
            tabIndex={0}
            className="capability-panel"
          >
            <div className="capability-panel-top">
              <span className="eyebrow">{current.label}</span>
              <Icon size={31} strokeWidth={1.2} />
            </div>
            <h3>{current.copy}</h3>
            <p>{current.description}</p>
            <div className="capability-groups">
              {current.groups.map((name) => {
                const group = skillGroups.find((item) => item.label === name);
                return (
                  <div className="capability-group" key={name}>
                    <h4>{name}</h4>
                    <ul>
                      {group?.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="capabilities-baseline">
          <span>
            <span className="status-dot" /> ALWAYS ADDING TO THE TOOLKIT.
          </span>
          <span>CURIOUS BY DEFAULT.</span>
        </div>
      </div>
    </section>
  );
}
