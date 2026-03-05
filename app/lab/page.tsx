import LabLayout from "./_components/LabLayout";
import LabSidebar, { LabNavItem } from "./_components/LabSidebar";
import SectionBlock from "./_components/SectionBlock";

const NAV: LabNavItem[] = [
  { id: "how-it-thinks", label: "How It Thinks" },
  { id: "use-cases", label: "Use Cases" },
  { id: "security-privacy", label: "Security & Privacy" },
  { id: "patent-portfolio", label: "Patent Portfolio" },
];

const HOW_IT_THINKS = [
  {
    num: "01",
    title: "Reasoning + memory + feedback loops as a system",
    body: "JASU isn't a model — it's a 4-layer brain architecture working in parallel: a Reptilian foundation for survival and recovery, a Limbic layer for learning and memory, a Neocortex for reasoning and domain intelligence, and a UserBrain that personalizes everything. Every query activates all four layers simultaneously.",
  },
  {
    num: "02",
    title: "Orchestration layer",
    body: "A single query triggers cognitive mode selection (retrieval, exploration, synthesis, or insight), intelligent routing across 15+ AI models, parallel execution with diminishing-returns detection, contradiction identification, cross-domain bridge discovery, and synthesis into one unified output. The system then records what it learned.",
  },
  {
    num: "03",
    title: "Continuous alignment",
    body: "Each output improves future performance through feedback loops, trace logging, and reinforcement of successful reasoning paths.",
  },
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

        {/* HERO */}
        <div className="pt-14 md:pt-20">
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[rgb(var(--text))] max-w-2xl">
            Proof, architecture, and how the system thinks.
          </h1>
        </div>

        {/* HOW IT THINKS — custom layout instead of SectionBlock bullets */}
        <section
          id="how-it-thinks"
          className="scroll-mt-32 py-16 md:py-20 border-b border-[rgb(var(--border))]/60"
        >
          <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
            THE LAB
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-[rgb(var(--text))]">
            How It Thinks
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[rgb(var(--muted))]">
            Inside the Emergence Engine, JASU, and autonomous learning.
          </p>

          <div className="mt-10 space-y-4 max-w-2xl">
            {HOW_IT_THINKS.map((item) => (
              <div
                key={item.num}
                className="flex gap-5 rounded-2xl border border-[rgb(var(--border))]/60 bg-white/[0.025] p-6"
              >
                {/* Number */}
                <div className="shrink-0 text-xl font-bold font-mono text-[rgb(var(--primary))]/30 leading-none pt-0.5 w-8">
                  {item.num}
                </div>
                {/* Content */}
                <div>
                  <div className="text-sm font-semibold text-[rgb(var(--text))] mb-2">
                    {item.title}
                  </div>
                  <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REMAINING SECTIONS */}
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

      </LabLayout>
    </main>
  );
}
