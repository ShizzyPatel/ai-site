import LabLayout from "./_components/LabLayout";
import LabSidebar, { LabNavItem } from "./_components/LabSidebar";
import SectionBlock from "./_components/SectionBlock";

const NAV: LabNavItem[] = [
  { id: "patent-portfolio", label: "Patent Portfolio" },
  { id: "use-cases", label: "Use Cases" },
  { id: "how-it-thinks", label: "How It Thinks" },
  { id: "security-privacy", label: "Security & Privacy" },
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

export default function LabPage() {
  return (
    <main className="pb-24">
      <LabLayout mobileNav={<MobileAnchors />} sidebar={<LabSidebar items={NAV} />}>
        {/* HERO (now padded away from sidebar) */}
        <div className="pt-14 md:pt-20">
          <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
            THE LAB
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[rgb(var(--text))]">
            Proof, architecture, and how the system thinks.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
            This page will stay text-first and structured. We’ll replace placeholders once approved.
          </p>
        </div>

        {/* SECTIONS */}
        <SectionBlock
          id="patent-portfolio"
          eyebrow="THE LAB"
          title="Patent Portfolio"
          subtitle="Provisional patents protecting the cognitive layer."
          bullets={[
            "Placeholder: scope of filings and what they protect.",
            "Placeholder: claims focus (memory, orchestration, governance, etc.).",
            "Placeholder: how this differentiates from generic AI wrappers.",
          ]}
        />

        <SectionBlock
          id="use-cases"
          eyebrow="THE LAB"
          title="Use Cases"
          subtitle="Real queries. Real synthesis. Real results."
          bullets={[
            "Placeholder: decision synthesis across fragmented sources.",
            "Placeholder: governance-heavy environments and traceability.",
            "Placeholder: operational continuity and knowledge retention.",
          ]}
        />

        <SectionBlock
          id="how-it-thinks"
          eyebrow="THE LAB"
          title="How It Thinks"
          subtitle="Inside the Emergence Engine, JASU, and autonomous learning."
          bullets={[
            "Placeholder: reasoning + memory + feedback loops as a system.",
            "Placeholder: orchestration layer (route, synthesize, learn).",
            "Placeholder: how outputs become more aligned over time.",
          ]}
        />

        <SectionBlock
          id="security-privacy"
          eyebrow="THE LAB"
          title="Security & Privacy"
          subtitle="Federated learning. Complete data isolation. Zero trust."
          bullets={[
            "Placeholder: isolation boundaries and tenant separation.",
            "Placeholder: governance controls and auditability model.",
            "Placeholder: privacy stance and data-handling posture.",
          ]}
        />
      </LabLayout>
    </main>
  );
}