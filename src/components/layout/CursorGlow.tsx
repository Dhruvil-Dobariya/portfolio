import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--x", `${event.clientX}px`);
        ref.current?.style.setProperty("--y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      aria-hidden
      style={{
        background:
          "radial-gradient(420px circle at var(--x, 50%) var(--y, 30%), rgba(var(--accent-rgb), 0.06), transparent 70%)",
      }}
    />
  );
}
