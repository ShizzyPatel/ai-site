"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";

type BrainLayerKey = "userbrain" | "neocortex" | "limbic" | "reptilian";

type BrainLayer = {
  key: BrainLayerKey;
  title: string;
  subtitle: string;
  mid: string;
  right: string;
  color: string; // css color string
  glow: string; // rgba glow used for sparks
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function JasuBrainSection() {
  const layers: BrainLayer[] = useMemo(
    () => [
      {
        key: "userbrain",
        title: "USERBRAIN",
        subtitle: "Personal Layer",
        mid: "DOESN'T EXIST IN NATURE",
        right: "Learns YOU — preferences, patterns, history. Your Twin Brain.",
        color: "rgb(var(--gold))",
        glow: "rgba(245, 158, 11, 0.55)", // darker/stronger particles
      },
      {
        key: "neocortex",
        title: "NEOCORTEX",
        subtitle: "Intelligence Layer",
        mid: "Reasoning & Logic",
        right: "8+ Domain Brains, Dreamer Worker, cross-domain synthesis",
        color: "rgba(96, 165, 250, 1)",
        glow: "rgba(96, 165, 250, 0.48)", // darker/stronger particles
      },
      {
        key: "limbic",
        title: "LIMBIC SYSTEM",
        subtitle: "Learning Layer",
        mid: "Emotion & Memory",
        right: "19 Cognitive Workers, 86K+ knowledge nodes, AL 2.0",
        color: "rgba(167, 139, 250, 1)",
        glow: "rgba(167, 139, 250, 0.46)", // darker/stronger particles
      },
      {
        key: "reptilian",
        title: "REPTILIAN BRAIN",
        subtitle: "Evolution Layer",
        mid: "Survival & Instinct",
        right: "Circuit breakers, self-healing, autonomous evolution",
        color: "rgba(16, 185, 129, 1)",        // darker emerald
        glow: "rgba(16, 185, 129, 0.55)", // darker/stronger particles
      },
    ],
    []
  );

  const [active, setActive] = useState<BrainLayerKey>("userbrain");
  const activeLayer = layers.find((l) => l.key === active) ?? layers[0];

  const brainRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const brain = brainRef.current;
    if (!canvas || !brain) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);

    const resize = () => {
      const r = brain.getBoundingClientRect();
      w = Math.floor(r.width);
      h = Math.floor(r.height);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(brain);

    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      a: number;
      c: string;
    };

    const sparks: Spark[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // REVERSED ORDER (inner -> outer):
    // reptilian smallest, limbic next, neocortex next, userbrain largest
    const ringR = {
      reptilian: 70,
      limbic: 105,
      neocortex: 140,
      userbrain: 175,
    } as const;

    const spawn = (key: BrainLayerKey) => {
      const cx = w / 2;
      const cy = h / 2;

      const rBase = ringR[key] ?? 120;
      const r = rBase + rand(-10, 10);
      const t = rand(0, Math.PI * 2);

      const x = cx + Math.cos(t) * r;
      const y = cy + Math.sin(t) * r;

      const speed = key === "userbrain" ? rand(1.0, 1.9) : rand(0.6, 1.2);
      const vx = Math.cos(t + rand(-0.8, 0.8)) * speed;
      const vy = Math.sin(t + rand(-0.8, 0.8)) * speed;

      const max = key === "userbrain" ? rand(24, 40) : rand(18, 30);
      const layer = layers.find((l) => l.key === key)!;

      sparks.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        max,
        a: rand(0.45, 0.85), // stronger
        c: layer.glow,
      });
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      // keep haze extremely low so particles read darker/crisper
      ctx.fillStyle = "rgba(0,0,0,0.02)";
      ctx.fillRect(0, 0, w, h);

      const base = 2;
      const bonus = active === "userbrain" ? 5 : 3;
      const n = base + bonus;

      for (let i = 0; i < n; i++) spawn(active);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;

        const p = s.life / s.max;
        const alpha = (1 - p) * (s.a * 1.2);

        // streak
        ctx.strokeStyle = s.c.replace(/0\.\d+\)/, `${alpha})`);
        ctx.lineWidth = 2.0; // darker/thicker
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10);
        ctx.stroke();

        // head
        ctx.fillStyle = s.c.replace(/0\.\d+\)/, `${alpha})`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.max) sparks.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [active, layers]);

  return (
    <Section className="py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="mt-4 font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
            JASU — 4-Layer Brain Architecture
          </h2>

          <p className="mt-4 max-w-4xl text-lg italic text-[rgb(var(--muted))]">
            Evolution took millions of years to build 3 brain layers. We built all 3 digitally — then added a 4th.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[520px_1fr] lg:items-start">
          {/* Left: Interactive concentric brain */}
          <div className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/15 p-8 backdrop-blur">
            <div ref={brainRef} className="relative mx-auto aspect-square w-full max-w-[420px]">
              <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 opacity-75" />

              <svg viewBox="0 0 420 420" className="relative h-full w-full" aria-label="JASU Brain Layers">
                <defs>
                  <radialGradient id="softFade" cx="50%" cy="45%" r="70%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.16)" />
                    <stop offset="55%" stopColor="rgba(0,0,0,0.06)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.00)" />
                  </radialGradient>
                </defs>

                <circle cx="210" cy="210" r="190" fill="url(#softFade)" />

                {/* rings (outer -> inner) REVERSED */}
                <Ring
                  label="USERBRAIN"
                  r={175}
                  stroke="rgba(245, 158, 11, 0.98)"
                  active={active === "userbrain"}
                  onEnter={() => setActive("userbrain")}
                  onClick={() => setActive("userbrain")}
                  isGold
                />
                <Ring
                  label="NEOCORTEX"
                  r={140}
                  stroke="rgba(96, 165, 250, 0.92)"
                  active={active === "neocortex"}
                  onEnter={() => setActive("neocortex")}
                  onClick={() => setActive("neocortex")}
                />
                <Ring
                  label="LIMBIC"
                  r={105}
                  stroke="rgba(167, 139, 250, 0.90)"
                  active={active === "limbic"}
                  onEnter={() => setActive("limbic")}
                  onClick={() => setActive("limbic")}
                />
                <Ring
                  label="REPTILIAN"
                  r={70}
                  stroke="rgba(16, 185, 129, 0.95)"
                  active={active === "reptilian"}
                  onEnter={() => setActive("reptilian")}
                  onClick={() => setActive("reptilian")}
                />

                {/* center node */}
                <circle
                  cx="210"
                  cy="210"
                  r="10"
                  fill={active === "userbrain" ? "rgba(245,158,11,0.90)" : "rgba(255,255,255,0.28)"}
                />
              </svg>
            </div>

            <div className="mt-4 text-center text-xs text-[rgb(var(--muted))]">Hover or click a layer to explore</div>

            {/* Mini legend buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {layers.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setActive(l.key)}
                  className={`rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-left text-sm transition
                    ${active === l.key
                      ? "bg-white/[0.05]"
                      : "bg-[rgb(var(--bg))]/10 hover:bg-white/[0.03]"
                    }`}
                >
                  <div className="text-sm font-semibold" style={{ color: l.color }}>
                    {l.title}
                  </div>
                  <div className="text-xs text-[rgb(var(--muted))]">{l.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detail panel */}
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/10 p-8 backdrop-blur">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-2xl font-semibold tracking-tight" style={{ color: activeLayer.color }}>
                    {activeLayer.title}
                  </div>
                  <div className="mt-1 text-sm text-[rgb(var(--muted))]">{activeLayer.subtitle}</div>
                </div>

                {active === "userbrain" && (
                  <div className="rounded-full border border-[rgb(var(--border))] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[rgb(var(--gold))]">
                    Differentiator
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/15 p-4">
                  <div className="text-xs font-semibold tracking-[0.26em] text-[rgb(var(--muted))]">LAYER</div>
                  <div className="mt-2 text-base font-semibold text-[rgb(var(--text))]">{activeLayer.subtitle}</div>
                </div>

                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/15 p-4">
                  <div className="text-xs font-semibold tracking-[0.26em] text-[rgb(var(--muted))]">FUNCTION</div>
                  <div className="mt-2 text-base font-semibold text-[rgb(var(--text))]">{activeLayer.mid}</div>
                </div>

                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/15 p-4">
                  <div className="text-xs font-semibold tracking-[0.26em] text-[rgb(var(--muted))]">OUTPUT</div>
                  <div className="mt-2 text-sm leading-relaxed text-[rgb(var(--text))]/85">{activeLayer.right}</div>
                </div>
              </div>

              <div className="mt-8 text-sm leading-relaxed text-[rgb(var(--muted))]">
                Tip: Keep <span className="text-[rgb(var(--text))]">UserBrain</span> selected when pitching — it’s the
                “this doesn’t exist elsewhere” hook.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Ring({
  r,
  stroke,
  active,
  label,
  onEnter,
  onClick,
  isGold = false,
}: {
  r: number;
  stroke: string;
  active: boolean;
  label: string;
  onEnter: () => void;
  onClick: () => void;
  isGold?: boolean;
}) {
  const cx = 210;
  const cy = 210;

  return (
    <g
      onMouseDown={(e) => e.preventDefault()}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Select ${label} layer`}
      style={{ cursor: "pointer" }}
    >
      {/* hit area */}
      <circle cx={cx} cy={cy} r={r} fill="transparent" stroke="transparent" strokeWidth={24} />

      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="transparent"
        stroke={stroke}
        strokeWidth={active ? 12 : 8}
        initial={false}
        animate={{
          opacity: active ? 1 : 0.58,
          filter: active
            ? `drop-shadow(0px 0px ${isGold ? 22 : 16}px ${isGold ? "rgba(245,158,11,0.55)" : "rgba(59,130,246,0.28)"
            })`
            : "none",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      {active && (
        <g>
          {/* pill background */}
          <rect
            x={cx - 72}
            y={cy - r + 4}
            width={144}
            height={22}
            rx={11}
            fill="rgba(15, 23, 42, 0.55)"  // slate glass
            stroke={stroke}
            strokeOpacity={0.55}
            strokeWidth={1}
          />
          <text
            x={cx}
            y={cy - r + 20}
            textAnchor="middle"
            fontSize="12"
            fill="rgba(255,255,255,0.92)"
            style={{ letterSpacing: "0.22em" }}
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}