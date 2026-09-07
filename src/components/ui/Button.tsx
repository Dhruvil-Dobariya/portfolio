import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const base = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium";

const variants = {
  primary: "bg-text text-bg",
  secondary: "border border-border-strong text-text hover:border-accent/50 hover:text-accent-soft",
};

type Variant = keyof typeof variants;

function useMagnetic(strength = 0.3) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}

interface MotionButtonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function Button({ variant = "primary", className, children, onClick }: MotionButtonProps) {
  const magnetic = useMagnetic();

  return (
    <motion.button
      onClick={onClick}
      className={cn(base, variants[variant], className)}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}

export function LinkButton({
  variant = "primary",
  className,
  children,
  href,
  target,
  rel,
}: MotionButtonProps & { href: string; target?: string; rel?: string }) {
  const magnetic = useMagnetic();

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={cn(base, variants[variant], className)}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
}
