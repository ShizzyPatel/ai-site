export default function Split({
  eyebrow,
  heading,
  body,
  right,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  right: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div>
        {eyebrow ? <p className="text-sm font-medium text-gray-500">{eyebrow}</p> : null}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{heading}</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">{body}</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white p-8">{right}</div>
    </div>
  );
}