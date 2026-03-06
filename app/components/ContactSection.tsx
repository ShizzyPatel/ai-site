"use client";

import Section from "./Section";
import Card from "./Card";
import { Mail, Phone, Linkedin } from "lucide-react";

export default function ContactSection() {
  return (
    <Section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl">
        {/* Title (matches your big serif section headers) */}
        <h2 className="font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
          Get in Touch
        </h2>

        <div className="mt-12">
          <Card className="p-10 md:p-14 text-center no-lift">
            {/* Headline */}
            <h3 className="font-display text-5xl md:text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
              Ready to Add{" "}
              <span className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary2))] bg-clip-text text-transparent">
                Intelligence
              </span>
              ?
            </h3>

            {/* Subcopy */}
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[rgb(var(--muted))]">
              Whether you’re an enterprise looking for cognitive AI, a developer integrating
              intelligence, or an investor exploring the future — let’s talk.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <a
                href="/contact?from=general"
                className="cta-primary"
              >
                Request a Demo <span aria-hidden>→</span>
              </a>

              <a
                href="https://aiunite.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
              >
                Visit aiunite.ai
              </a>
            </div>

            {/* Contact row */}
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <a
                href="mailto:soob@aiunite.ai"
                className="contact-link"
              >
                <Mail className="h-6 w-6 text-[rgb(var(--primary))]" />
                <span className="text-[rgb(var(--muted))]">info@aiunite.ai</span>
              </a>

              <a
                href="tel:+14157065045"
                className="contact-link"
              >
                <Phone className="h-6 w-6 text-[rgb(var(--primary))]" />
                <span className="text-[rgb(var(--muted))]">415–706–5045</span>
              </a>

              <a
                href="https://linkedin.com/in/soobpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Linkedin className="h-6 w-6 text-[rgb(var(--primary))]" />
                <span className="text-[rgb(var(--muted))]">linkedin.com/in/soobpatel</span>
              </a>
            </div>

            {/* Footer microline */}
            <div className="mt-12 text-sm text-[rgb(var(--muted))]/70">
              AI UNITE, Inc. &nbsp;|&nbsp; Delaware C-Corporation &nbsp;|&nbsp; © 2026
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}