export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-500">Preview</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Clean, modern AI website
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Client text goes here. We control the design system, layout, motion,
            and visuals. This is the white-base foundation.
          </p>

          <div className="mt-10 flex gap-3">
            <button className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white">
              Primary CTA
            </button>
            <button className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900">
              Secondary
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}