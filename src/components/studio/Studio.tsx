import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Menu,
  Pause,
  Play,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Workspace } from "./Workspace";
import { ProjectStudies } from "./ProjectStudies";
import { Engineering, Capabilities } from "./Engineering";

const navigation = [
  { id: "work", label: "Work" },
  { id: "about", label: "Approach" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
];

function Experience() {
  return (
    <section id="experience" className="experience-section wrap">
      <div className="section-label" data-reveal>
        <span className="eyebrow">03 / EXPERIENCE</span>
        <span className="eyebrow">LEARNING. BUILDING. TAKING OWNERSHIP.</span>
      </div>
      <div className="experience-layout">
        <div data-reveal>
          <h2>
            Grounded in
            <br />
            <span className="muted">real-world work.</span>
          </h2>
          <p className="experience-intro">
            Production software teaches you to care about what happens after you
            ship.
          </p>
          <div className="company-name">
            <span className="company-monogram">si.</span>
            <div>
              <h3>{experience.company}</h3>
              <p>{experience.location}</p>
            </div>
          </div>
          <a
            className="text-link"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            View LinkedIn <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="career-timeline">
          {experience.roles.map((role, index) => (
            <article className="career-role" key={role.title} data-reveal>
              <span
                className={`career-point ${index === 0 ? "current" : ""}`}
              />
              <div className="career-meta">
                <span className="eyebrow">{role.period}</span>
                {index === 0 && <span className="current-label">CURRENT</span>}
              </div>
              <h3>{role.title}</h3>
              <p>
                {index === 0
                  ? "End-to-end feature ownership across production SaaS platforms: web interfaces, backend services, and cross-platform mobile apps."
                  : "Built a full-stack foundation across business logic, API development, relational data, and the interfaces that connect them."}
              </p>
              {index === 0 && (
                <div className="career-focus">
                  <span>Full-stack delivery</span>
                  <span>Production debugging</span>
                  <span>Performance</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [feedback, setFeedback] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setFeedback("Email copied");
    } catch {
      setFeedback("Please use the email link");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFeedback(""), 3500);
  };
  return (
    <section id="contact" className="contact-section">
      <div className="wrap">
        <div className="section-label">
          <span className="eyebrow">05 / NEXT CHAPTER</span>
          <span className="availability">
            <i /> OPEN TO OPPORTUNITIES
          </span>
        </div>
        <div className="contact-heading" data-reveal>
          <h2>
            Something in mind?
            <br />
            <span>Let’s build it well.</span>
          </h2>
          <a
            className="contact-orb"
            href={`mailto:${profile.email}`}
            aria-label="Email Dhruvil"
          >
            <ArrowUpRight strokeWidth={1} />
          </a>
        </div>
        <div className="contact-details" data-reveal>
          <p>
            An ambitious product. A complex problem.
            <br />A team that cares about the details. I’m listening.
          </p>
          <div className="email-block">
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                className="icon-button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {feedback === "Email copied" ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}
              </button>
            </div>
            <span className="copy-feedback" role="status">
              {feedback}
            </span>
            <div className="contact-links">
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={15} />
              </a>
              <a href={`mailto:${profile.email}?subject=Resume%20request`}>
                Request résumé <FileText size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Studio() {
  const reducedMotion = useReducedMotion();
  const [motionOff, setMotionOff] = useState(false);
  const paused = reducedMotion || motionOff;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes =
      root.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    if (paused) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [paused]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 36);
        const range =
          document.documentElement.scrollHeight - window.innerHeight;
        progress.current?.style.setProperty(
          "transform",
          `scaleX(${range > 0 ? y / range : 0})`,
        );
        if (hero.current && y < hero.current.offsetHeight + 100)
          hero.current.style.setProperty(
            "--hero-shift",
            paused ? "0px" : `${Math.min(y * 0.13, 85)}px`,
          );
        const sections = navigation.map((item) =>
          document.getElementById(item.id),
        );
        let next = "";
        for (const section of sections)
          if (
            section &&
            section.getBoundingClientRect().top <= window.innerHeight * 0.4
          )
            next = section.id;
        if (
          (document.getElementById("contact")?.getBoundingClientRect().top ??
            Infinity) <=
          window.innerHeight * 0.5
        )
          next = "contact";
        setActive(next);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [paused]);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 760) setMobileOpen(false);
    };
    document.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", paused);
    return () => document.documentElement.classList.remove("reduce-motion");
  }, [paused]);

  return (
    <div
      id="top"
      className={`studio${paused ? " motion-paused" : ""}`}
      ref={root}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="reading-progress" ref={progress} />
      <header className={`site-header${scrolled ? " compact" : ""}`}>
        <div className="header-inner wrap">
          <a className="brand" href="#top" aria-label="Dhruvil Dobariya, home">
            <span className="brand-symbol">
              d<span>d</span>
              <i />
            </span>
            <span>
              Dhruvil
              <br />
              Dobariya<span className="brand-period">.</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
                <span />
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contact">
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-toggle"
            className="menu-toggle icon-button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className={`mobile-nav${mobileOpen ? " open" : ""}`}
          aria-label="Mobile navigation"
          inert={!mobileOpen}
        >
          {[...navigation, { id: "contact", label: "Let’s talk" }].map(
            (item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={19} />
              </a>
            ),
          )}
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section
          className="hero-section wrap"
          ref={hero}
          aria-labelledby="hero-title"
        >
          <div className="hero-topline">
            <span className="availability">
              <i /> FULL-STACK SOFTWARE ENGINEER
            </span>
            <span className="eyebrow">
              SURAT, INDIA <span className="topline-divider">/</span> AVAILABLE
              WORLDWIDE
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-intro">
                DHRUVIL DOBARIYA <span>—</span> ENGINEERING WITH INTENTION
              </p>
              <h1 id="hero-title">
                Good software.
                <br />
                <span>Every layer.</span>
              </h1>
              <p className="hero-description">
                From the first data model to the last interaction.
                <br className="desktop-break" /> I build production software
                across web,
                <br className="desktop-break" /> backend, and mobile.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#work">
                  Explore my work <ArrowUpRight size={19} />
                </a>
                <a className="text-link" href="#contact">
                  Get in touch <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="hero-name-note">
                <span className="mini-cross" aria-hidden="true">
                  ✳
                </span>
                <span>
                  Thoughtful interfaces.
                  <br />
                  Serious engineering underneath.
                </span>
              </div>
            </div>
            <Workspace paused={paused} />
          </div>
          <div className="hero-bottom">
            <a href="#work" className="scroll-cue">
              <span>
                <ArrowDown size={17} />
              </span>
              SCROLL TO EXPLORE
            </a>
            <dl>
              <div>
                <dd>{profile.yearsExperience}</dd>
                <dt>Years in production</dt>
              </div>
              <div>
                <dd>{profile.fullStackProjects}</dd>
                <dt>Full-stack projects</dt>
              </div>
              <div>
                <dd>{profile.mobileAppProjects}</dd>
                <dt>Mobile applications</dt>
              </div>
            </dl>
            <span className="hero-edition">
              INDEPENDENT THINKING.
              <br />
              CONNECTED SYSTEMS.
            </span>
          </div>
        </section>
        <div className="discipline-strip">
          <div className="wrap">
            <span>BUILT ACROSS THE STACK</span>
            <p>
              Web <i /> Backend <i /> Mobile <i /> Data <i /> Integrations
            </p>
            <ArrowDown size={19} />
          </div>
        </div>
        <ProjectStudies />
        <Engineering paused={paused} />
        <Experience />
        <Capabilities />
        <Contact />
      </main>
      <footer className="site-footer wrap">
        <div>
          <a href="#top" className="footer-name">
            Dhruvil Dobariya<span>↗</span>
          </a>
          <p>Full-stack Software Engineer</p>
        </div>
        <div className="footer-right">
          <button
            className="motion-control"
            onClick={() => setMotionOff(!motionOff)}
            disabled={reducedMotion}
            aria-pressed={paused}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            {reducedMotion
              ? "Reduced motion"
              : paused
                ? "Resume motion"
                : "Pause motion"}
          </button>
          <a className="back-top" href="#top" aria-label="Back to top">
            <ArrowUp size={18} />
          </a>
          <span>© {new Date().getFullYear()} Dhruvil Dobariya</span>
        </div>
      </footer>
    </div>
  );
}
