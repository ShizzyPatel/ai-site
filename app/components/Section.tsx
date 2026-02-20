import type { HTMLAttributes, PropsWithChildren } from "react";
import Container from "./Container";

type Tone = "bg" | "default";

type SectionProps = PropsWithChildren<{
  tone?: Tone;
  className?: string;
  containerClassName?: string;
}> &
  HTMLAttributes<HTMLElement>;

export default function Section({
  children,
  tone = "default",
  className = "",
  containerClassName = "",
  ...rest
}: SectionProps) {
  const isHero = tone === "bg";

  return (
    <section
      className={`${isHero ? "theme-dark" : ""} bg-[rgb(var(--bg))] ${className}`}
      {...rest}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
  