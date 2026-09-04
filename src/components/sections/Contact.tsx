import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-44">
      <Container className="text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
            04 — Contact
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl">
            Have something worth building?
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-base text-text-secondary sm:text-lg">
            {profile.location} — open to full-stack roles and freelance work across web, backend, and mobile.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
        </Reveal>
      </Container>
    </section>
  );
}
