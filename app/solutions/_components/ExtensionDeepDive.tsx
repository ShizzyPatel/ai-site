"use client";

// ─── Data ─────────────────────────────────────────────────────────────────────

const HOW_STEPS = [
  { num: "1", label: "s1", title: "Click",           desc: "Open the extension from any website. No tab switching, no context lost.",                                           color: "#f59e0b" },
  { num: "2", label: "s2", title: "Ask",             desc: "Type your question. Choose your speed — Quick, Quantitative, or Quality.",                                          color: "#f97316" },
  { num: "3", label: "s3", title: "Get Intelligence",desc: "Multiple AIs respond. JASU picks the best, shows confidence, and lets you compare.",                                color: "#3b82f6" },
  { num: "4", label: "s4", title: "Go Deeper",       desc: "See what other AIs said. Spot where they agree, where they diverge. That's the edge.",                             color: "#8b5cf6" },
];

const FREE_TIERS = [
  {
    range: "Queries 1 – 3", color: "#22c55e", title: "Full Intelligence",
    desc: "Your first 3 queries each day come with the complete AI Unite experience.",
    features: [
      { check: true,  text: "Synthesized best answer" },
      { check: true,  text: "See all AI responses" },
      { check: true,  text: "Confidence scoring" },
      { check: true,  text: "Provider comparison" },
    ],
  },
  {
    range: "Queries 4 – 10", color: "#f59e0b", title: "Synthesis Only",
    desc: "You still get the best answer from multiple AIs — comparison view is reserved for full access.",
    features: [
      { check: true,  text: "Synthesized best answer" },
      { check: true,  text: "Confidence scoring" },
      { check: false, text: "AI comparison locked" },
      { check: false, text: "Provider breakdown locked" },
    ],
  },
  {
    range: "Need More?", color: "#8b5cf6", title: "Contact Sales",
    desc: "Unlimited queries, full comparison views, team deployment, and UserBrain personalization.",
    features: [
      { check: true, text: "Unlimited daily queries" },
      { check: true, text: "Full AI comparison always" },
      { check: true, text: "UserBrain learns your style" },
      { check: true, text: "Deploy across your organization" },
    ],
  },
];

const EVERYWHERE = [
  { icon: "📊", title: "Spreadsheets & Data",          desc: "Ask questions about data strategy, formula logic, or market analysis without leaving your sheet." },
  { icon: "📝", title: "Documents & Writing",          desc: "Get multiple AI perspectives on copy, contracts, proposals, or research while you draft." },
  { icon: "📧", title: "Email & Communication",        desc: "Draft responses, check tone, summarize threads. Multi-AI consensus on what to say and how to say it." },
  { icon: "💻", title: "Code & Development",           desc: "Debug, architect, or compare approaches. Ask from your IDE, GitHub, or Stack Overflow tab." },
  { icon: "🔍", title: "Research & Competitive Intel", desc: "Ask questions while browsing competitor sites, market reports, or industry publications." },
  { icon: "🤝", title: "CRM & Sales Tools",            desc: "Prep for calls, analyze deals, draft outreach. Multi-AI intelligence layered over your existing tools." },
];

const ENTERPRISE_FEATURES = [
  { icon: "👥", color: "#3b82f6", title: "Org-Wide Deployment",        desc: "Push to all employees via Chrome Enterprise policy. One-click rollout." },
  { icon: "🧠", color: "#22c55e", title: "UserBrain Per Employee",      desc: "Each user builds their own AI memory. Queries get smarter over time." },
  { icon: "🏢", color: "#8b5cf6", title: "CorporateBrain Integration",  desc: "Aggregate intelligence feeds into your organization's knowledge graph." },
  { icon: "📊", color: "#f59e0b", title: "Usage Analytics",             desc: "See what your teams are asking, which departments use AI most, where knowledge gaps exist." },
];

const EMPLOYEES = [
  { initials: "JD", color: "#3b82f6", name: "Jamie Dawson", role: "Sales · from Salesforce",    queries: "23 queries today" },
  { initials: "MK", color: "#8b5cf6", name: "Maya Kim",     role: "Engineering · from GitHub",  queries: "17 queries today" },
  { initials: "RP", color: "#f59e0b", name: "Raj Patel",    role: "Strategy · from Google Docs",queries: "31 queries today" },
  { initials: "SC", color: "#22c55e", name: "Sofia Chen",   role: "Legal · from Confluence",    queries: "12 queries today" },
];

