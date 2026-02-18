import type { HTMLAttributes, PropsWithChildren } from "react";
import Container from "./Container";

type Tone =
  | "bg"
  | "tint"
  | "s1" | "s2" | "s3" | "s4" | "s5" | "s6"
  | "s7" | "s8" | "s9" | "s10" | "s11" | "s12";

type SectionProps = PropsWithChildren<{
  tone?: Tone;
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
  const bgByTone: Record<Tone, string> = {
    bg: "bg-[rgb(var(--bg))]",
    tint: "bg-[rgb(var(--tint))]",
    s1: "bg-[rgb(var(--section-1))]",
    s2: "bg-[rgb(var(--section-2))]",
    s3: "bg-[rgb(var(--section-3))]",
    s4: "bg-[rgb(var(--section-4))]",
    s5: "bg-[rgb(var(--section-5))]",
    s6: "bg-[rgb(var(--section-6))]",
    s7: "bg-[rgb(var(--section-7))]",
    s8: "bg-[rgb(var(--section-8))]",
    s9: "bg-[rgb(var(--section-9))]",
    s10: "bg-[rgb(var(--section-10))]",
    s11: "bg-[rgb(var(--section-11))]",
    s12: "bg-[rgb(var(--section-12))]",
  };

  return (
    <section className={`${bgByTone[tone]} ${className}`} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
