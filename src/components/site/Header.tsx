import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/content";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

export function Header({
  active,
  goTo,
  paused,
}: {
  active: string;
  goTo: (id: string) => void;
  paused: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide the highlight pill under the active link.
  useLayoutEffect(() => {
    const place = () => {
      const link = nav.current?.querySelector<HTMLElement>('[aria-current="location"]');
      const pill = indicator.current;
      if (!pill) return;
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.opacity = "1";
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", menuOpen);
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.classList.remove("menu-locked");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const follow = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    // Release the mobile menu's scroll lock before scrolling, not after the
    // re-render, or the scroll can be swallowed while the page is locked.
    document.body.classList.remove("menu-locked");
    goTo(id);
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div className="header-bar">
        <a className="brand" href="#top" onClick={follow("top")} aria-label="Dhruvil Dobariya, back to top">
          <span className="brand-mark">
            dd<i>.</i>
          </span>
          <span className="brand-name">
            Dhruvil Dobariya
            <small>Full-stack engineer</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main" ref={nav}>
          <span className="nav-indicator" ref={indicator} aria-hidden="true" />
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={follow(item.id)}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle paused={paused} />
          <a
            className="btn btn-primary btn-small header-cta"
            href="#contact"
            onClick={follow("contact")}
            aria-current={active === "contact" ? "location" : undefined}
            data-magnetic
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-toggle"
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile" inert={!menuOpen}>
        {[...navigation, { id: "contact", label: "Let’s talk" }].map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={follow(item.id)}
            aria-current={active === item.id ? "location" : undefined}
            style={{ transitionDelay: menuOpen ? `${80 + index * 50}ms` : "0ms" }}
          >
            <span className="label">0{index + 1}</span>
            {item.label}
            <ArrowUpRight size={26} />
          </a>
        ))}
        <a className="mobile-nav-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </nav>
    </header>
  );
}
