"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type MegaLink = {
  label: string;
  href: string;
  desc: string;
};

type MegaMenuSection = {
  title: string; // e.g. "By Audience", "By Access"
  links: MegaLink[];
};

type MegaMenuBaseProps = {
  label: string;
  description: string;
};

type MegaMenuFlatProps = MegaMenuBaseProps & {
  links: MegaLink[];
  sections?: never;
};

type MegaMenuSectionedProps = MegaMenuBaseProps & {
  sections: MegaMenuSection[];
  links?: never;
};

type MegaMenuProps = MegaMenuFlatProps | MegaMenuSectionedProps;

function isSectioned(p: MegaMenuProps): p is MegaMenuSectionedProps {
  return "sections" in p;
}

export default function MegaMenu(props: MegaMenuProps) {
  const { label, description } = props;

  const id = useId();
  const [open, setOpen] = useState(false);
  const [locked, setLocked] = useState(false);

  const openT = useRef<number | null>(null);
  const closeT = useRef<number | null>(null);

  const sectioned = isSectioned(props);

  // Panel sizing: make sectioned menus wider (matches your SS1)
  const panelWidthClass = sectioned ? "w-[920px]" : "w-[520px]";
  const bridgeWidthClass = sectioned ? "w-[920px]" : "w-[520px]";
  const gridColsClass = sectioned ? "grid-cols-[220px_1fr]" : "grid-cols-[180px_1fr]";

  const clearTimers = () => {
    if (openT.current) window.clearTimeout(openT.current);
    if (closeT.current) window.clearTimeout(closeT.current);
    openT.current = null;
    closeT.current = null;
  };

  const openWithIntent = () => {
    clearTimers();
    openT.current = window.setTimeout(() => setOpen(true), 140);
  };

  const closeWithDelay = () => {
    clearTimers();
    closeT.current = window.setTimeout(() => {
      if (!locked) setOpen(false);
    }, 220);
  };

  const toggleLock = () => {
    setOpen(true);
    setLocked((v) => !v);
  };

  const closeNow = () => {
    setOpen(false);
    setLocked(false);
  };

  // Close on ESC + outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`[data-mega-root="${id}"]`)) closeNow();
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
          <div className={["absolute left-0 top-0 h-3", bridgeWidthClass].join(" ")} />

          <div
            className={[
              panelWidthClass,
              "rounded-[24px] border border-[rgb(var(--border))]",
              "bg-white/95 backdrop-blur-[18px]",
              "shadow-[0_28px_70px_rgba(2,8,23,0.14)]",
              "p-6",
            ].join(" ")}
            role="menu"
          >
            <div className={["grid gap-6", gridColsClass].join(" ")}>
              {/* Left column */}
              <div>
                <div className="text-xs font-semibold tracking-[0.18em] text-[rgb(var(--primary))]">
                  {label.toUpperCase()}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{description}</p>
                <div className="mt-5 text-[11px] text-[rgb(var(--muted))]/70">Tip: click to pin open</div>
              </div>

              {/* Right column */}
              <div>
                {sectioned ? (
                  // SECTIONED LAYOUT (e.g. Solutions: By Audience / By Access)
                  <div className="space-y-6">
                    {props.sections.map((section, idx) => (
                      <div key={section.title}>
                        <div
                          className={[
                            "text-[13px] font-semibold tracking-[0.18em] uppercase",
                            idx === 0
                              ? "text-[rgb(var(--green))]"
                              : idx === 1
                              ? "text-[rgb(var(--gold))]"
                              : "text-[rgb(var(--primary))]",
                          ].join(" ")}
                        >
                          {section.title}
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-x-10 gap-y-6">
                          {section.links.map((l) => (
                            <Link
                              key={l.href}
                              href={l.href}
                              onClick={closeNow}
                              role="menuitem"
                              className={[
                                "group block rounded-xl",
                                "transition-colors",
                                "hover:bg-black/[0.03]",
                                "px-2 py-2 -mx-2 -my-2",
                              ].join(" ")}
                            >
                              <div className="text-[15px] font-semibold text-[rgb(var(--text))]">{l.label}</div>
                              <div className="mt-1 text-[13px] leading-relaxed text-[rgb(var(--muted))]">
                                {l.desc}
                              </div>
                            </Link>
                          ))}
                        </div>

                        {idx < props.sections.length - 1 && (
                          <div className="mt-6 h-px w-full bg-[rgb(var(--border))]/60" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // FLAT LINKS LAYOUT (existing behavior)
                  <div className="grid gap-2">
                    {props.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={closeNow}
                        role="menuitem"
                        className={[
                          "group rounded-2xl border border-transparent",
                          "px-4 py-3 transition",
                          "hover:border-[rgba(var(--primary),0.25)]",
                          "hover:bg-white/60",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-[15px] font-semibold text-[rgb(var(--text))]">{l.label}</div>
                          <div className="text-[rgb(var(--primary))] opacity-0 transition-opacity group-hover:opacity-100">
                            →
                          </div>
                        </div>
                        <div className="mt-1 text-[13px] leading-relaxed text-[rgb(var(--muted))]">{l.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}