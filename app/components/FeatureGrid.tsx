type Item = { title: string; body: string };

export default function FeatureGrid({
  eyebrow,
  heading,
  subheading,
  items,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  items: Item[];
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm font-medium text-gray-500">{eyebrow}</p>
      ) : null}

      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{heading}</h2>

      {subheading ? (
        <p className="mt-3 max-w-2xl text-gray-600">{subheading}</p>
      ) : null}

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-gray-100 bg-white p-6">
            <h3 className="text-base font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}