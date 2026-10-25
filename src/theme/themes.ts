// The site ships one dark and one light palette. Their color tokens live in
// src/styles/themes.css under [data-theme="dark"] / [data-theme="light"].
export type Mode = "dark" | "light";

/** Browser UI color (meta theme-color) for each mode; matches its --bg. */
const chrome: Record<Mode, string> = { dark: "#2a2a2a", light: "#f0f1ec" };
const STORAGE_KEY = "dd-theme";

const isMode = (value: unknown): value is Mode => value === "dark" || value === "light";

/** The visitor's saved choice, or null if they haven't picked one. */
export function readSavedMode(): Mode | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isMode(saved) ? saved : null;
  } catch {
    return null; // Storage can be unavailable (private mode, blocked site data).
  }
}

export function systemMode(): Mode {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyMode(mode: Mode) {
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.style.colorScheme = mode;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", chrome[mode]);
}

export function saveMode(mode: Mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Non-fatal: the choice just won't persist.
  }
}
