"use client";

import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const DEPTS = [
  { label: "Sales",       color: "#EF4444", icon: "📊" },
  { label: "Marketing",   color: "#F59E0B", icon: "📣" },
  { label: "Engineering", color: "#06B6D4", icon: "⚙️" },
  { label: "Finance",     color: "#8B5CF6", icon: "💰" },
  { label: "Operations",  color: "#64748B", icon: "🏭" },
  { label: "HR",          color: "#EC4899", icon: "👥" },
  { label: "Legal",       color: "#14B8A6", icon: "⚖️" },
  { label: "Product",     color: "#3B82F6", icon: "🛠️" },
  { label: "Support",     color: "#F97316", icon: "🎧" },
];

const SILO_QUERIES = [
  { dept: "Sales",       tool: "Salesforce AI", q: "Which enterprise accounts are at risk of churn this quarter?",        result: "Based on CRM data, 12 accounts show declining engagement. But I don't have context on product issues or support tickets driving their dissatisfaction..." },
  { dept: "Engineering", tool: "Copilot",        q: "What should we prioritize in the Q3 product roadmap?",               result: "Here are some general prioritization frameworks. I don't have visibility into what sales is hearing from customers or what support tickets are trending..." },
  { dept: "Marketing",   tool: "Jasper",         q: "Create messaging for our enterprise product launch",                 result: "I can generate copy, but I don't know your product specs, competitive positioning, or what your sales team needs to close deals..." },
  { dept: "Finance",     tool: "ChatGPT",        q: "Model the ROI impact of expanding our engineering team by 20%",      result: "I'd need your current headcount costs, revenue per engineer, project pipeline data, and HR's hiring timeline..." },
  { dept: "HR",          tool: "Workday AI",     q: "Which departments have the highest attrition risk?",                 result: "Engagement scores are down in Engineering, but I can't correlate this with project load from Operations or compensation benchmarks from Finance..." },
];

const UNITE_QUERIES = [
  { dept: "Sales",       q: "Which enterprise accounts are at risk of churn?",     result: "14 accounts flagged. The top 3 — Meridian Corp, Axis Holdings, and NovaTech — all have open P1 support tickets (Engineering is aware), and their usage dropped 34% after last month's API change. Marketing is already drafting a retention campaign. I've connected the dots across your CRM, support queue, and product analytics." },
  { dept: "Engineering", q: "What should we prioritize in Q3?",                    result: "Based on 847 support tickets from Q2, Sales' pipeline blockers (3 enterprise deals waiting on SSO), and competitive analysis from Marketing — SSO and API versioning should be your top priorities. Finance has already approved headcount for a dedicated team. Here's a draft roadmap aligned across all stakeholders." },
  { dept: "Finance",     q: "Model the impact of expanding engineering by 20%",    result: "Using compensation data from HR, revenue-per-engineer from your last 4 quarters, the project pipeline from Product, and Operations' infrastructure costs — a 20% expansion yields an estimated 2.3x ROI within 18 months. The bottleneck is recruiting: HR projects 4.5 months to full capacity." },
];

const ARCH_LAYERS = [
  { step: "01", title: "UserBrain",      sub: "Per employee",     color: "#F59E0B", desc: "Every employee gets a personal AI that knows their role, projects, communication style, and history. No more re-explaining context." },
  { step: "02", title: "Workflow",       sub: "Per team",         color: "#2E75B6", desc: "AI that understands how your teams actually work — handoffs, approval chains, collaboration patterns. Surfaces what's falling through the cracks." },
  { step: "03", title: "CorporateBrain", sub: "Per organization", color: "#2ECC71", desc: "The connective tissue. Synthesizes intelligence across every department, team, and employee. When Sales asks a question, it has Engineering's context." },
  { step: "04", title: "15+ AI Models", sub: "Best answer wins",  color: "#8B5CF6", desc: "We orchestrate responses from the world's best AI models for each query type. Legal gets legal-optimized models. Financial analysis gets quantitative models." },
];

const REQUIREMENTS = [
  { icon: "🔒", title: "Complete Data Isolation", color: "#2ECC71", items: ["Multi-tenant architecture — every organization's data is fully isolated", "Per-tenant encryption and access controls", "Audit logging enabled by default with full query traceability", "SOC 2 ready infrastructure (encryption at rest, role-based access, tenant separation)"] },
  { icon: "🏗️", title: "Enterprise Architecture",  color: "#2E75B6", items: ["Circuit breakers and self-healing across all AI providers", "Parallel execution with intelligent stopping — no wasted compute","Cloud-native on GCP with auto-scaling and health monitoring", "Private deployment options available"] },
  { icon: "⚡",  title: "Zero Disruption",          color: "#F59E0B", items: ["Database-driven configuration — no code changes required", "New AI providers added without downtime", "RESTful API for integration with your existing stack", "Zero vendor lock-in — swap or add providers at any timePlugs into your existing stack via REST API"] },
];

