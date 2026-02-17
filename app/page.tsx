import Image from "next/image";

import Section from "./components/Section";
import Container from "./components/Container";
import Button from "./components/Button";
import OnView from "./components/OnView";
import CountUpStat from "./components/CountUpStat";


const STATS = [
  { value: "15+", label: "AI Providers" },
  { value: "86K+", label: "Knowledge Nodes" },
  { value: "8", label: "Patents Filed" },
  { value: "<5s", label: "Response Time" },
  { value: "24/7", label: "Autonomous Learning" },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <Section className="relative overflow-hidden bg-[rgb(var(--bg))]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-image.png"
            alt="Abstract AI network background"
            fill
            priority
            className="object-cover object-right opacity-70"
          />

          {/* Darken + left readability (deck look: clean left, rich right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--bg))] via-[rgb(var(--bg))]/90 to-transparent" />

          {/* Subtle top/bottom vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />
        </div>

        <Container className="relative z-10 py-24 md:py-28">
          <OnView>
            {/* Kicker */}
            <p className="text-xs tracking-[0.35em] uppercase text-[rgb(var(--muted))]">
              Cognitive <span className="gradient-text">Intelligence</span> Layer for the AI Economy
            </p>


            {/* Headline */}
            <h1 className="font-display mt-6 text-5xl md:text-7xl leading-[1.03] tracking-tight text-[rgb(var(--text))] max-w-5xl">
              The{" "}
              <span className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary2))] bg-clip-text text-transparent">
                Intelligence
              </span>{" "}
              Infrastructure
              <br />
              for the AI Economy
            </h1>

            {/* Subheading */}
            <p className="mt-7 text-lg leading-relaxed text-[rgb(var(--muted))] max-w-2xl">
              AI UNITE doesn&apos;t compete with AI providers. It makes every AI smarter by
              orchestrating them together, synthesizing responses, and learning what works.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary">Request a Demo →</Button>
              <Button variant="outline">See How It Works</Button>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 gap-y-8 gap-x-10 sm:grid-cols-5 border-t border-[rgb(var(--border))] pt-8">
              <CountUpStat value={15} label="AI Providers" suffix="+" format={(n) => n.toString()} />
              <CountUpStat value={86000} label="Knowledge Nodes" suffix="+" format={(n) => `${Math.round(n / 1000)}K`} />
              <CountUpStat value={8} label="Patents Filed" format={(n) => n.toString()} />
              <CountUpStat value={5} label="Response Time" prefix="<" suffix="s" format={(n) => n.toString()} />
              <CountUpStat value={24} label="Autonomous Learning" suffix="/7" format={(n) => n.toString()} />
            </div>
          </OnView>
        </Container>
      </Section>

      {/* NEXT SECTIONS PLACEHOLDERS (we’ll build these next) */}
      <Section tone="tint" className="py-20" id="problem">
        <Container>
          <OnView>
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-[rgb(var(--primary2))]">
              Section 3
            </p>
            <h2 className="font-display mt-4 text-3xl md:text-4xl tracking-tight">
              The Problem
            </h2>
            <p className="mt-4 text-[rgb(var(--muted))] max-w-2xl">
              Placeholder — next we’ll implement the 3 “red” problem cards per the deck.
            </p>
          </OnView>
        </Container>
      </Section>

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
