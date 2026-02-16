type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-gray-900 text-white hover:opacity-90"
      : "border border-gray-200 text-gray-900 hover:bg-gray-50";

  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}