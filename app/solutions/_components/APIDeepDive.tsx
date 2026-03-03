"use client";

// ─── Data ─────────────────────────────────────────────────────────────────────

const LIVE_CARDS = [
  { icon: "🧠", color: "#22c55e", title: "Multi-AI Synthesis",  desc: "Your query is sent to multiple AI providers simultaneously. Each returns an independent response. JASU identifies where they agree, where they diverge, and synthesizes a single, higher-quality answer. Not aggregation — intelligence." },
  { icon: "⚡", color: "#3b82f6", title: "Cognitive Modes",     desc: "Control depth with a parameter. Quick (1–2 providers, <8s). Quantitative (3–4 providers, data-validated). Quality (all providers, full consensus pipeline). Choose the right trade-off for every request." },
  { icon: "🔭", color: "#8b5cf6", title: "Thinking Styles",    desc: "Shape the reasoning framework. Conservative (risk-aware), Explorer (cross-domain), Contrarian (stress-tests assumptions), Visionary (future-projecting), Academic (rigorous, citation-aware). Same question, five different lenses." },
  { icon: "📝", color: "#f59e0b", title: "Response Types",     desc: "Synthesis — one unified answer. Intelligence — see what each provider said, where they agreed, where they diverged. Comparison — structured side-by-side analysis. You choose the format." },
];

const SERVICE_TIERS = [
  {
    icon: "⚡", color: "#22c55e", name: "Basic",        speed: "< 3 seconds", featured: false,
    desc: "Single AI provider. Fast, affordable, good for straightforward questions.",
    features: ["Single AI response", "Basic quality filtering", "Provider attribution"],
  },
  {
    icon: "🔍", color: "#3b82f6", name: "Professional",  speed: "3 – 5 seconds", featured: false,
    desc: "Multiple AI perspectives shown side-by-side. Great for research and comparison.",
    features: ["Multiple AI responses", "Side-by-side comparison", "Provider attribution", "Consensus scoring"],
  },
  {
    icon: "🧠", color: "#8b5cf6", name: "Enterprise",    speed: "5 – 8 seconds", featured: true,
    desc: "Full AI Unite synthesis. The best answer from all providers, merged into one.",
    features: ["Best-of-all synthesis", "Quality & confidence scoring", "Contradiction detection", "Thinking style selection", "Full provider metadata"],
  },
  {
    icon: "🌐", color: "#f59e0b", name: "Intelligence",  speed: "8 – 12 seconds", featured: false,
    desc: "Full cognitive pipeline with real-time data, learning integration, and semantic reasoning.",
    features: ["Everything in Enterprise", "Real-time data integration", "Learning & memory", "Semantic reasoning (UIE 2.0)", "Cross-domain insights"],
  },
];

const PARAMS = [
  {
    name: "query",          type: "string", req: true,
    desc: "The question or prompt to process through the cognitive pipeline.",
    values: [],
  },
  {
    name: "service_tier",   type: "string", req: false,
    desc: "Depth of analysis. Controls how many providers are consulted, what metadata is returned, and the processing pipeline used.",
    values: ["basic", "professional", "enterprise", "intelligence"],
  },
  {
    name: "thinking_style", type: "string", req: false,
    desc: "Reasoning framework applied to the query. Changes the logic, risk weighting, and perspective.",
    values: ["conservative", "explorer", "contrarian", "visionary", "academic"],
  },
  {
    name: "response_type",  type: "string", req: false,
    desc: "Output format. Synthesis returns one answer. Intelligence shows per-provider breakdown. Comparison gives structured trade-off analysis.",
    values: ["synthesis", "intelligence", "comparison"],
  },
  {
    name: "providers",      type: "array",  req: false,
    desc: "Specific AI providers to query. If omitted, JASU selects the optimal set based on your tier and query type.",
    values: ["openai", "anthropic", "gemini", "deepseek", "mistral", "cohere", "groq", "perplexity"],
  },
];

