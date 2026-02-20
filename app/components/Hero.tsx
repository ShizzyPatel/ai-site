"use client";

import Image from "next/image";
import Section from "./Section";
import Container from "./Container";
import Button from "./Button";
import OnView from "./OnView";
import CountUpStat from "./CountUpStat";

export default function Hero() {
    return (
        <Section className="relative isolate overflow-hidden theme-dark">
            {/* Background image + overlays */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero/hero-image.png"
                    alt="Abstract AI network background"
                    fill
                    priority
                    className="object-cover object-right"
                />

                {/* Dark base overlay (lighter than before so image remains visible) */}
                <div className="absolute inset-0 bg-[rgba(7,9,15,0.55)]" />

                {/* Left-side emphasis gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,9,15,0.85)] via-[rgba(7,9,15,0.55)] to-[rgba(7,9,15,0.20)]" />
            </div>

            {/* Your hero content MUST be above */}
            <div className="relative z-10">
                {/* ... existing hero content ... */}
            </div>

            <Container className="relative z-10 py-24 md:py-28">
                <OnView>
                    {/* Kicker (PRIMARY positioning) */}
                    <p className="text-xs tracking-[0.35em] uppercase text-[rgb(var(--muted))]">
                        Cognitive{" "}
                        <span className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary2))] bg-clip-text text-transparent">
                            Intelligence
                        </span>{" "}
                        Layer
                    </p>

                    {/* Headline */}
                    <h1 className="font-display mt-6 text-5xl md:text-7xl leading-[1.03] tracking-tight text-[rgb(var(--text))] max-w-5xl">
                        The{" "}
                        <span className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary2))] bg-clip-text text-transparent">
                            Cognitive Intelligence Layer
                        </span>{" "}
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

                    {/* Stats row (count up on scroll into view) */}
                    <div className="mt-10 grid grid-cols-2 gap-y-8 gap-x-10 sm:grid-cols-5 border-t border-[rgb(var(--border))] pt-8">
                        <CountUpStat value={15} label="AI Providers" suffix="+" format="int" />
                        <CountUpStat value={86000} label="Knowledge Nodes" suffix="+" format="k-int" />
                        <CountUpStat value={8} label="Patents Filed" format="int" />
                        <CountUpStat value={5} label="Response Time" prefix="<" suffix="s" format="int" />

                        {/* Static — no count-up, but SAME style */}
                        <CountUpStat text="24/7" label="Autonomous Learning" />
                    </div>

                </OnView>
            </Container>
        </Section>
    );
}
