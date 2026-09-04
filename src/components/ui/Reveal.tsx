import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        isInView ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className
      )}
      style={{ transitionDelay: isInView ? `${delay * 1000}ms` : "0ms" }}
    >
      {children}
    </Component>
  );
}
