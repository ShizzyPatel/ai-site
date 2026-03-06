"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DeepDiveProps = {
  title?: string;
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

// ─── Floating close pill ──────────────────────────────────────────────────────

function FloatingPill({
  visible,
  onClick,
  label,
}: {
  visible: boolean;
  onClick: () => void;
  label: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      onClick={onClick}
      aria-label={`Collapse ${label}`}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,

        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.94)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.22s ease, transform 0.22s ease",

        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.5rem 1.1rem 0.5rem 0.85rem",
        borderRadius: "9999px",

        background: "rgb(var(--bg, 10 15 28))",
        color: "rgb(var(--text, 241 245 249))",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.12)",

        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.015em",
        cursor: "pointer",
        userSelect: "none" as const,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.14)";
        el.style.transform = "translateY(-2px) scale(1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.12)";
        el.style.transform = "translateY(0) scale(1)";
      }}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="2,8 6,3.5 10,8" />
      </svg>
      Collapse
    </button>,
    document.body
  );
}

// ─── DeepDive ─────────────────────────────────────────────────────────────────

export default function DeepDive({
  title = "See details",
  summary = "Expand for visuals, workflows, and supporting detail.",
  defaultOpen = false,
  children,
}: DeepDiveProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [pillVisible, setPillVisible] = useState(false);

  // ── Height animation ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const ro = new ResizeObserver(() => { if (open) setHeight(el.scrollHeight); });
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open]);

  // ── Pill visibility via IntersectionObserver on the toggle button ───────────
  // This is scroll-container-agnostic and never misses a state change.
  // Pill shows when: section is open AND the toggle button is NOT intersecting
  // (i.e. it has scrolled out of the viewport).
  useEffect(() => {
    if (!toggleBtnRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show pill if the section is currently open
        if (open) {
          setPillVisible(!entry.isIntersecting);
        } else {
          setPillVisible(false);
        }
      },
      {
        root: null,       // viewport
        threshold: 0,     // trigger the moment any part leaves/enters
        rootMargin: "0px",
      }
    );

    observer.observe(toggleBtnRef.current);
    return () => observer.disconnect();
  }, [open]); // re-attach when open changes so the !entry check uses fresh state

  // When closing via pill: hide pill immediately, collapse, scroll card back into view
  const handleCollapse = () => {
    setPillVisible(false);
    setOpen(false);
    // Small delay so the height transition starts before scroll lands
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const chevron = useMemo(() => (open ? "rotate-180" : "rotate-0"), [open]);

  return (
    <>
      <div
        ref={sectionRef}
        className="rounded-2xl border border-[rgb(var(--border))]/70"
        style={{ background: "#EAECF0" }}
      >
        {/* Toggle button — observed by IntersectionObserver */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          suppressHydrationWarning
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
                "transition-transform duration-300",
                chevron,
              ].join(" ")}
              aria-hidden
            >
              ▼
            </div>
          </div>
        </button>

        {/* Animated content area */}
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

      {/* Floating pill — portaled to body */}
      <FloatingPill
        visible={pillVisible}
        onClick={handleCollapse}
        label={title}
      />
    </>
  );
}
