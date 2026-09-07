import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { scrollToId } from "@/lib/lenis";
import { Container } from "@/components/ui/Container";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-8">
      <Container className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-text-tertiary">© 2026 Dhruvil Dobariya</p>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Dhruvil"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors hover:border-accent/50 hover:text-accent-soft"
          >
            <Mail size={14} />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dhruvil on LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors hover:border-accent/50 hover:text-accent-soft"
          >
            <LinkedInIcon size={14} />
          </a>
          <button
            onClick={() => scrollToId("hero")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors hover:text-text"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </Container>
    </footer>
  );
}