const USE_CASES = [
  { icon: "💻", color: "#3b82f6", title: "SaaS Products",         desc: "Add an \"Ask AI\" feature to your platform that's smarter than any single model. Your users get synthesized intelligence. You get a differentiator.",                  example: `"Compliance questions were inconsistent.\nAI Unite's synthesis reduced escalations by 40%."` },
  { icon: "⚙️", color: "#22c55e", title: "Internal Tools",        desc: "Power your company's internal knowledge base, helpdesk, or decision-support system with multi-AI intelligence instead of a single chatbot.",                            example: `POST /v1/query\nmode: "quick"\nquery: "What's our PTO policy\n  for employees in California?"` },
  { icon: "💬", color: "#8b5cf6", title: "Customer-Facing AI",    desc: "Build chatbots and virtual assistants that give higher-quality answers. When three models agree, respond confidently. When they disagree, escalate.",               example: `consensus_score: 0.94 → auto-respond\nconsensus_score: 0.52 → flag for review` },
  { icon: "📊", color: "#f59e0b", title: "Research & Analysis",   desc: "Feed the API complex research questions. Get synthesized analysis from multiple reasoning engines. Use thinking styles to generate bull/bear cases.",              example: `thinking_style: "contrarian"\nquery: "Why might our bull case\n  thesis on this market be wrong?"` },
  { icon: "🎯", color: "#14b8a6", title: "Workflow Automation",   desc: "Integrate cognitive intelligence into automated pipelines. Morning briefings, competitive monitoring, report generation — triggered on schedule or by events.",    example: `cron: "0 7 * * MON"\nquery: "Summarize all competitor\n  announcements from last week"` },
  { icon: "🎓", color: "#f43f5e", title: "Education & Learning",  desc: "Build tutoring platforms or research assistants that cross-reference multiple AI perspectives. Academic thinking style ensures rigorous, citation-aware responses.", example: `thinking_style: "academic"\nresponse_type: "intelligence"\n→ See where sources agree/diverge` },
];

const ROADMAP = [
  {
    status: "Coming Soon", statusColor: "#3b82f6", statusBg: "rgba(59,130,246,0.12)",
    icon: "🧠", title: "UserBrain API",
    desc: "Per-user personalization via API. Pass a user ID, and responses are informed by that user's interaction history, preferences, and learned context.",
    features: ["Per-user context injection", "Preference learning over time", "User profile management endpoints", "Privacy controls per user"],
  },
  {
    status: "Planned", statusColor: "#a78bfa", statusBg: "rgba(139,92,246,0.12)",
    icon: "💬", title: "Conversation Threading",
    desc: "Multi-turn conversations via API. Pass a thread ID and context carries forward across requests — just like the platform experience.",
    features: ["Thread creation & management", "Context window across turns", "Thread search & retrieval", "Thread-level analytics"],
  },
  {
    status: "Future", statusColor: "#fbbf24", statusBg: "rgba(245,158,11,0.12)",
    icon: "📊", title: "Analytics & Webhooks",
    desc: "Usage metrics, cost tracking, and real-time event hooks. Know exactly how intelligence is being used, what it costs, and when patterns emerge.",
    features: ["Usage metrics API", "Cost tracking per request", "Webhook events", "SDKs (Python, Node, Go)"],
  },
];

const INTEGRATIONS = [
  { icon: "🐍", name: "Python",     desc: "requests, httpx, aiohttp" },
  { icon: "🟨", name: "JavaScript", desc: "fetch, axios, node-fetch" },
  { icon: "🔵", name: "Go",         desc: "net/http, resty" },
  { icon: "☕", name: "Java",        desc: "HttpClient, OkHttp, Retrofit" },
  { icon: "💎", name: "Ruby",        desc: "Faraday, HTTParty, Net::HTTP" },
  { icon: "⚡", name: "cURL",        desc: "Any command line, any platform" },
];

// ─── Code block ───────────────────────────────────────────────────────────────

