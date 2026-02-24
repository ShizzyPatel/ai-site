"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Check, Minus, Waves, Info } from "lucide-react";
import Section from "./Section";

type VendorKey = "aiunite" | "watson" | "copilot" | "bedrock";
type CellValue = "yes" | "no" | "partial";

type Row = {
  capability: string;
  tooltip?: string;
  values: Record<VendorKey, CellValue>;
};

const vendors: Array<{ key: VendorKey; label: string }> = [
  { key: "aiunite", label: "AI UNITE" },
  { key: "watson", label: "IBM Watson" },
  { key: "copilot", label: "MS Copilot" },
  { key: "bedrock", label: "AWS Bedrock" },
];

const rows: Row[] = [
  {
    capability: "Multi-AI Orchestration",
    tooltip: "Route, compare, and fuse outputs across multiple AI providers (not just one model stack).",
    values: { aiunite: "yes", watson: "no", copilot: "no", bedrock: "partial" },
  },
  {
    capability: "Cross-Domain Synthesis",
    tooltip: "Creates unified reasoning across domains instead of separate, siloed answers.",
    values: { aiunite: "yes", watson: "no", copilot: "no", bedrock: "no" },
  },
  {
    capability: "Autonomous Learning",
    tooltip: "Persistent workers that generate hypotheses, validate, and accumulate knowledge continuously.",
    values: { aiunite: "yes", watson: "no", copilot: "no", bedrock: "no" },
  },
  {
    capability: "Vendor Agnostic",
    tooltip: "No lock-in. Works across providers and can swap / add providers over time.",
    values: { aiunite: "yes", watson: "no", copilot: "no", bedrock: "partial" },
  },
  {
    capability: "Real-Time Data Integration",
    tooltip: "Connects to live data streams + tools (APIs, internal systems) with real-time context.",
    values: { aiunite: "yes", watson: "partial", copilot: "no", bedrock: "partial" },
  },
  {
    capability: "Self-Evolution",
    tooltip: "Improves via longitudinal memory + autonomous feedback loops (not just prompt tuning).",
    values: { aiunite: "yes", watson: "no", copilot: "no", bedrock: "no" },
  },
  {
    capability: "UserBrain / Twin Brain",
    tooltip: "A personalized intelligence layer that learns the user/org and adapts decisions over time.",
    values: { aiunite: "yes", watson: "no", copilot: "no", bedrock: "no" },
  },
  {
    capability: "Patent Protected",
    tooltip: "Core architecture and methods protected by IP (as applicable).",
    values: { aiunite: "yes", watson: "yes", copilot: "yes", bedrock: "no" },
  },
];

function iconFor(v: CellValue) {
  if (v === "yes") return Check;
  if (v === "partial") return Waves;
  return Minus;
}

function colorFor(v: CellValue) {
  if (v === "yes") return "rgba(52,211,153,1)"; // emerald-ish
  if (v === "partial") return "rgba(245,158,11,1)"; // amber-ish
  return "rgba(148,163,184,1)"; // slate
}

export default function CompetitiveComparisonSection() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <Section className="py-24" id="compare">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <div className="mb-10">

          <h2 className="mt-4 font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
            How We Compare
          </h2>
        </div>

        {/* table wrapper */}
        <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-white/35 backdrop-blur">
          {/* subtle background wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(900px 420px at 25% 0%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(700px 420px at 85% 100%, rgba(99,102,241,0.08), transparent 60%)",
            }}
          />

          <div className="relative w-full overflow-x-auto">
            <table className="min-w-[920px] w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 bg-transparent">
                    <div className="h-16 px-6 flex items-center text-[rgb(var(--muted))] font-semibold">
                      Capability
                    </div>
                  </th>

                  {vendors.map((v) => (
                    <th key={v.key}>
                      <div
                        className={[
                          "h-16 px-6 flex items-center justify-center font-semibold",
                          v.key === "aiunite"
                            ? "text-[rgb(var(--primary))]"
                            : "text-[rgb(var(--muted))]",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "w-full rounded-2xl border border-[rgb(var(--border))] py-3 text-center",
                            v.key === "aiunite"
                              ? "bg-[rgb(var(--primary))]/10"
                              : "bg-white/20",
                          ].join(" ")}
                        >
                          {v.label}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rIdx) => (
                  <tr key={row.capability}>
                    {/* Capability (sticky) */}
                    <td className="sticky left-0 z-10 bg-transparent">
                      <div className="group flex items-center gap-3 px-6 py-5 border-t border-[rgb(var(--border))]">
                        <div className="text-[rgb(var(--text))] font-medium">
                          {row.capability}
                        </div>

                        {row.tooltip ? (
                          <div className="relative">
                            <Info className="h-4 w-4 text-[rgb(var(--muted))] opacity-70 group-hover:opacity-100 transition" />
                            <div className="pointer-events-none absolute left-1/2 top-[125%] w-[320px] -translate-x-1/2 rounded-xl border border-[rgb(var(--border))] bg-white/85 px-4 py-3 text-sm text-[rgb(var(--text))] shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition">
                              {row.tooltip}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </td>

                    {/* Vendor cells */}
                    {vendors.map((v, cIdx) => {
                      const val = row.values[v.key];
                      const Icon = iconFor(val);
                      const baseTint =
                        v.key === "aiunite"
                          ? "bg-[rgb(var(--primary))]/7"
                          : "bg-white/10";

                      return (
                        <td key={v.key}>
                          <div
                            className={[
                              "px-6 py-5 border-t border-[rgb(var(--border))]",
                              baseTint,
                            ].join(" ")}
                          >
                            <div className="flex items-center justify-center">
                              <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                                animate={
                                  inView
                                    ? { opacity: 1, y: 0, scale: 1 }
                                    : { opacity: 0, y: 8, scale: 0.9 }
                                }
                                transition={{
                                  duration: 0.45,
                                  ease: "easeOut",
                                  delay: 0.08 * rIdx + 0.04 * cIdx,
                                }}
                                className="flex items-center justify-center"
                                title={
                                  val === "yes"
                                    ? "Supported"
                                    : val === "partial"
                                      ? "Partial"
                                      : "Not supported"
                                }
                              >
                                <Icon
                                  className="h-7 w-7"
                                  style={{ color: colorFor(val) }}
                                  strokeWidth={2.6}
                                />
                              </motion.div>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* bottom fade (nice finish) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 opacity-60"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.85))",
            }}
          />
        </div>
      </div>
    </Section>
  );
}