const COMPARE_ROWS = [
  "AI providers queried",
  "Consensus detection",
  "Contradiction flagging",
  "Confidence scoring",
  "Provider comparison",
  "Thinking styles",
  "Learns your patterns",
  "Performance modes",
];

const COMPARE_THEIRS = ["1", "✗", "✗", "✗", "✗", "✗", "✗", "✗"];
const COMPARE_OURS   = ["4+", "✓", "✓", "✓", "✓", "✓", "✓", "✓"];

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionLabel({ children, color = "rgb(var(--primary))" }: { children: React.ReactNode; color?: string }) {
  return <div className="text-[10px] font-semibold tracking-[0.22em] mb-3 uppercase" style={{ color }}>{children}</div>;
}
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl md:text-2xl font-semibold text-[rgb(var(--text))] leading-snug">{children}</h3>;
}
function Divider() {
  return <div className="h-px w-full bg-[rgb(var(--border))]/40 my-12" />;
}

// ─── Extension popup mockup ───────────────────────────────────────────────────

function ExtPopup() {
  return (
    <div className="mx-auto" style={{ width: 340, background: "#fff", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(59,130,246,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🧠</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>AI UNITE</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", padding: "3px 10px", borderRadius: 100, background: "#3b82f6", letterSpacing: "0.05em" }}>FREE</span>
      </div>

      {/* Body */}
      <div style={{ padding: "18px" }}>
        <div style={{ width: "100%", minHeight: 64, padding: "12px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, background: "#f8fafc", fontSize: 13, color: "#1a1a2e", lineHeight: 1.5 }}>
          What are the biggest risks in migrating to microservices?
        </div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", margin: "14px 0 9px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Performance Level</div>

        <div style={{ display: "flex", gap: 7 }}>
          {[{ icon: "⚡", label: "Quick", active: false }, { icon: "📊", label: "Quantitative", active: true }, { icon: "🏆", label: "Quality", active: false }].map(o => (
            <div key={o.label} style={{ flex: 1, padding: "9px 6px", border: `1.5px solid ${o.active ? "#3b82f6" : "#e2e8f0"}`, borderRadius: 7, textAlign: "center", fontSize: 11, fontWeight: 600, color: o.active ? "#3b82f6" : "#64748b", background: o.active ? "rgba(59,130,246,0.04)" : "#fff", cursor: "pointer" }}>
              <span style={{ display: "block", fontSize: 15, marginBottom: 3 }}>{o.icon}</span>{o.label}
            </div>
          ))}
        </div>

        <div style={{ width: "100%", marginTop: 14, padding: "12px", background: "linear-gradient(135deg,#003d7a,#0066cc)", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", borderRadius: 9, textAlign: "center", cursor: "pointer", letterSpacing: "0.02em" }}>
          Compare AIs
        </div>

        {/* Response */}
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 9 }}>✓ Synthesized Answer</div>
          <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.7, marginBottom: 12 }}>
            The primary risks center on distributed system complexity, data consistency across service boundaries, and operational overhead. Teams consistently underestimate the DevOps maturity required…
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, color: "#94a3b8", padding: "8px 12px", background: "#f8fafc", borderRadius: 7, marginBottom: 11 }}>
            <span><strong style={{ color: "#475569" }}>3 providers</strong> consulted</span>
            <span>·</span>
            <span>87% consensus</span>
            <span>·</span>
            <span>4.2s</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#3b82f6", cursor: "pointer" }}>❓ Why this answer?</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#3b82f6", cursor: "pointer" }}>👁 See other answers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ExtensionDeepDive() {
  return (
    <div>

      {/* 0 ── POPUP PREVIEW ─────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#f59e0b">By Access — Extension</SectionLabel>
        <SectionHeading>Multi-AI intelligence. One click away.</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Install the Chrome extension. Ask any question from any website. Get a synthesized answer from multiple AI providers — no account required, no cost, no setup.
        </p>
        <div className="flex items-center gap-3 mt-5 mb-8 flex-wrap">
          <a href="#" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}>
            📥 Install Free Extension
          </a>
          <span className="text-xs text-[rgb(var(--muted))]">Chrome · Free forever to start</span>
        </div>
        <div className="flex gap-2 flex-wrap mb-10">
          {["Free to Install","No Account Needed","Multi-AI Synthesis","Works on Any Site"].map(p => (
            <span key={p} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ border: "1px solid rgba(245,158,11,0.3)", color: "#fcd34d", background: "rgba(245,158,11,0.08)" }}>{p}</span>
          ))}
        </div>
        <ExtPopup />
      </div>

      <Divider />

      {/* 1 ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#f59e0b">How It Works</SectionLabel>
        <SectionHeading>From question to intelligence in seconds</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Click the extension icon from any browser tab. Ask anything. Multiple AI providers are queried simultaneously — you get the best answer, not just the first one.
        </p>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5" style={{ background: "linear-gradient(90deg,#f59e0b,#f97316,#3b82f6,#8b5cf6)", zIndex: 0 }} />
          {HOW_STEPS.map(step => (
            <div key={step.num} className="text-center relative z-10">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}>
                {step.num}
              </div>
              <div className="text-sm font-semibold text-[rgb(var(--text))] mb-1">{step.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))] px-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 2 ── FREE TIER BREAKDOWN ───────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#22c55e">What You Get — Free</SectionLabel>
        <SectionHeading>10 queries a day. Zero cost.</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Every user gets daily access to multi-AI synthesis. No credit card. No sign-up. Just install and start asking.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {FREE_TIERS.map(tier => (
            <div key={tier.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6 relative overflow-hidden" style={{ borderTop: `2.5px solid ${tier.color}` }}>
              <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4" style={{ background: `${tier.color}14`, color: tier.color }}>
                {tier.range}
              </span>
              <div className="text-base font-semibold text-[rgb(var(--text))] mb-2">{tier.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-5">{tier.desc}</p>
              <div className="space-y-2.5">
                {tier.features.map(f => (
                  <div key={f.text} className="flex items-start gap-2.5">
                    <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: f.check ? "#22c55e" : "#94a3b8" }}>
                      {f.check ? "✓" : "🔒"}
                    </span>
                    <span className="text-xs leading-snug" style={{ color: f.check ? "rgb(var(--muted))" : "#94a3b8" }}>{f.text}</span>
                  </div>
                ))}
              </div>
              {tier.range === "Need More?" && (
                <a href="mailto:soob@aiunite.ai?subject=Extension Enterprise" className="mt-6 block text-center text-xs font-semibold px-4 py-2.5 rounded-lg transition-opacity hover:opacity-80" style={{ background: `${tier.color}14`, color: tier.color, border: `1px solid ${tier.color}30` }}>
                  Contact Sales →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 3 ── WORKS EVERYWHERE ──────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#f59e0b">Use It Anywhere</SectionLabel>
        <SectionHeading>Intelligence on top of whatever you're doing</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          The extension sits in your browser toolbar. Click it from any tab — your CRM, your docs, your email, your competitor's website. No context switching.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EVERYWHERE.map(e => (
            <div key={e.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6 text-center">
              <div className="text-3xl mb-3">{e.icon}</div>
              <div className="text-sm font-semibold text-[rgb(var(--text))] mb-2">{e.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))]">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 4 ── ENTERPRISE DEPLOYMENT ─────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#3b82f6">For Teams & Enterprise</SectionLabel>
        <SectionHeading>Deploy intelligence across your organization</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Every employee gets AI Unite in their browser. Queries feed into your CorporateBrain. Intelligence compounds across the organization.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 items-start">
          {/* Left: features */}
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--text))] mb-5 leading-snug">
              Your team already uses a browser.<br />Now it has a brain.
            </p>
            <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-6">
              Roll out the extension org-wide. Employees ask questions from whatever tool they're already using — Salesforce, Jira, Confluence, Google Docs, internal portals. No new software to learn.
            </p>
            <div className="space-y-3">
              {ENTERPRISE_FEATURES.map(f => (
                <div key={f.title} className="flex items-start gap-3 p-4 rounded-xl border border-[rgb(var(--border))]/50 bg-white/[0.02]">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: `${f.color}14` }}>{f.icon}</div>
                  <div>
                    <div className="text-xs font-semibold text-[rgb(var(--text))] mb-0.5">{f.title}</div>
                    <p className="text-xs text-[rgb(var(--muted))] leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: employee dashboard */}
          <div className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[rgb(var(--border))]/40">
              <span className="text-sm font-semibold text-[rgb(var(--text))]">Extension — Acme Corp</span>
              <span className="text-[9px] font-bold text-white px-3 py-1 rounded-full" style={{ background: "#22c55e" }}>Enterprise</span>
            </div>
            <div className="space-y-2.5 mb-5">
              {EMPLOYEES.map(emp => (
                <div key={emp.name} className="flex items-center gap-3 p-3 rounded-xl border border-[rgb(var(--border))]/40 bg-white/[0.015]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: emp.color }}>{emp.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[rgb(var(--text))]">{emp.name}</div>
                    <div className="text-[10px] text-[rgb(var(--muted))]">{emp.role}</div>
                  </div>
                  <div className="text-[10px] font-mono font-semibold text-[rgb(var(--muted))] shrink-0">{emp.queries}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[rgb(var(--border))]/40">
              {[{ num: "83", label: "Queries today" }, { num: "92%", label: "Consensus avg" }, { num: "4.1s", label: "Avg response" }].map(s => (
                <div key={s.label} className="text-center p-3 rounded-lg bg-white/[0.02]">
                  <div className="text-lg font-bold font-mono text-[rgb(var(--text))]">{s.num}</div>
                  <div className="text-[9px] text-[rgb(var(--muted))] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* 5 ── VS SINGLE-AI ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#8b5cf6">Why This Is Different</SectionLabel>
        <SectionHeading>Not another ChatGPT wrapper</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Single-AI extensions give you one model's opinion. AI Unite gives you consensus intelligence from all of them.
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Theirs */}
          <div className="rounded-2xl border border-[rgb(var(--border))]/50 bg-white/[0.015] p-6 opacity-60">
            <div className="text-sm font-semibold text-[rgb(var(--text))] mb-5">Single-AI Extensions</div>
            <div className="divide-y divide-[rgb(var(--border))]/30">
              {COMPARE_ROWS.map((row, i) => (
                <div key={row} className="flex items-center justify-between py-3">
                  <span className="text-xs text-[rgb(var(--muted))]">{row}</span>
                  <span className="text-xs font-semibold" style={{ color: COMPARE_THEIRS[i] === "✗" ? "#cbd5e1" : "rgb(var(--text))" }}>{COMPARE_THEIRS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ours */}
          <div className="rounded-2xl p-6 relative overflow-hidden" style={{ border: "1px solid rgba(245,158,11,0.35)", background: "rgba(245,158,11,0.03)" }}>
            <div className="absolute top-0 left-0 right-0 text-center text-[9px] font-bold uppercase tracking-widest py-1.5 text-white" style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)" }}>
              AI UNITE
            </div>
            <div className="text-sm font-semibold text-[rgb(var(--text))] mb-5 mt-5">AI Unite Extension</div>
            <div className="divide-y divide-[rgb(var(--border))]/30">
              {COMPARE_ROWS.map((row, i) => (
                <div key={row} className="flex items-center justify-between py-3">
                  <span className="text-xs text-[rgb(var(--muted))]">{row}</span>
                  <span className="text-xs font-bold" style={{ color: "#22c55e" }}>{COMPARE_OURS[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* 6 ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-8 py-10 text-center" style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.18)" }}>
        <p className="text-base italic text-[rgb(var(--muted))] max-w-lg mx-auto mb-6 leading-relaxed">
          "Every other AI extension gives you one model's guess. This one gives you the room's consensus."
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a href="#" className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85" style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}>
            📥 Install Free Extension
          </a>
          <a href="mailto:soob@aiunite.ai?subject=Extension Enterprise" className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-medium transition-colors" style={{ border: "1px solid rgba(var(--border),0.5)", color: "rgb(var(--muted))" }}>
            Contact Sales
          </a>
        </div>
      </div>

    </div>
  );
}
