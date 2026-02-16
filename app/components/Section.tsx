type SectionProps = {
  children: React.ReactNode;
  tone?: "white" | "tint";
  className?: string;
};

export default function Section({ children, tone = "white", className = "" }: SectionProps) {
  const bg = tone === "tint" ? "bg-gray-50" : "bg-white";

  return (
    <section className={`${bg} ${className}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}