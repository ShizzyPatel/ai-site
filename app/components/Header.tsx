"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Link from "next/link";
import MegaMenu from "./MegaMenu";

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
      <Container className="flex h-16 items-center">
        {/* Left: Logo */}
        <div className="flex w-48 items-center">
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
        <nav className="hidden flex-1 items-center justify-center gap-4 md:flex">
          <MegaMenu
            label="The Intelligence Stack"
            description="The architecture behind cognitive intelligence: why fragmentation exists, and how we unify reasoning, memory, and learning."
            links={[
              { label: "Problem", href: "/#problem", desc: "Why AI is powerful but structurally incomplete." },
              { label: "Layers", href: "/#layers", desc: "JASU architecture and the intelligence stack." },
              { label: "User/Corporate Brain", href: "/#jasu", desc: "We need to add some new text here." },
              { label: "Emergence Engine", href: "/#emergence", desc: "How intelligence emerges from the synthesis of multiple AI perspectives." },
            ]}
          />

          <MegaMenu
            label="Built For"
            description="Cognitive intelligence built for every scale — from enterprise infrastructure to your family's daily life"
            sections={[
              {
                title: "By Audience",
                links: [
                  { label: "Enterprise", href: "/solutions#enterprise", desc: "SSO, governance, SLAs, and multi-tenant brains." },
                  { label: "SMB", href: "/solutions#smb", desc: "Fast onboarding and immediate operational lift." },
                  { label: "Academia", href: "/solutions#academia", desc: "Personal brains that remember, guide, and support." },
                ],
              },
              {
                title: "By Access",
                links: [
                  { label: "Platform", href: "/solutions#platform", desc: "Full cognitive intelligence dashboard." },
                  { label: "API", href: "/solutions#api", desc: "Embed intelligence into any application." },
                  { label: "Extension", href: "/solutions#extension", desc: "AI Unite intelligence on any webpage. Always there." },
                ],
              },
            ]}
          />

          <MegaMenu
            label="The Lab"
            description="What powers the platform - patents, architecture, and validation."
            links={[
              { label: "How It Thinks", href: "/lab#how-it-thinks", desc: "Inside the Emergence Engine JASU and autonomous learning." },
              { label: "Use Cases", href: "/lab#use-cases", desc: "Real queries. Real synthesis. Real results." },
              { label: "Security & Privacy", href: "/lab#security-privacy", desc: "Federated learning. Complete data isolation. Zero trust" },
              { label: "Patent Portfolio", href: "/lab#patent-portfolio", desc: "Four provisional patents protecting the cognitive layer." },
            ]}
          />
          <MegaMenu
            label="About Us"
            description="The team, the thesis, and why this company exists."
            links={[
              { label: "The Story", href: "/about-us#the-story", desc: "Why AI fragmentation demanded a new layer." },
              { label: "Principles", href: "/about-us#principles", desc: "How we build coherent, governable intelligence." },
              { label: "Team & Advisors", href: "/about-us#team-advisors", desc: "Built by operators. Guided by fellows and applied AI researchers." },
              { label: "Press", href: "/about-us#press", desc: "$425M - $875M IP valuation" },
            ]}
          />
          <Link
            href="/pricing"
            className="rounded-full px-3 py-2 text-sm text-[rgb(var(--text))] transition-colors hover:text-[rgb(var(--gold))]"
          >
            Pricing
          </Link>

        </nav>

        {/* Right: CTA */}
        <div className="flex w-48 items-center justify-end">
          <Link href="/contact?from=general" className="hidden md:inline-flex">
            <Button className="px-5 py-2 text-sm">Contact</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
