"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import Section from "./Section";
import Card from "./Card";
import { motion } from "framer-motion";

type TeamMember = {
  name: string;
  title: string;
  description: string;
  initials: string;
  imageSrc?: string;     // easy swap later: "/team/soob.jpg"
  linkedinUrl?: string;  // optional
};

function Avatar({
  name,
  initials,
  imageSrc,
}: {
  name: string;
  initials: string;
  imageSrc?: string;
}) {
  return (
    <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border border-[rgb(var(--primary))]/55 bg-[rgb(var(--bg))]">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="144px"
          className="object-cover"
          priority={false}
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <span className="text-3xl font-semibold tracking-wide text-[rgb(var(--primary))]">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}

function TeamCard({ m }: { m: TeamMember }) {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="relative p-10 text-center min-h-[520px] flex flex-col no-css-lift">
        {/* LinkedIn */}
        {m.linkedinUrl && (
          <a
            href={m.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${m.name} LinkedIn`}
            className="absolute right-6 top-6 text-[rgb(var(--muted))] hover:text-[rgb(var(--primary))] transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}

        <Avatar name={m.name} initials={m.initials} imageSrc={m.imageSrc} />

        <div className="mt-6 text-sm font-medium tracking-widest text-[rgb(var(--primary))]">
          {m.title}
        </div>

        <h3 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-[rgb(var(--text))]">
          {m.name}
        </h3>

        <p className="mt-6 text-[15px] leading-relaxed text-[rgb(var(--muted))]">
          {m.description}
        </p>

        <div className="mt-auto" />
      </Card>
    </motion.div>
  );
}

export default function TeamSection() {
  const team: TeamMember[] = [
    {
      name: "Soob Patel",
      title: "Founder & CEO",
      initials: "SP",
      description:
        "Serial entrepreneur. SaaS, SMB consulting globally, team builder. Takes complex problems and makes them clear, actionable, and scalable.",
      // imageSrc: "/team/soob.jpg",
      // linkedinUrl: "https://linkedin.com/in/....",
    },
    {
      name: "Dr. Mehrdad Mahdavi",
      title: "Advisor",
      initials: "DMM",
      description:
        "Director of AI HUB at Penn State. Hartz Family Associate Professor. Specialist in machine learning and statistical learning theory.",
      // imageSrc: "/team/mehrdad.jpg",
      // linkedinUrl: "https://linkedin.com/in/....",
    },
    {
      name: "Tommy Orange",
      title: "Strategic Advisor",
      initials: "TO",
      description:
        "Pulitzer Prize nominee (There There). 2025 MacArthur Genius Grant winner. Creative strategy and cultural intelligence.",
      // imageSrc: "/team/tommy.jpg",
      // linkedinUrl: "https://linkedin.com/in/....",
    },
  ];

  return (
    <Section className="py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
          The Team
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <TeamCard key={m.name} m={m} />
          ))}
        </div>
      </div>
    </Section>
  );
}