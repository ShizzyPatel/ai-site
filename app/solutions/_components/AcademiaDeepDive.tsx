"use client";

import { useState, useEffect } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = [
  { label: "Researcher",    color: "#3B82F6", icon: "🔬" },
  { label: "Grant Writer",  color: "#8B5CF6", icon: "📝" },
  { label: "Lecturer",      color: "#F59E0B", icon: "🎓" },
  { label: "Dept Admin",    color: "#64748B", icon: "🏛️" },
  { label: "Mentor",        color: "#EC4899", icon: "🤝" },
  { label: "Peer Reviewer", color: "#06B6D4", icon: "📋" },
];

const TOOLS = [
  { name: "ChatGPT",   price: "$20/mo", color: "#10A37F" },
  { name: "Elicit",    price: "$10/mo", color: "#6366F1" },
  { name: "Scite",     price: "$20/mo", color: "#3B82F6" },
  { name: "Grammarly", price: "$30/mo", color: "#15803D" },
  { name: "Copilot",   price: "$30/mo", color: "#4285F4" },
  { name: "Consensus", price: "$10/mo", color: "#8B5CF6" },
];

const CHAOS_QUERIES = [
  { role: "Researcher",    tool: "Elicit",    q: "What are the latest findings on CRISPR delivery mechanisms in neuronal tissue?",  result: "Here are 12 papers from the last year. Would you like me to summarize them?" },
  { role: "Grant Writer",  tool: "ChatGPT",   q: "Help me write the significance section for my NIH R01 renewal",                   result: "I'd need to know your research area, preliminary data, and what reviewers said last cycle..." },
  { role: "Lecturer",      tool: "Copilot",   q: "Create a problem set on quantum entanglement for my 300-level course",            result: "Here are some generic quantum mechanics problems. What level are your students?" },
  { role: "Mentor",        tool: "ChatGPT",   q: "Draft feedback on Sarah's dissertation chapter 3 methodology",                    result: "I haven't read the dissertation. Can you paste the chapter?" },
  { role: "Dept Admin",    tool: "ChatGPT",   q: "Which faculty are up for tenure review this cycle?",                              result: "I don't have access to your department records..." },
];

const UNITE_QUERIES = [
  { role: "Researcher",   q: "What are the latest findings on CRISPR delivery in neuronal tissue?",  result: "Based on your lab's AAV-9 vector work and the 14 papers you've flagged this quarter — three new studies are directly relevant. Notably, Dr. Park's nanoparticle approach in Chemistry aligns with the delivery barrier your R01 renewal addresses. Want me to draft a cross-departmental collaboration email?" },
  { role: "Grant Writer", q: "Help me write the significance section for my R01 renewal",            result: "Drawing from your preliminary data (Fig. 3–7 from your last submission), reviewer critiques requesting stronger clinical relevance, and your new collaboration with the med school — here's a significance section that addresses each concern while incorporating your latest Nature Communications publication." },
  { role: "Lecturer",     q: "Create a problem set on quantum entanglement for Physics 301",         result: "Based on your teaching style, last semester's exam performance (students struggled with Bell inequalities), and your research on quantum decoherence — here's a scaffolded problem set that builds from your lecture 12 examples toward your own published experimental results." },
];

const DISCIPLINES = [
  { name: "Climate Science",   color: "#22C55E", icon: "🌍" },
  { name: "Materials Science", color: "#3B82F6", icon: "🔧" },
  { name: "Computer Science",  color: "#06B6D4", icon: "💻" },
  { name: "Neuroscience",      color: "#EC4899", icon: "🧠" },
  { name: "Economics",         color: "#F59E0B", icon: "📈" },
  { name: "Public Health",     color: "#8B5CF6", icon: "🏥" },
];

const SYNTHESIS_EXAMPLES = [
  {
    fields: ["Climate Science", "Materials Science"],
    insight: "A new perovskite degradation study reveals thermal tolerance patterns that map directly onto your solar cell efficiency models — suggesting a 23% improvement pathway your lab hasn't explored.",
  },
  {
    fields: ["Neuroscience", "Computer Science"],
    insight: "The sparse coding patterns in your fMRI data share mathematical structure with the attention mechanisms in your CS colleague's transformer research — a potential Nature paper at the intersection.",
  },
  {
    fields: ["Economics", "Public Health"],
    insight: "Your behavioral economics framework for vaccine hesitancy aligns with new epidemiological models from the School of Public Health. Combined, they predict intervention effectiveness 3x more accurately.",
  },
];

