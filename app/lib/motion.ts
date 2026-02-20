import type { Transition, Variants } from "framer-motion";

/**
 * Global motion knobs (edit here, not in every section).
 * Defaults are conservative to avoid “presentation mode”.
 */
export const MOTION = {
  viewport: { once: true, margin: "-120px" } as const,

  ease: {
    out: [0.16, 1, 0.3, 1] as const,
    inOut: [0.4, 0, 0.2, 1] as const,
  },

  dur: {
    fast: 0.25,
    base: 0.35,
    slow: 0.55,
  },

  dist: {
    ySm: 6,
    yMd: 10,
  },

  stagger: {
    sm: 0.04,
    md: 0.06,
    lg: 0.08,
  },
} as const;

export function fadeUp(opts?: {
  y?: number;
  duration?: number;
  delay?: number;
}): { variants: Variants; transition: Transition } {
  const y = opts?.y ?? MOTION.dist.ySm;
  const duration = opts?.duration ?? MOTION.dur.base;
  const delay = opts?.delay ?? 0;

  return {
    variants: {
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0 },
    },
    transition: {
      duration,
      ease: MOTION.ease.out,
      delay,
    },
  };
}

export function staggerContainer(opts?: {
  stagger?: number;
  delayChildren?: number;
}): Variants {
  const stagger = opts?.stagger ?? MOTION.stagger.md;
  const delayChildren = opts?.delayChildren ?? 0.05;

  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
}
