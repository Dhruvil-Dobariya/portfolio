import { ArrowRight, Check } from "lucide-react";
import { principles, processSteps } from "@/data/content";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { SectionHead } from "./SectionHead";
import { LocalTime } from "./Motion";

export function About() {
  const current = experience.roles[0];
  const since = current.period.split("—")[0].trim();

  return (
    <section id="about" className="section about">
      <div className="wrap">
        <SectionHead index="02" label="About" aside="Think in systems. Care about people.">
          The interface is only <em>the beginning.</em>
        </SectionHead>

        <div className="bento">
          <article className="bento-card bento-intro spotlight" data-reveal>
            <span className="label">Hello, I’m Dhruvil</span>
            <p className="bento-quote">
              A full-stack engineer who likes working <em>where the layers meet</em> — shaping the
              data, defining the API, and crafting the screen someone uses every day.
            </p>
            <div className="signature">
              <span className="brand-mark">
                dd<i>.</i>
              </span>
              <div>
                <strong>{profile.name}</strong>
                <span>Full-stack software engineer</span>
              </div>
            </div>
          </article>

          <article className="bento-card bento-now spotlight" data-reveal>
            <span className="label">Currently</span>
            <h3>{current.title}</h3>
            <p>
              at {experience.company.replace(" Pvt. Ltd.", "")} · since {since}
            </p>
            <span className="now-status">
              <span className="status-dot" /> Shipping production SaaS
            </span>
          </article>

          <article className="bento-card bento-place spotlight" data-reveal>
            <div className="globe" aria-hidden="true">
              <i />
              <i />
              <i />
              <b />
            </div>
            <div>
              <span className="label">Based in</span>
              <h3>Surat, India</h3>
              <p>
                <LocalTime /> · UTC+5:30 · working with teams worldwide
              </p>
            </div>
          </article>

          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <article key={principle.label} className="bento-card bento-principle spotlight" data-reveal>
                <div className="principle-top">
                  <span className="principle-icon">
                    <Icon size={22} />
                  </span>
                  <span className="label">
                    0{index + 1} · {principle.label}
                  </span>
                </div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            );
          })}

          <article className="bento-card bento-process spotlight" data-reveal>
            <span className="label">A deliberate process</span>
            <ol>
              {processSteps.map((step, index) => (
                <li key={step}>
                  <span className="process-step">
                    <span className="label">0{index + 1}</span>
                    {step}
                  </span>
                  {index < processSteps.length - 1 ? (
                    <ArrowRight size={18} className="process-arrow" />
                  ) : (
                    <Check size={18} className="process-arrow" />
                  )}
                </li>
              ))}
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
}
