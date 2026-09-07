import { useCallback, useEffect, useRef, useState } from "react";

// Grace period after a manual nav click during which IntersectionObserver
// updates are ignored — the click already tells us exactly which section
// the user wants highlighted, so there's no need for a late observer
// callback to fight the click's own result while the animated scroll is
// still travelling toward the target (it may pass over other sections
// along the way). Cleared early once the scroll itself reports done;
// this is just the fallback ceiling.
const MANUAL_OVERRIDE_MS = 2000;

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  const overrideUntilRef = useRef(0);

  const setActiveIdManually = useCallback((id: string) => {
    overrideUntilRef.current = Date.now() + MANUAL_OVERRIDE_MS;
    setActiveId(id);
  }, []);

  const clearOverride = useCallback(() => {
    overrideUntilRef.current = 0;
  }, []);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < overrideUntilRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return [activeId, setActiveIdManually, clearOverride] as const;
}
