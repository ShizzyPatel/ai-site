"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Link from "next/link";

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
      <Container className="flex h-20 items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label="AI UNITE Home"
          >
            <Image
              src="/images/logo/logo.png"
              alt="AI UNITE Logo"
              width={300}
              height={300}
              priority
              className="h-16 w-16 md:h-18 md:w-18 object-contain"
            />
          </Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex text-[rgb(var(--text))]">
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#problem">Problem</a>
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#vision">Vision</a>
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#layers">Layers</a>
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#compare">Compare</a>
          <a className="transition-colors hover:text-[rgb(var(--gold))]" href="#contact">Contact</a>
        </nav>

        {/* Right: CTA */}
        <div className="flex items-center">
          <Button className="px-5 py-2 text-xs">Get In Touch</Button>
        </div>
      </Container>
    </header>
  );
}
