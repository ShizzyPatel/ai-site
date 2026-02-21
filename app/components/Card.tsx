type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={[
        "card-surface rounded-2xl",
        hover ? "transition hover:-translate-y-0.5" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
