type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/60";

  const styles =
    variant === "primary"
      ? "bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary2))] shadow-[var(--shadow-sm)]"
      : "border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--text))] hover:bg-white/5";

  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}
