import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(margin = "-10% 0px") {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, isInView };
}
