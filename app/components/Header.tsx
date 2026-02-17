"use client";

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
          ? "border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur-[12px]"
          : "bg-transparent",
      ].join(" ")}
    >
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-white/10" />
          <span className="text-sm font-semibold tracking-tight">AI UNITE</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-[rgb(var(--muted))] md:flex">
          <a className="hover:text-white" href="#problem">Problem</a>
          <a className="hover:text-white" href="#vision">Vision</a>
          <a className="hover:text-white" href="#layers">Layers</a>
          <a className="hover:text-white" href="#compare">Compare</a>
          <a className="hover:text-white" href="#contact">Contact</a>
        </nav>

        <Button className="px-5 py-2 text-xs">Request Demo</Button>
      </Container>
    </header>
  );
}
