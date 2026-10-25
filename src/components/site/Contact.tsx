import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { profile } from "@/data/profile";

export function Contact() {
  const [feedback, setFeedback] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setFeedback("Email copied to clipboard");
    } catch {
      setFeedback("Couldn’t copy — use the email link instead");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFeedback(""), 3500);
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-bg" aria-hidden="true">
        <span className="aurora aurora-a" />
        <span className="aurora aurora-b" />
      </div>
      <div className="wrap contact-inner">
        <div className="section-meta" data-reveal>
          <span className="label">
            <span className="label-index">(05)</span> Contact
          </span>
          <span className="status-pill">
            <span className="status-dot" /> Open to opportunities
          </span>
        </div>

        <h2 className="contact-title display" data-reveal>
          Have an idea?
          <br />
          Let’s make it <em>real.</em>
        </h2>

        <div className="contact-row" data-reveal>
          <a className="contact-orb" href={`mailto:${profile.email}`} data-magnetic>
            <span>Say hello</span>
            <ArrowUpRight size={34} strokeWidth={1.5} />
          </a>

          <div className="contact-card spotlight">
            <p>
              An ambitious product. A complex problem. A team that cares about the details. I’m
              listening.
            </p>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button className="icon-button" onClick={copyEmail} aria-label="Copy email address">
                {feedback.startsWith("Email copied") ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <p className="copy-feedback" role="status">
              {feedback}
            </p>
            <div className="contact-links">
              <a className="btn btn-ghost" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight size={16} />
              </a>
              <a className="btn btn-ghost" href={`mailto:${profile.email}?subject=R%C3%A9sum%C3%A9%20request`}>
                Request résumé <FileText size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
