"use client";

import React, { useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  Users,
  Lightbulb,
  Rocket,
  UserCircle2,
} from "lucide-react";

type SpokeKey =
  | "executive"
  | "deptHeads"
  | "managers"
  | "contributors"
  | "newHires"
  | "employees";

type Spoke = {
  key: SpokeKey;
  title: string;
  desc: string;
  Icon: React.ElementType;
  bg: string;
  arrowColor: string;
  arrowBlueId: string;
  arrowGoldId: string;
  isBlue: boolean;
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function CorporateBrain() {
  const spokes: Spoke[] = useMemo(
    () => [
      { key: "executive",    title: "Executive Leadership",     desc: "Strategic decisions and rationale preserved and accessible.",          Icon: Briefcase,    bg: "#3b82f6", arrowColor: "rgba(59,130,246,0.85)",  arrowBlueId: "ab1", arrowGoldId: "ag1", isBlue: true  },
      { key: "deptHeads",    title: "Department Heads",         desc: "Domain expertise shared across the organization.",                    Icon: Building2,    bg: "#10b981", arrowColor: "rgba(245,158,11,0.85)",  arrowBlueId: "ab2", arrowGoldId: "ag2", isBlue: false },
      { key: "employees",    title: "Employees",                desc: "Daily work context becomes usable institutional intelligence.",       Icon: UserCircle2,  bg: "#06b6d4", arrowColor: "rgba(59,130,246,0.85)",  arrowBlueId: "ab3", arrowGoldId: "ag3", isBlue: true  },
      { key: "contributors", title: "Individual Contributors",  desc: "Insights and discoveries feed collective intelligence.",              Icon: Lightbulb,    bg: "#6366f1", arrowColor: "rgba(245,158,11,0.85)",  arrowBlueId: "ab4", arrowGoldId: "ag4", isBlue: false },
      { key: "newHires",     title: "New Hires",                desc: "Inherit institutional knowledge from day one.",                       Icon: Rocket,       bg: "#f97316", arrowColor: "rgba(59,130,246,0.85)",  arrowBlueId: "ab5", arrowGoldId: "ag5", isBlue: true  },
      { key: "managers",     title: "Managers",                 desc: "Team patterns, workflows, and operational knowledge retained.",       Icon: Users,        bg: "#8b5cf6", arrowColor: "rgba(245,158,11,0.85)",  arrowBlueId: "ab6", arrowGoldId: "ag6", isBlue: false },
    ],
    []
  );

  const [active, setActive] = useState<SpokeKey | null>(null);

  // ── Geometry ──────────────────────────────────────────────────────────────
  // Wide viewBox with generous vertical padding so top/bottom labels never clip
  const W       = 860;
  const H       = 720;
  const cx      = W / 2;
  const cy      = H / 2;

  const iconR   = 28;   // icon circle radius
  const spokeR  = 240;  // distance from center to icon center
  const orbitR  = spokeR; // ring passes THROUGH the icons (same radius)
  const hubR    = 104;  // hub circle radius

  // Line starts/ends at circle edges, not centers
  const lineStart = hubR + 14;       // just outside hub
  const lineEnd   = spokeR - iconR - 6; // just before icon edge

  // Labels sit further out than icons
  const labelR  = spokeR + iconR + 46; // well clear of icon edge

  const angles = [-90, -30, 30, 90, 150, 210];

  const labelAlign = (a: number): "center" | "left" | "right" => {
    if (a === -90 || a === 90) return "center";
    return a > -90 && a < 90 ? "left" : "right";
  };

  // How wide each label foreignObject is
  const LABEL_W = 170;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="text-[10px] tracking-[0.28em] uppercase text-[rgb(var(--muted))] mb-3">
              Organizational Layer
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-[rgb(var(--text))]">
              CorporateBrain
            </h2>
            <p className="mt-3 max-w-xl text-base text-[rgb(var(--muted))] leading-relaxed">
              One brain across the organization — knowledge flows down, intelligence flows up.
            </p>
          </div>
          <div className="shrink-0 rounded-full border border-[rgb(var(--border))] bg-white/5 px-4 py-2 text-xs font-medium text-[rgb(var(--text))]">
            AI UNITE Differentiator
          </div>
        </div>

        {/* Diagram card */}
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]/25 p-4 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto block"
            role="img"
            aria-label="CorporateBrain organizational intelligence flow diagram"
          >
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.20)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </radialGradient>

              <filter id="iconShadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.28)" />
              </filter>

              {/* One blue + one gold arrowhead marker per spoke so each line can have both */}
              {spokes.map((s) => (
                <React.Fragment key={s.key}>
                  <marker id={s.arrowBlueId} viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(59,130,246,0.85)" />
                  </marker>
                  <marker id={s.arrowGoldId} viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(245,158,11,0.85)" />
                  </marker>
                </React.Fragment>
              ))}
            </defs>

            {/* Orbit ring — same radius as icons so it passes through them */}
            <circle
              cx={cx} cy={cy} r={orbitR}
              fill="none"
              stroke="rgba(59,130,246,0.30)"
              strokeWidth="1.5"
              strokeDasharray="5 9"
            />

            {/* Hub glow */}
            <circle cx={cx} cy={cy} r={hubR + 55} fill="url(#hubGlow)" />

            {/* Hub */}
            <circle
              cx={cx} cy={cy} r={hubR}
              fill="rgba(7,9,15,0.84)"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="2.5"
            />

            {/* Hub text */}
            <text x={cx} y={cy - 20} textAnchor="middle"
              fill="white" fontSize="21" fontWeight="600" fontFamily="inherit">
              One Brain.
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle"
              fill="rgb(59,130,246)" fontSize="20" fontWeight="700" fontFamily="inherit">
              Every Team.
            </text>
            <text x={cx} y={cy + 38} textAnchor="middle"
              fill="rgba(245,158,11,0.95)" fontSize="19" fontWeight="700" fontFamily="inherit">
              Nothing Lost.
            </text>

            {/* Spokes */}
            {spokes.map((s, i) => {
              const a        = angles[i];
              const iconPos  = polar(cx, cy, spokeR, a);
              const hubPt    = polar(cx, cy, lineStart, a);
              const iconPt   = polar(cx, cy, lineEnd, a);
              const labelPos = polar(cx, cy, labelR, a);
              const isActive = active === s.key;
              const dim      = active !== null && !isActive;

              const align = labelAlign(a);
              const foX = align === "center"
                ? labelPos.x - LABEL_W / 2
                : align === "left"
                ? labelPos.x
                : labelPos.x - LABEL_W;

              // Blue spokes: arrow points from hub → icon (knowledge down)
              // Gold spokes: arrow points from icon → hub (intelligence up)
              // But ALL are bidirectional — markerStart + markerEnd
              const blueColor = "rgba(59,130,246,0.82)";
              const goldColor = "rgba(245,158,11,0.82)";
              const strokeColor = s.isBlue ? blueColor : goldColor;
              const startMarkerId = s.isBlue ? s.arrowGoldId : s.arrowBlueId;
              const endMarkerId   = s.isBlue ? s.arrowBlueId : s.arrowGoldId;

              return (
                <g
                  key={s.key}
                  onMouseEnter={() => setActive(s.key)}
                  onMouseLeave={() => setActive(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Bidirectional connector */}
                  <line
                    x1={hubPt.x}   y1={hubPt.y}
                    x2={iconPt.x}  y2={iconPt.y}
                    stroke={strokeColor}
                    strokeWidth={isActive ? 3 : 2}
                    markerStart={`url(#${startMarkerId})`}
                    markerEnd={`url(#${endMarkerId})`}
                    opacity={dim ? 0.25 : 1}
                    style={{ transition: "opacity 0.2s" }}
                  />

                  {/* Icon circle */}
                  <circle
                    cx={iconPos.x} cy={iconPos.y} r={iconR}
                    fill={s.bg}
                    filter="url(#iconShadow)"
                    opacity={dim ? 0.35 : 1}
                    style={{ transition: "opacity 0.2s" }}
                  />

                  {/* Active pulse ring */}
                  {isActive && (
                    <circle
                      cx={iconPos.x} cy={iconPos.y} r={iconR + 8}
                      fill="none"
                      stroke={s.bg}
                      strokeWidth="2"
                      opacity="0.4"
                    />
                  )}

                  {/* Lucide icon via foreignObject, centered */}
                  <foreignObject
                    x={iconPos.x - 14} y={iconPos.y - 14}
                    width="28" height="28"
                  >
                    <div style={{
                      width: 28, height: 28,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: dim ? 0.35 : 1,
                      transition: "opacity 0.2s",
                    }}>
                      <s.Icon style={{ width: 16, height: 16, color: "#fff", display: "block" }} strokeWidth={2.2} />
                    </div>
                  </foreignObject>

                  {/* Label */}
                  <foreignObject x={foX} y={labelPos.y - 30} width={LABEL_W} height={90}>
                    <div style={{
                      textAlign: align,
                      opacity: dim ? 0.25 : 1,
                      transition: "opacity 0.2s",
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "rgb(var(--text, 26 26 46))", marginBottom: 3, lineHeight: 1.2 }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: 11, lineHeight: 1.5, color: "rgb(var(--muted, 100 116 139))" }}>
                        {s.desc}
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Axis labels */}
            <text x={22} y={cy + 4} textAnchor="middle"
              fill="rgba(245,158,11,0.55)" fontSize="8.5" fontWeight="600" letterSpacing="2.2"
              transform={`rotate(-90, 22, ${cy})`}>
              KNOWLEDGE FLOWS DOWN →
            </text>
            <text x={W - 22} y={cy + 4} textAnchor="middle"
              fill="rgba(59,130,246,0.55)" fontSize="8.5" fontWeight="600" letterSpacing="2.2"
              transform={`rotate(90, ${W - 22}, ${cy})`}>
              INTELLIGENCE FLOWS UP →
            </text>
          </svg>

          {/* Info strip */}
          <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-[rgb(var(--border))]/50 pt-6">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="text-[9px] font-semibold tracking-[0.2em] text-[rgb(var(--muted))] uppercase mb-2">
                Organizational Memory
              </div>
              <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">
                The CorporateBrain layer turns fragmented operational signals into shared
                institutional intelligence — without forcing teams into a single tool.
              </p>
            </div>
            {[
              { k: "Retention",    v: "Decisions, rationale, and workflows don't disappear when people leave." },
              { k: "Distribution", v: "Context becomes available across departments, roles, and time." },
              { k: "Continuity",   v: "New employees ramp faster because the organization \"remembers.\"" },
            ].map((row) => (
              <div key={row.k} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/10 p-4">
                <div className="text-[9px] font-semibold tracking-[0.2em] text-[rgb(var(--muted))] uppercase mb-1.5">
                  {row.k}
                </div>
                <div className="text-sm text-[rgb(var(--text))] leading-snug">{row.v}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
