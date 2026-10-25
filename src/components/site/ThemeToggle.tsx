import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { applyMode, readSavedMode, saveMode, systemMode, type Mode } from "@/theme/themes";

export function ThemeToggle({ paused }: { paused: boolean }) {
  const [mode, setMode] = useState<Mode>(() => readSavedMode() ?? systemMode());

  useEffect(() => applyMode(mode), [mode]);

  // Until the visitor picks a mode, follow the system setting live.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (!readSavedMode()) setMode(query.matches ? "light" : "dark");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    saveMode(next);
    const commit = () => {
      flushSync(() => setMode(next));
      applyMode(next);
    };

    if (paused || !document.startViewTransition) {
      commit();
      return;
    }

    // Reveal the new mode as a circle growing out of the toggle.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(commit);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const dark = mode === "dark";
  return (
    <button
      className="theme-toggle"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
    >
      <span className="theme-toggle-knob">{dark ? <Moon size={15} /> : <Sun size={15} />}</span>
      <Sun size={14} className="theme-toggle-icon sun" aria-hidden="true" />
      <Moon size={14} className="theme-toggle-icon moon" aria-hidden="true" />
    </button>
  );
}
