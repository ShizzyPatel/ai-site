import IndustriesMarketSection from "../components/IndustriesMarketSection";
import Section from "@/app/components/Section";

export default function InsightsPage() {
  return (
    <>
      <Section className="py-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-6xl tracking-tight text-[rgb(var(--text))]">
            Insights
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[rgb(var(--muted))]">
            Market analysis, industry coverage, and research notes supporting the case for a cognitive intelligence layer.
          </p>
        </div>
      </Section>

      <IndustriesMarketSection />

      {/* Later: Research + citations section */}
      <Section className="py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl text-[rgb(var(--text))]">
            Research & Citations
          </h2>
          <p className="mt-4 text-[rgb(var(--muted))]">
            Placeholder citations (we’ll replace with sourced, verifiable references).
          </p>

          <ul className="mt-8 space-y-3 text-[rgb(var(--muted))]">
            <li>• [Placeholder] Stanford AI Index Report</li>
            <li>• [Placeholder] McKinsey / BCG GenAI market analyses</li>
            <li>• [Placeholder] Gartner AI adoption forecasts</li>
          </ul>
        </div>
      </Section>
    </>
  );
}