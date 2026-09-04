import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenisInstance } from "@/lib/lenis";
import Lenis from "lenis";
import { useEffect } from "react";

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
    });

    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, [enabled]);
}