function CodeBlock({ filename, children }: { filename: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#0d1117", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: 5, marginRight: 8 }}>
          {["#ff5f57","#ffbd2e","#28c840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }} />)}
        </div>
        <span style={{ fontSize: 11, color: "#e2e8f0", fontFamily: "monospace" }}>{filename}</span>
      </div>
      <div style={{ padding: "18px 20px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.85, overflowX: "auto" }}>
        {children}
      </div>
    </div>
  );
}

// Inline color helpers
const kw  = (t: string) => <span style={{ color: "#ff7b72" }}>{t}</span>;
const str = (t: string) => <span style={{ color: "#a5d6ff" }}>{t}</span>;
const fn  = (t: string) => <span style={{ color: "#d2a8ff" }}>{t}</span>;
const pr  = (t: string) => <span style={{ color: "#79c0ff" }}>{t}</span>;
const nm  = (t: string) => <span style={{ color: "#79c0ff" }}>{t}</span>;
const vr  = (t: string) => <span style={{ color: "#ffa657" }}>{t}</span>;
const cm  = (t: string) => <span style={{ color: "#6a737d" }}>{t}</span>;
const tx  = (t: string) => <span style={{ color: "#c9d1d9" }}>{t}</span>;
const pu  = (t: string) => <span style={{ color: "#8b949e" }}>{t}</span>;

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

// ─── Main export ──────────────────────────────────────────────────────────────

export default function APIDeepDive() {
  return (
    <div>

      {/* 0 ── HERO CODE SNIPPET ─────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Quick Start</SectionLabel>
        <SectionHeading>One call. Synthesized intelligence.</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          One API call. Multiple AI providers queried simultaneously. Consensus detected. Contradictions flagged. A synthesized response returned — smarter than any single model.
        </p>
        <div className="mt-6 max-w-2xl">
          <CodeBlock filename="request.py">
            {kw("import")} {tx("requests")}<br /><br />
            {vr("response")} {pu("=")} {tx("requests")}{pu(".")}{fn("post")}{pu("(")}<br />
            &nbsp;&nbsp;{str('"https://api.aiunite.ai/v1/query"')}{pu(",")}<br />
            &nbsp;&nbsp;{pr("headers")}{pu("={")}{ str('"Authorization"')}{pu(":")} {str('f"Bearer {API_KEY}"')}{pu("},")}<br />
            &nbsp;&nbsp;{pr("json")}{pu("={")} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{str('"query"')}{pu(":")} {str('"What are the key risks in our Q3 pipeline?"')}{pu(",")}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{str('"mode"')}{pu(":")} {str('"quality"')}{pu(",")}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{str('"thinking_style"')}{pu(":")} {str('"contrarian"')}{pu(",")}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{str('"response_type"')}{pu(":")} {str('"synthesis"')}<br />
            &nbsp;&nbsp;{pu("}")}<br />
            {pu(")")}<br /><br />
            {cm("# Returns synthesized intelligence from 4+ AI providers")}<br />
            {fn("print")}{pu("(")}{vr("response")}{pu(".")}{fn("json")}{pu("()[")}{ str('"synthesis"')}{pu("])")}
          </CodeBlock>
        </div>
      </div>

      <Divider />

      {/* 1 ── WHAT'S LIVE TODAY ─────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ color: "#22c55e", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse inline-block" />
          Live Now
        </div>
        <SectionLabel>What Ships Today</SectionLabel>
        <SectionHeading>The intelligence engine, exposed</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Everything that powers the AI Unite platform — multi-provider orchestration, consensus detection, cognitive synthesis — available as a single API endpoint.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {LIVE_CARDS.map(c => (
            <div key={c.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6 relative overflow-hidden" style={{ borderTop: `2.5px solid ${c.color}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: `${c.color}14` }}>{c.icon}</div>
              <div className="text-sm font-semibold text-[rgb(var(--text))] mb-2">{c.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 2 ── SERVICE TIERS ─────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#3b82f6">Service Tiers</SectionLabel>
        <SectionHeading>Choose your depth per request</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Every API call specifies a service tier. Higher tiers consult more providers, run deeper analysis, and return richer metadata. You only pay for the depth you need.
        </p>
        <div className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[rgb(var(--border))]/60 bg-white/[0.015]">
          {SERVICE_TIERS.map((tier, i) => (
            <div key={tier.name} className="relative p-6" style={{ borderRight: i < SERVICE_TIERS.length - 1 ? "1px solid rgba(var(--border),0.4)" : "none" }}>
              {tier.featured && (
                <div className="absolute top-0 left-0 right-0 text-center text-[9px] font-bold uppercase tracking-widest py-1 text-white" style={{ background: "linear-gradient(90deg,#3b82f6,#2563eb)" }}>
                  Most Popular
                </div>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 ${tier.featured ? "mt-5" : ""}`} style={{ background: `${tier.color}14` }}>{tier.icon}</div>
              <div className="text-sm font-bold text-[rgb(var(--text))] mb-1">{tier.name}</div>
              <p className="text-xs text-[rgb(var(--muted))] leading-snug mb-3">{tier.desc}</p>
              <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full mb-4 font-mono" style={{ background: "rgba(var(--border),0.3)", color: "rgb(var(--muted))" }}>{tier.speed}</span>
              <div className="border-t border-[rgb(var(--border))]/40 pt-4 space-y-2">
                {tier.features.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: "#22c55e" }}>✓</span>
                    <span className="text-xs text-[rgb(var(--muted))] leading-snug">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-[rgb(var(--border))]/40 text-center">
                <a href="mailto:soob@aiunite.ai?subject=API Access" className="text-xs font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-80 inline-block" style={{ background: tier.featured ? "#3b82f6" : "rgba(59,130,246,0.07)", color: tier.featured ? "#fff" : "#3b82f6", border: tier.featured ? "none" : "1px solid rgba(59,130,246,0.25)" }}>
                  Contact Sales
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[rgb(var(--muted))] mt-4">Pricing based on volume. Contact us for custom enterprise agreements.</p>
      </div>

      <Divider />

      {/* 3 ── API IN ACTION ─────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>API in Action</SectionLabel>
        <SectionHeading>Request in, intelligence out</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          A single POST request. A synthesized response from multiple AI providers. Source attribution, confidence scoring, and consensus data included.
        </p>
        <div className="mt-8 rounded-2xl overflow-hidden grid lg:grid-cols-2" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Request */}
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", padding: "2px 9px", borderRadius: 4, background: "rgba(34,197,94,0.12)", fontFamily: "monospace" }}>POST</span>
              <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>/v1/query</span>
            </div>
            <div style={{ padding: "18px 20px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.9, minHeight: 300 }}>
              {pu("{")}<br />
              &nbsp;&nbsp;{pr('"query"')}{pu(":")} {str('"Compare the top 3 cloud providers')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{str('for a mid-size SaaS migration"')}{pu(",")}<br />
              &nbsp;&nbsp;{pr('"mode"')}{pu(":")} {str('"quantitative"')}{pu(",")}<br />
              &nbsp;&nbsp;{pr('"thinking_style"')}{pu(":")} {str('"academic"')}{pu(",")}<br />
              &nbsp;&nbsp;{pr('"response_type"')}{pu(":")} {str('"comparison"')}<br />
              {pu("}")}
            </div>
          </div>
          {/* Response */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Response</span>
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: "#22c55e", fontFamily: "monospace" }}>200 OK · 14.2s</span>
            </div>
            <div style={{ padding: "18px 20px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.9, minHeight: 300 }}>
              {pu("{")}<br />
              &nbsp;&nbsp;{pr('"synthesis"')}{pu(":")} {str('"AWS leads in service breadth')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{str('and enterprise tooling. Azure offers the')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{str('strongest hybrid story. GCP wins on')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{str('data/ML workloads and pricing..."')}{pu(",")}<br />
              &nbsp;&nbsp;{pr('"providers_consulted"')}{pu(":")} {nm("4")}{pu(",")}<br />
              &nbsp;&nbsp;{pr('"consensus_score"')}{pu(":")} {nm("0.87")}{pu(",")}<br />
              &nbsp;&nbsp;{pr('"contradictions"')}{pu(": [{")} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{pr('"topic"')}{pu(":")} {str('"pricing"')}{pu(",")}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{pr('"detail"')}{pu(":")} {str('"2 providers disagree')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{str('on GCP cost advantage at scale"')}<br />
              &nbsp;&nbsp;{pu("}],")}<br />
              &nbsp;&nbsp;{pr('"sources"')}{pu(": [")}{ str('"claude"')}{pu(",")} {str('"gpt-4"')}{pu(",")} {str('"gemini"')}{pu(",")} {str('"deepseek"')}{pu("]")}<br />
              {pu("}")}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* 4 ── PARAMETERS ────────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Parameters</SectionLabel>
        <SectionHeading>Full control in every request</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Every parameter maps to a cognitive control in the platform. Same intelligence, programmatic access.
        </p>
        <div className="mt-8 rounded-2xl overflow-hidden border border-[rgb(var(--border))]/60 bg-white/[0.015]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]/50">
                {["Parameter","Type","","Description"].map((h, i) => (
                  <th key={h+i} className="text-left text-[9px] font-bold uppercase tracking-wider text-[rgb(var(--muted))] px-4 py-3" style={{ width: i===0?"150px":i===1?"80px":i===2?"90px":"auto" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PARAMS.map((p, i) => (
                <tr key={p.name} className={i < PARAMS.length - 1 ? "border-b border-[rgb(var(--border))]/30" : ""}>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold font-mono text-[rgb(var(--text))]">{p.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono" style={{ color: "#8b5cf6" }}>{p.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded" style={{ background: p.req ? "rgba(244,63,94,0.08)" : "rgba(59,130,246,0.08)", color: p.req ? "#e11d48" : "#3b82f6" }}>
                      {p.req ? "Required" : "Optional"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-[rgb(var(--muted))] leading-relaxed mb-1.5">{p.desc}</div>
                    {p.values.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap">
                        {p.values.map(v => (
                          <span key={v} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(var(--border),0.3)", color: "rgb(var(--muted))" }}>{v}</span>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Divider />

      {/* 5 ── USE CASES ─────────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#3b82f6">Use Cases</SectionLabel>
        <SectionHeading>Where the API fits</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Any product that answers questions, makes recommendations, or generates analysis — upgraded from single-model to multi-AI intelligence.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map(u => (
            <div key={u.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: `${u.color}14` }}>{u.icon}</div>
              <div className="text-sm font-semibold text-[rgb(var(--text))] mb-2">{u.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-4">{u.desc}</p>
              <div className="rounded-xl px-3 py-2.5 font-mono text-[11px] leading-relaxed whitespace-pre" style={{ background: "rgba(var(--border),0.2)", color: "rgb(var(--muted))", border: "1px solid rgba(var(--border),0.4)" }}>
                {u.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 6 ── ROADMAP ───────────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel color="#8b5cf6">On the Horizon</SectionLabel>
        <SectionHeading>What's coming to the API</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          The synthesis engine is live. These capabilities are being built to extend it — each unlocking new use cases for developers.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {ROADMAP.map(r => (
            <div key={r.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4" style={{ background: r.statusBg, color: r.statusColor }}>{r.status}</span>
              <div className="text-2xl mb-3">{r.icon}</div>
              <div className="text-sm font-semibold text-[rgb(var(--text))] mb-2">{r.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-4">{r.desc}</p>
              <div className="space-y-2">
                {r.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#475569" }} />
                    <span className="text-xs text-[rgb(var(--muted))]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 7 ── INTEGRATION ───────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Integration</SectionLabel>
        <SectionHeading>Works with everything</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Standard REST API. JSON in, JSON out. If your stack can make an HTTP request, it can use AI Unite.
        </p>
        <div className="mt-8 grid gap-3 grid-cols-3 sm:grid-cols-6">
          {INTEGRATIONS.map(i => (
            <div key={i.name} className="rounded-xl border border-[rgb(var(--border))]/50 bg-white/[0.025] p-4 text-center transition-colors hover:border-[rgb(var(--primary))]/50">
              <div className="text-2xl mb-2">{i.icon}</div>
              <div className="text-xs font-semibold text-[rgb(var(--text))] mb-1">{i.name}</div>
              <div className="text-[9px] text-[rgb(var(--muted))] leading-snug">{i.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 8 ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-8 py-10 text-center" style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)" }}>
        <p className="text-sm italic text-[rgb(var(--muted))] max-w-xl mx-auto mb-6 leading-relaxed">
          "You don't need to build a multi-AI orchestration system. You don't need to figure out consensus detection. You don't need to manage provider fleet health. Just call the API."
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a href="mailto:soob@aiunite.ai?subject=API Access" className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
            Get API Access →
          </a>
          <a href="#" className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-medium transition-colors" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgb(var(--muted))" }}>
            Read the Docs
          </a>
        </div>
      </div>

    </div>
  );
}
