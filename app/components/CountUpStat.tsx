"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CountUpStatProps = {
  value: number;              // numeric value to count to (e.g. 86000)
  label: string;              // "Knowledge Nodes"
  prefix?: string;            // e.g. "<"
  suffix?: string;            // e.g. "+", "s"
  durationMs?: number;        // default 900
  format?: (n: number) => string; // optional formatter
};

export default function CountUpStat({
  value,
  label,
  prefix = "",
  suffix = "",
  durationMs = 900,
  format,
}: CountUpStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);

  const formatter = useMemo(() => {
    if (format) return format;
    // default: add commas for big numbers
    return (n: number) => n.toLocaleString();
  }, [format]);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect(); // run once
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = value;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (to - from) * eased);
      setCurrent(next);

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, durationMs]);

  return (
    <div ref={ref} className="min-w-[120px]">
      <div className="text-[rgb(var(--primary2))] text-xl font-semibold tracking-tight">
        {prefix}
        {formatter(current)}
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
        {label}
      </div>
    </div>
  );
}
