type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-[var(--shadow-sm)]",
        hover
          ? "transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-white/15"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
