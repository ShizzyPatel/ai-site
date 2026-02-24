"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

type MegaLink = {
  label: string;
  href: string;
  desc: string;
};

type MegaMenuProps = {
  label: string;
  description: string;
  links: MegaLink[];
};

export default function MegaMenu({ label, description, links }: MegaMenuProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [locked, setLocked] = useState(false);

  const openT = useRef<number | null>(null);
  const closeT = useRef<number | null>(null);

  const clearTimers = () => {
    if (openT.current) window.clearTimeout(openT.current);
    if (closeT.current) window.clearTimeout(closeT.current);
    openT.current = null;
    closeT.current = null;
  };

  const openWithIntent = () => {
    clearTimers();
    openT.current = window.setTimeout(() => setOpen(true), 140); // hover intent
  };

  const closeWithDelay = () => {
    clearTimers();
    closeT.current = window.setTimeout(() => {
      if (!locked) setOpen(false);
    }, 220); // anti-flicker close delay
  };

  const toggleLock = () => {
    setOpen(true);
    setLocked((v) => !v);
  };

  // Close on outside click / ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setLocked(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`[data-mega-root="${id}"]`)) {
        setOpen(false);
        setLocked(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [id]);

  return (
    <div
      data-mega-root={id}
      className="relative"
      onMouseEnter={openWithIntent}
      onMouseLeave={closeWithDelay}
    >
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggleLock}
        className={[
          "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm",
          "text-[rgb(var(--text))] transition-colors",
          "hover:text-[rgb(var(--gold))]",
          locked ? "text-[rgb(var(--gold))]" : "",
        ].join(" ")}
      >
        {label}
        <span
          className={[
            "text-[10px] opacity-70 transition-transform",
            open ? "translate-y-[1px] rotate-180" : "",
          ].join(" ")}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute left-0 top-full z-50 pt-3">
          {/* hover bridge prevents flicker */}
          <div className="absolute left-0 top-0 h-3 w-[520px]" />

          <div
            className={[
              "w-[520px] rounded-[24px] border border-[rgb(var(--border))]",
              "bg-white/95 backdrop-blur-[18px]",
              "shadow-[0_28px_70px_rgba(2,8,23,0.14)]",
              "p-6",
              "animate-[megaIn_180ms_ease-out]",
            ].join(" ")}
            role="menu"
          >
            <div className="grid grid-cols-[180px_1fr] gap-6">
              {/* Left column */}
              <div>
                <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
                  {label.toUpperCase()}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {description}
                </p>

                {/* optional lock hint (subtle) */}
                <div className="mt-5 text-[11px] text-[rgb(var(--muted))]/70">
                  Tip: click to pin open
                </div>
              </div>

              {/* Right column links */}
              <div className="grid gap-2">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => {
                      setOpen(false);
                      setLocked(false);
                    }}
                    className={[
                      "group rounded-2xl border border-transparent",
                      "px-4 py-3 transition",
                      "hover:border-[rgba(var(--primary),0.25)]",
                      "hover:bg-white/60",
                    ].join(" ")}
                    role="menuitem"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-[15px] font-semibold text-[rgb(var(--text))]">
                        {l.label}
                      </div>
                      <div className="text-[rgb(var(--primary))] opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </div>
                    </div>
                    <div className="mt-1 text-[13px] leading-relaxed text-[rgb(var(--muted))]">
                      {l.desc}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}