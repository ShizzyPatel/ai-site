"use client";

import { motion } from "framer-motion";
import Section from "./Section";

type Layer = {
  n: string;
  title: string;
  desc: string;
  accent: string; // tailwind class for accent color
};

const layers: Layer[] = [
  {
    n: "01",
    title: "Multi–AI Orchestration",
    desc: "15+ providers queried in parallel",
    accent: "text-blue-400",
  },
  {
    n: "02",
    title: "Heterogeneous Source Synthesis",
    desc: "AI + APIs + real-time data combined",
    accent: "text-blue-400",
  },
  {
    n: "03",
    title: "Semantic Consensus Detection",
    desc: "Find agreement across AI responses",
    accent: "text-emerald-400",
  },
  {
    n: "04",
    title: "Contradiction–Based Learning",
    desc: "Learns MORE from disagreements",
    accent: "text-violet-400",
  },
  {
    n: "05",
    title: "Cross–Domain Pattern Recognition",
    desc: "Connections humans miss",
    accent: "text-amber-300",
  },
  {
    n: "06",
    title: "Autonomous Learning (AL 2.0)",
    desc: "19 workers, 24/7 intelligence growth",
    accent: "text-blue-400",
  },
  {
    n: "07",
    title: "Self–Evolution",
    desc: "System improves its own code",
    accent: "text-rose-400",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function LayersSection() {
  return (
    <Section className="py-24">
      <div className="mx-auto max-w-6xl">
        {/* Optional small label if you want consistency with other sections */}
        <div className="mb-8">
          <h2 className="mt-4 font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
            7 Intelligence Layers
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-10 space-y-2"
        >
          {layers.map((l) => (
            <motion.div
              key={l.n}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/10 px-6 py-6 backdrop-blur transition-colors duration-200 hover:bg-white/[0.03]"
            >
              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />
              </div>

              {/* Desktop row layout */}
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                {/* Left block (number + bar + title) */}
                <div className="flex items-center gap-5">
                  <div className={`w-14 text-3xl font-semibold ${l.accent}`}>
                    {l.n}
                  </div>

                  <div className={`h-10 w-[3px] rounded-full ${l.accent} bg-current`} />

                  <div className="text-xl font-semibold tracking-tight text-[rgb(var(--text))]">
                    {l.title}
                  </div>
                </div>

                {/* Right description (desktop right aligned, mobile below) */}
                <div className="text-sm leading-relaxed text-[rgb(var(--muted))] md:text-right">
                  {l.desc}
                </div>
              </div>

              {/* Mobile timeline feel: add a faint left rail */}
              <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-white/5 sm:block md:hidden" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
