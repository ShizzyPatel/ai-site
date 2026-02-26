"use client";

import React from "react";

type SolutionSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  bullets?: string[];
  chips?: string[];
  children?: React.ReactNode; // DeepDive goes here
};

export default function SolutionSection({
  id,
  eyebrow = "SOLUTION",
  title,
  subtitle,
  bullets = [],
  chips = [],
  children,
}: SolutionSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-32 py-16 md:py-20 border-b border-[rgb(var(--border))]/60"
    >
      <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
        {eyebrow}
      </div>

      <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-[rgb(var(--text))]">
        {title}
      </h2>

      <p className="mt-4 text-lg leading-relaxed text-[rgb(var(--muted))]">
        {subtitle}
      </p>

      {chips.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className={[
                "inline-flex items-center rounded-full px-3 py-1 text-xs",
                "border border-[rgb(var(--border))]/70",
                "bg-white/5 text-[rgb(var(--text))]",
              ].join(" ")}
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {bullets.length > 0 && (
        <ul className="mt-8 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[rgb(var(--text))]">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" aria-hidden />
              <span className="text-sm leading-relaxed text-[rgb(var(--muted))]">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}