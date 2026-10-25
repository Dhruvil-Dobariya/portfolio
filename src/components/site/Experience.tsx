import { ArrowUpRight, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { SectionHead } from "./SectionHead";

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="wrap">
        <SectionHead index="03" label="Experience" aside="Learning. Building. Taking ownership.">
          Grounded in <em>real-world</em> work.
        </SectionHead>

        <div className="experience-grid">
          <aside className="company-card spotlight" data-reveal>
            <div className="company">
              <span className="company-mark">{experience.monogram}</span>
              <div>
                <h3>{experience.company}</h3>
                <p>
                  <MapPin size={15} /> {experience.location}
                </p>
              </div>
            </div>
            <p className="company-summary">{experience.summary}</p>
            <a className="text-link" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
              View on LinkedIn <ArrowUpRight size={16} />
            </a>
          </aside>

          <ol className="timeline">
            {experience.roles.map((role, index) => (
              <li key={role.title} className={`role${index === 0 ? " is-current" : ""}`} data-reveal>
                <div className="role-card spotlight">
                  <span className="label role-period">{role.period}</span>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                  {role.focus && (
                    <div className="chips">
                      {role.focus.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
