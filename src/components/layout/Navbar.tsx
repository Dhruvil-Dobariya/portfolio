import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToId } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const sectionIds = ["hero", "ethos", ...navItems.map((item) => item.id)];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveIdManually, clearActiveOverride] = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    setActiveIdManually(id);
    scrollToId(id, clearActiveOverride);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-border bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 md:px-10">
        <button
          onClick={() => go("hero")}
          className="flex items-center gap-3"
          aria-label="Back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border-strong font-mono text-[13px] font-medium text-text">
            DD
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <button
                onClick={() => go(item.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                  activeId === item.id
                    ? "text-text"
                    : "text-text-secondary hover:text-text",
                )}
              >
                {activeId === item.id ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.06] ring-1 ring-border-strong"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => go("contact")}
          className="hidden rounded-full border border-border-strong px-4 py-2 text-sm text-text transition-colors hover:border-accent/50 hover:text-accent-soft md:inline-flex"
        >
          Let&apos;s talk
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-text md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-b border-border bg-bg/95 backdrop-blur-xl transition-[grid-template-rows] duration-300 ease-in-out md:hidden",
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-b-0",
        )}
      >
        <ul className="flex min-h-0 flex-col px-6 py-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className={cn(
                  "block w-full py-3 text-left text-base",
                  activeId === item.id ? "text-text" : "text-text-secondary",
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
