import { capabilities } from "@/data/content";
import { skillGroups } from "@/data/skills";
import { SectionHead } from "./SectionHead";

export function Toolkit() {
  return (
    <section id="toolkit" className="section toolkit">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Toolkit"
          aside="Tools follow the problem."
          text="The tools change. The goal stays the same: software that works well, at every layer."
        >
          Different disciplines. <em>One connected stack.</em>
        </SectionHead>

        <div className="capabilities">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <article key={capability.name} className="capability spotlight" data-reveal>
                <div className="capability-top">
                  <span className="capability-icon">
                    <Icon size={26} strokeWidth={1.6} />
                  </span>
                  <span className="label">
                    0{index + 1} · {capability.label}
                  </span>
                </div>
                <h3>{capability.name}</h3>
                <p className="capability-copy">{capability.copy}</p>
                <p>{capability.description}</p>
                <div className="capability-groups">
                  {capability.groups.map((name) => {
                    const group = skillGroups.find((item) => item.label === name);
                    return (
                      <div key={name}>
                        <h4 className="label">{name}</h4>
                        <ul className="chips">
                          {group?.items.map((item) => (
                            <li key={item} className="chip">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