const GROWTH_STAGES = [
  { size: "1 Team",     label: "Pilot",     color: "#F59E0B", items: ["Prove value in one department", "Measurable ROI within 30 days", "Zero integration friction"] },
  { size: "1 Division", label: "Expand",    color: "#2E75B6", items: ["Cross-team intelligence activated", "CorporateBrain starts connecting dots", "Workflow patterns emerge"] },
  { size: "Enterprise", label: "Transform", color: "#2ECC71", items: ["Full organizational intelligence", "Every department connected", "Competitive advantage compounding daily"] },
];

// ─── TypeWriter ───────────────────────────────────────────────────────────────

function TypeWriter({
  text,
  speed = 18,
  delay = 0,
  onDone,
}: {
  text: string;
  speed?: number;
  delay?: number;
  onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
      return () => clearTimeout(t);
    } else {
      onDone?.();
    }
  }, [displayed, started, text, speed, onDone]);

  return (
    <span>
      {displayed}
      <span style={{ opacity: displayed.length < text.length ? 1 : 0, transition: "opacity 0.3s" }}>|</span>
    </span>
  );
}

// ─── OrgGrid ──────────────────────────────────────────────────────────────────

function OrgGrid({ connected }: { connected: boolean }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const i = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(i);
  }, []);

  const green = "#2ECC71";
  const cols = 3;
  const cellW = 84;
  const cellH = 64;
  const gapX = 12;
  const gapY = 12;
  const totalW = cols * cellW + (cols - 1) * gapX;
  const totalH = 3 * cellH + 2 * gapY;
  const cx = totalW / 2;
  const cy = totalH / 2;

  return (
    <div style={{ maxWidth: totalW + 32, margin: "0 auto", position: "relative" }}>
      <svg
        width={totalW}
        height={totalH}
        style={{ position: "absolute", top: 0, left: 16, zIndex: 1, pointerEvents: "none" }}
      >
        {connected &&
          DEPTS.map((dept, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = col * (cellW + gapX) + cellW / 2;
            const y = row * (cellH + gapY) + cellH / 2;
            return (
              <g key={dept.label}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke={green} strokeWidth="1" strokeOpacity="0.18" />
                <circle r="2" fill={green} opacity="0.9">
                  <animateMotion dur={`${1.4 + i * 0.15}s`} repeatCount="indefinite" path={`M${cx},${cy} L${x},${y}`} />
                </circle>
              </g>
            );
          })}
      </svg>

      {connected && (
        <div
          style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            width: 48, height: 48, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(46,204,113,0.18), rgba(46,204,113,0.04))",
            border: `1.5px solid ${green}`,
            boxShadow: pulse
              ? `0 0 22px rgba(46,204,113,0.45), 0 0 6px rgba(46,204,113,0.3)`
              : `0 0 8px rgba(46,204,113,0.15)`,
            transition: "box-shadow 1.5s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10, fontSize: 6.5, color: green,
            fontWeight: 700, textAlign: "center", lineHeight: 1.25,
          }}
        >
          Corporate<br />Brain
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellW}px)`,
          gap: `${gapY}px ${gapX}px`,
          position: "relative", zIndex: 2,
          margin: "0 16px",
        }}
      >
        {DEPTS.map((dept) => (
          <div
            key={dept.label}
            style={{
              height: cellH, borderRadius: 9,
              background: connected ? `${dept.color}10` : "rgba(255,255,255,0.025)",
              border: `1.5px solid ${connected ? dept.color + "3E" : "rgba(255,255,255,0.07)"}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 4,
              transition: "all 0.5s ease",
            }}
          >
            <span style={{ fontSize: 16 }}>{dept.icon}</span>
            <span style={{ fontSize: 7.5, color: connected ? dept.color : "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.03em" }}>
              {dept.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SiloDemo ─────────────────────────────────────────────────────────────────

function SiloDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (typing) return;
    const t = setTimeout(() => { setStep((s) => (s + 1) % SILO_QUERIES.length); setTyping(true); }, 4000);
    return () => clearTimeout(t);
  }, [step, typing]);

  const q = SILO_QUERIES[step];
  const d = DEPTS.find((d) => d.label === q.dept)!;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div style={{ width: 27, height: 27, borderRadius: "50%", background: `${d.color}18`, border: `1.5px solid ${d.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>
          {d.icon}
        </div>
        <span style={{ fontSize: 10, color: d.color, fontWeight: 700, letterSpacing: "0.12em" }}>{q.dept.toUpperCase()}</span>
        <span className="text-[10px] text-white/55">→ {q.tool}</span>
      </div>

      <div className="rounded-xl border border-white/10/50 bg-white/[0.07] px-4 py-3">
        <div className="text-[10px] text-white/55 mb-1 font-medium uppercase tracking-wider">Team asks</div>
        <div className="text-sm text-white/90 leading-relaxed">{q.q}</div>
      </div>

      <div className="rounded-xl px-4 py-3" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.14)" }}>
        <div className="text-[10px] mb-1.5 font-medium uppercase tracking-wider" style={{ color: "#EF4444" }}>⚠️ AI responds</div>
        <div className="text-xs leading-relaxed italic text-white/55">
          <TypeWriter text={q.result} speed={15} delay={500} onDone={() => setTyping(false)} key={step} />
        </div>
      </div>

      <div className="flex gap-1.5 justify-center pt-1">
        {SILO_QUERIES.map((_, i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === step ? "#EF4444" : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── UniteDemo ────────────────────────────────────────────────────────────────

function UniteDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (typing) return;
    const t = setTimeout(() => { setStep((s) => (s + 1) % UNITE_QUERIES.length); setTyping(true); }, 5500);
    return () => clearTimeout(t);
  }, [step, typing]);

  const q = UNITE_QUERIES[step];
  const d = DEPTS.find((d) => d.label === q.dept)!;
  const green = "#2ECC71";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div style={{ width: 27, height: 27, borderRadius: "50%", background: `${d.color}18`, border: `1.5px solid ${d.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>
          {d.icon}
        </div>
        <span style={{ fontSize: 10, color: d.color, fontWeight: 700, letterSpacing: "0.12em" }}>{q.dept.toUpperCase()}</span>
        <span className="flex items-center gap-1 text-[10px]" style={{ color: green }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: green, boxShadow: `0 0 6px rgba(46,204,113,0.6)`, display: "inline-block" }} />
          CorporateBrain connected
        </span>
      </div>

      <div className="rounded-xl border border-white/10/50 bg-white/[0.07] px-4 py-3">
        <div className="text-[10px] text-white/55 mb-1 font-medium uppercase tracking-wider">Team asks</div>
        <div className="text-sm text-white/90 leading-relaxed">{q.q}</div>
      </div>

      <div className="rounded-xl px-4 py-3" style={{ background: "rgba(46,204,113,0.04)", border: "1px solid rgba(46,204,113,0.14)" }}>
        <div className="flex items-center gap-1.5 text-[10px] mb-1.5 font-medium uppercase tracking-wider" style={{ color: green }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: green, boxShadow: `0 0 8px rgba(46,204,113,0.5)`, display: "inline-block" }} />
          AI Unite responds
        </div>
        <div className="text-xs leading-relaxed text-white/90">
          <TypeWriter text={q.result} speed={9} delay={400} onDone={() => setTyping(false)} key={step + "u"} />
        </div>
      </div>

      <div className="flex gap-1.5 justify-center pt-1">
        {UNITE_QUERIES.map((_, i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === step ? green : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Small shared primitives ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold tracking-[0.22em] text-[rgb(var(--primary))] mb-3 uppercase">
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl md:text-2xl font-semibold text-white/90 leading-snug">
      {children}
    </h3>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10 my-12" />;
}

// ─── Main export ──────────────────────────────────────────────────────────────
// NOTE: No scroll-triggered opacity/transform wrappers inside this component.
// DeepDive.tsx measures scrollHeight via ResizeObserver to animate open/close height.
// If child elements start invisible (opacity:0 / transform), scrollHeight still
// returns the full layout height, so the animation is unaffected — but to keep
// things simple and predictable we avoid that pattern here entirely.

export default function EnterpriseDeepDive() {
  return (
    <div style={{ background: "linear-gradient(135deg, #0f1729 0%, #111827 60%, #0d1520 100%)", borderRadius: 16, padding: "32px 24px" }}>

      {/* 1 ── THE PROBLEM ───────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>The enterprise reality</SectionLabel>
        <SectionHeading>
          Nine departments. Nine AI tools.{" "}
          <span style={{ color: "#EF4444" }}>Nine blind spots.</span>
        </SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-white/55 max-w-2xl">
          Engineering doesn't know what Sales is hearing. Finance can't see Product's roadmap.
          HR's attrition data never reaches the teams it explains. Every AI tool answers in a vacuum —
          missing the cross-departmental context that drives real decisions.
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
          <div style={{ background: "linear-gradient(135deg, #0f1729 0%, #111827 60%, #0d1520 100%)", borderRadius: 16, padding: "32px 24px" }}>
            <OrgGrid connected={false} />
            <p className="text-center text-xs mt-3 italic" style={{ color: "#EF4444" }}>
              No connections. Every department is an island.
            </p>
          </div>
          <SiloDemo />
        </div>
      </div>

      {/* 2 ── STAT BAR ──────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-6 py-7 mb-12" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[ 
            { number: "$3.1T", label: "lost annually to data silos", color: "#EF4444" },
            { number: "80%",   label: "of executives say silos hurt decision-making", color: "#F59E0B" },
            { number: "20+",   label: "AI tools in the average enterprise", color: "#EF4444" },
            { number: "0",     label: "that share context across departments", color: "rgba(255,255,255,0.45)" },
          ].map(({ number, label, color }) => (
            <div key={number} className="text-center">
              <div className="text-2xl md:text-3xl font-bold leading-none mb-2" style={{ color }}>{number}</div>
              <div className="text-xs text-white/55 leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 3 ── THE SOLUTION ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>CorporateBrain — enterprise intelligence</SectionLabel>
        <SectionHeading>
          Every department connected.{" "}
          <span style={{ color: "#2ECC71" }}>Every decision informed.</span>
        </SectionHeading>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
          <div style={{ background: "linear-gradient(135deg, #0f1729 0%, #111827 60%, #0d1520 100%)", borderRadius: 16, padding: "32px 24px" }}>
            <OrgGrid connected={true} />
            <p className="text-center text-xs mt-3 italic" style={{ color: "#2ECC71" }}>
              CorporateBrain connects every node. Intelligence flows everywhere.
            </p>
          </div>
          <UniteDemo />
        </div>
      </div>

      <Divider />

      {/* 4 ── ARCHITECTURE ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Intelligence architecture</SectionLabel>
        <SectionHeading>How the intelligence layers work</SectionHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ARCH_LAYERS.map((item) => (
            <div key={item.step} className="rounded-2xl border border-white/10/60 bg-white/[0.06] p-5">
              <div className="text-3xl font-bold mb-2 leading-none select-none" style={{ color: item.color }}>
                {item.step}
              </div>
              <div className="text-sm font-semibold mb-0.5" style={{ color: item.color }}>{item.title}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] font-semibold text-white/55 mb-3">{item.sub}</div>
              <p className="text-xs leading-relaxed text-white/55">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 5 ── ENTERPRISE REQUIREMENTS ───────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Requirements</SectionLabel>
        <SectionHeading>Built for enterprise requirements</SectionHeading>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {REQUIREMENTS.map((card) => (
            <div key={card.title} className="rounded-2xl border border-white/10/60 bg-white/[0.06] p-6">
              <div className="text-2xl mb-3">{card.icon}</div>
              <div className="text-sm font-semibold mb-4" style={{ color: card.color }}>{card.title}</div>
              <ul className="space-y-2.5">
                {card.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 items-start">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: card.color }} />
                    <span className="text-xs leading-relaxed text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 6 ── GROWTH STAGES ─────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Deployment path</SectionLabel>
        <SectionHeading>Scales across your organization</SectionHeading>
        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          {GROWTH_STAGES.map((stage, i) => (
            <div key={stage.size} className="relative">
              {i < 2 && (
                <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full border border-white/10/40 bg-[rgb(var(--bg))] text-white/55 text-xs">
                  →
                </div>
              )}
              <div className="h-full rounded-2xl border border-white/10/60 bg-white/[0.06] overflow-hidden" style={{ borderTop: `2.5px solid ${stage.color}` }}>
                <div className="p-6" style={{ background: `linear-gradient(180deg, ${stage.color}07 0%, transparent 55%)` }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: stage.color }}>{stage.size}</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] font-semibold mb-5 text-white/55">{stage.label}</div>
                  <ul className="space-y-3">
                    {stage.items.map((item, j) => (
                      <li key={j} className="flex gap-2.5 items-start">
                        <span className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: stage.color }} />
                        <span className="text-xs leading-relaxed text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-sm italic text-[rgb(var(--primary))]">
          When every department thinks with the context of every other department — that's when real transformation happens.
        </p>
      </div>

      <Divider />

      {/* 7 ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-8 py-10 text-center" style={{ background: "rgba(46,204,113,0.04)", border: "1px solid rgba(46,204,113,0.15)" }}>
        <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-3 leading-snug">
          Your org chart is connected.<br />
          Your intelligence should be too.
        </h3>
        <p className="text-sm text-white/55 max-w-md mx-auto mb-6 leading-relaxed">
          One platform. Every department. Full organizational context. The Switzerland of AI —
          vendor-neutral, enterprise-grade.
        </p>
        <a
          href="/contact?from=enterprise"
          className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
          style={{ background: "rgb(var(--primary))", color: "rgb(var(--bg))" }}
        >
          Schedule a Demo <span>→</span>
        </a>
        <p className="text-xs text-white/55 mt-4">Enterprise pilots available for qualified organizations</p>
      </div>

    </div>
  );
}
