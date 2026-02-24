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
        <nav className="hidden items-center gap-3 md:flex">
          <MegaMenu
            label="Our Approach"
            description="The architecture behind cognitive intelligence: why fragmentation exists, and how we unify reasoning, memory, and learning."
            links={[
              { label: "Problem", href: "/#problem", desc: "Why AI is powerful but structurally incomplete." },
              { label: "Vision", href: "/#vision", desc: "Vendor-neutral intelligence — the Switzerland of AI." },
              { label: "Layers", href: "/#layers", desc: "JASU architecture and the intelligence stack." },
              { label: "Compare", href: "/#compare", desc: "How AI UNITE differs from chatbots and aggregators." },
            ]}
          />

          <MegaMenu
            label="Solutions"
            description="Deploy cognitive intelligence across environments — from enterprise platforms to everyday workflows."
            links={[
              { label: "Enterprise", href: "/solutions/enterprise", desc: "SSO, governance, SLAs, and multi-tenant brains." },
              { label: "SMB", href: "/solutions/smb", desc: "Fast onboarding and immediate operational lift." },
              { label: "Family", href: "/solutions/family", desc: "Personal brains that remember, guide, and support." },
            ]}
          />

          <Link
            href="/insights"
            className="rounded-full px-3 py-2 text-sm text-[rgb(var(--text))] transition-colors hover:text-[rgb(var(--gold))]"
          >
            Insights
          </Link>

          <Link
            href="/about"
            className="rounded-full px-3 py-2 text-sm text-[rgb(var(--text))] transition-colors hover:text-[rgb(var(--gold))]"
          >
            About Us
          </Link>

          <a
            href="/#contact"
            className="rounded-full px-3 py-2 text-sm text-[rgb(var(--text))] transition-colors hover:text-[rgb(var(--gold))]"
          >
            Contact
          </a>
        </nav>

        {/* Right: CTA */}
        <div className="flex items-center">
          <Button className="px-5 py-2 text-xs">Get In Touch</Button>
        </div>
      </Container>
    </header>
  );
}
