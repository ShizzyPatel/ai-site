"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import Container from "./Container";
import OnView from "./OnView";

type StepKey = "input" | "routes" | "conflicts" | "synthesis" | "output";

type ModelCard = {
  name: string;
  role: string;
  badge: string;
  accent: string; // css color
  summary: string;
};

export default function InteractiveProductRealitySection() {
  const steps: { key: StepKey; label: string }[] = useMemo(
    () => [
      { key: "input", label: "Input" },
      { key: "routes", label: "Model routing" },
      { key: "conflicts", label: "Conflict check" },
      { key: "synthesis", label: "Synthesis" },
      { key: "output", label: "Unified output" },
    ],
    []
  );

  const models: ModelCard[] = useMemo(
    () => [
      {
        name: "Model A",
        role: "Analyst",
        badge: "Reasoning",
        accent: "rgba(96, 165, 250, 1)", // blue
        summary:
          "Assumes EU expansion is viable if CAC stabilizes and support tooling scales. Recommends phased rollout (2 markets) with tight KPI gates.",
      },
      {
        name: "Model B",
        role: "Risk",
        badge: "Constraints",
        accent: "rgba(167, 139, 250, 1)", // purple
        summary:
          "Flags compliance + localization costs. Warns against Q2 unless privacy posture and incident response are audited and documented.",
      },
      {
        name: "Model C",
        role: "Operator",
        badge: "Execution",
        accent: "rgba(245, 158, 11, 1)", // gold
        summary:
          "Optimizes for speed: recommends one market pilot + partner channel first. Emphasizes enablement, onboarding, and support readiness.",
      },
    ],
    []
  );

  const [step, setStep] = useState<StepKey>("input");
  const [q, setQ] = useState(
    "Should we expand into Europe next quarter, and if so, how should we sequence it?"
  );
  const [openModel, setOpenModel] = useState<number | null>(0);

  const stepIndex = steps.findIndex((s) => s.key === step);

  const next = () => setStep(steps[Math.min(stepIndex + 1, steps.length - 1)].key);
  const prev = () => setStep(steps[Math.max(stepIndex - 1, 0)].key);

  return (
    <Section className="py-22 md:py-24" id="ipr">
      <Container>
        <OnView>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {/* Left: Copy + controls */}
            <div>
              <p className="text-sm font-semibold tracking-[0.22em] text-[rgb(var(--muted))]">
                INTERACTIVE PRODUCT REALITY
              </p>

              <h2 className="font-display mt-3 text-5xl md:text-6xl tracking-tight">
                One question. Multiple models. One unified answer.
              </h2>

              <p className="mt-5 max-w-2xl text-lg text-[rgb(var(--muted))]">
                AI UNITE routes a query to specialized “brains,” detects contradictions, and produces a single
                synthesis spine you can audit.
              </p>

              {/* Stepper */}
              <div className="mt-8 flex flex-wrap gap-2">
                {steps.map((s, i) => {
                  const active = s.key === step;
                  const done = i < stepIndex;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setStep(s.key)}
                      className={[
                        "rounded-full border px-4 py-2 text-sm transition",
                        active
                          ? "border-[rgba(var(--primary),0.55)] bg-[rgba(var(--primary),0.12)] text-[rgb(var(--text))]"
                          : done
                            ? "border-[rgba(var(--border),0.7)] bg-white/[0.03] text-[rgb(var(--text))]/85 hover:bg-white/[0.05]"
                            : "border-[rgba(var(--border),0.55)] bg-transparent text-[rgb(var(--muted))] hover:bg-white/[0.04]",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={prev}
                  disabled={stepIndex === 0}
                  className="rounded-xl border border-[rgba(var(--border),0.7)] bg-white/[0.03] px-4 py-2 text-sm text-[rgb(var(--text))] disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  onClick={next}
                  disabled={stepIndex === steps.length - 1}
                  className="rounded-xl border border-[rgba(var(--primary),0.6)] bg-[rgba(var(--primary),0.12)] px-4 py-2 text-sm text-[rgb(var(--text))] disabled:opacity-40"
                >
                  Next
                </button>

                <div className="ml-auto text-xs text-[rgb(var(--muted))]">
                  This is a simulation of the workflow UI.
                </div>
              </div>

              {/* Input */}
              <div className="mt-7 rounded-2xl border border-[rgba(var(--border),0.65)] bg-white/[0.03] p-5">
                <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--muted))]">
                  QUERY
                </div>
                <textarea
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="mt-3 h-24 w-full resize-none rounded-xl border border-[rgba(var(--border),0.65)] bg-[rgba(var(--bg),0.25)] p-3 text-sm text-[rgb(var(--text))] outline-none focus:border-[rgba(var(--primary),0.7)]"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
                  <span>Routing, contradiction checks, and synthesis are shown on the right.</span>
                  <span className="tabular-nums">{q.length} chars</span>
                </div>
              </div>
            </div>

            {/* Right: System simulation panel */}
            <div className="rounded-2xl border border-[rgba(var(--border),0.7)] bg-[rgba(var(--bg),0.18)] p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-[rgb(var(--text))]">Orchestration Trace</div>
                <div className="rounded-full border border-[rgba(var(--border),0.7)] bg-white/[0.03] px-3 py-1 text-xs text-[rgb(var(--muted))]">
                  Audit-ready pipeline
                </div>
              </div>

              <div className="mt-5">
                <AnimatePresence mode="wait">
                  {step === "input" && (
                    <Panel key="input" title="Step 1 — Intake">
                      <TraceLine label="Normalize request" status="ok" />
                      <TraceLine label="Extract constraints & intent" status="ok" />
                      <TraceLine label="Prepare candidate brains" status="pending" />
                    </Panel>
                  )}

                  {step === "routes" && (
                    <Panel key="routes" title="Step 2 — Route to Specialized Brains">
                      <div className="grid gap-3">
                        {models.map((m, idx) => (
                          <button
                            key={m.name}
                            onClick={() => setOpenModel(openModel === idx ? null : idx)}
                            className="text-left rounded-2xl border border-[rgba(var(--border),0.7)] bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-[rgb(var(--text))]">
                                    {m.name}
                                  </span>
                                  <span
                                    className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                                    style={{
                                      background: "rgba(255,255,255,0.06)",
                                      border: "1px solid rgba(255,255,255,0.08)",
                                      color: m.accent,
                                    }}
                                  >
                                    {m.badge}
                                  </span>
                                </div>
                                <div className="mt-1 text-xs text-[rgb(var(--muted))]">{m.role}</div>
                              </div>

                              <motion.div
                                initial={false}
                                animate={{ rotate: openModel === idx ? 180 : 0 }}
                                className="text-[rgb(var(--muted))]"
                              >
                                ▾
                              </motion.div>
                            </div>

                            <AnimatePresence>
                              {openModel === idx && (
                                <motion.div
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                  className="mt-3 text-sm leading-relaxed text-[rgb(var(--text))]/85"
                                >
                                  {m.summary}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4">
                        <TraceLine label="Parallel responses collected" status="ok" />
                        <TraceLine label="Extract claims + assumptions" status="ok" />
                      </div>
                    </Panel>
                  )}

                  {step === "conflicts" && (
                    <Panel key="conflicts" title="Step 3 — Detect Contradictions">
                      <div className="rounded-2xl border border-[rgba(var(--border),0.7)] bg-white/[0.03] p-4">
                        <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--muted))]">
                          CONFLICTS
                        </div>

                        <div className="mt-3 space-y-2 text-sm">
                          <ConflictItem
                            left="Model A"
                            right="Model B"
                            text="Timing risk: go next quarter vs wait for compliance posture"
                          />
                          <ConflictItem
                            left="Model A"
                            right="Model C"
                            text="Scope: 2-market rollout vs 1-market pilot"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <TraceLine label="Contradictions flagged" status="warn" />
                        <TraceLine label="Request missing data points" status="pending" />
                      </div>
                    </Panel>
                  )}

                  {step === "synthesis" && (
                    <Panel key="synthesis" title="Step 4 — Synthesis Engine">
                      <div className="grid gap-3">
                        <SynthesisBlock title="Resolve scope">
                          Choose one-market pilot first, then expand to second market only if KPI gates clear.
                        </SynthesisBlock>
                        <SynthesisBlock title="Resolve timing">
                          Proceed next quarter only if privacy + incident response docs are complete; otherwise delay.
                        </SynthesisBlock>
                        <SynthesisBlock title="Produce reasoning spine">
                          Convert conclusions into a structured plan with assumptions, risks, and measurable outcomes.
                        </SynthesisBlock>
                      </div>

                      <div className="mt-4">
                        <TraceLine label="Synthesis graph built" status="ok" />
                        <TraceLine label="Policy + guardrails applied" status="ok" />
                      </div>
                    </Panel>
                  )}

                  {step === "output" && (
                    <Panel key="output" title="Step 5 — Unified Output">
                      <div className="rounded-2xl border border-[rgba(var(--border),0.7)] bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--muted))]">
                            RECOMMENDATION
                          </div>
                          <div className="rounded-full border border-[rgba(var(--border),0.7)] bg-white/[0.03] px-3 py-1 text-[11px] text-[rgb(var(--muted))]">
                            Synthesis Spine
                          </div>
                        </div>

                        <div className="mt-3 text-sm leading-relaxed text-[rgb(var(--text))]/90">
                          <p className="mb-3">
                            **Yes — but sequence it.** Start with a single market pilot next quarter, and gate expansion on
                            CAC stability, support readiness, and documented privacy posture.
                          </p>
                          <ul className="ml-5 list-disc space-y-2">
                            <li>
                              **Pilot market**: pick one country with lower localization overhead and clear compliance
                              pathway.
                            </li>
                            <li>
                              **KPI gates (30–45 days)**: retention, support volume, CAC, and time-to-resolution.
                            </li>
                            <li>
                              **Risk controls**: finalize incident response + data retention policy before scaling.
                            </li>
                          </ul>
                          <p className="mt-3">
                            If the pilot clears gates, expand to a second market with the same playbook.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <TraceLine label="Output emitted (auditable)" status="ok" />
                        <TraceLine label="Preference memory updated" status="ok" />
                      </div>
                    </Panel>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer note */}
              <div className="mt-5 text-xs text-[rgb(var(--muted))]">
                Premium sites show mechanisms. This section is meant to feel like a real trace, not marketing copy.
              </div>
            </div>
          </div>
        </OnView>
      </Container>
    </Section>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="rounded-2xl border border-[rgba(var(--border),0.7)] bg-white/[0.02] p-4 md:p-5"
    >
      <div className="text-sm font-semibold text-[rgb(var(--text))]">{title}</div>
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}

function TraceLine({ label, status }: { label: string; status: "ok" | "warn" | "pending" }) {
  const tone =
    status === "ok"
      ? "rgba(34, 197, 94, 0.9)"
      : status === "warn"
        ? "rgba(245, 158, 11, 0.95)"
        : "rgba(148, 163, 184, 0.95)";

  const dot =
    status === "ok" ? "●" : status === "warn" ? "●" : "○";

  return (
    <div className="flex items-center justify-between gap-4 py-2 text-sm">
      <div className="flex items-center gap-3">
        <span style={{ color: tone }} className="text-[10px]">
          {dot}
        </span>
        <span className="text-[rgb(var(--text))]/85">{label}</span>
      </div>
      <span className="text-xs text-[rgb(var(--muted))]">
        {status === "ok" ? "ok" : status === "warn" ? "review" : "pending"}
      </span>
    </div>
  );
}

function ConflictItem({ left, right, text }: { left: string; right: string; text: string }) {
  return (
    <div className="rounded-xl border border-[rgba(var(--border),0.7)] bg-[rgba(239,68,68,0.06)] px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-[rgb(var(--text))]/85">
          {left} ↔ {right}
        </div>
        <div className="text-[11px] text-[rgb(var(--muted))]">contradiction</div>
      </div>
      <div className="mt-1 text-sm text-[rgb(var(--text))]/85">{text}</div>
    </div>
  );
}

function SynthesisBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[rgba(var(--border),0.7)] bg-white/[0.03] p-4">
      <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--muted))]">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-[rgb(var(--text))]/85">{children}</div>
    </div>
  );
}