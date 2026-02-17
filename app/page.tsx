import Section from "./components/Section";
import Button from "./components/Button";

export default function Home() {
  return (
    <main>
      <Section className="py-24">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-[rgb(var(--muted))]">
            AI UNITE
          </p>

          <h1
            className="mt-6 text-5xl md:text-6xl leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Intelligence Infrastructure for the AI Economy
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[rgb(var(--muted))]">
            Base system now matches the deck: dark premium surfaces, consistent rhythm,
            and future-proof interactions.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button>Request Demo</Button>
            <Button variant="secondary">See How It Works</Button>
          </div>
        </div>
      </Section>

      <Section tone="tint" className="py-16" id="problem">
        <div className="text-[rgb(var(--muted))]">Problem section placeholder.</div>
      </Section>

      <Section className="py-16" id="vision">
        <div className="text-[rgb(var(--muted))]">Vision section placeholder.</div>
      </Section>
    </main>
  );
}
