"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "./Container";
import Button from "./Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition",
        scrolled
          ? "border-b border-[rgb(var(--border))] bg-[rgb(var(--muted))]/80 backdrop-blur-[12px]"
          : "bg-muted",
      ].join(" ")}
    >
      <Container className="flex h-20 md:h-25 items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center justify-center ">
            <Image
              src="/images/logo/logo.png"
              alt="AI UNITE Logo"
              width={300}
              height={300}
              priority
              className="h-20 w-20 object-contain"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-gold md:flex">
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#problem">Problem</a>
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#vision">Vision</a>
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#layers">Layers</a>
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#compare">Compare</a>
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#contact">Contact</a>
        </nav>


        <Button className="px-5 py-2 text-xs">Get In Touch</Button>
      </Container>
    </header>
  );
}
