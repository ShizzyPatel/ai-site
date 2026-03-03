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
  iconColor: string;
  arrowColor: string;
  arrowId: string;
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function CorporateBrain() {
  const spokes: Spoke[] = useMemo(
    () => [
      {
        key: "executive",
        title: "Executive Leadership",
        desc: "Strategic decisions and rationale preserved and accessible.",
        Icon: Briefcase,
        bg: "#3b82f6",
        iconColor: "#fff",
        arrowColor: "rgba(59,130,246,0.9)",
        arrowId: "arr-blue",
      },
      {
        key: "deptHeads",
        title: "Department Heads",
        desc: "Domain expertise shared across the organization.",
        Icon: Building2,
        bg: "#10b981",
        iconColor: "#fff",
        arrowColor: "rgba(245,158,11,0.9)",
        arrowId: "arr-gold",
      },
      {
        key: "employees",
        title: "Employees",
        desc: "Daily work context becomes usable institutional intelligence.",
        Icon: UserCircle2,
        bg: "#06b6d4",
        iconColor: "#fff",
        arrowColor: "rgba(59,130,246,0.9)",
        arrowId: "arr-blue",
      },
      {
        key: "contributors",
        title: "Individual Contributors",
        desc: "Insights and discoveries feed collective intelligence.",
        Icon: Lightbulb,
        bg: "#6366f1",
        iconColor: "#fff",
        arrowColor: "rgba(245,158,11,0.9)",
        arrowId: "arr-gold",
      },
      {
        key: "newHires",
        title: "New Hires",
        desc: "Inherit institutional knowledge from day one.",
        Icon: Rocket,
        bg: "#f97316",
        iconColor: "#fff",
        arrowColor: "rgba(59,130,246,0.9)",
        arrowId: "arr-blue",
      },
      {
        key: "managers",
        title: "Managers",
        desc: "Team patterns, workflows, and operational knowledge retained.",
        Icon: Users,
        bg: "#8b5cf6",
        iconColor: "#fff",
        arrowColor: "rgba(245,158,11,0.9)",
        arrowId: "arr-gold",
      },
    ],
    []
  );

  const [active, setActive] = useState<SpokeKey | null>(null);

  // Geometry — designed for a wide viewBox so icons render large
  const W = 800;
  const H = 600;
  const cx = W / 2;
  const cy = H / 2;

  const orbitR   = 180;  // dashed ring
  const spokeR   = 248;  // center of icon circle
  const hubR     = 100;  // hub radius
  const labelR   = 316;  // text anchor radius

  // 6 spokes, start at top (-90°)
  const angles = [-90, -30, 30, 90, 150, 210];

  // label anchor alignment per angle
  const labelAlign = (a: number): "middle" | "start" | "end" => {
    if (a === -90 || a === 90) return "middle";
    if (a > -90 && a < 90) return "start";
    return "end";
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header row */}
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

        {/* Diagram card — full width */}
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]/25 p-4 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">

          {/* SVG — takes full width, aspect ratio locked */}
          <div className="w-full">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto"
              role="img"
              aria-label="CorporateBrain organizational intelligence flow diagram"
            >
              <defs>
                <radialGradient id="hubGlow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(59,130,246,0.22)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                </radialGradient>

                {/* Blue arrowhead */}
                <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(59,130,246,0.85)" />
                </marker>

                {/* Gold arrowhead */}
                <marker id="arr-gold" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(245,158,11,0.85)" />
                </marker>

                {/* Drop shadow for icon circles */}
                <filter id="iconShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.25)" />
                </filter>
              </defs>

              {/* Orbit ring */}
              <circle
                cx={cx} cy={cy} r={orbitR}
                fill="none"
                stroke="rgba(59,130,246,0.28)"
                strokeWidth="1.5"
                strokeDasharray="5 9"
              />

              {/* Hub glow */}
              <circle cx={cx} cy={cy} r={hubR + 50} fill="url(#hubGlow)" />

              {/* Hub circle */}
              <circle
                cx={cx} cy={cy} r={hubR}
                fill="rgba(7,9,15,0.82)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2.5"
              />

              {/* Hub text */}
              <text x={cx} y={cy - 18} textAnchor="middle"
                fill="white" fontSize="20" fontWeight="600" fontFamily="inherit">
                One Brain.
              </text>
              <text x={cx} y={cy + 10} textAnchor="middle"
                fill="rgb(59,130,246)" fontSize="19" fontWeight="700" fontFamily="inherit">
                Every Team.
              </text>
              <text x={cx} y={cy + 36} textAnchor="middle"
                fill="rgba(245,158,11,0.95)" fontSize="18" fontWeight="700" fontFamily="inherit">
                Nothing Lost.
              </text>

              {/* Spokes */}
              {spokes.map((s, i) => {
                const a = angles[i];
                const iconPos = polar(cx, cy, spokeR, a);
                const hubEdge  = polar(cx, cy, hubR + 12, a);
                const iconEdge = polar(cx, cy, spokeR - 26, a);
                const labelPos = polar(cx, cy, labelR, a);
                const isActive = active === s.key;
                const align = labelAlign(a);

                return (
                  <g
                    key={s.key}
                    onMouseEnter={() => setActive(s.key)}
                    onMouseLeave={() => setActive(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Connector line with arrow */}
                    <line
                      x1={hubEdge.x} y1={hubEdge.y}
                      x2={iconEdge.x} y2={iconEdge.y}
                      stroke={s.arrowColor}
                      strokeWidth={isActive ? 3 : 2}
                      markerEnd={`url(#${s.arrowId})`}
                      opacity={active === null || isActive ? 1 : 0.35}
                    />

                    {/* Icon circle — 52px radius = large, visible */}
                    <circle
                      cx={iconPos.x} cy={iconPos.y} r={26}
                      fill={s.bg}
                      filter="url(#iconShadow)"
                      opacity={active === null || isActive ? 1 : 0.55}
                    />

                    {/* Ring on hover */}
                    {isActive && (
                      <circle
                        cx={iconPos.x} cy={iconPos.y} r={32}
                        fill="none"
                        stroke={s.bg}
                        strokeWidth="2"
                        opacity="0.4"
                      />
                    )}

                    {/* Icon via foreignObject — centered in the circle */}
                    <foreignObject
                      x={iconPos.x - 13}
                      y={iconPos.y - 13}
                      width="26"
                      height="26"
                    >
                      <div
                        style={{
                          width: 26, height: 26,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: active === null || isActive ? 1 : 0.55,
                        }}
                      >
                        <s.Icon
                          style={{ width: 15, height: 15, color: s.iconColor, display: "block" }}
                          strokeWidth={2.2}
                        />
                      </div>
                    </foreignObject>

                    {/* Label group */}
                    <foreignObject
                      x={
                        align === "middle"
                          ? labelPos.x - 90
                          : align === "start"
                          ? labelPos.x - 4
                          : labelPos.x - 176
                      }
                      y={labelPos.y - 26}
                      width="180"
                      height="80"
                    >
                      <div
                        style={{
                          textAlign: align === "middle" ? "center" : align === "start" ? "left" : "right",
                          opacity: active === null || isActive ? 1 : 0.4,
                          transition: "opacity 0.2s",
                        }}
                      >
                        <div style={{
                          fontSize: 13, fontWeight: 600,
                          color: "rgb(var(--text, 26 26 46))",
                          marginBottom: 3, lineHeight: 1.2,
                        }}>
                          {s.title}
                        </div>
                        <div style={{
                          fontSize: 11, lineHeight: 1.45,
                          color: "rgb(var(--muted, 100 116 139))",
                        }}>
                          {s.desc}
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Axis labels */}
              <text
                x={18} y={cy + 4}
                textAnchor="middle"
                fill="rgba(245,158,11,0.6)"
                fontSize="9"
                fontWeight="600"
                letterSpacing="2"
                transform={`rotate(-90, 18, ${cy})`}
              >
                KNOWLEDGE FLOWS DOWN →
              </text>
              <text
                x={W - 18} y={cy + 4}
                textAnchor="middle"
                fill="rgba(59,130,246,0.6)"
                fontSize="9"
                fontWeight="600"
                letterSpacing="2"
                transform={`rotate(90, ${W - 18}, ${cy})`}
              >
                INTELLIGENCE FLOWS UP →
              </text>
            </svg>
          </div>

          {/* Info panel — horizontal strip below the diagram */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-[rgb(var(--border))]/50 pt-6">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="text-xs font-semibold tracking-[0.18em] text-[rgb(var(--muted))] mb-2 uppercase">
                Organizational Memory
              </div>
              <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">
                The CorporateBrain layer turns fragmented operational signals into shared
                institutional intelligence — without forcing teams into a single tool.
              </p>
            </div>
            {[
              {
                k: "Retention",
                v: "Decisions, rationale, and workflows don't disappear when people leave.",
              },
              {
                k: "Distribution",
                v: "Context becomes available across departments, roles, and time.",
              },
              {
                k: "Continuity",
                v: "New employees ramp faster because the organization \"remembers.\"",
              },
            ].map((row) => (
              <div
                key={row.k}
                className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/10 p-4"
              >
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
