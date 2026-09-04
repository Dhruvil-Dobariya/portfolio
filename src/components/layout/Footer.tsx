import { ArrowUp } from "lucide-react";
import { scrollToId } from "@/lib/lenis";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-8">
      <Container className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-text-tertiary">© 2026 Dhruvil Dobariya</p>
        <button
          onClick={() => scrollToId("hero")}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors hover:text-text"
          aria-label="Back to top"
        >
          <ArrowUp size={14} />
        </button>
      </Container>
    </footer>
  );
}
