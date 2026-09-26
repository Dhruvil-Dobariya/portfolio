import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bluetooth,
  Boxes,
  Check,
  ChevronRight,
  CreditCard,
  FileText,
  Fingerprint,
  GitBranch,
  LayoutDashboard,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import "./projects.css";

const editorial = [
  {
    label: "SMART ACCESS / WEB + MOBILE",
    title: "Digital membership.\nPhysical possibility.",
    summary:
      "A subscription platform that connects payments, membership, and a tap at the gate. Owned across web, mobile, and backend.",
    tags: ["NestJS", "React Native", "BLE", "Payments"],
    problem:
      "A digital membership needs to grant dependable physical access, even when the mobile device is offline.",
    result:
      "Subscription, payment, and entry workflows connected in one product, with local Bluetooth access and validated transactions.",
  },
  {
    label: "RELATIONSHIP INTELLIGENCE / FULL STACK",
    title: "A clearer picture.\nA stronger connection.",
    summary:
      "A CRM that makes relationship health actionable. Typed data across web and mobile, with the stability production demands.",
    tags: ["React", "GraphQL", "PostgreSQL", "Expo"],
    problem:
      "Supplier and customer activity needs to become a useful signal for the people managing those relationships.",
    result:
      "Health scoring and engagement history support outreach decisions; web and mobile clients share a typed data layer.",
  },
  {
    label: "AI REVIEW / SAAS PLATFORM",
    title: "From a file to\nan informed decision.",
    summary:
      "An AI review pipeline backed by company credits, multi-provider authentication, and Stripe billing.",
    tags: ["NestJS", "TypeORM", "Stripe"],
    problem:
      "An AI review workflow needs the account, billing, and credit infrastructure to operate as a SaaS product.",
    result:
      "File analysis, statistical summaries, plan purchases, and company-level credit allocation in a connected workflow.",
  },
  {
    label: "INVENTORY / CROSS-PLATFORM MOBILE",
    title: "Every warehouse.\nOne connected flow.",
    summary:
      "Barcode scanning, warehouse-specific pricing, and a traceable path from supplier to customer.",
    tags: ["React Native", "GraphQL", "PostgreSQL"],
    problem:
      "Multiple warehouses need independently tracked stock and prices, with procurement and sales history that stays connected.",
    result:
      "A cross-platform workflow for scanning products, tracking procurement, and managing warehouse-level inventory and sales.",
  },
];

function AccessArt() {
  return (
    <div className="access-composition" aria-hidden="true">
      <div className="study-grid" />
      <div className="access-membership">
        <div>
          <Fingerprint size={28} />
          <span>MEMBER / ACCESS</span>
        </div>
        <h4>
          Your space.
          <br />
          Unlocked.
        </h4>
        <div className="membership-rule" />
        <span>ONE MEMBERSHIP. CONNECTED.</span>
        <div className="membership-bottom">
          <span>SUBSCRIPTION ACTIVE</span>
          <Check size={15} />
        </div>
      </div>
      <div className="access-phone">
        <div className="phone-island" />
        <div className="phone-top">
          <span>9:41</span>
          <span>•••</span>
        </div>
        <div className="phone-brand">
          <span>a.</span>
          <span>MEMBERSHIP</span>
        </div>
        <h4>
          A little closer
          <br />
          to possibility.
        </h4>
        <div className="access-unlock">
          <Fingerprint size={44} strokeWidth={1} />
        </div>
        <strong>Ready when you are.</strong>
        <span className="bluetooth-state">
          <Bluetooth size={13} /> Nearby access
        </span>
        <div className="phone-bottom">
          <LockKeyhole size={15} />
          <span>Unlock your space</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
      <div className="access-service">
        <CreditCard size={18} />
        <div>
          <span>PAYMENT → ENTITLEMENT</span>
          <strong>Validated on the server</strong>
        </div>
        <ShieldCheck size={19} />
      </div>
      <div className="local-path">
        <span />
        <Bluetooth size={13} /> MOBILE → GATE · LOCAL BLE
      </div>
    </div>
  );
}

