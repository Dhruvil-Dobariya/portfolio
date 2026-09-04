import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium";

const variants = {
  primary: "bg-text text-bg",
  secondary: "border border-border-strong text-text hover:border-accent/50 hover:text-accent-soft",
};

type Variant = keyof typeof variants;

interface MotionButtonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function Button({ variant = "primary", className, children, onClick }: MotionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(base, variants[variant], className)}
      whileHover={{ y: -2 }}
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
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={cn(base, variants[variant], className)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
}