const WHO_ITS_FOR = [
  {
    icon: "🔬", title: "Individual Researchers", color: "#3B82F6",
    desc: "One AI that knows your publications, your lab data, your grant deadlines, and your teaching load. Stop re-explaining your research to every tool.",
    items: ["Literature review with your context", "Grant writing with your data", "Teaching prep from your research"],
  },
  {
    icon: "🧪", title: "Research Labs & Teams", color: "#8B5CF6",
    desc: "Shared intelligence across your lab. New postdocs and grad students inherit the collective knowledge. Protocols, findings, and methods — all connected.",
    items: ["Onboard new lab members instantly", "Cross-reference ongoing experiments", "Collaborative grant preparation"],
  },
  {
    icon: "🏛️", title: "Universities & Institutions", color: "#F59E0B",
    desc: "Cross-departmental intelligence that surfaces collaboration opportunities, reduces duplicated research, and amplifies your institution's collective brain.",
    items: ["Discover cross-department synergies", "Institutional knowledge preservation", "Research impact amplification"],
  },
];

const GROWTH_STAGES = [
  { size: "1 Lab",      label: "Where it starts",          color: "#3B82F6", items: ["Replaces fragmented AI tools", "Knows your full research context", "Every insight preserved"] },
  { size: "1 Dept",     label: "Natural expansion",        color: "#8B5CF6", items: ["Cross-lab knowledge sharing", "Collaborative grant intelligence", "Shared methodology insights"] },
  { size: "University", label: "Institutional intelligence",color: "#F59E0B", items: ["Cross-disciplinary synthesis", "Institutional knowledge graph", "Research impact multiplied"] },
];

// ─── TypeWriter ───────────────────────────────────────────────────────────────

function TypeWriter({
  text, speed = 16, delay = 0, onDone,
}: { text: string; speed?: number; delay?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed(""); setStarted(false);
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
      return () => clearTimeout(t);
    } else { onDone?.(); }
  }, [displayed, started, text, speed, onDone]);

  return (
    <span>
      {displayed}
      <span style={{ opacity: displayed.length < text.length ? 1 : 0, transition: "opacity 0.3s" }}>|</span>
    </span>
  );
}

// ─── Tool sprawl ──────────────────────────────────────────────────────────────

function ToolSprawl() {
  return (
    <div className="flex flex-wrap gap-2 max-w-sm">
      {TOOLS.map((tool) => (
        <div key={tool.name} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: `${tool.color}33` }}>
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tool.color }} />
          <span className="text-[rgb(var(--text))]">{tool.name}</span>
          <span className="font-semibold" style={{ color: "#EF4444" }}>{tool.price}</span>
        </div>
      ))}
      <div className="flex items-center px-3 py-1.5 rounded-xl border text-xs font-bold"
        style={{ background: "rgba(239,68,68,0.07)", borderColor: "rgba(239,68,68,0.2)", color: "#EF4444" }}>
        = $120+/mo per researcher
      </div>
    </div>
  );
}

