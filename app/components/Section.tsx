import type { HTMLAttributes, PropsWithChildren } from "react";
import Container from "./Container";

type SectionProps = PropsWithChildren<{
  tone?: "bg" | "tint";
  className?: string;
  containerClassName?: string;
}> &
  HTMLAttributes<HTMLElement>;

export default function Section({
  children,
  tone = "bg",
  className = "",
  containerClassName = "",
  ...rest
}: SectionProps) {
  const bg = tone === "tint" ? "bg-[rgb(var(--card))]" : "bg-[rgb(var(--bg))]";

  return (
    <section className={`${bg} ${className}`} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
