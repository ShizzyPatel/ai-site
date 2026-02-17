"use client";

import * as React from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";

type FormatType = "int" | "k-int"; // add more later if needed

type Props = {
  label: string;

  // If provided => count-up animation
  value?: number;

  // If provided => no animation, render exactly this text (e.g. "24/7")
  text?: string;

  // Optional cosmetics for the animated number
  prefix?: string;
  suffix?: string;

  // Formatting for animated values (done INSIDE client component)
  format?: FormatType;

  // Timing
  duration?: number;
};

function formatNumber(n: number, format: FormatType) {
  if (format === "k-int") return `${Math.round(n / 1000)}K`;
  return `${Math.round(n)}`; // "int"
}

export default function CountUpStat({
  label,
  value,
  text,
  prefix,
  suffix,
  format = "int",
  duration = 0.9,
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  // If static text is provided, we never animate.
  const isStatic = typeof text === "string";

  const mv = useMotionValue(0);
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (isStatic) return;
    if (!inView) return;
    if (typeof value !== "number") return;

    const controls = animate(mv, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        // IMPORTANT: round + format here so you never show decimals.
        setDisplay(formatNumber(latest, format));
      },
    });

    return () => controls.stop();
  }, [inView, isStatic, value, duration, format, mv]);

  const numberText = isStatic ? text! : display;

  return (
    <div ref={ref} className="min-w-0">
      <div className="text-[22px] md:text-[24px] font-semibold tracking-tight text-[rgb(var(--primary2))]">
        {prefix ?? ""}
        {/* Keeps typography identical whether static or animated */}
        <motion.span>{numberText}</motion.span>
        {suffix ?? ""}
      </div>

      <div className="mt-2 text-[11px] tracking-[0.35em] uppercase text-[rgb(var(--muted))]">
        {label}
      </div>
    </div>
  );
}
