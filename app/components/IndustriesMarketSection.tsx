"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import Section from "./Section";

type Industry = {
  label: string;
  // Optional (only render if provided)
  adoptionLabel?: string; // e.g. "83–94% AI adoption"
};

export default function IndustriesMarketSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  // Toggle this if client wants adoption rates visible by default.
  // Recommendation: false (show on hover only).
  const SHOW_RATES_ALWAYS = false;

  const industries: Industry[] = useMemo(
    () => [
      { label: "Technology / IT", adoptionLabel: "83–94% AI adoption" }, // example placeholder
      { label: "Financial Services" },
      { label: "Healthcare" },
      { label: "Legal" },
      { label: "Professional Services" },
      { label: "Logistics" },
      { label: "Research / Academia" },
      { label: "Manufacturing" },
    ],
    []
  );

  const [active, setActive] = useState<string | null>(null);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06, // ✅ KNOB: stagger amount (lower = calmer)
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 6 }, // ✅ KNOB: reveal distance (keep small)
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" as const }, // ✅ KNOB: speed
    },
  };

  return (
    <Section  className="py-24">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <div className="mb-10">
          <h2 className="font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
            Industries &amp; Market Opportunity
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr] md:items-end">
            <div className="text-[rgb(var(--gold))]">
              <div className="text-6xl font-semibold tracking-tight">$500B+</div>
            </div>

            <div className="text-left md:text-center">
              <div className="text-3xl font-medium tracking-tight text-[rgb(var(--muted))]">
                Total Addressable Market
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-6 md:grid-cols-4"
        >
          {industries.map((x) => {
            const isActive = active === x.label;

            return (
              <motion.button
                key={x.label}
                variants={item}
                type="button"
                onMouseEnter={() => setActive(x.label)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(x.label)}
                onBlur={() => setActive(null)}
                className="group relative w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/18 px-8 py-10 text-left backdrop-blur transition
                           hover:border-white/15 hover:bg-white/[0.03]
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                <div className="text-2xl font-medium tracking-tight text-[rgb(var(--text))]/90">
                  {x.label}
                </div>

                {/* Optional adoption rates (kept subtle) */}
                {(x.adoptionLabel || SHOW_RATES_ALWAYS) && (
                  <div
                    className={[
                      "mt-3 text-sm text-[rgb(var(--muted))] transition",
                      SHOW_RATES_ALWAYS ? "opacity-80" : "opacity-0 group-hover:opacity-80 group-focus:opacity-80",
                    ].join(" ")}
                  >
                    {x.adoptionLabel ?? ""}
                  </div>
                )}

                {/* Subtle hover glow (no movement, no pulsing) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100"
                  style={{
                    boxShadow: isActive ? "0 0 24px rgba(96,165,250,0.12)" : "none",
                  }}
                />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Phase focus line */}
        <div className="mt-10 text-lg font-semibold text-[rgb(var(--primary2))]">
          Phase 1 Focus: Technology/SMBs + Research/Academia
        </div>
      </div>
    </Section>
  );
}
