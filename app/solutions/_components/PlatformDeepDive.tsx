"use client";

import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FLOW_STEPS = [
  { num: "1", title: "You Ask",            desc: "Type or speak your question. Choose your cognitive mode, thinking style, and response type." },
  { num: "2", title: "JASU Orchestrates",  desc: "Your query is sent to multiple AI providers simultaneously. Each returns an independent answer." },
  { num: "3", title: "Intelligence Forms", desc: "Answers are compared, contradictions flagged, consensus identified, and a synthesized response is built." },
  { num: "4", title: "You Get Smarter",    desc: "The response is delivered with source attribution. Your UserBrain learns your preferences, patterns, and interests." },
];

const COGNITIVE_MODES = [
  { icon: "⚡", title: "Quick",        tag: "Fastest Response",  tagColor: "#22c55e", desc: "Single or dual provider. Minimal cross-referencing. Designed for speed over exhaustive analysis.",             example: "\"What time is our board meeting?\" · \"Summarize this email\" · \"Convert this CSV to JSON\"",      providers: "1–2", speed: "<8s"  },
  { icon: "📊", title: "Quantitative", tag: "Data-Driven",       tagColor: "#3b82f6", desc: "Multiple providers with cross-validation. Emphasis on data accuracy, numerical verification, source agreement.", example: "\"What's the TAM for AI in healthcare?\" · \"Compare our Q2 metrics YoY\"",                         providers: "3–4", speed: "<15s" },
  { icon: "🧠", title: "Quality",      tag: "Full Intelligence", tagColor: "#8b5cf6", desc: "All available providers. Full consensus detection, contradiction analysis, and synthesis. The full cognitive pipeline.", example: "\"What's our biggest strategic risk in 2026?\" · \"Design a go-to-market strategy for APAC\"",        providers: "4+",  speed: "<25s" },
];

const THINKING_STYLES = [
  { icon: "🛡️", title: "Conservative", color: "#3b82f6", desc: "Risk-aware, precedent-driven, evidence-heavy. Prioritizes proven approaches and flags unknowns.",               best: "Compliance, legal, financial decisions, regulated industries" },
  { icon: "🌍", title: "Explorer",     color: "#22c55e", desc: "Broad-ranging, curiosity-driven, cross-domain. Pulls insights from adjacent fields and unexpected connections.",  best: "Research, brainstorming, new market analysis, early-stage strategy" },
  { icon: "🔥", title: "Contrarian",   color: "#f43f5e", desc: "Deliberately challenges assumptions. Finds the argument against the obvious answer. Stress-tests your thinking.", best: "Pre-mortems, investment analysis, competitive strategy, devil's advocate" },
  { icon: "🔭", title: "Visionary",    color: "#8b5cf6", desc: "Future-oriented, pattern-projecting, ambitious. Extrapolates trends and imagines second-order effects.",          best: "Long-term planning, product roadmaps, board presentations, innovation" },
  { icon: "🎓", title: "Academic",     color: "#f59e0b", desc: "Rigorous, citation-aware, methodology-focused. Structures responses like peer-reviewed analysis.",               best: "White papers, due diligence, technical evaluation, research synthesis" },
];

const RESPONSE_TYPES = [
  { icon: "📝", title: "Synthesis",    tag: "Unified Answer",        tagColor: "#14b8a6", desc: "Multiple AI perspectives woven into a single coherent response. Disagreements already resolved.",            example: "A polished response with source attribution at the bottom. The most common format." },
  { icon: "🔍", title: "Intelligence", tag: "Transparent Reasoning", tagColor: "#6366f1", desc: "See what each provider said independently, where they agreed, diverged, and what JASU recommends.",           example: "Individual responses, consensus highlighted, contradictions flagged, confidence scores, synthesis." },
  { icon: "⚖️", title: "Comparison",  tag: "Side-by-Side",           tagColor: "#f59e0b", desc: "Structured comparison of options or perspectives for decision-making with clear trade-offs.",                 example: "A formatted table comparing options across dimensions. Clear trade-offs, no hand-waving." },
];

const FEATURES = [
  { icon: "💬", color: "#3b82f6", title: "Conversation History", desc: "Every query, every thread, searchable and resumable. Context carries forward — pick up where you left off days later, JASU still remembers." },
  { icon: "🧠", color: "#8b5cf6", title: "UserBrain",            desc: "JASU learns your role, preferences, terminology, and interests — personalizing every response. Every answer gets more relevant over time." },
  { icon: "📅", color: "#22c55e", title: "Calendar Integration", desc: "Connected to Google or Outlook. Ask \"What do I have today?\" or \"Prep me for my 2pm.\" JASU factors meeting context into responses." },
  { icon: "🎙️",color: "#f59e0b", title: "Voice Mode",            desc: "Speak your query instead of typing. Full cognitive pipeline, same modes and styles — voice-to-intelligence, not voice-to-transcription." },
  { icon: "📁", color: "#14b8a6", title: "Projects",             desc: "Group conversations by initiative, client, or workstream. Attach documents, set project context, keep your intelligence organized." },
  { icon: "⚡", color: "#f43f5e", title: "Workflows",            desc: "Automated intelligence pipelines that run on schedule or trigger. Morning briefings, competitive monitoring — intelligence that works while you don't." },
];

