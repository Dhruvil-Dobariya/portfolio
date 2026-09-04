let overlay: HTMLDivElement | null = null;

export function setTransitionOverlay(el: HTMLDivElement | null) {
  overlay = el;
}

const FADE_MS = 200;
const SETTLE_MS = 50;

export function withFadeJump(jump: () => void) {
  if (!overlay) {
    jump();
    return;
  }

  overlay.style.pointerEvents = "auto";
  overlay.style.opacity = "1";

  window.setTimeout(() => {
    jump();
    window.setTimeout(() => {
      if (!overlay) return;
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }, SETTLE_MS);
  }, FADE_MS);
}
