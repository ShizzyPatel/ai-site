"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Brain, LayoutGrid, Puzzle } from "lucide-react";
import Section from "./Section";

type Pillar = {
  icon: React.ElementType;
  title: string;
  body: string;
};

function PillarCard({
  icon: Icon,
  title,
  body,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -20 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="glow-card group relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]/35 p-8 backdrop-blur transition-colors duration-200"
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", `${mx}%`);
        el.style.setProperty("--my", `${my}%`);
      }}
    >
      {/* Border brighten on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/0 transition duration-200 group-hover:ring-white/10" />

      <div className="flex flex-col items-center text-center">
        {/* Icon block */}
        <div className="relative mb-4">
          <div className="relative z-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/40 p-4 transition-all duration-200 group-hover:scale-[1.2]">
            <Icon className="h-10 w-10 text-[rgb(var(--primary2))]" />
          </div>

          {/* Subtle halo triggered by card hover */}
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-[rgb(var(--primary2))]">
          {title}
        </h3>

        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[rgb(var(--muted))]">
          {body}
        </p>
      </div>
    </motion.div>
  );
}


export default function VisionSection() {
  const pillars: Pillar[] = useMemo(
    () => [
      {
        icon: LayoutGrid,
        title: "Orchestrate",
        body: "Route queries to the best combination of 15+ AI providers simultaneously",
      },
      {
        icon: Puzzle,
        title: "Synthesize",
        body: "Combine responses into unified intelligence — not just aggregation",
      },
      {
        icon: Brain,
        title: "Learn",
        body: "Every interaction makes the system smarter. 24/7 autonomous learning.",
      },
    ],
    []
  );

  return (
    <Section className="py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section label + Title */}
        <div className="mb-10">
          <h2 className="mt-4 font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
            The Vision
          </h2>
        </div>

        {/* Main vision block */}
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/25 p-10 backdrop-blur">
          <div className="text-center">
            <h3 className="text-[rgb(var(--gold))] font-display text-5xl tracking-tight">
              “The Switzerland of AI”
            </h3>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[rgb(var(--text))]/80">
              AI UNITE is vendor-neutral intelligence infrastructure.
              <br />
              We don&apos;t compete with AI providers — we make them all work
              better.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <PillarCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                body={p.body}
                delay={0.05 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
