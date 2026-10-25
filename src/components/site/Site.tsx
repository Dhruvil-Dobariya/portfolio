import { useEffect, useRef } from "react";
import { navigation } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useReveal } from "@/hooks/useReveal";
import { useSectionNav } from "@/hooks/useSectionNav";
import { usePointerEffects } from "@/hooks/usePointerEffects";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Work } from "./Work";
import { About } from "./About";
import { Experience } from "./Experience";
import { Toolkit } from "./Toolkit";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";

const sectionIds = [...navigation.map((item) => item.id), "contact"];

export function Site() {
  // Motion always runs, except for visitors whose OS asks for reduced motion
  // (an accessibility setting, e.g. for vestibular disorders).
  const paused = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const { active, goTo } = useSectionNav(sectionIds, paused);

  useReveal(root, paused);
  usePointerEffects(paused);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", paused);
  }, [paused]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty("transform", `scaleX(${range > 0 ? window.scrollY / range : 0})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="reading-progress" ref={progress} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor paused={paused} />
      <Header active={active} goTo={goTo} paused={paused} />
      <main id="main" tabIndex={-1}>
        <Hero paused={paused} goTo={goTo} />
        <Marquee />
        <Work />
        <About />
        <Experience />
        <Toolkit />
        <Contact />
      </main>
      <Footer goTo={goTo} />
    </div>
  );
}
