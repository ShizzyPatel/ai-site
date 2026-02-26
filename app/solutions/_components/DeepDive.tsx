"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type DeepDiveProps = {
  title?: string;
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function DeepDive({
  title = "See details",
  summary = "Expand for visuals, workflows, and supporting detail.",
  defaultOpen = false,
  children,
}: DeepDiveProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;

    const ro = new ResizeObserver(() => {
      if (open) setHeight(el.scrollHeight);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    setHeight(open ? el.scrollHeight : 0);
  }, [open]);

  const chevron = useMemo(() => (open ? "rotate-180" : "rotate-0"), [open]);

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))]/70 bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm font-semibold text-[rgb(var(--text))]">{title}</div>
            <div className="mt-1 text-sm text-[rgb(var(--muted))]">{summary}</div>
          </div>

          <div
            className={[
              "mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full",
              "border border-[rgb(var(--border))]/70 bg-white/5",
              "transition-transform",
              chevron,
            ].join(" ")}
            aria-hidden
          >
            ▼
          </div>
        </div>
      </button>

      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-out"
      >
        <div ref={contentRef} className="px-5 pb-5">
          <div className="h-px w-full bg-[rgb(var(--border))]/60 mb-5" />
          {children}
        </div>
      </div>
    </div>
  );
}