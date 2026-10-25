import { useEffect } from "react";

/**
 * Site-wide pointer effects, wired with a few delegated listeners instead of
 * one per component:
 *  - `.spotlight` elements get `--mx/--my` so CSS can paint a glow that
 *    follows the pointer.
 *  - `[data-magnetic]` elements drift slightly toward the pointer.
 * Skipped entirely on touch devices and when motion is paused.
 */
export function usePointerEffects(paused: boolean) {
  useEffect(() => {
    if (paused || !window.matchMedia("(pointer: fine)").matches) return;

    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null;

      const spot = target?.closest<HTMLElement>(".spotlight");
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        spot.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }

      const next = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (next !== magnet) release();
      if (next) {
        magnet = next;
        const rect = next.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        next.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", release);
    return () => {
      release();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", release);
    };
  }, [paused]);
}
