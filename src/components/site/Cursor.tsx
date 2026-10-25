import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='tab'], [role='radio'], [data-cursor]";

/** A soft ring that trails the pointer and swells over interactive elements. */
export function Cursor({ paused }: { paused: boolean }) {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el || paused || !window.matchMedia("(pointer: fine)").matches) return;

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let frame = 0;

    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      el.classList.add("is-active");
      el.classList.toggle("is-hovering", Boolean((event.target as Element)?.closest(INTERACTIVE)));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => el.classList.remove("is-active");
    const onDown = () => el.classList.add("is-pressed");
    const onUp = () => el.classList.remove("is-pressed");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
    };
  }, [paused]);

  return (
    <div className="cursor" ref={ring} aria-hidden="true">
      <span />
    </div>
  );
}