// ─── Chaos demo ───────────────────────────────────────────────────────────────

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
        <div style={{ width: 27, height: 27, borderRadius: "50%", background: `${role.color}18`, border: `1.5px solid ${role.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{role.icon}</div>
        <span style={{ fontSize: 10, color: role.color, fontWeight: 700, letterSpacing: "0.12em" }}>YOU AS {q.role.toUpperCase()}</span>
        <span className="text-[10px] text-[rgb(var(--muted))]">→ {q.tool}</span>
      </div>
      <div className="rounded-xl border border-[rgb(var(--border))]/50 bg-white/[0.03] px-4 py-3">
        <div className="text-[10px] text-[rgb(var(--muted))] mb-1 font-medium uppercase tracking-wider">You ask</div>
        <div className="text-sm text-[rgb(var(--text))] leading-relaxed">{q.q}</div>
      </div>
      <div className="rounded-xl px-4 py-3" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.14)" }}>
        <div className="text-[10px] mb-1.5 font-medium uppercase tracking-wider" style={{ color: "#EF4444" }}>⚠️ AI responds</div>
        <div className="text-xs leading-relaxed italic text-[rgb(var(--muted))]">
          <TypeWriter text={q.result} speed={17} delay={600} onDone={() => setTyping(false)} key={step} />
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

// ─── AI Unite demo ────────────────────────────────────────────────────────────

function UniteDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(true);
  const blue = "#3B82F6";

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
        <div style={{ width: 27, height: 27, borderRadius: "50%", background: `${role.color}18`, border: `1.5px solid ${role.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{role.icon}</div>
        <span style={{ fontSize: 10, color: role.color, fontWeight: 700, letterSpacing: "0.12em" }}>YOU AS {q.role.toUpperCase()}</span>
        <span className="flex items-center gap-1 text-[10px]" style={{ color: blue }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: blue, boxShadow: `0 0 6px rgba(59,130,246,0.6)`, display: "inline-block" }} />
          AI Unite knows your full context
        </span>
      </div>
      <div className="rounded-xl border border-[rgb(var(--border))]/50 bg-white/[0.03] px-4 py-3">
        <div className="text-[10px] text-[rgb(var(--muted))] mb-1 font-medium uppercase tracking-wider">You ask</div>
        <div className="text-sm text-[rgb(var(--text))] leading-relaxed">{q.q}</div>
      </div>
      <div className="rounded-xl px-4 py-3" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.14)" }}>
        <div className="flex items-center gap-1.5 text-[10px] mb-1.5 font-medium uppercase tracking-wider" style={{ color: blue }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: blue, boxShadow: `0 0 8px rgba(59,130,246,0.5)`, display: "inline-block" }} />
          AI Unite responds
        </div>
        <div className="text-xs leading-relaxed text-[rgb(var(--text))]">
          <TypeWriter text={q.result} speed={9} delay={400} onDone={() => setTyping(false)} key={step + "u"} />
        </div>
      </div>
      <div className="flex gap-1.5 justify-center pt-1">
        {UNITE_QUERIES.map((_, i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === step ? blue : "rgba(0,0,0,0.12)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Connected brain radial ───────────────────────────────────────────────────

function ConnectedBrain() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => { const i = setInterval(() => setPulse((p) => !p), 2000); return () => clearInterval(i); }, []);

  const blue = "#3B82F6";
  const size = 280; const cx = 140; const cy = 140; const radius = 106;

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg style={{ position: "absolute", top: 0, left: 0, width: size, height: size, zIndex: 0 }}>
        {ROLES.map((role, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const lx1 = cx + Math.cos(angle) * 38; const ly1 = cy + Math.sin(angle) * 38;
          const lx2 = cx + Math.cos(angle) * (radius - 20); const ly2 = cy + Math.sin(angle) * (radius - 20);
          return (
            <g key={role.label}>
              <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke={blue} strokeWidth="1.5" strokeOpacity="0.22" />
              <circle r="2.5" fill={blue} opacity="0.85">
                <animateMotion dur={`${2 + i * 0.28}s`} repeatCount="indefinite" path={`M${lx1},${ly1} L${lx2},${ly2}`} />
              </circle>
            </g>
          );
        })}
      </svg>
      {/* Centre */}
      <div style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        width: 72, height: 72, borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(59,130,246,0.04))",
        border: `2px solid ${blue}`,
        boxShadow: pulse ? `0 0 26px rgba(59,130,246,0.45), 0 0 8px rgba(59,130,246,0.3)` : `0 0 10px rgba(59,130,246,0.15)`,
        transition: "box-shadow 1.5s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 2, fontSize: 9, color: blue, fontWeight: 700, textAlign: "center", lineHeight: 1.3,
      }}>AI<br />UNITE</div>
      {/* Role nodes */}
      {ROLES.map((role, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const nx = cx + Math.cos(angle) * radius; const ny = cy + Math.sin(angle) * radius;
        return (
          <div key={role.label}>
            <div style={{ position: "absolute", left: nx - 19, top: ny - 19, width: 38, height: 38, borderRadius: "50%", background: `${role.color}12`, border: `1.5px solid ${role.color}40`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, fontSize: 14 }}>{role.icon}</div>
            <div style={{ position: "absolute", left: nx, top: ny + 22, transform: "translateX(-50%)", fontSize: 7.5, color: role.color, fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>{role.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Cross-disciplinary synthesis demo ───────────────────────────────────────
// Academia's unique section — the pulsing merge between two fields

function SynthesisDemo() {
  const [active, setActive] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (typing) return;
    const t = setTimeout(() => { setActive((a) => (a + 1) % SYNTHESIS_EXAMPLES.length); setTyping(true); }, 5500);
    return () => clearTimeout(t);
  }, [active, typing]);

  const ex = SYNTHESIS_EXAMPLES[active];
  const d1 = DISCIPLINES.find((d) => d.name === ex.fields[0])!;
  const d2 = DISCIPLINES.find((d) => d.name === ex.fields[1])!;
  const blue = "#3B82F6";

  return (
    <div className="max-w-xl mx-auto">
      {/* Two disciplines + merge pulse */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold"
          style={{ background: `${d1.color}10`, borderColor: `${d1.color}40`, color: d1.color }}>
          <span className="text-base">{d1.icon}</span>{d1.name}
        </div>

        {/* Animated merge node */}
        <div className="relative shrink-0" style={{ width: 44, height: 44 }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="16" fill="none" stroke={`${blue}40`} strokeWidth="1.5" />
            <circle cx="22" cy="22" r="5" fill={blue}>
              <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold"
          style={{ background: `${d2.color}10`, borderColor: `${d2.color}40`, color: d2.color }}>
          <span className="text-base">{d2.icon}</span>{d2.name}
        </div>
      </div>

      {/* Synthesis result */}
      <div className="rounded-2xl px-5 py-4"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 100%)", border: "1px solid rgba(59,130,246,0.15)" }}>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: blue }}>
          Cross-disciplinary insight discovered
        </div>
        <div className="text-xs leading-relaxed text-[rgb(var(--text))]">
          <TypeWriter text={ex.insight} speed={11} delay={400} onDone={() => setTyping(false)} key={active + "s"} />
        </div>
      </div>

      <div className="flex gap-1.5 justify-center mt-4">
        {SYNTHESIS_EXAMPLES.map((_, i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === active ? blue : "rgba(0,0,0,0.12)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children, color = "rgb(var(--primary))" }: { children: React.ReactNode; color?: string }) {
  return <div className="text-[10px] font-semibold tracking-[0.22em] mb-3 uppercase" style={{ color }}>{children}</div>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl md:text-2xl font-semibold text-[rgb(var(--text))] leading-snug">{children}</h3>;
}

function Divider() {
  return <div className="h-px w-full bg-[rgb(var(--border))]/40 my-12" />;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function AcademiaDeepDive() {
  return (
    <div>

      {/* 1 ── THE PROBLEM ───────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#EF4444">The academic reality</SectionLabel>
        <SectionHeading>
          Six roles. Six tools.{" "}
          <span style={{ color: "#EF4444" }}>None know your research.</span>
        </SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Your grant writing AI doesn't know your lab results. Your teaching AI doesn't know your
          research. Your literature search tool doesn't know what you're actually working on.
          You re-explain your academic life dozens of times a day.
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <p className="text-xs font-semibold text-[rgb(var(--muted))] uppercase tracking-wider mb-4">Tool sprawl adding up</p>
            <ToolSprawl />
          </div>
          <ChaosDemo />
        </div>
      </div>

      {/* 2 ── STAT BAR ──────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-6 py-7 mb-12"
        style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: "73%",  label: "of researchers use AI weekly",           color: "#3B82F6" },
            { number: "17hrs",label: "lost per week to context-switching",      color: "#F59E0B" },
            { number: "82%",  label: "of breakthroughs are cross-disciplinary", color: "#8B5CF6" },
            { number: "0",    label: "AI tools connect across departments",      color: "rgb(var(--muted))" },
          ].map(({ number, label, color }) => (
            <div key={number} className="text-center">
              <div className="text-2xl md:text-3xl font-bold leading-none mb-2" style={{ color }}>{number}</div>
              <div className="text-xs text-[rgb(var(--muted))] leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 3 ── SOLUTION: PERSONAL CONTEXT ────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#3B82F6">One platform for your entire academic life</SectionLabel>
        <SectionHeading>
          AI that knows your research,{" "}
          <span style={{ color: "#3B82F6" }}>your teaching, and your lab.</span>
        </SectionHeading>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 items-center">
          <div className="flex flex-col items-center gap-3">
            <ConnectedBrain />
            <p className="text-xs italic text-center" style={{ color: "#3B82F6" }}>
              Every academic role connected. One brain for your whole career.
            </p>
          </div>
          <UniteDemo />
        </div>
      </div>

      <Divider />

      {/* 4 ── CROSS-DISCIPLINARY SYNTHESIS ──────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#8B5CF6">Where breakthroughs actually happen</SectionLabel>
        <SectionHeading>
          Discoveries live at the{" "}
          <span style={{ color: "#8B5CF6" }}>intersection of fields.</span>
        </SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl mb-8">
          AI Unite doesn't just know your work — it connects patterns across every discipline
          in your institution. The insight your research needs might already exist in another department.
        </p>

        <SynthesisDemo />

        {/* Discipline chips */}
        <div className="flex flex-wrap gap-2 justify-center mt-8">
          {DISCIPLINES.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium"
              style={{ background: `${d.color}08`, borderColor: `${d.color}22`, color: d.color }}>
              <span>{d.icon}</span>{d.name}
            </div>
          ))}
          <div className="flex items-center px-3 py-1.5 rounded-xl border text-xs text-[rgb(var(--muted))]"
            style={{ background: "rgba(0,0,0,0.03)", borderColor: "rgba(0,0,0,0.1)", borderStyle: "dashed" }}>
            + every discipline
          </div>
        </div>
      </div>

      <Divider />

      {/* 5 ── WHO IT'S FOR ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#3B82F6">Built for every level of academia</SectionLabel>
        <SectionHeading>The right fit at every scale</SectionHeading>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {WHO_ITS_FOR.map((card) => (
            <div key={card.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6">
              <div className="text-2xl mb-3">{card.icon}</div>
              <div className="text-sm font-semibold mb-2" style={{ color: card.color }}>{card.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-4">{card.desc}</p>
              <ul className="space-y-2">
                {card.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 items-start">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: card.color }} />
                    <span className="text-xs leading-relaxed text-[rgb(var(--text))]">{item}</span>
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
        <SectionLabel color="#3B82F6">Deployment path</SectionLabel>
        <SectionHeading>Scales with your institution</SectionHeading>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">The same platform from one researcher to an entire university.</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          {GROWTH_STAGES.map((stage, i) => (
            <div key={stage.size} className="relative">
              {i < 2 && (
                <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full border border-[rgb(var(--border))]/40 bg-[rgb(var(--bg))] text-[rgb(var(--muted))] text-xs">→</div>
              )}
              <div className="h-full rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] overflow-hidden"
                style={{ borderTop: `2.5px solid ${stage.color}` }}>
                <div className="p-6" style={{ background: `linear-gradient(180deg, ${stage.color}07 0%, transparent 55%)` }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: stage.color }}>{stage.size}</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] font-semibold mb-5 text-[rgb(var(--muted))]">{stage.label}</div>
                  <ul className="space-y-3">
                    {stage.items.map((item, j) => (
                      <li key={j} className="flex gap-2.5 items-start">
                        <span className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: stage.color }} />
                        <span className="text-xs leading-relaxed text-[rgb(var(--text))]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm italic" style={{ color: "#3B82F6" }}>
          A new postdoc inherits the collective intelligence of your entire institution — on day one.
        </p>
      </div>

      <Divider />

      {/* 7 ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-8 py-10 text-center"
        style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.15)" }}>
        <h3 className="text-xl md:text-2xl font-semibold text-[rgb(var(--text))] mb-3 leading-snug">
          Your next breakthrough might<br />already exist — in another department.
        </h3>
        <p className="text-sm text-[rgb(var(--muted))] max-w-md mx-auto mb-6 leading-relaxed">
          One platform. Every role. Every discipline. Intelligence that connects what others can't.
        </p>
        <a href="mailto:soob@aiunite.ai?subject=Academia Demo Request"
          className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
          style={{ background: "#3B82F6", color: "#ffffff" }}>
          Get Started <span>→</span>
        </a>
        <p className="text-xs text-[rgb(var(--muted))] mt-4">Available for individual researchers and institutions</p>
      </div>

    </div>
  );
}
