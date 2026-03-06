"use client";

import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = [
  { label: "CEO",        color: "#F59E0B", icon: "👔" },
  { label: "Sales",      color: "#EF4444", icon: "📊" },
  { label: "Marketing",  color: "#EC4899", icon: "📣" },
  { label: "Operations", color: "#64748B", icon: "⚙️" },
  { label: "Product",    color: "#06B6D4", icon: "🛠️" },
  { label: "Finance",    color: "#8B5CF6", icon: "💰" },
];

const TOOLS = [
  { name: "ChatGPT",  price: "$20/mo", color: "#10A37F" },
  { name: "Copilot",  price: "$30/mo", color: "#4285F4" },
  { name: "Jasper",   price: "$49/mo", color: "#E91E63" },
  { name: "Monday",   price: "$24/mo", color: "#FF6F00" },
  { name: "Notion AI",price: "$10/mo", color: "#505050" },
  { name: "Zapier",   price: "$20/mo", color: "#FF4A00" },
];

const CHAOS_QUERIES = [
  { role: "CEO",        tool: "ChatGPT",  q: "What should our Q2 strategy focus on?",          result: "Here are some general suggestions about Q2 strategy..." },
  { role: "Sales",      tool: "Copilot",  q: "Draft a follow-up to the Meridian deal",         result: "I don't have context on that deal. Could you share the details?" },
  { role: "Marketing",  tool: "Jasper",   q: "Write copy for our product launch",              result: "What product? Tell me about your company and target audience..." },
  { role: "Finance",    tool: "ChatGPT",  q: "What's our burn rate with the new hires?",       result: "I'd need your financial data and headcount details to answer..." },
  { role: "Operations", tool: "Notion AI",q: "Which vendor contracts renew this month?",       result: "I don't have access to your contracts or calendar data..." },
];

const UNITE_QUERIES = [
  { role: "CEO",       q: "What should our Q2 strategy focus on?",   result: "Based on your sales pipeline growth (+34%), team capacity, and the product roadmap you approved last week — I'd recommend doubling down on enterprise outreach. Your marketing team's content is already driving 3x more inbound leads this quarter." },
  { role: "Sales",     q: "Draft a follow-up to the Meridian deal",  result: "Here's a follow-up based on your last call notes, their budget timeline, and the custom pricing Sarah approved. I've included the case study that matches their industry vertical." },
  { role: "Marketing", q: "Write copy for our product launch",        result: "Based on your product spec, competitive positioning, and the brand voice from your last 12 campaigns — here's launch copy that emphasizes the features your beta users rated highest." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "One login",               color: "#F59E0B", desc: "No more switching between ChatGPT, Copilot, Jasper, and five other tabs. One place for every question, every role." },
  { step: "02", title: "It learns your business", color: "#60a5fa", desc: "AI Unite remembers your deals, your team, your products, your decisions. Ask a marketing question — it already knows your sales pipeline." },
  { step: "03", title: "15+ AI models, best answer", color: "#34d399", desc: "We orchestrate responses from the best AI models for each question. You get the smartest answer, not just one model's guess." },
];

const GROWTH_STAGES = [
  { size: "1–10",   label: "Founding team", color: "#F59E0B", items: ["Replaces 5–7 AI subscriptions", "Knows every hat you wear", "Every decision remembered"] },
  { size: "10–50",  label: "Finding PMF",   color: "#60a5fa", items: ["New hires inherit company knowledge", "Translates between departments", "Surfaces collaboration gaps"] },
  { size: "50–200", label: "Scaling",       color: "#34d399", items: ["Enterprise intelligence, startup cost", "Zero migration from day one", "Knowledge never walks out the door"] },
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

// ─── Tool sprawl grid ─────────────────────────────────────────────────────────

function ToolSprawl() {
  return (
    <div className="flex flex-wrap gap-2 max-w-sm">
      {TOOLS.map((tool) => (
        <div
          key={tool.name}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: `${tool.color}33`,
          }}
        >
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: tool.color }} />
          <span className="text-white/90">{tool.name}</span>
          <span className="font-semibold" style={{ color: "#EF4444" }}>{tool.price}</span>
        </div>
      ))}
      {/* Total callout */}
      <div
        className="flex items-center px-3 py-2 rounded-xl border text-xs font-bold"
        style={{ background: "rgba(239,68,68,0.07)", borderColor: "rgba(239,68,68,0.2)", color: "#EF4444" }}
      >
        = $153+/mo per person
      </div>
    </div>
  );
}

// ─── Chaos demo (fragmented AI) ───────────────────────────────────────────────

function ChaosDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (typing) return;
    const t = setTimeout(() => { setStep((s) => (s + 1) % CHAOS_QUERIES.length); setTyping(true); }, 3800);
    return () => clearTimeout(t);
  }, [step, typing]);

  const q = CHAOS_QUERIES[step];
  const role = ROLES.find((r) => r.label === q.role)!;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${role.color}18`, border: `1.5px solid ${role.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
          {role.icon}
        </div>
        <span style={{ fontSize: 10, color: role.color, fontWeight: 700, letterSpacing: "0.12em" }}>
          YOU AS {q.role.toUpperCase()}
        </span>
        <span className="text-[10px] text-white/55">→ {q.tool}</span>
      </div>

      <div className="rounded-xl border border-white/10/50 bg-white/[0.07] px-4 py-3">
        <div className="text-[10px] text-white/55 mb-1 font-medium uppercase tracking-wider">You ask</div>
        <div className="text-sm text-white/90 leading-relaxed">{q.q}</div>
      </div>

      <div className="rounded-xl px-4 py-3" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.14)" }}>
        <div className="text-[10px] mb-1.5 font-medium uppercase tracking-wider" style={{ color: "#EF4444" }}>⚠️ AI responds</div>
        <div className="text-xs leading-relaxed italic text-white/55">
          <TypeWriter text={q.result} speed={15} delay={600} onDone={() => setTyping(false)} key={step} />
        </div>
      </div>

      <div className="flex gap-1.5 justify-center pt-1">
        {CHAOS_QUERIES.map((_, i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === step ? "#EF4444" : "rgba(0,0,0,0.12)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── AI Unite response demo ───────────────────────────────────────────────────

function UniteDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(true);
  const green = "#34d399";

  useEffect(() => {
    if (typing) return;
    const t = setTimeout(() => { setStep((s) => (s + 1) % UNITE_QUERIES.length); setTyping(true); }, 5000);
    return () => clearTimeout(t);
  }, [step, typing]);

  const q = UNITE_QUERIES[step];
  const role = ROLES.find((r) => r.label === q.role)!;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${role.color}18`, border: `1.5px solid ${role.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
          {role.icon}
        </div>
        <span style={{ fontSize: 10, color: role.color, fontWeight: 700, letterSpacing: "0.12em" }}>
          YOU AS {q.role.toUpperCase()}
        </span>
        <span className="flex items-center gap-1 text-[10px]" style={{ color: green }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: green, boxShadow: `0 0 6px rgba(46,204,113,0.6)`, display: "inline-block" }} />
          AI Unite knows your context
        </span>
      </div>

      <div className="rounded-xl border border-white/10/50 bg-white/[0.07] px-4 py-3">
        <div className="text-[10px] text-white/55 mb-1 font-medium uppercase tracking-wider">You ask</div>
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
          <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === step ? green : "rgba(0,0,0,0.12)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Connected brain radial viz ───────────────────────────────────────────────

function ConnectedBrain() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const i = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(i);
  }, []);

  const green = "#34d399";
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 104;

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      {/* SVG lines + animated dots */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: size, height: size, zIndex: 0 }}>
        {ROLES.map((role, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const nx = cx + Math.cos(angle) * radius;
          const ny = cy + Math.sin(angle) * radius;
          const lx1 = cx + Math.cos(angle) * 42;
          const ly1 = cy + Math.sin(angle) * 42;
          const lx2 = cx + Math.cos(angle) * (radius - 22);
          const ly2 = cy + Math.sin(angle) * (radius - 22);
          return (
            <g key={role.label}>
              <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke={green} strokeWidth="1.5" strokeOpacity="0.25" />
              <circle r="2.5" fill={green} opacity="0.85">
                <animateMotion dur={`${2 + i * 0.28}s`} repeatCount="indefinite" path={`M${lx1},${ly1} L${lx2},${ly2}`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Centre brain node */}
      <div style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        width: 76, height: 76, borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(46,204,113,0.18), rgba(46,204,113,0.04))",
        border: `2px solid ${green}`,
        boxShadow: pulse ? `0 0 28px rgba(46,204,113,0.45), 0 0 8px rgba(46,204,113,0.3)` : `0 0 10px rgba(46,204,113,0.15)`,
        transition: "box-shadow 1.5s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 2, fontSize: 9, color: green, fontWeight: 700, textAlign: "center", lineHeight: 1.3,
      }}>
        AI<br />UNITE
      </div>

      {/* Role nodes */}
      {ROLES.map((role, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const nx = cx + Math.cos(angle) * radius;
        const ny = cy + Math.sin(angle) * radius;
        return (
          <div key={role.label}>
            <div style={{
              position: "absolute",
              left: nx - 20, top: ny - 20,
              width: 40, height: 40, borderRadius: "50%",
              background: `${role.color}12`,
              border: `1.5px solid ${role.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1, fontSize: 15,
            }}>
              {role.icon}
            </div>
            <div style={{
              position: "absolute",
              left: nx, top: ny + 24,
              transform: "translateX(-50%)",
              fontSize: 8, color: role.color, fontWeight: 600,
              textAlign: "center", whiteSpace: "nowrap",
            }}>
              {role.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold tracking-[0.22em] mb-3 uppercase" style={{ color: "#60a5fa" }}>
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

export default function SMBDeepDive() {
  return (
    <div style={{ background: "linear-gradient(135deg, #0a1a0f 0%, #0d2115 55%, #081a0c 100%)", borderRadius: 16, padding: "32px 24px" }}>

      {/* 1 ── THE PROBLEM ───────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>The daily reality</SectionLabel>
        <SectionHeading>
          Six roles. Six tools.{" "}
          <span style={{ color: "#EF4444" }}>Zero shared context.</span>
        </SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-white/55 max-w-2xl">
          Every AI you use starts with a blank slate. It doesn't know your team, your pipeline,
          your product, or what you promised a client yesterday. You re-explain your business
          dozens of times a day.
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <p className="text-xs font-semibold text-white/55 uppercase tracking-wider mb-4">
              Tool sprawl adding up
            </p>
            <ToolSprawl />
          </div>
          <ChaosDemo />
        </div>
      </div>

      {/* 2 ── STAT BAR ──────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-6 py-7 mb-12" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: "89%",   label: "of SMBs use AI daily",                    color: "#F59E0B" },
            { number: "4–7",   label: "AI subscriptions per company",             color: "#EF4444" },
            { number: "$153+", label: "per person, per month",                    color: "#EF4444" },
            { number: "0",     label: "of those tools talk to each other",        color: "rgba(255,255,255,0.50)" },
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
        <SectionLabel>One platform for everything you do</SectionLabel>
        <SectionHeading>
          AI that actually knows{" "}
          <span style={{ color: "#34d399" }}>your business.</span>
        </SectionHeading>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 items-center">
          <div className="flex flex-col items-center gap-3">
            <ConnectedBrain />
            <p className="text-xs italic text-center" style={{ color: "#34d399" }}>
              Every role connected. One brain that knows it all.
            </p>
          </div>
          <UniteDemo />
        </div>
      </div>

      <Divider />

      {/* 4 ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>How it works</SectionLabel>
        <SectionHeading>Simple by design</SectionHeading>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="rounded-2xl border border-white/10/60 bg-white/[0.07] p-5">
              <div className="text-3xl font-bold mb-2 leading-none select-none" style={{ color: `${item.color}70` }}>
                {item.step}
              </div>
              <div className="text-sm font-semibold mb-3" style={{ color: item.color }}>{item.title}</div>
              <p className="text-xs leading-relaxed text-white/55">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 5 ── GROWTH STORY ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Deployment path</SectionLabel>
        <SectionHeading>Grows with you</SectionHeading>
        <p className="mt-2 text-sm text-white/55">The same platform from day one to day one thousand.</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          {GROWTH_STAGES.map((stage, i) => (
            <div key={stage.size} className="relative">
              {i < 2 && (
                <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full border border-white/10 bg-white/5 text-white/55 text-xs">
                  →
                </div>
              )}
              <div
                className="h-full rounded-2xl border border-white/10/60 bg-white/[0.07] overflow-hidden"
                style={{ borderTop: `2.5px solid ${stage.color}` }}
              >
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

        <p className="text-center mt-8 text-sm italic" style={{ color: "#F59E0B" }}>
          Employee #51 is as smart as employee #1 — on their first day.
        </p>
      </div>

      <Divider />

      {/* 6 ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-8 py-10 text-center" style={{ background: "rgba(46,204,113,0.04)", border: "1px solid rgba(46,204,113,0.15)" }}>
        <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-3 leading-snug">
          Stop re-explaining your business<br />to your AI.
        </h3>
        <p className="text-sm text-white/55 max-w-md mx-auto mb-6 leading-relaxed">
          One platform. Every role. Full context. AI that works as hard as you do.
        </p>
        <a
          href="/contact?from=smb"
          className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
          style={{ background: "rgb(var(--primary))", color: "rgb(var(--bg))" }}
        >
          Get Started <span>→</span>
        </a>
        <p className="text-xs text-white/55 mt-4">No credit card required</p>
      </div>

    </div>
  );
}
