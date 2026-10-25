import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const LINK = 140;
const REACH = 190;

/**
 * Drifting constellation behind the hero — nodes linking up as they pass,
 * and reaching toward the pointer. Colors follow the active theme, and the
 * loop only runs while the canvas is on screen and motion is allowed.
 */
export function NetworkCanvas({ paused }: { paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let colors = { line: "#888", node: "#aaa", accent: "#fff" };
    let pointer = { x: -9999, y: -9999 };
    let frame = 0;
    let visible = true;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = {
        line: s.getPropertyValue("--muted").trim(),
        node: s.getPropertyValue("--text").trim(),
        accent: s.getPropertyValue("--accent-text").trim(),
      };
    };

    const seed = () => {
      const count = Math.max(28, Math.min(110, Math.round((width * height) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const resize = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK) continue;
          ctx.globalAlpha = (1 - d / LINK) * 0.28;
          ctx.strokeStyle = colors.line;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        const dp = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (dp < REACH) {
          ctx.globalAlpha = (1 - dp / REACH) * 0.8;
          ctx.strokeStyle = colors.accent;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
        const near = dp < REACH;
        ctx.globalAlpha = near ? 1 : 0.55;
        ctx.fillStyle = near ? colors.accent : colors.node;
        ctx.beginPath();
        ctx.arc(a.x, a.y, near ? 2.4 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        // A gentle pull toward the pointer.
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < REACH && d > 1) {
          n.x += (dx / d) * 0.25;
          n.y += (dy / d) * 0.25;
        }
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (!frame && !paused && visible) frame = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onLeave = () => {
      pointer = { x: -9999, y: -9999 };
    };

    readColors();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [paused]);

  return <canvas ref={canvas} className="network" aria-hidden="true" />;
}
