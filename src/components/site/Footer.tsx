import { ArrowUp } from "lucide-react";
import { navigation } from "@/data/content";
import { profile } from "@/data/profile";

export function Footer({ goTo }: { goTo: (id: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <nav className="footer-nav" aria-label="Footer">
          {[...navigation, { id: "contact", label: "Contact" }].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                goTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer-actions">
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-link">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="text-link">
            Email
          </a>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true">
        Dhruvil Dobariya
      </p>

      <div className="wrap footer-bottom">
        <span>© 2026 {profile.name}. All rights reserved.</span>
        <a
          className="text-link"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            goTo("top");
          }}
        >
          Back to top <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}