const ROLE_TIERS = [
  { badge: "User",     badgeColor: "#3b82f6", title: "Team Member", sub: "Individual contributor", desc: "The full query experience. Choose your cognitive mode, thinking style, and response type. Your UserBrain learns your patterns.",                                                                       features: ["Query Bar","Cognitive Modes","Thinking Styles","UserBrain","Conversations","Calendar","Voice","Projects"] },
  { badge: "Manager",  badgeColor: "#22c55e", title: "Manager",     sub: "Team lead",              desc: "Everything a team member gets, plus visibility into team adoption. See who's using the platform, what modes they prefer, and where knowledge gaps exist.",                                               features: ["Team Usage Metrics","Knowledge Gap Detection","Shared Projects","Team Workflows","Adoption Tracking"] },
  { badge: "Director", badgeColor: "#f59e0b", title: "Director",    sub: "Department head",        desc: "Department-level intelligence. See cross-team patterns, identify which initiatives drive the most value, and monitor learning velocity.",                                                                 features: ["Department Analytics","Cross-Team Patterns","Outcome Tracking","Learning Velocity","Department Health Score"] },
  { badge: "VP",       badgeColor: "#8b5cf6", title: "VP / SVP",    sub: "Business unit leader",   desc: "Cross-department intelligence. Which departments are collaborating? Where are silos forming? Provider performance and cost allocation.",                                                                  features: ["Cross-Department View","Silo Detection","Provider Cost Allocation","Knowledge Flow Maps","Business Unit ROI"] },
  { badge: "C-Suite",  badgeColor: "#f43f5e", title: "Executive",   sub: "CEO / CTO / COO",        desc: "The 30,000-foot view. One intelligence score for the entire organization. Full governance controls, audit trails, and compliance dashboards.",                                                           features: ["Org Intelligence Score","ROI Dashboard","Governance Controls","Audit Trail","Compliance","Cost Center Tracking","CorporateBrain"] },
];

const ADMIN_CONTROLS = [
  { num: "01", icon: "👥", color: "#3b82f6", title: "Team & Access Management",  desc: "SSO/SCIM integration, role-based permissions, department hierarchies, invite flows, and offboarding — intelligence access governed at every level." },
  { num: "02", icon: "🛡️",color: "#8b5cf6", title: "Governance Policies",       desc: "Set data retention windows, reasoning boundaries, access tiers, and safe-use policies. Control what the AI can learn, who can see what, and how long data lives." },
  { num: "03", icon: "📋", color: "#22c55e", title: "Audit Trail",               desc: "Every query produces a traceable path — which models were consulted, what knowledge was applied, how the synthesis was produced. Exportable for compliance." },
  { num: "04", icon: "⚙️", color: "#f59e0b", title: "Provider Fleet Management", desc: "Monitor health, cost, and performance of every AI provider. Circuit breaker status, consensus alignment, error rates, and latency — all in one view." },
];

const GOV_ITEMS = [
  { title: "Multi-tenant isolation",  desc: "Every org fully separated at the data layer" },
  { title: "Role-based access",       desc: "Admin, Manager, Member — scoped to departments" },
  { title: "Audit logging",           desc: "Every action timestamped and traceable" },
  { title: "Configurable retention",  desc: "Set data lifecycle policies per tenant" },
  { title: "SSO & SCIM",              desc: "Enterprise identity management built in" },
  { title: "API access",              desc: "Everything in the dashboard available via API" },
];

const DASHBOARD_METRICS = [
  { label: "Cognitive", value: "87",    unit: "/100", sub: "1,247 nodes · 34 bridges",    color: "#8b5cf6", badge: "↑ stable",  badgeBg: "rgba(34,197,94,0.1)",  badgeColor: "#22c55e" },
  { label: "Usage",     value: "2,841", unit: "",     sub: "queries · 78% adoption",      color: "#3b82f6", badge: "↑ growing", badgeBg: "rgba(59,130,246,0.1)", badgeColor: "#3b82f6" },
  { label: "Outcomes",  value: "94",    unit: "%",    sub: "synth 156 · valid 289",       color: "#f472b6", badge: "↑ stable",  badgeBg: "rgba(34,197,94,0.1)",  badgeColor: "#22c55e" },
  { label: "Learning",  value: "847",   unit: "",     sub: "patterns · 43 new this week", color: "#2dd4bf", badge: "↑ growing", badgeBg: "rgba(59,130,246,0.1)", badgeColor: "#3b82f6" },
];

