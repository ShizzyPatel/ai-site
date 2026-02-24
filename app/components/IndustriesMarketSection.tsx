"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import Section from "./Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Industry = {
  label: string;
  slug: string;
  priority: "High" | "Medium";
  whyNow: string;
  signals: string; // short analytic hint
};

export default function IndustriesMarketSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const industries: Industry[] = useMemo(
    () => [
      {
        label: "Technology / IT",
        slug: "technology",
        priority: "High",
        whyNow: "Tool sprawl + fragmented knowledge",
        signals: "High automation readiness",
      },
      {
        label: "Financial Services",
        slug: "financial-services",
        priority: "High",
        whyNow: "Compliance + risk synthesis",
        signals: "High governance demand",
      },
      {
        label: "Healthcare",
        slug: "healthcare",
        priority: "Medium",
        whyNow: "Workflow complexity + decision support",
        signals: "Safety / audit requirements",
      },
      {
        label: "Legal",
        slug: "legal",
        priority: "Medium",
        whyNow: "Case synthesis + precedent retrieval",
        signals: "Citation traceability needed",
      },
      {
        label: "Professional Services",
        slug: "professional-services",
        priority: "High",
        whyNow: "Repeatable client workflows",
        signals: "Knowledge reuse ROI",
      },
      {
        label: "Logistics",
        slug: "logistics",
        priority: "Medium",
        whyNow: "Coordination + exception handling",
        signals: "Operational intelligence",
      },
      {
        label: "Research / Academia",
        slug: "research-academia",
        priority: "High",
        whyNow: "Synthesis across papers + domains",
        signals: "Evidence evaluation",
      },
      {
        label: "Manufacturing",
        slug: "manufacturing",
        priority: "Medium",
        whyNow: "Process + QA knowledge systems",
        signals: "Standardization leverage",
      },
    ],
    []
  );

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  };

  const row = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  };

  return (
    <Section className="py-24">
      <div className="mx-auto max-w-6xl" ref={ref}>
        {/* Header */}
        <div className="mb-10">
          <h2 className="font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
            Industries &amp; Market Opportunity
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr] md:items-end">
            <div className="text-[rgb(var(--gold))]">
              <div className="text-6xl font-semibold tracking-tight">$500B+</div>
              <div className="mt-2 text-sm tracking-wide text-[rgb(var(--muted))]">
                Total Addressable Market (placeholder)
              </div>
            </div>

            <p className="text-left md:text-center text-[rgb(var(--muted))]">
              Coverage map of industries where orchestration, synthesis, memory, and auditability create immediate value.
            </p>
          </div>
        </div>

        {/* “Table” header */}
        <div className="hidden md:grid grid-cols-[1.4fr_0.6fr_1.2fr_1.2fr_0.3fr] gap-4 px-5 py-3 text-xs font-semibold tracking-[0.22em] text-[rgb(var(--muted))]">
          <div>INDUSTRY</div>
          <div>PRIORITY</div>
          <div>WHY NOW</div>
          <div>EARLY SIGNAL</div>
          <div />
        </div>

        {/* Rows */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="divide-y divide-[rgba(var(--border),0.6)] rounded-[20px] border border-[rgba(var(--border),0.7)] bg-white/55 backdrop-blur"
        >
          {industries.map((x) => (
            <motion.div key={x.slug} variants={row}>
              <Link
                href={`/insights/industries/${x.slug}`}
                className="group grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr_1.2fr_1.2fr_0.3fr] gap-3 md:gap-4 px-5 py-5 transition-colors hover:bg-white/70"
              >
                <div className="text-lg font-semibold tracking-tight text-[rgb(var(--text))]">
                  {x.label}
                </div>

                <div className="text-sm">
                  <span
                    className={[
                      "inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
                      x.priority === "High"
                        ? "border-[rgba(var(--primary),0.35)] text-[rgb(var(--primary))] bg-[rgba(var(--primary),0.08)]"
                        : "border-[rgba(var(--border),0.8)] text-[rgb(var(--muted))] bg-white/40",
                    ].join(" ")}
                  >
                    {x.priority}
                  </span>
                </div>

                <div className="text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {x.whyNow}
                </div>

                <div className="text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {x.signals}
                </div>

                <div className="flex items-center justify-end text-[rgb(var(--primary))] opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-sm font-semibold text-[rgb(var(--primary2))]">
          Phase 1 Focus: Technology/SMBs + Research/Academia
        </div>
      </div>
    </Section>
  );
}