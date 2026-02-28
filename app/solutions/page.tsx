import SolutionsLayout from "./_components/SolutionsLayout";
import SolutionsSidebar, { SolutionsNavItem } from "./_components/SolutionsSidebar";
import SolutionSection from "./_components/SolutionSection";
import DeepDive from "./_components/DeepDive";

const NAV: SolutionsNavItem[] = [
  { id: "enterprise", label: "Enterprise" },
  { id: "smb", label: "SMB" },
  { id: "family", label: "Family" },
  { id: "platform", label: "Platform" },
  { id: "api", label: "API" },
  { id: "extension", label: "Extension" },
];

function MobileAnchors() {
  return (
    <div className="lg:hidden pt-6">
      <div className="flex gap-3 overflow-x-auto pb-3">
        {NAV.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={[
              "shrink-0 rounded-full px-4 py-2 text-sm",
              "border border-[rgb(var(--border))]/70 bg-white/5",
              "text-[rgb(var(--text))] hover:bg-white/10 transition-colors",
            ].join(" ")}
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <main className="pb-24">
      <SolutionsLayout mobileNav={<MobileAnchors />} sidebar={<SolutionsSidebar items={NAV} />}>
        {/* Page Hero — moved INSIDE layout so it gets the right-padding reserve */}
        <div className="pt-14 md:pt-20">
          <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
            SOLUTIONS
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[rgb(var(--text))]">
            Deploy cognitive intelligence across environments.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
            A single intelligence layer — delivered as governed enterprise infrastructure, lightweight workflows,
            and everyday support. Explore each environment below.
          </p>
        </div>

        <SolutionSection
          id="enterprise"
          eyebrow="BY AUDIENCE"
          title="Enterprise"
          subtitle="SSO, governance, auditability, and multi-tenant cognitive infrastructure for regulated environments."
          chips={["SSO / SCIM", "Governance", "Auditability", "Multi-tenant brains"]}
          bullets={[
            "Centralize intelligence across departments without silo drift.",
            "Enforce policies: data access, retention, and safe reasoning boundaries.",
            "Operationalize institutional memory with traceability and control.",
          ]}
        >
          <DeepDive title="See Enterprise detail" summary="Expand for diagrams, workflows, and client graphics.">
            <div className="rounded-2xl border border-[rgb(var(--border))]/70 bg-white/5 p-6 text-sm text-[rgb(var(--muted))]">
              Placeholder: enterprise graphics / animations go here.
            </div>
          </DeepDive>
        </SolutionSection>

        <SolutionSection
          id="smb"
          eyebrow="BY AUDIENCE"
          title="SMB"
          subtitle="Fast onboarding and immediate operational lift — without enterprise overhead."
          chips={["Rapid onboarding", "Ops lift", "Low friction", "Team memory"]}
          bullets={[
            "Turn messy business knowledge into instant, usable answers",
            "Reduce repeated work: proposals, customer context, internal SOPs.",
            "Keep continuity when teams change — without heavy tooling.",
          ]}
        >
          <DeepDive
            title="See SMB detail"
            summary="Expand for structured detail, demo framing, and a slot for client visuals."
          >
            <div className="space-y-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
                    CONTEXT
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-[rgb(var(--text))]">
                    Tool sprawl creates fragmented intelligence.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    Placeholder SMB paragraph text. We’ll replace with client copy once approved.
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--muted))]">
                    {["Placeholder bullet one", "Placeholder bullet two", "Placeholder bullet three"].map((b) => (
                      <li key={b} className="flex gap-3">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]"
                          aria-hidden
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/5 p-6">
                  <div className="text-sm font-semibold text-[rgb(var(--text))]">Client graphic slot</div>
                  <div className="mt-2 text-sm text-[rgb(var(--muted))]">
                    Placeholder for the client’s SMB visual/animation.
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/5 p-6">
                  <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
                    BASELINE
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[rgb(var(--text))]">Typical AI</div>
                  <div className="mt-2 text-sm text-[rgb(var(--muted))]">
                    Placeholder: generic response / reset context.
                  </div>
                </div>

                <div className="rounded-2xl border border-[rgb(var(--border))]/60 bg-white/5 p-6">
                  <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
                    AI UNITE
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[rgb(var(--text))]">Context-aware output</div>
                  <div className="mt-2 text-sm text-[rgb(var(--muted))]">
                    Placeholder: remembers priorities, decisions, and operational context.
                  </div>
                </div>
              </div>
            </div>
          </DeepDive>
        </SolutionSection>

        <SolutionSection
          id="academia"
          eyebrow="BY AUDIENCE"
          title="Academia"
          subtitle="Personal brains that remember, guide, and support — grounded in privacy and continuity."
          chips={["Memory", "Guidance", "Support", "Privacy-first"]}
          bullets={[
            "A consistent brain that tracks preferences, plans, and context over time.",
            "Support routines and decisions with structured recall.",
            "Designed for everyday use without enterprise complexity.",
          ]}
        >
          <DeepDive title="See Academia detail" summary="Expand for examples, flows, and client visuals.">
            <div className="rounded-2xl border border-[rgb(var(--border))]/70 bg-white/5 p-6 text-sm text-[rgb(var(--muted))]">
              Placeholder: Academia graphics / animations go here.
            </div>
          </DeepDive>
        </SolutionSection>

        <SolutionSection
          id="platform"
          eyebrow="BY ACCESS"
          title="Platform"
          subtitle="A full cognitive intelligence dashboard for governed deployment, workflows, and memory management."
          chips={["Admin console", "Workflows", "Governance controls", "Observability"]}
          bullets={[
            "Deploy intelligence as a managed system, not a chat window.",
            "Operate memory, access, and reasoning policies centrally.",
            "Track usage, performance, and outcomes over time.",
          ]}
        >
          <DeepDive title="See Platform detail" summary="Expand for architecture screens and dashboards.">
            <div className="rounded-2xl border border-[rgb(var(--border))]/70 bg-white/5 p-6 text-sm text-[rgb(var(--muted))]">
              Placeholder: Platform visuals / animations go here.
            </div>
          </DeepDive>
        </SolutionSection>

        <SolutionSection
          id="api"
          eyebrow="BY ACCESS"
          title="API"
          subtitle="Embed cognitive intelligence directly into applications, tools, and services."
          chips={["Embeddable", "Composable", "Secure", "Traceable"]}
          bullets={[
            "Bring intelligence to where work happens — CRM, support, ops, and internal tools.",
            "Integrate memory and reasoning with your existing systems.",
            "Maintain governance and traceability across surfaces.",
          ]}
        >
          <DeepDive title="See API detail" summary="Expand for example flows and client diagrams.">
            <div className="rounded-2xl border border-[rgb(var(--border))]/70 bg-white/5 p-6 text-sm text-[rgb(var(--muted))]">
              Placeholder: API visuals / animations go here.
            </div>
          </DeepDive>
        </SolutionSection>

        <SolutionSection
          id="extension"
          eyebrow="BY ACCESS"
          title="Extension"
          subtitle="AI Unite intelligence on any webpage — persistent context, instant recall, no workflow switching."
          chips={["In-context", "Lightweight", "Always available", "Cross-tool memory"]}
          bullets={[
            "Overlay intelligence on existing web tools without platform migrations.",
            "Capture context and decisions in the flow of work.",
            "Keep a consistent cognitive layer across daily systems.",
          ]}
        >
          <DeepDive title="See Extension detail" summary="Expand for behavior demos and client visuals.">
            <div className="rounded-2xl border border-[rgb(var(--border))]/70 bg-white/5 p-6 text-sm text-[rgb(var(--muted))]">
              Placeholder: Extension visuals / animations go here.
            </div>
          </DeepDive>
        </SolutionSection>
      </SolutionsLayout>
    </main>
  );
}   