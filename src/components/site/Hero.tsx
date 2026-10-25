import type { MouseEvent } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { heroWords } from "@/data/content";
import { NetworkCanvas } from "./NetworkCanvas";
import { CountUp, LocalTime, RotatingWord } from "./Motion";

export function Hero({ paused, goTo }: { paused: boolean; goTo: (id: string) => void }) {
  const follow = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    goTo(id);
  };

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="aurora aurora-a" />
        <span className="aurora aurora-b" />
        <span className="aurora aurora-c" />
        <NetworkCanvas paused={paused} />
      </div>

      <div className="wrap hero-inner">
        <div className="hero-top intro" style={{ animationDelay: "0.1s" }}>
          <p className="status-pill">
            <span className="status-dot" /> Available for new opportunities
          </p>
          <p className="label hero-where">
            Surat, India <span aria-hidden="true">·</span> <LocalTime />
          </p>
        </div>

        <h1 className="hero-title" id="hero-title">
          <span className="line">
            <span style={{ animationDelay: "0.15s" }}>Good software,</span>
          </span>
          <span className="line">
            <span style={{ animationDelay: "0.27s" }}>
              <em>every</em> layer.
            </span>
          </span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-sub intro" style={{ animationDelay: "0.45s" }}>
            I’m {profile.name.split(" ")[0]} — a full-stack engineer who designs and ships{" "}
            <RotatingWord words={heroWords} paused={paused} /> end to end, from the first schema to
            the screen people actually tap.
          </p>
          <div className="hero-actions intro" style={{ animationDelay: "0.55s" }}>
            <a className="btn btn-primary btn-large" href="#work" onClick={follow("work")} data-magnetic>
              See selected work <ArrowUpRight size={18} />
            </a>
            <a className="btn btn-ghost btn-large" href="#contact" onClick={follow("contact")} data-magnetic>
              Let’s talk
            </a>
          </div>
        </div>

        <div className="hero-foot intro" style={{ animationDelay: "0.7s" }}>
          <dl className="stats">
            <div>
              <dd>
                <CountUp value={profile.yearsExperience} paused={paused} />
              </dd>
              <dt>Years shipping production software</dt>
            </div>
            <div>
              <dd>
                <CountUp value={profile.fullStackProjects} paused={paused} />
              </dd>
              <dt>Full-stack projects delivered</dt>
            </div>
            <div>
              <dd>
                <CountUp value={profile.mobileAppProjects} paused={paused} />
              </dd>
              <dt>Mobile apps in people’s hands</dt>
            </div>
          </dl>
          <a className="scroll-cue" href="#work" onClick={follow("work")}>
            <span className="scroll-cue-track">
              <i />
            </span>
            Scroll
            <ArrowDownRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
