import Image from "next/image";

import Section from "./components/Section";
import Button from "./components/Button";
import FeatureGrid from "./components/FeatureGrid";
import Split from "./components/Split";

export default function Home() {
  return (
    <main>
      {/* HERO (image background, text left) */}
      <section className="relative overflow-hidden bg-white">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-image.png"
            alt="Abstract AI network background"
            fill
            priority
            className="object-cover"
          />
          {/* Left-side readability overlay (stronger on left, lighter to right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30" />
          {/* Optional subtle overall softening */}
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>

        {/* Foreground content */}
        <div className="relative mx-auto max-w-6xl px-6 py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-gray-500 tracking-wide">
              Preview
            </p>

            <h1 className="mt-6 text-6xl font-semibold leading-tight tracking-tight text-gray-900">
              Clean, modern AI website
            </h1>

            <p className="mt-7 text-lg leading-relaxed text-gray-600">
              Placeholder copy — your final messaging will come from the deck.
              We’re building the structure, rhythm, module system, and motion now.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button>Primary CTA</Button>
              <Button variant="secondary">Secondary</Button>
            </div>

            {/* Small supporting line (optional) */}
            <p className="mt-8 text-sm text-gray-500">
              Built for long-term clarity: typography-first, restrained motion, and a flexible component system.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORM / FEATURES */}
      <Section tone="tint" className="py-20" id="platform">
        <FeatureGrid
          eyebrow="Platform"
          heading="Sana-style structured content blocks"
          subheading="We’ll map slides into these modules for a clean, consistent presentation."
          items={[
            {
              title: "Module-based layout",
              body: "Reorder sections without redesigning the page. Keep everything consistent.",
            },
            {
              title: "White + soft gray rhythm",
              body: "Premium structure: white headline moments, tinted content blocks.",
            },
            {
              title: "Built for iteration",
              body: "Fast updates as the story evolves—without visual drift.",
            },
          ]}
        />
      </Section>

      {/* USE CASES */}
      <Section className="py-24" id="use-cases">
        <Split
          eyebrow="Use cases"
          heading="Drop-in content from the PowerPoint"
          body="This right-side panel becomes a graphic, animation, screenshot, or diagram once we have the slide content. For now it’s a controlled placeholder."
          right={
            <div className="space-y-3">
              <div className="h-2 w-24 rounded-full bg-gray-200" />
              <div className="h-2 w-40 rounded-full bg-gray-200" />
              <div className="h-2 w-32 rounded-full bg-gray-200" />
              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-600">
                Visual placeholder (animation / product screenshot / diagram)
              </div>
            </div>
          }
        />
      </Section>

      {/* ABOUT */}
      <Section tone="tint" className="py-20" id="about">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-gray-500">About</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
            Clean structure now, content later
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We’re setting up the page system so the deck content can be inserted
            quickly. Once we have the slides, we’ll convert each into a module:
            hero, split sections, feature grids, and callouts.
          </p>
        </div>
      </Section>

      {/* CONTACT / CTA */}
      <Section className="py-24" id="contact">
        <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-[var(--shadow-sm)]">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              Ready for the next step?
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              This becomes your “Request a demo / Contact” CTA once final copy is
              provided. For now it’s a stable layout block.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button>Request demo</Button>
              <Button variant="secondary">Email us</Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}