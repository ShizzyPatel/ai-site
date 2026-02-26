type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

export default function SectionBlock({ id, eyebrow, title, subtitle, bullets }: Props) {
  return (
    <section id={id} className="scroll-mt-28 py-14 border-b border-[rgb(var(--border))]/40">
      <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))]">
        {eyebrow}
      </div>

      <h2 className="mt-3 text-3xl font-semibold text-[rgb(var(--text))]">{title}</h2>

      <p className="mt-3 max-w-2xl text-base leading-relaxed text-[rgb(var(--muted))]">
        {subtitle}
      </p>

      <ul className="mt-6 space-y-2 text-sm text-[rgb(var(--muted))]">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span
              className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]"
              aria-hidden
            />
            {b}
          </li>
        ))}
      </ul>
    </section>
  );
}