function CrmArt() {
  return (
    <div className="crm-composition" aria-hidden="true">
      <div className="study-grid" />
      <div className="crm-window">
        <div className="crm-windowbar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>RELATIONSHIP WORKSPACE</span>
          <ArrowUpRight size={12} />
        </div>
        <div className="crm-windowbody">
          <aside>
            <b>r.</b>
            <LayoutDashboard size={17} />
            <Users size={17} />
            <GitBranch size={17} />
            <div />
          </aside>
          <div className="crm-content">
            <div className="crm-heading">
              <div>
                <span>YOUR NETWORK, IN CONTEXT</span>
                <h4>Relationships</h4>
              </div>
              <span className="crm-avatar">DD</span>
            </div>
            <div className="crm-overview">
              <div>
                <span>
                  Every interaction.
                  <br />A better understanding.
                </span>
                <div className="relationship-key">
                  <i /> Connected insights
                </div>
              </div>
              <div className="crm-orbit">
                <div />
                <div />
                <Users size={24} />
                <i />
                <i />
              </div>
            </div>
            <div className="crm-list-heading">
              <span>Relationship signals</span>
              <span>ACTIVITY</span>
            </div>
            {[
              "Engagement history",
              "Relationship health",
              "Outreach priorities",
            ].map((item, i) => (
              <div className="crm-row" key={item}>
                <span className="crm-row-icon">
                  {i === 0 ? (
                    <GitBranch size={12} />
                  ) : i === 1 ? (
                    <Users size={12} />
                  ) : (
                    <ArrowUpRight size={12} />
                  )}
                </span>
                <span>{item}</span>
                <span className="signal-line">
                  <i style={{ width: `${[70, 90, 55][i]}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="crm-api-label">
        <BracesIcon />
        <span>WEB + MOBILE</span>
        <ArrowRight size={13} />
        <strong>GraphQL</strong>
        <ArrowRight size={13} />
        <span>PostgreSQL</span>
      </div>
    </div>
  );
}
function BracesIcon() {
  return <span className="braces-icon">{"{ }"}</span>;
}

function PipelineArt({ inventory = false }: { inventory?: boolean }) {
  return (
    <div
      className={`pipeline-composition ${inventory ? "inventory" : "analysis"}`}
      aria-hidden="true"
    >
      <div className="study-grid" />
      <div className="pipeline-paper">
        <span className="eyebrow">
          {inventory ? "INVENTORY / CONNECTED" : "REVIEW / INTELLIGENCE"}
        </span>
        <div className="pipeline-nodes">
          {inventory ? (
            <>
              <span>
                <ScanLine size={27} />
              </span>
              <i />
              <span>
                <Boxes size={27} />
              </span>
              <i />
              <span>
                <Users size={27} />
              </span>
            </>
          ) : (
            <>
              <span>
                <FileText size={27} />
              </span>
              <i />
              <span className="ai-node">
                <Sparkles size={29} />
              </span>
              <i />
              <span>
                <LayoutDashboard size={27} />
              </span>
            </>
          )}
        </div>
        <div className="pipeline-labels">
          {(inventory
            ? ["Scan", "Track", "Deliver"]
            : ["Upload", "Analyze", "Understand"]
          ).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="pipeline-note">
          <span />
          <p>
            {inventory
              ? "Supplier → warehouse → customer"
              : "The insight is only one part of the system."}
          </p>
          <ArrowUpRight size={16} />
        </div>
      </div>
      <span className="pipeline-backplate" />
    </div>
  );
}

function CaseStudy({ index, onClose }: { index: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const project = projects[index];
  const story = editorial[index];
  const flow =
    project.icon === "access"
      ? ["Web + Mobile", "NestJS API", "Membership + Payments"]
      : project.flow;
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="case-dialog"
      aria-labelledby="case-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <div className="case-inner">
        <div className="case-top">
          <span className="eyebrow">
            SYSTEM {project.index} / ENGINEERING NOTES
          </span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close case study"
            autoFocus
          >
            <X size={20} />
          </button>
        </div>
        <h2 id="case-title">{project.category}</h2>
        <p className="case-tagline">{project.tagline}</p>
        <div className="case-problem">
          <span className="eyebrow">THE PROBLEM</span>
          <p>{story.problem}</p>
        </div>
        <div className="case-flow">
          {flow.map((item, i) => (
            <span key={item}>
              {item}
              {i < flow.length - 1 && <ArrowRight size={15} />}
            </span>
          ))}
        </div>
        {project.icon === "access" && (
          <p className="case-footnote">
            The mobile app communicates directly with the gate over BLE;
            payments and entitlement validation use backend services.
          </p>
        )}
        <h3>Engineering the solution</h3>
        <ul className="case-highlights">
          {project.highlights.map((item) => (
            <li key={item}>
              <ChevronRight size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="case-outcome">
          <span className="eyebrow">THE OUTCOME</span>
          <p>{story.result}</p>
        </div>
        <div className="case-tech">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <a className="text-link" href={`mailto:${profile.email}`}>
          Talk through the engineering <ArrowUpRight size={16} />
        </a>
      </div>
    </dialog>
  );
}

function Study({
  project,
  index,
  open,
}: {
  project: Project;
  index: number;
  open: () => void;
}) {
  const story = editorial[index];
  return (
    <article
      className={`study study-${project.icon}${index > 1 ? " study-small" : ""}`}
      data-reveal
    >
      <div className="study-copy">
        <p className="eyebrow">
          <span>{project.index}</span> {story.label}
        </p>
        <h3>
          {story.title.split("\n").map((line, i) => (
            <span key={line}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </h3>
        <p className="study-summary">{story.summary}</p>
        <div className="study-tags">
          {story.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <button
          className="text-link"
          onClick={open}
          aria-label={`Explore ${project.category}`}
        >
          Explore the system <ArrowUpRight size={17} />
        </button>
      </div>
      <div className="study-visual">
        {index === 0 ? (
          <AccessArt />
        ) : index === 1 ? (
          <CrmArt />
        ) : (
          <PipelineArt inventory={index === 3} />
        )}
        <span className="study-visual-caption">
          {index < 2 ? "INTERFACE STUDY" : "SYSTEM ILLUSTRATION"}
          <span>FIG. 0{index + 2}</span>
        </span>
      </div>
    </article>
  );
}

export function ProjectStudies() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="work" className="work-section">
      <div className="wrap">
        <div className="section-label" data-reveal>
          <span className="eyebrow">01 / SELECTED SYSTEMS</span>
          <span className="eyebrow">REAL PROBLEMS. PRODUCTION SOFTWARE.</span>
        </div>
        <div className="section-heading" data-reveal>
          <h2>
            More than an interface.
            <br />
            <span className="muted">The whole experience.</span>
          </h2>
          <p>
            A selection of systems I’ve helped bring to life.
            <br />
            Different problems. End-to-end thinking.
          </p>
        </div>
        <div className="studies">
          {projects.map((project, index) => (
            <Study
              key={project.index}
              project={project}
              index={index}
              open={() => setSelected(index)}
            />
          ))}
        </div>
        <p className="work-disclosure">
          <LockKeyhole size={13} /> Production work at SaaS Innova. Client names
          are confidential; visuals are illustrative.
        </p>
      </div>
      {selected !== null && (
        <CaseStudy index={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
