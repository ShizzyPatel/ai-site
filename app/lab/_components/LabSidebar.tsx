"use client";

import { useEffect, useState } from "react";

export type LabNavItem = {
  id: string;
  label: string;
};

type LabSidebarProps = {
  items: LabNavItem[];
};

export default function LabSidebar({ items }: LabSidebarProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin: "-40% 0px -45% 0px", threshold: [0.08, 0.15, 0.25] }
    );

    const els: HTMLElement[] = [];
    for (const s of items) {
      const el = document.getElementById(s.id);
      if (el) {
        els.push(el);
        observer.observe(el);
      }
    }

    return () => {
      els.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [items]);

  return (
    <aside>
      <div className="text-sm font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
        LAB MAP
      </div>

      <nav className="mt-5 space-y-2">
        {items.map((s) => {
          const isActive = active === s.id;

          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={[
                "group flex items-center gap-3 rounded-lg py-2 transition-colors",
                isActive
                  ? "text-[rgb(var(--text))]"
                  : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]",
              ].join(" ")}
            >
              <span
                className={[
                  "h-4 w-[2px] rounded-full transition-colors",
                  isActive
                    ? "bg-[rgb(var(--primary))]"
                    : "bg-transparent group-hover:bg-[rgb(var(--border))]",
                ].join(" ")}
                aria-hidden="true"
              />
              <span className={["text-sm", isActive ? "font-medium" : ""].join(" ")}>
                {s.label}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="mt-8 text-xs text-[rgb(var(--muted))] leading-relaxed">
        Structured technical overview. We’ll replace placeholder text with finalized client copy.
      </div>
    </aside>
  );
}