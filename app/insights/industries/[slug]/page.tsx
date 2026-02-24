import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/app/components/Section";

type IndustryData = {
  title: string;
  oneLiner: string;
  chips: string[];
  sections: { heading: string; body: string }[];
};

const INDUSTRIES: Record<string, IndustryData> = {
  technology: {
    title: "Technology / IT",
    oneLiner:
      "Orchestration and memory across toolchains, tickets, docs, and operational workflows—under real governance constraints.",
    chips: ["High automation readiness", "Tool sprawl", "Knowledge synthesis", "Auditability"],
    sections: [
      {
        heading: "Thesis",
        body:
          "Placeholder: In IT environments, information is fragmented across ticketing systems, docs, repos, and chat. AI UNITE’s intelligence layer unifies retrieval + synthesis + memory so teams can act with context, not guesswork.",
      },
      {
        heading: "Primary Use Cases",
        body:
          "Placeholder: Incident response copilots, support triage, engineering knowledge base synthesis, root-cause analysis, and cross-system orchestration.",
      },
      {
        heading: "Why Now",
        body:
          "Placeholder: AI adoption is accelerating, but toolchains are multiplying. Coordination cost is becoming the bottleneck—making an intelligence layer strategically necessary.",
      },
      {
        heading: "Required Capabilities",
        body:
          "Placeholder: Access control, audit trails, citation traceability, vendor neutrality across LLMs, and persistent user/org memory.",
      },
      {
        heading: "Citations",
        body: "Placeholder: We will add sourced references with links and dates.",
      },
    ],
  },

  "financial-services": {
    title: "Financial Services",
    oneLiner:
      "Decision synthesis under regulatory oversight—risk, compliance, and institutional knowledge with strict governance requirements.",
    chips: ["Governance-first", "Regulated workflows", "Risk synthesis", "Traceable outputs"],
    sections: [
      { heading: "Thesis", body: "Placeholder." },
      { heading: "Primary Use Cases", body: "Placeholder." },
      { heading: "Why Now", body: "Placeholder." },
      { heading: "Required Capabilities", body: "Placeholder." },
      { heading: "Citations", body: "Placeholder." },
    ],
  },

  healthcare: {
    title: "Healthcare",
    oneLiner:
      "Workflow intelligence for clinical and operational coordination—where safety, privacy, and auditability are non-negotiable.",
    chips: ["Safety-critical", "Privacy constraints", "Workflow complexity", "Audit-ready"],
    sections: [
      { heading: "Thesis", body: "Placeholder." },
      { heading: "Primary Use Cases", body: "Placeholder." },
      { heading: "Why Now", body: "Placeholder." },
      { heading: "Required Capabilities", body: "Placeholder." },
      { heading: "Citations", body: "Placeholder." },
    ],
  },

  legal: {
    title: "Legal",
    oneLiner:
      "Evidence-backed synthesis across cases, precedent, and documents—where citations and traceability define usefulness.",
    chips: ["Citation traceability", "Document-heavy", "High leverage", "Accuracy pressure"],
    sections: [
      { heading: "Thesis", body: "Placeholder." },
      { heading: "Primary Use Cases", body: "Placeholder." },
      { heading: "Why Now", body: "Placeholder." },
      { heading: "Required Capabilities", body: "Placeholder." },
      { heading: "Citations", body: "Placeholder." },
    ],
  },

  "professional-services": {
    title: "Professional Services",
    oneLiner:
      "Repeatable, high-context delivery across clients—turning internal knowledge into reusable intelligence.",
    chips: ["Knowledge reuse ROI", "Client workflows", "Fast time-to-value", "Scalable delivery"],
    sections: [
      { heading: "Thesis", body: "Placeholder." },
      { heading: "Primary Use Cases", body: "Placeholder." },
      { heading: "Why Now", body: "Placeholder." },
      { heading: "Required Capabilities", body: "Placeholder." },
      { heading: "Citations", body: "Placeholder." },
    ],
  },

  logistics: {
    title: "Logistics",
    oneLiner:
      "Operational intelligence for coordination, exception handling, and real-time decision context across systems.",
    chips: ["Exception handling", "Coordination cost", "Real-time ops", "Process intelligence"],
    sections: [
      { heading: "Thesis", body: "Placeholder." },
      { heading: "Primary Use Cases", body: "Placeholder." },
      { heading: "Why Now", body: "Placeholder." },
      { heading: "Required Capabilities", body: "Placeholder." },
      { heading: "Citations", body: "Placeholder." },
    ],
  },

  "research-academia": {
    title: "Research / Academia",
    oneLiner:
      "Synthesis across papers and domains—where signal extraction and evidence evaluation drive progress.",
    chips: ["Evidence evaluation", "Cross-domain synthesis", "High volume", "Knowledge graph fit"],
    sections: [
      { heading: "Thesis", body: "Placeholder." },
      { heading: "Primary Use Cases", body: "Placeholder." },
      { heading: "Why Now", body: "Placeholder." },
      { heading: "Required Capabilities", body: "Placeholder." },
      { heading: "Citations", body: "Placeholder." },
    ],
  },

  manufacturing: {
    title: "Manufacturing",
    oneLiner:
      "Process intelligence and quality knowledge systems—capturing operational context to reduce variance and downtime.",
    chips: ["Process standardization", "Quality systems", "Ops knowledge", "High leverage"],
    sections: [
      { heading: "Thesis", body: "Placeholder." },
      { heading: "Primary Use Cases", body: "Placeholder." },
      { heading: "Why Now", body: "Placeholder." },
      { heading: "Required Capabilities", body: "Placeholder." },
      { heading: "Citations", body: "Placeholder." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

function IndustryHero({
  title,
  oneLiner,
  chips,
}: {
  title: string;
  oneLiner: string;
  chips: string[];
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[rgba(var(--border),0.7)] bg-white/92 backdrop-blur-[14px] p-10 md:p-12">
      {/* subtle background wash */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[rgba(var(--primary),0.12)] blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[rgba(var(--primary2),0.10)] blur-3xl" />
      </div>

      <div className="relative">
        <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
          INSIGHTS BRIEF
        </div>

        <h1 className="mt-5 font-display text-5xl md:text-6xl tracking-tight text-[rgb(var(--text))]">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[rgb(var(--muted))]">
          {oneLiner}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-[rgba(var(--border),0.8)] bg-white/75 px-4 py-2 text-xs font-semibold tracking-wide text-[rgb(var(--text))]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ fixes your console error
  const data = INDUSTRIES[slug];

  if (!data) return notFound();

  return (
    <>
      <Section className="py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-sm text-[rgb(var(--muted))]">
            <Link href="/insights" className="hover:text-[rgb(var(--text))]">
              ← Back to Insights
            </Link>
          </div>

          <div className="mt-6">
            <IndustryHero title={data.title} oneLiner={data.oneLiner} chips={data.chips} />
          </div>
        </div>
      </Section>

      <Section className="py-10">
        <div className="mx-auto max-w-4xl space-y-10">
          {data.sections.map((s) => (
            <div
              key={s.heading}
              className="rounded-[22px] border border-[rgba(var(--border),0.7)] bg-white/75 backdrop-blur p-8 md:p-9"
            >
              <h2 className="text-xl font-semibold text-[rgb(var(--text))]">
                {s.heading}
              </h2>
              <p className="mt-4 leading-relaxed text-[rgb(var(--muted))]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}