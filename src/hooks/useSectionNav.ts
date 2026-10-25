import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks which section is under the reading line and scrolls to sections on
 * request. While a nav-triggered scroll is in flight the highlight is locked
 * to the destination, so it doesn't flicker through every section passed.
 */
export function useSectionNav(ids: string[], reducedMotion: boolean) {
  const [active, setActive] = useState("");
  const locked = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (locked.current) return;
      const line = window.innerHeight * 0.4;
      let next = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) next = id;
      }
      // The last section may be too short to ever cross the reading line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) next = ids[ids.length - 1];
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  useEffect(() => () => clearTimeout(unlockTimer.current), []);

  const goTo = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      setActive(id);
      locked.current = true;
      const unlock = () => {
        locked.current = false;
        clearTimeout(unlockTimer.current);
        window.removeEventListener("scrollend", unlock);
      };
      window.addEventListener("scrollend", unlock, { once: true });
      // Fallback for browsers without `scrollend`, or when no scroll happens.
      clearTimeout(unlockTimer.current);
      unlockTimer.current = setTimeout(unlock, 1500);
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
    },
    [reducedMotion],
  );

  return { active, goTo };
}
