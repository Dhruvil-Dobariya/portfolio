import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

let instance: Lenis | null = null;
let navScrolling = false;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

// True while an animated nav-jump (header/footer click) is under way, as
// opposed to the person scrolling by hand. Scroll-linked reveals (e.g.
// Ethos's word-by-word stagger) key off this to stay frozen during a fast
// programmatic scroll and only animate for organic scrolling.
export function isNavScrollActive() {
  return navScrolling;
}

const NAV_SCROLL_DURATION = 1.2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function scrollToId(id: string, onComplete?: () => void) {
  const target = document.getElementById(id);
  if (!target) return;

  navScrolling = true;
  const finish = () => {
    navScrolling = false;
    ScrollTrigger.update();
    onComplete?.();
  };

  if (instance) {
    instance.scrollTo(target, {
      offset: -24,
      duration: NAV_SCROLL_DURATION,
      easing: easeOutCubic,
      onComplete: finish,
    });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
    finish();
  }
}
