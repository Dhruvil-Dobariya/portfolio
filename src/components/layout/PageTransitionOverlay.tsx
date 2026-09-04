import { useEffect, useRef } from "react";
import { setTransitionOverlay } from "@/lib/pageTransition";

export function PageTransitionOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTransitionOverlay(ref.current);
    return () => setTransitionOverlay(null);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[200] bg-bg opacity-0 transition-opacity duration-200 ease-out"
      aria-hidden
    />
  );
}
