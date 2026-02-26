"use client";

import { useEffect, useState } from "react";

export type AboutNavItem = {
  id: string;
  label: string;
};

type AboutSidebarProps = {
  items: AboutNavItem[];
};

export default function AboutSidebar({ items }: AboutSidebarProps) {
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
        ABOUT MAP
      </div>

      <nav className="mt-5 space-y-2">
        {items.map((s) => {
          const isActive = active === s.id;

          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={[
                "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-[rgb(var(--text))]"
                  : "text-[rgb(var(--muted))] hover:bg-white/5 hover:text-[rgb(var(--text))]",
              ].join(" ")}
            >
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  isActive ? "bg-[rgb(var(--primary))]" : "bg-[rgb(var(--border))]",
                  "group-hover:bg-[rgb(var(--primary))]",
                ].join(" ")}
                aria-hidden
              />
              {s.label}
            </a>
          );
        })}
      </nav>

      <p className="mt-6 text-xs leading-relaxed text-[rgb(var(--muted))]">
        Keep this page text-first and structured. Replace placeholders once final copy is approved.
      </p>
    </aside>
  );
}