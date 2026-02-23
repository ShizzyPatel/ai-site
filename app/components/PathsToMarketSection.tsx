"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { ArrowRight, Building2, Code2, Globe } from "lucide-react";

type Path = {
  title: string;
  desc: string;
  icon: React.ElementType;
  href: string;
  status: string;
};

const paths: Path[] = [
  {
    title: "Browser Extension",
    desc: "Consumer entry point. AI intelligence on any webpage. Funnels to enterprise.",
    icon: Globe,
    href: "#",
    status: "OPERATIONAL",
  },
  {
    title: "API Integration",
    desc: "Developer platform. Embed AI UNITE intelligence into any application. BeReady is first integration.",
    icon: Code2,
    href: "#",
    status: "OPERATIONAL",
  },
  {
    title: "Enterprise Platform",
    desc: "Full cognitive intelligence infrastructure. White-label, SSO, custom domain brains, SLA.",
    icon: Building2,
    href: "#",
    status: "OPERATIONAL",
  },
];

export default function ThreePathsToMarketSection() {
  return (
    <Section className="py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="mt-4 font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
            Three Paths to Market
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {paths.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
              whileHover={{ y: -20 }}
              className="group relative flex min-h-[520px] flex-col items-center overflow-hidden rounded-[28px] border border-[rgb(var(--border))] bg-white/55 p-10 text-center shadow-[0_24px_60px_rgba(2,8,23,0.10)] backdrop-blur"
            >
              {/* Icon */}
              <div className="grid h-16 w-16 place-items-center rounded-2xl">
                <p.icon className="h-10 w-10 text-[rgb(var(--primary))]" strokeWidth={1.6} />
              </div>

              {/* Title: fixed block height so badge lines up across cards */}
              <div className="mt-7 min-h-[88px]">
                <h3 className="text-[34px] font-semibold leading-[1.05] tracking-tight text-[rgb(var(--text))]">
                  {p.title}
                </h3>
              </div>

              {/* Status badge (pulsing) */}
              <motion.div
                className="mt-4 inline-flex items-center justify-center rounded-full border px-6 py-2 text-[12px] font-semibold tracking-[0.2em]"
                style={{
                  borderColor: "rgba(16,185,129,0.55)",
                  background: "rgba(16,185,129,0.10)",
                  color: "rgba(5,150,105,1)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(16,185,129,0)",
                    "0 0 18px rgba(16,185,129,0.25)",
                    "0 0 0 rgba(16,185,129,0)",
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {p.status}
              </motion.div>

              {/* Description */}
              <p className="mt-10 max-w-[28ch] text-[18px] leading-relaxed text-[rgb(var(--muted))]">
                {p.desc}
              </p>

              {/* Learn more pinned to bottom (aligned across cards) */}
              <a
                href={p.href}
                className="mt-auto inline-flex items-center gap-2 pt-12 text-[16px] font-semibold text-[rgb(var(--primary))] transition-opacity group-hover:opacity-90"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}