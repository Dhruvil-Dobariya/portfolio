import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";
import { withFadeJump } from "@/lib/pageTransition";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  withFadeJump(() => {
    if (instance) {
      instance.scrollTo(target, { offset: -24, immediate: true });
    } else {
      target.scrollIntoView({ behavior: "auto" });
    }
    ScrollTrigger.update();
  });
}
