import AboutLayout from "./_components/AboutLayout";
import AboutSidebar, { AboutNavItem } from "./_components/AboutSidebar";
import SectionBlock from "./_components/SectionBlock";

const NAV: AboutNavItem[] = [
  { id: "the-story", label: "The Story" },
  { id: "principles", label: "Principles" },
  { id: "team-advisors", label: "Team & Advisors" },
  { id: "press", label: "Press" },
];

function MobileAnchors() {
  return (
    <div className="lg:hidden pt-6">
      <div className="flex gap-3 overflow-x-auto pb-3">
        {NAV.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="shrink-0 rounded-full px-4 py-2 text-sm border border-[rgb(var(--border))]/70 bg-white/5 text-[rgb(var(--text))] hover:bg-white/10 transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <main className="pb-24">
      <AboutLayout mobileNav={<MobileAnchors />} sidebar={<AboutSidebar items={NAV} />}>

        {/* HERO */}
        <div className="pt-14 md:pt-20">
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[rgb(var(--text))] max-w-2xl">
            The team, the thesis, and why this company exists.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[rgb(var(--muted))]">
            AI is powerful — but fragmented. We're building a coherent intelligence stack:
            memory, orchestration, governance, and synthesis that holds up under real-world constraints.
          </p>
        </div>

        <SectionBlock
          id="the-story"
          eyebrow="ABOUT US"
          title="Why AI Unite exists"
          subtitle="Most AI deployments fail in the gap between a model can answer and an organization can rely on it. We build the missing layer."
          bullets={[
            "AI fragmentation demanded orchestration + governance across tools and teams.",
            "The goal is coherence: decisions that remain traceable, repeatable, and secure.",
            "We build systems that reason with context — not just answer prompts.",
          ]}
        />

        <SectionBlock
          id="principles"
          eyebrow="ABOUT US"
          title="Principles"
          subtitle="A simple set of principles that keeps the system honest under real-world constraints."
          bullets={[
            "Coherence over hype: consistency across sessions, sources, and stakeholders.",
            "Governance by design: policy, permissions, and auditability are first-class.",
            "Traceable intelligence: explain sources and reasoning — or it isn't trustworthy.",
            "Enterprise-grade craft: performance, reliability, and UX polish are non-negotiable.",
          ]}
        />

        <SectionBlock
          id="team-advisors"
          eyebrow="ABOUT US"
          title="Team & Advisors"
          subtitle="Built by operators. Guided by experts. Designed for production."
          bullets={[
            "Operator-led: informed by product, security, and enterprise delivery experience.",
            "Research-informed: shaped by fellows and applied AI researchers.",
            "Execution-first: shipping systems, not demos.",
          ]}
        />

        <SectionBlock
          id="press"
          eyebrow="ABOUT US"
          title="Press"
          subtitle="Keep this tight. One or two hard proof points beat a long logo soup."
          bullets={[
            "Coverage: placeholder feature article or podcast.",
            "Mentions: placeholder industry report.",
            "Milestone: placeholder valuation / funding note.",
          ]}
        />

      </AboutLayout>
    </main>
  );
}
