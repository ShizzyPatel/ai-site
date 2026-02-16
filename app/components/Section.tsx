import type { HTMLAttributes, PropsWithChildren } from "react";
import Container from "./Container";

type SectionProps = PropsWithChildren<{
  tone?: "white" | "tint";
  className?: string;
  containerClassName?: string;
}> &
  HTMLAttributes<HTMLElement>;

export default function Section({
  children,
  tone = "white",
  className = "",
  containerClassName = "",
  ...rest
}: SectionProps) {
  const bg = tone === "tint" ? "bg-gray-50" : "bg-white";

  return (
    <section className={`${bg} ${className}`} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}