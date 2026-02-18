import Section from "./components/Section";
import Container from "./components/Container";
import OnView from "./components/OnView";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />

      <Section className="py-20" id="vision">
        <Container>
          <OnView>
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-[rgb(var(--primary2))]">
              Section 4
            </p>
            <h2 className="font-display mt-4 text-3xl md:text-4xl tracking-tight">
              The Vision
            </h2>
            <p className="mt-4 text-[rgb(var(--muted))] max-w-2xl">
              Placeholder — next we’ll build the “Switzerland of AI” vision block.
            </p>
          </OnView>
        </Container>
      </Section>
    </main>
  );
}
