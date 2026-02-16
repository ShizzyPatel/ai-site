import Section from "./components/Section";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <Section className="py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-500 tracking-wide">
            Preview
          </p>

          <h1 className="mt-6 text-6xl font-semibold leading-tight tracking-tight">
            Clean, modern AI website
          </h1>

          <p className="mt-7 text-lg leading-relaxed text-gray-600">
            Client text goes here. We control the design system, layout, motion,
            and visuals. This is the white-base foundation.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90">
              Primary CTA
            </button>

            <button className="rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50">
              Secondary
            </button>
          </div>
        </div>
      </Section>

      <Section tone="tint" className="py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold">Sana-style modules</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Modular content blocks with consistent spacing and hierarchy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Liquid-clean aesthetic</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              White base, cool grays, subtle dividers, restrained motion.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Fast iteration</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Components make the site easy to scale without design drift.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}