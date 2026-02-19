"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Section from "./Section";

type Worker = {
  id: string;
  title: string;
  subtitle: string;
  color: string; // main
  glow: string;  // rgba glow
};

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function useCountUp(trigger: boolean, target: number, durationMs = 1200, decimals = 0) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const start = performance.now();
    const from = 0;
    const to = target;

    let raf = 0;

    const tick = (t: number) => {
      const p = clamp((t - start) / durationMs, 0, 1);
      // easeOutCubic
      const e = 1 - Math.pow(1 - p, 3);
      const next = from + (to - from) * e;
      const fixed = decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next);
      setVal(fixed);

      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, durationMs, decimals]);

  return val;
}

export default function AutonomousWorkersSection() {
  const workers: Worker[] = useMemo(
    () => [
      {
        id: "explorer",
        title: "Explorer",
        subtitle: "Pattern discovery",
        color: "rgba(96,165,250,1)",
        glow: "rgba(96,165,250,0.35)",
      },
      {
        id: "validator",
        title: "Validator",
        subtitle: "Knowledge validation",
        color: "rgba(52,211,153,1)",
        glow: "rgba(52,211,153,0.32)",
      },
      {
        id: "hypothesis",
        title: "Hypothesis",
        subtitle: "Theory generation",
        color: "rgba(167,139,250,1)",
        glow: "rgba(167,139,250,0.32)",
      },
      {
        id: "synthesizer",
        title: "Synthesizer",
        subtitle: "Cross-domain fusion",
        color: "rgba(96,165,250,1)",
        glow: "rgba(96,165,250,0.35)",
      },
      {
        id: "anticipator",
        title: "Anticipator",
        subtitle: "Predictive intelligence",
        color: "rgba(245,158,11,1)",
        glow: "rgba(245,158,11,0.33)",
      },
      {
        id: "dreamer",
        title: "Dreamer",
        subtitle: "23 modes, 7 tiers",
        color: "rgba(248,113,113,1)",
        glow: "rgba(248,113,113,0.30)",
      },
    ],
    []
  );

  const stats: Stat[] = useMemo(
    () => [
      { label: "Knowledge Nodes", value: 86971, suffix: "+", decimals: 0 },
      { label: "Active Workers", value: 19, decimals: 0 },
      { label: "Dreamer Modes", value: 23, decimals: 0 },
      { label: "Worker Success Rate", value: 100, suffix: "%", decimals: 0 },
    ],
    []
  );

  // ---- Refs for computing card centers (for synaptic lines) ----
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-120px" });

  // Cards that are currently “active” (pulse stronger)
  const [activeBurst, setActiveBurst] = useState<Set<string>>(new Set());

  // Count-up trigger
  const statsTriggered = useInView(sectionRef, { once: true, margin: "-120px" });
  const count0 = useCountUp(statsTriggered, stats[0].value, 1300, stats[0].decimals ?? 0);
  const count1 = useCountUp(statsTriggered, stats[1].value, 1000, stats[1].decimals ?? 0);
  const count2 = useCountUp(statsTriggered, stats[2].value, 1000, stats[2].decimals ?? 0);
  const count3 = useCountUp(statsTriggered, stats[3].value, 1000, stats[3].decimals ?? 0);

  // ---- Canvas synaptic event flow ----
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    let raf: number | null = null;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
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
    ro.observe(wrap);

    const getCenters = () => {
      const centers: Record<string, { x: number; y: number; glow: string }> = {};
      const wrapRect = wrap.getBoundingClientRect();

      for (const wk of workers) {
        const el = cardRefs.current[wk.id];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        centers[wk.id] = {
          x: (r.left - wrapRect.left) + r.width / 2,
          y: (r.top - wrapRect.top) + r.height / 2,
          glow: wk.glow,
        };
      }
      return centers;
    };

    type Impulse = {
      a: string; // from id
      b: string; // to id
      t: number; // 0..1
      v: number; // speed
      glow: string;
      size: number;
    };

    const impulses: Impulse[] = [];

    // Choose connection graph (keeps it intentional)
    const edges: Array<[string, string]> = [
      ["explorer", "synthesizer"],
      ["explorer", "validator"],
      ["hypothesis", "validator"],
      ["synthesizer", "consensus_dummy"], // placeholder removed below
    ];

    // We'll define explicit edges between existing cards:
    const realEdges: Array<[string, string]> = [
      ["explorer", "validator"],
      ["explorer", "synthesizer"],
      ["hypothesis", "validator"],
      ["hypothesis", "synthesizer"],
      ["synthesizer", "anticipator"],
      ["validator", "anticipator"],
      ["anticipator", "dreamer"],
      ["dreamer", "synthesizer"],
    ];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawnImpulse = (centers: Record<string, { x: number; y: number; glow: string }>) => {
      const [a, b] = realEdges[Math.floor(Math.random() * realEdges.length)];
      if (!centers[a] || !centers[b]) return;

      impulses.push({
        a,
        b,
        t: 0,
        v: rand(0.012, 0.02), // speed knob
        glow: centers[a].glow,
        size: rand(2.6, 4.0), // size knob
      });

      // pulse source + destination briefly
      setActiveBurst((prev) => {
        const next = new Set(prev);
        next.add(a);
        next.add(b);
        return next;
      });
      window.setTimeout(() => {
        setActiveBurst((prev) => {
          const next = new Set(prev);
          next.delete(a);
          next.delete(b);
          return next;
        });
      }, 420);
    };

    let lastSpawn = 0;

    const draw = (tms: number) => {
      ctx.clearRect(0, 0, w, h);
      if (!inView) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const centers = getCenters();

      // Draw faint connection lines
      ctx.lineWidth = 1;
      for (const [a, b] of realEdges) {
        const A = centers[a];
        const B = centers[b];
        if (!A || !B) continue;

        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // Spawn impulses at a steady rate
      // ---- KNOB: spawnIntervalMs ----
      const spawnIntervalMs = 180;
      if (tms - lastSpawn > spawnIntervalMs) {
        lastSpawn = tms;
        // ---- KNOB: impulsesPerTick ----
        const impulsesPerTick = 2;
        for (let i = 0; i < impulsesPerTick; i++) spawnImpulse(centers);
      }

      // Draw impulses moving along edges
      for (let i = impulses.length - 1; i >= 0; i--) {
        const im = impulses[i];
        const A = centers[im.a];
        const B = centers[im.b];
        if (!A || !B) {
          impulses.splice(i, 1);
          continue;
        }

        im.t += im.v;

        const x = A.x + (B.x - A.x) * im.t;
        const y = A.y + (B.y - A.y) * im.t;

        const fade = 1 - im.t;
        const alpha = clamp(fade * 0.95, 0, 0.95); // brightness knob

        // Glow streak
        ctx.strokeStyle = im.glow.replace(/0\.\d+\)/, `${alpha})`);
        ctx.lineWidth = 1.4; // thickness knob
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - (B.x - A.x) * 0.02, y - (B.y - A.y) * 0.02); // tiny streak
        ctx.stroke();

        // Head
        ctx.fillStyle = im.glow.replace(/0\.\d+\)/, `${alpha})`);
        ctx.beginPath();
        ctx.arc(x, y, im.size, 0, Math.PI * 2);
        ctx.fill();

        if (im.t >= 1) impulses.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [workers, inView]);

  return (
    <Section tone="s9" className="py-24">
      <div className="mx-auto max-w-6xl" ref={sectionRef}>
        <div className="mb-10">
          <h2 className="mt-4 font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
            19 Autonomous Learning Workers
          </h2>

          <p className="mt-4 max-w-4xl text-lg italic text-[rgb(var(--muted))]">
            The system never sleeps. Workers process patterns, generate hypotheses, and accumulate knowledge 24/7.
          </p>
        </div>

        {/* Grid area with canvas overlay */}
        <div ref={wrapRef} className="relative">
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />

          <div className="grid gap-6 md:grid-cols-3">
            {workers.map((w, i) => (
              <WorkerCard
                key={w.id}
                worker={w}
                index={i}
                isBursting={activeBurst.has(w.id)}
                setRef={(el) => (cardRefs.current[w.id] = el)}
              />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-10 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/10 p-8 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-4">
            <StatBlock value={count0} label={stats[0].label} suffix={stats[0].suffix} />
            <StatBlock value={count1} label={stats[1].label} suffix={stats[1].suffix} />
            <StatBlock value={count2} label={stats[2].label} suffix={stats[2].suffix} />
            <StatBlock value={count3} label={stats[3].label} suffix={stats[3].suffix} />
          </div>
        </div>
      </div>
    </Section>
  );
}

function WorkerCard({
  worker,
  index,
  isBursting,
  setRef,
}: {
  worker: Worker;
  index: number;
  isBursting: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      ref={setRef}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
      className="relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/18 p-8 backdrop-blur"
      style={{
        boxShadow: isBursting ? `0 0 34px ${worker.glow}` : "none",
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{ background: worker.color }}
      />

      {/* Subtle activity pulse */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: isBursting ? 1 : 0.55,
        }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="absolute -inset-20"
          animate={{
            scale: isBursting ? [1, 1.04, 1] : [1, 1.02, 1],
            opacity: isBursting ? [0.10, 0.18, 0.10] : [0.06, 0.10, 0.06],
          }}
          transition={{
            duration: isBursting ? 1.0 : 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle at 30% 20%, ${worker.glow}, transparent 55%)`,
          }}
        />
      </motion.div>

      <div className="relative">
        <div className="text-2xl font-semibold tracking-tight" style={{ color: worker.color }}>
          {worker.title}
        </div>
        <div className="mt-3 text-sm text-[rgb(var(--muted))]">{worker.subtitle}</div>
      </div>
    </motion.div>
  );
}

function StatBlock({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const formatted =
    label === "Knowledge Nodes" ? value.toLocaleString() : value.toString();

  return (
    <div className="text-center md:text-left">
      <div className="text-3xl font-semibold text-[rgb(var(--primary2))]">
        {formatted}
        {suffix ?? ""}
      </div>
      <div className="mt-1 text-sm text-[rgb(var(--muted))]">{label}</div>
    </div>
  );
}