const DASH_NODES = [
  { icon: "📊", count: "312", label: "Sales",       color: "#f59e0b" },
  { icon: "⚙️", count: "567", label: "Engineering", color: "#3b82f6" },
  { icon: "📣", count: "198", label: "Marketing",   color: "#ec4899" },
  { icon: "💰", count: "245", label: "Finance",     color: "#22c55e" },
  { icon: "👥", count: "134", label: "HR",          color: "#a855f7" },
  { icon: "⚡", count: "289", label: "Operations",  color: "#06b6d4" },
  { icon: "⚖️", count: "87",  label: "Legal",       color: "#f43f5e" },
];

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-semibold tracking-[0.22em] text-[rgb(var(--primary))] mb-3 uppercase">{children}</div>;
}
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl md:text-2xl font-semibold text-[rgb(var(--text))] leading-snug">{children}</h3>;
}
function Divider() {
  return <div className="h-px w-full bg-[rgb(var(--border))]/40 my-12" />;
}

// ─── Interactive query mockup ─────────────────────────────────────────────────

function QueryMockup() {
  const [activeStyle, setActiveStyle] = useState("Explorer");
  const [activeType,  setActiveType]  = useState("Synthesis");
  const [activeSpeed, setActiveSpeed] = useState("Quantitative");

  const pill = (active: boolean): React.CSSProperties => ({
    padding: "4px 11px", borderRadius: 9999, fontSize: 11, fontWeight: 500, cursor: "pointer",
    border: active ? "1px solid #3b82f6" : "1px solid #e2e8f0",
    background: active ? "rgba(59,130,246,0.07)" : "#fff",
    color: active ? "#3b82f6" : "#64748b",
    display: "inline-flex", alignItems: "center",
    transition: "all 0.15s", whiteSpace: "nowrap" as const,
  });

  const SESSIONS = [
    { name: "Q3 revenue risk analysis",         time: "Just now",   msgs: "3 msgs", active: true  },
    { name: "Cloud migration vendor comparison", time: "1 hour ago", msgs: "2 msgs", active: false },
    { name: "Competitive landscape — Series B",  time: "Yesterday",  msgs: "5 msgs", active: false },
    { name: "Draft Nexus client proposal",       time: "Yesterday",  msgs: "4 msgs", active: false },
    { name: "APAC go-to-market strategy",        time: "Mon",        msgs: "7 msgs", active: false },
    { name: "Team standup notes summary",        time: "Mon",        msgs: "1 msg",  active: false },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}>
      {/* Top nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 20px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(59,130,246,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🧠</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>AI Unite</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {["Query","Voice","My Brain","Team","Dashboard"].map(l => (
            <span key={l} style={{ fontSize: 11, color: l==="Query" ? "#3b82f6" : "#94a3b8", padding: "4px 10px", borderRadius: 6, background: l==="Query" ? "rgba(59,130,246,0.07)" : "transparent", fontWeight: l==="Query" ? 600 : 400 }}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize: 10, color: "#94a3b8" }}>user@acme.com</span>
      </div>

      {/* 3-col body */}
      <div style={{ display: "grid", gridTemplateColumns: "210px minmax(0,1fr) 190px", minHeight: 470 }}>

        {/* Left: thread */}
        <div style={{ borderRight: "1px solid #f0f2f5", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 14px", borderBottom: "1px solid #f0f2f5" }}>
            <span style={{ fontSize: 13 }}>📋</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e", flex: 1 }}>Query Thread</span>
          </div>
          <div style={{ padding: "5px 14px", fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>3 Messages</div>
          <div style={{ flex: 1, padding: "0 10px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              { n:"Q1", q:"What are the biggest risks to our Q3 revenue projection?", t:"2:14 PM", viewing:false },
              { n:"Q2", q:"What would a contrarian view of our pipeline look like?",   t:"2:15 PM", viewing:false },
              { n:"Q3", q:"What should we do about mid-market churn specifically?",    t:"2:17 PM", viewing:true  },
            ].map(item => (
              <div key={item.n} style={{ background: "#f8fafc", borderRadius: 9, padding: "10px", border: "1px solid #e2e8f0" }}>
                <span style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",width:20,height:20,borderRadius:5,background:"#3b82f6",color:"#fff",fontSize:9,fontWeight:700,marginRight:6 }}>{item.n}</span>
                <span style={{ fontSize:11,color:"#1a1a2e",fontWeight:500 }}>{item.q}</span>
                <div style={{ fontSize:9,color:"#94a3b8",marginTop:4 }}>Today at {item.t}</div>
                <div style={{ display:"flex",justifyContent:"space-between",marginTop:6,paddingTop:6,borderTop:"1px solid #e2e8f0" }}>
                  <span style={{ fontSize:10,color:item.viewing?"#1a1a2e":"#3b82f6",fontWeight:item.viewing?600:500 }}>{item.viewing?"▼ Viewing":"▶ View Answer"}</span>
                  <span style={{ fontSize:9,color:"#94a3b8",fontFamily:"monospace" }}>0.9% · 12.4s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: response */}
        <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid #f0f2f5", overflow: "hidden" }}>
          {/* Gauge bar */}
          <div style={{ display:"flex",alignItems:"center",gap:14,padding:"12px 18px",borderBottom:"1px solid #e2e8f0" }}>
            <div style={{ position:"relative",width:48,height:48,flexShrink:0 }}>
              <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform:"rotate(-90deg)" }}>
                <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                <circle cx="24" cy="24" r="20" fill="none" stroke="url(#gG)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="125" strokeDashoffset="16" />
                <defs><linearGradient id="gG" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient></defs>
              </svg>
              <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:9,fontWeight:700,color:"#1a1a2e" }}>87%</div>
            </div>
            <div style={{ display:"flex",gap:14 }}>
              <span style={{ fontSize:11,color:"#1a1a2e",fontWeight:600 }}>⚡ 12.4s</span>
              <span style={{ fontSize:11,color:"#1a1a2e",fontWeight:600 }}>🔥 847 <span style={{ color:"#94a3b8",fontWeight:400 }}>/1K</span></span>
            </div>
          </div>

          {/* Response body */}
          <div style={{ flex:1,padding:"18px",overflowY:"auto" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,gap:10,flexWrap:"wrap" }}>
              <span style={{ fontSize:14,fontWeight:700,color:"#1a1a2e" }}>Best Response</span>
              <span style={{ fontSize:9,fontWeight:600,color:"#fff",padding:"4px 9px",borderRadius:5,background:"linear-gradient(135deg,#3b82f6,#2563eb)",whiteSpace:"nowrap" }}>AI Unite Synthesis (4 providers + UserBrain)</span>
            </div>

            {/* UserBrain */}
            <div style={{ display:"flex",gap:9,padding:"10px 12px",borderRadius:8,background:"linear-gradient(135deg,rgba(139,92,246,0.06),rgba(59,130,246,0.04))",border:"1px solid rgba(139,92,246,0.15)",marginBottom:14 }}>
              <div style={{ width:26,height:26,borderRadius:6,background:"rgba(139,92,246,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0 }}>🧠</div>
              <div>
                <div style={{ fontSize:8,fontWeight:700,color:"#7c3aed",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:2 }}>UserBrain Applied</div>
                <div style={{ fontSize:10,color:"#64748b",lineHeight:1.4 }}>Personalized using your role, company context, and interaction history</div>
                <div style={{ display:"flex",gap:4,marginTop:5,flexWrap:"wrap" }}>
                  {["VP of Sales","ACME Corp","SaaS · B2B","Pipeline-focused"].map(t => (
                    <span key={t} style={{ fontSize:9,color:"#7c3aed",padding:"1px 7px",borderRadius:3,background:"rgba(139,92,246,0.08)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ fontSize:11,color:"#334155",lineHeight:1.75 }}>
              <p style={{ marginBottom:9 }}><strong style={{ color:"#1a1a2e" }}>Your mid-market churn has a structural cause, not a product cause.</strong> Companies churning at months 4–6 never activated more than 2 of the 7 platform modules.</p>
              <p style={{ marginBottom:5,fontWeight:600,color:"#1a1a2e" }}>Three recommended actions:</p>
              <p style={{ marginBottom:5 }}>1. <strong style={{ color:"#1a1a2e" }}>Activation scoring at day 30.</strong> Accounts using 4+ modules have 89% retention vs. 34% for those using 1–2.</p>
              <p style={{ marginBottom:5 }}>2. <strong style={{ color:"#1a1a2e" }}>Reframe onboarding for mid-market.</strong> Consider a 3-touch sequence: Day 1, 7, and 14.</p>
              <p>3. <strong style={{ color:"#1a1a2e" }}>Contrarian move: raise mid-market pricing.</strong> Higher-paying accounts retain at 78%.</p>
            </div>

            <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginTop:12 }}>
              {[{label:"Claude",color:"#3b82f6"},{label:"GPT-4",color:"#22c55e"},{label:"Gemini",color:"#f59e0b"},{label:"DeepSeek",color:"#ef4444"}].map(s => (
                <span key={s.label} style={{ display:"inline-flex",alignItems:"center",gap:4,fontSize:9,color:"#64748b",padding:"2px 9px",borderRadius:4,background:"#f0f2f5",border:"1px solid #e2e8f0",fontFamily:"monospace" }}>
                  <span style={{ width:5,height:5,borderRadius:"50%",background:s.color,display:"inline-block" }} />{s.label}
                </span>
              ))}
            </div>

            <div style={{ marginTop:12,padding:"10px 12px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:7 }}>
              <div style={{ fontSize:8,fontWeight:700,color:"#94a3b8",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6 }}>▶ Orchestration Trace</div>
              <div style={{ display:"flex",alignItems:"center",gap:3,flexWrap:"wrap" }}>
                {["Intent Analysis","→","UserBrain","→","4 Providers","→","Consensus 3/4","→","Synthesis","→","12.4s"].map((s,i) =>
                  s==="→"
                    ? <span key={i} style={{ color:"#cbd5e1",fontSize:10 }}>→</span>
                    : <span key={i} style={{ fontSize:9,color:"#475569",padding:"2px 7px",borderRadius:4,background:"#fff",border:"1px solid #e2e8f0",fontFamily:"monospace" }}>{s}</span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ padding:"12px 18px 0",borderTop:"1px solid #e2e8f0" }}>
            <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:7,flexWrap:"wrap" }}>
              <span style={{ fontSize:8,fontWeight:700,color:"#94a3b8",letterSpacing:"0.12em",textTransform:"uppercase",marginRight:3,whiteSpace:"nowrap" }}>Thinking Style</span>
              {["Conservative","Explorer","Contrarian","Visionary","Academic"].map(s => (
                <button key={s} onClick={()=>setActiveStyle(s)} style={pill(activeStyle===s)}>{s}</button>
              ))}
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",marginBottom:12 }}>
              <div style={{ display:"flex",alignItems:"center",gap:5,flexWrap:"wrap" }}>
                <span style={{ fontSize:8,fontWeight:700,color:"#94a3b8",letterSpacing:"0.12em",textTransform:"uppercase",whiteSpace:"nowrap" }}>Response Type</span>
                {["Synthesis","Intelligence","Comparison"].map(t => (
                  <button key={t} onClick={()=>setActiveType(t)} style={pill(activeType===t)}>{t}</button>
                ))}
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                <span style={{ fontSize:8,fontWeight:700,color:"#94a3b8",letterSpacing:"0.12em",textTransform:"uppercase",whiteSpace:"nowrap" }}>Speed</span>
                {["Quick","Quantitative","Quality"].map(s => (
                  <button key={s} onClick={()=>setActiveSpeed(s)} style={pill(activeSpeed===s)}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Query input */}
          <div style={{ padding:"0 18px 16px" }}>
            <div style={{ display:"flex",gap:7,marginBottom:7 }}>
              <input placeholder="Ask anything..." style={{ flex:1,padding:"9px 12px",border:"1px solid #e2e8f0",borderRadius:7,fontSize:12,color:"#1a1a2e",outline:"none" }} readOnly />
              <button style={{ width:38,height:38,border:"1px solid #e2e8f0",borderRadius:7,background:"#f8fafc",fontSize:15,cursor:"pointer" }}>🎤</button>
            </div>
            <button style={{ width:"100%",padding:"9px",background:"#94a3b8",color:"#fff",border:"none",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer" }}>Ask AI Unite</button>
          </div>
        </div>

        {/* Right: sessions */}
        <div style={{ display:"flex",flexDirection:"column" }}>
          <div style={{ display:"flex",alignItems:"center",gap:7,padding:"12px 14px",borderBottom:"1px solid #f0f2f5" }}>
            <span style={{ fontSize:12,fontWeight:600,color:"#1a1a2e",flex:1 }}>Query Sessions</span>
            <span style={{ fontSize:10,color:"#3b82f6",fontWeight:600,padding:"2px 8px",border:"1px solid rgba(59,130,246,0.25)",borderRadius:4,background:"rgba(59,130,246,0.04)",cursor:"pointer" }}>+ New</span>
          </div>
          <input placeholder="Search conversations..." style={{ margin:"8px 10px",padding:"6px 10px",border:"1px solid #e2e8f0",borderRadius:6,fontSize:10,outline:"none" }} readOnly />
          <div style={{ flex:1,overflowY:"auto",padding:"0 8px 8px" }}>
            {SESSIONS.map(s => (
              <div key={s.name} style={{ padding:"9px",borderRadius:6,background:s.active?"rgba(59,130,246,0.05)":"transparent",marginBottom:1,cursor:"pointer" }}>
                <div style={{ fontSize:11,color:"#1a1a2e",fontWeight:500,marginBottom:2 }}>{s.name}</div>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <span style={{ fontSize:9,color:"#94a3b8" }}>{s.time}</span>
                  <span style={{ fontSize:9,color:"#64748b",padding:"1px 5px",background:"#f0f2f5",borderRadius:3,fontWeight:500 }}>{s.msgs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Executive dashboard mockup ───────────────────────────────────────────────

function ExecutiveDashboard() {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 90;

  return (
    <div style={{ background:"#0d1117",borderRadius:16,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 20px 60px rgba(0,0,0,0.35)" }}>
      {/* Top nav */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 18px",background:"rgba(255,255,255,0.03)",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}>
          <div style={{ width:18,height:18,borderRadius:"50%",background:"rgba(59,130,246,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9 }}>🧠</div>
          <span style={{ fontSize:11,fontWeight:700,color:"#e2e8f0" }}>AI Unite</span>
        </div>
        <div style={{ display:"flex",gap:14 }}>
          {["Query","Voice","My Brain","Team","Dashboard"].map(l => (
            <span key={l} style={{ fontSize:10,color:l==="Dashboard"?"#3b82f6":"#64748b",fontWeight:l==="Dashboard"?600:400 }}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize:9,color:"#64748b" }}>user@acme.com</span>
      </div>

      {/* Sub nav */}
      <div style={{ display:"flex",alignItems:"center",padding:"0 18px",background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.06)",overflowX:"auto" }}>
        <span style={{ fontSize:9,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginRight:8,whiteSpace:"nowrap" }}>Viewing:</span>
        <span style={{ fontSize:10,color:"#22c55e",fontWeight:600,padding:"2px 7px",background:"rgba(34,197,94,0.1)",borderRadius:3,marginRight:16,whiteSpace:"nowrap" }}>ACME CORP</span>
        {["Overview","Team Management","Usage Analytics","Security","Cognitive Intelligence","Outcomes"].map(t => (
          <span key={t} style={{ fontSize:10,color:t==="Overview"?"#3b82f6":"#475569",padding:"10px 10px",borderBottom:t==="Overview"?"2px solid #3b82f6":"2px solid transparent",whiteSpace:"nowrap",fontWeight:t==="Overview"?500:400 }}>{t}</span>
        ))}
        <span style={{ marginLeft:"auto",fontSize:8,color:"#a78bfa",border:"1px solid rgba(167,139,250,0.3)",padding:"2px 8px",borderRadius:3,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,whiteSpace:"nowrap" }}>EXECUTIVE</span>
      </div>

      {/* 3-col */}
      <div style={{ display:"grid",gridTemplateColumns:"170px 1fr 150px",minHeight:360 }}>
        {/* Left metrics */}
        <div style={{ padding:"14px 12px",display:"flex",flexDirection:"column",gap:8,borderRight:"1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ fontSize:8,fontWeight:700,color:"#22c55e",textTransform:"uppercase",letterSpacing:"0.14em",display:"flex",alignItems:"center",gap:4,marginBottom:3 }}>
            <span style={{ width:5,height:5,borderRadius:"50%",background:"#22c55e",display:"inline-block" }} />LIVE
          </div>
          {DASHBOARD_METRICS.map(m => (
            <div key={m.label} style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderLeft:`3px solid ${m.color}`,borderRadius:6,padding:"9px 10px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3 }}>
                <span style={{ fontSize:7,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.12em",fontFamily:"monospace" }}>{m.label}</span>
                <span style={{ fontSize:8,padding:"1px 5px",borderRadius:2,fontWeight:600,background:m.badgeBg,color:m.badgeColor }}>{m.badge}</span>
              </div>
              <div style={{ fontSize:24,fontWeight:800,color:"#e2e8f0",lineHeight:1.1 }}>{m.value}<span style={{ fontSize:11,fontWeight:400,color:"#475569" }}>{m.unit}</span></div>
              <div style={{ fontSize:8,color:"#475569",marginTop:2 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Center brain */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"relative",width:size,height:size }}>
            {[size,size*0.69,size*0.42].map((s,i) => (
              <div key={i} style={{ position:"absolute",width:s,height:s,top:(size-s)/2,left:(size-s)/2,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.04)" }} />
            ))}
            <svg style={{ position:"absolute",top:0,left:0,width:size,height:size,zIndex:0 }}>
              {DASH_NODES.map((_,i) => {
                const a = (i*(360/DASH_NODES.length)-90)*(Math.PI/180);
                return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} stroke="rgba(139,92,246,0.15)" strokeWidth="1" />;
              })}
            </svg>
            {/* Core */}
            <div style={{ position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:72,height:72,borderRadius:"50%",background:"radial-gradient(circle at 40% 40%,rgba(139,92,246,0.3),rgba(59,130,246,0.1),transparent)",border:"1px solid rgba(139,92,246,0.3)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:2 }}>
              <span style={{ fontSize:18,marginBottom:1 }}>🧠</span>
              <span style={{ fontSize:5,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.15em",color:"#94a3b8",fontFamily:"monospace",textAlign:"center" }}>Corporate Brain</span>
              <span style={{ fontSize:7,color:"#22c55e",marginTop:1 }}>● active</span>
            </div>
            {/* Nodes */}
            {DASH_NODES.map((node,i) => {
              const a = (i*(360/DASH_NODES.length)-90)*(Math.PI/180);
              const x = cx+Math.cos(a)*r-18;
              const y = cy+Math.sin(a)*r-18;
              return (
                <div key={node.label} style={{ position:"absolute",left:x,top:y,width:36,height:36,borderRadius:"50%",background:`${node.color}18`,border:`2px solid ${node.color}44`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:3 }}>
                  <span style={{ fontSize:11 }}>{node.icon}</span>
                  <span style={{ fontSize:7,fontWeight:700,color:"#e2e8f0" }}>{node.count}</span>
                  <span style={{ position:"absolute",bottom:-12,fontSize:7,color:"#64748b",whiteSpace:"nowrap" }}>{node.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right modules */}
        <div style={{ padding:"14px 12px",borderLeft:"1px solid rgba(255,255,255,0.04)",display:"flex",flexDirection:"column",gap:5 }}>
          <div style={{ fontSize:8,fontWeight:700,color:"#3b82f6",textTransform:"uppercase",letterSpacing:"0.14em",textAlign:"right",marginBottom:4 }}>Modules</div>
          {[
            {icon:"👥",name:"Team",          stat:"47 members",     color:"#3b82f6"},
            {icon:"🛡️",name:"Security",      stat:"Active",         color:"#f43f5e"},
            {icon:"⚡",name:"Workflow",       stat:"2,841 processed",color:"#f59e0b"},
            {icon:"📁",name:"Projects",       stat:"8 active",       color:"#22c55e"},
            {icon:"📚",name:"Knowledge",      stat:"1,247 nodes",    color:"#ec4899"},
            {icon:"🔬",name:"Self-Evolution", stat:"72% autonomy",   color:"#8b5cf6"},
            {icon:"💻",name:"Code JASU",      stat:"Available",      color:"#06b6d4"},
          ].map(mod => (
            <div key={mod.name} style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 8px",borderRadius:6,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",cursor:"pointer" }}>
              <div style={{ width:24,height:24,borderRadius:5,background:`${mod.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0 }}>{mod.icon}</div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:10,fontWeight:600,color:"#e2e8f0" }}>{mod.name}</div>
                <div style={{ fontSize:8,color:"#475569" }}>{mod.stat}</div>
              </div>
              <span style={{ color:"#334155",fontSize:10 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function PlatformDeepDive() {
  return (
    <div>

      {/* 1 ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>How It Works</SectionLabel>
        <SectionHeading>One query bar. Total control.</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          You type a question. You choose how deep, how creative, and what format. JASU queries multiple AI providers simultaneously, synthesizes the best answer, and remembers what it learns about you.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {i < FLOW_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-5 -right-2 text-[rgb(var(--border))] text-lg z-10">→</div>
              )}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 text-sm font-bold text-white" style={{ background:"linear-gradient(135deg,#3b82f6,#2563eb)" }}>
                {step.num}
              </div>
              <div className="text-sm font-semibold text-[rgb(var(--text))] mb-1">{step.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))]">{step.desc}</p>
            </div>
          ))}
        </div>
        <QueryMockup />
      </div>

      <Divider />

      {/* 2 ── COGNITIVE MODES ─────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Cognitive Modes</SectionLabel>
        <SectionHeading>Choose your depth</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Not every question needs the same level of analysis. Cognitive modes control how many AI providers are consulted, how much cross-referencing happens, and how fast you get your answer.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {COGNITIVE_MODES.map(m => (
            <div key={m.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6">
              <div className="text-2xl mb-3">{m.icon}</div>
              <div className="text-base font-semibold text-[rgb(var(--text))] mb-1">{m.title}</div>
              <span className="inline-block text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-3" style={{ background:`${m.tagColor}15`,color:m.tagColor }}>{m.tag}</span>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-4">{m.desc}</p>
              <div className="rounded-xl bg-white/[0.03] border border-[rgb(var(--border))]/40 px-3 py-2.5 mb-4">
                <div className="text-[9px] font-semibold uppercase tracking-wider text-[rgb(var(--muted))] mb-1">Best for</div>
                <div className="text-xs italic text-[rgb(var(--muted))]">{m.example}</div>
              </div>
              <div className="flex gap-4 pt-3 border-t border-[rgb(var(--border))]/40">
                <div><div className="text-base font-bold text-[rgb(var(--text))]">{m.providers}</div><div className="text-[9px] text-[rgb(var(--muted))]">Providers</div></div>
                <div><div className="text-base font-bold text-[rgb(var(--text))]">{m.speed}</div><div className="text-[9px] text-[rgb(var(--muted))]">Response</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 3 ── THINKING STYLES ─────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Thinking Styles</SectionLabel>
        <SectionHeading>Shape how intelligence thinks</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Same question, five different lenses. Thinking styles change the reasoning framework — not just the tone, but the actual logic, risk weighting, and perspective the system uses.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {THINKING_STYLES.map(s => (
            <div key={s.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-5 text-center" style={{ borderTop:`2.5px solid ${s.color}` }}>
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="text-sm font-semibold mb-2" style={{ color:s.color }}>{s.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-4">{s.desc}</p>
              <div className="text-[9px] text-[rgb(var(--muted))] pt-3 border-t border-[rgb(var(--border))]/40 leading-snug">
                <span className="font-semibold text-[rgb(var(--text))]">Best for:</span> {s.best}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 4 ── RESPONSE TYPES ──────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Response Types</SectionLabel>
        <SectionHeading>Choose your output format</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          The same answer delivered as a unified narrative, a transparent intelligence report, or a structured comparison. You decide what's most useful.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {RESPONSE_TYPES.map(r => (
            <div key={r.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6">
              <div className="text-2xl mb-3">{r.icon}</div>
              <div className="text-base font-semibold text-[rgb(var(--text))] mb-1">{r.title}</div>
              <span className="inline-block text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-3" style={{ background:`${r.tagColor}15`,color:r.tagColor }}>{r.tag}</span>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-4">{r.desc}</p>
              <div className="rounded-xl bg-white/[0.03] border border-[rgb(var(--border))]/40 px-3 py-2.5">
                <div className="text-[9px] font-semibold uppercase tracking-wider text-[rgb(var(--muted))] mb-1">You see</div>
                <div className="text-xs italic text-[rgb(var(--muted))]">{r.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 5 ── FEATURES ────────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Built Into the Platform</SectionLabel>
        <SectionHeading>Not just a query bar</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Every feature a team needs to adopt AI as infrastructure — not as a novelty.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(f => (
            <div key={f.title} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background:`${f.color}14` }}>{f.icon}</div>
              <div className="text-sm font-semibold text-[rgb(var(--text))] mb-2">{f.title}</div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 6 ── ROLE TIERS ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Who Sees What</SectionLabel>
        <SectionHeading>One platform, every level</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Everyone uses the query bar. What changes is the visibility, the controls, and the dashboards.
        </p>
        <div className="mt-8 space-y-3">
          {ROLE_TIERS.map(tier => (
            <div key={tier.badge} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-5 grid gap-4 sm:grid-cols-[160px_1fr]">
              <div>
                <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2" style={{ background:`${tier.badgeColor}16`,color:tier.badgeColor }}>{tier.badge}</span>
                <div className="text-sm font-semibold text-[rgb(var(--text))]">{tier.title}</div>
                <div className="text-[10px] text-[rgb(var(--muted))]">{tier.sub}</div>
              </div>
              <div>
                <p className="text-xs leading-relaxed text-[rgb(var(--muted))] mb-3">{tier.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tier.features.map(f => (
                    <span key={f} className="text-[10px] px-2.5 py-1 rounded-full border border-[rgb(var(--border))]/50 text-[rgb(var(--muted))]">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 7 ── EXECUTIVE DASHBOARD ─────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>The Executive Dashboard</SectionLabel>
        <SectionHeading>The intelligence dashboard</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Real-time visibility into how your organization thinks, learns, and decides.
        </p>
        <div className="mt-8"><ExecutiveDashboard /></div>
      </div>

      <Divider />

      {/* 8 ── ADMIN CONTROLS ──────────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>What Admins Control</SectionLabel>
        <SectionHeading>Governance built in, not bolted on</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Policy, permissions, and auditability are first-class — not afterthoughts.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {ADMIN_CONTROLS.map(a => (
            <div key={a.num} className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6 relative overflow-hidden">
              <div className="absolute top-4 right-5 text-4xl font-bold select-none" style={{ color:"rgba(255,255,255,0.04)" }}>{a.num}</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background:`${a.color}14` }}>{a.icon}</div>
                <div className="text-sm font-semibold text-[rgb(var(--text))]">{a.title}</div>
              </div>
              <p className="text-xs leading-relaxed text-[rgb(var(--muted))]">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 9 ── GOVERNED DEPLOYMENT ─────────────────────────────────────────── */}
      <div className="mb-12">
        <SectionLabel>Enterprise Ready</SectionLabel>
        <SectionHeading>Governed deployment</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
          Enterprise requirements built into the architecture, not patched on top.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GOV_ITEMS.map(g => (
            <div key={g.title} className="flex items-start gap-3 p-4 rounded-xl border border-[rgb(var(--border))]/50 bg-white/[0.02]">
              <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background:"rgba(34,197,94,0.1)",color:"#22c55e" }}>✓</span>
              <div>
                <div className="text-sm font-semibold text-[rgb(var(--text))]">{g.title}</div>
                <div className="text-xs text-[rgb(var(--muted))] mt-0.5">{g.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 10 ── CTA ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl px-8 py-10 text-center" style={{ background:"rgba(59,130,246,0.04)",border:"1px solid rgba(59,130,246,0.15)" }}>
        <h3 className="text-xl md:text-2xl font-semibold text-[rgb(var(--text))] mb-3 leading-snug">
          This isn&apos;t a chat window with a corporate skin.<br />
          <span style={{ color:"#3b82f6" }}>It&apos;s a managed intelligence platform.</span>
        </h3>
        <p className="text-sm text-[rgb(var(--muted))] max-w-md mx-auto mb-6 leading-relaxed">
          Every person. Every role. Every decision. One intelligence layer that gets smarter every day.
        </p>
        <a href="mailto:soob@aiunite.ai?subject=Platform Demo Request" className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-85" style={{ background:"#3b82f6",color:"#fff" }}>
          Request a Platform Demo <span>→</span>
        </a>
        <p className="text-xs text-[rgb(var(--muted))] mt-4">Available for enterprise and SMB deployments</p>
      </div>

    </div>
  );
}
