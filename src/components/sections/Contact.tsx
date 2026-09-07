import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] flex-col justify-center py-16 md:py-24"
    >
      <Container className="text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
            04 — Contact
          </span>
        </Reveal>

        <Reveal delay={0.06} className="mt-5 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities
          </span>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl">
            Have something worth building?
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-md text-base text-text-secondary sm:text-lg">
            {profile.location} — open to full-stack roles and freelance work across web, backend, and mobile.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="relative mx-auto mt-12 max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-bg-elevated/50 p-8 sm:p-10">
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-[80px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-accent/10 blur-[80px]"
              aria-hidden
            />
            <div className="relative flex flex-wrap items-center justify-center gap-4">
              <LinkButton href={`mailto:${profile.email}`}>
                <Mail size={16} />
                {profile.email}
              </LinkButton>
              <LinkButton
                variant="secondary"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon size={16} />
                LinkedIn
                <ArrowUpRight size={14} />
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
