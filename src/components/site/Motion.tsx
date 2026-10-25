import { useEffect, useRef, useState } from "react";

/** Counts up to the number in `value` (e.g. "8+") the first time it's seen. */
export function CountUp({ value, paused }: { value: string; paused: boolean }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const [shown, setShown] = useState(paused ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || paused) {
      setShown(target);
      return;
    }
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setShown(Math.round(target * (1 - (1 - t) ** 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, paused]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
    </span>
  );
}

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

/** Current time in Surat (IST). */
export function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);
  return <time dateTime={now.toISOString()}>{timeFormat.format(now)} IST</time>;
}

/** Cycles through `words`, sliding each new one in. */
export function RotatingWord({ words, paused }: { words: string[]; paused: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(timer);
  }, [paused, words.length]);

  return (
    <span className="rotating" aria-live="off">
      <span key={words[index]} className="rotating-word">
        {words[index]}
      </span>
    </span>
  );
}
