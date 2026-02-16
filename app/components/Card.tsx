type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-gray-100 bg-white",
        hover ? "transition hover:-translate-y-0.5 hover:shadow-md" : "",
        "shadow-[var(--shadow-sm)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}