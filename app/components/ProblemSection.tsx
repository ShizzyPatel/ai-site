"use client";

import OnView from "./OnView";
import Section from "./Section";
import Container from "./Container";

type ProblemCard = {
  title: string;
  body: string;
};

const CARDS: ProblemCard[] = [
  {
    title: "Every AI is Siloed",
    body: "ChatGPT doesn't talk to Claude. Claude doesn't talk to Gemini. No one synthesizes them.",
  },
  {
    title: "Aggregation ≠ Intelligence",
    body: "Comparing AI outputs side-by-side is not intelligence. Real intelligence is SYNTHESIS.",
  },
  {
    title: "No AI Learns YOU",
    body: "Every conversation starts from zero. No AI remembers your preferences, patterns, or context across sessions.",
  },
];

export default function ProblemSection() {
  return (
    <Section tone="s1" className="py-20" id="problem">
      <Container>
        <OnView>    
          <h2 className="font-display mt-4 text-5xl md:text-6xl tracking-tight">
            The Problem
          </h2>

          <p className="mt-6 italic text-[rgb(var(--gold))]">
            Headline: &quot;$500B+ AI market. Zero Intelligence Layer.&quot;
          </p>

          <div className="problem-grid mt-10">
            {CARDS.map((c) => (
              <div key={c.title} className="problem-card">
                {/* Make it focusable for keyboard flip */}
                <a
                  href="#"
                  className="absolute inset-0 z-[1] rounded-[24px] outline-none"
                  aria-label={`${c.title} details`}
                  onClick={(e) => e.preventDefault()}
                />
                <div className="problem-card-inner">
                  {/* FRONT */}
                  <div className="problem-card-face problem-card-front">
                    <h3 className="problem-title">{c.title}</h3>
                  </div>

                  {/* BACK */}
                  <div className="problem-card-face problem-card-back">
                    <h3 className="problem-title">{c.title}</h3>
                    <p className="problem-body">{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 italic text-[rgb(var(--muted))]">
            &quot;Businesses need intelligence, not more chatbots.&quot;
          </p>
        </OnView>
      </Container>
    </Section>
  );
}
